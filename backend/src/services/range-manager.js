const zookeeper = require('node-zookeeper-client');
const client = zookeeper.createClient('localhost:2181'); 

let MIN, MAX;

async function connectZooAndGetRange() {
    try {        
        client.connect();
        console.log('Zookeeper connected');
        const claimedRange = await findAndClaimRange(); // Wait for range

        const [startStr, endStr] = claimedRange.split('-'); 
        MIN = Number(startStr);
        MAX = Number(endStr);

    } catch (error) {
        console.error('Error:', error); 
    }
}

function getMinMax() { 
    
    return new Promise((resolve, reject) => {
        if (MIN !== undefined && MAX !== undefined) {
            resolve({ MIN, MAX });
        } else {
            // Need to wait for connectZooAndGetRange to finish
            const intervalId = setInterval(() => {
                if (MIN !== undefined && MAX !== undefined) {
                    clearInterval(intervalId); 
                    resolve({ MIN, MAX }); 
                }
            }, 100); // Check every 100ms
        }
    });
}

function findAndClaimRange() {
    const path = '/idranges';

    return new Promise((resolve, reject) => {
        function listChildren(client, path) {
            return new Promise((resolve, reject) => {
                client.getChildren(path, function (error, children, stat) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(children);
                    }
                });
            });
        }

        function getDataAsync(client, path, rangeZnodeName) {
            return new Promise((resolve, reject) => {
                client.getData(path + '/' + rangeZnodeName, (error, data, stat) => {
                    if (error) {
                        reject(error);
                    } else {
                        const [rangeStr, status] = data.toString('utf8').split(':');
                        if (status === 'false') {
                            client.setData(path + '/' + rangeZnodeName, Buffer.from(`${rangeStr}:true`), -1, (error) => {
                                if (error) {
                                    reject(error); 
                                } else {
                                    resolve(rangeStr);
                                }
                            }); 
                        } else {
                            resolve(null); 
                        }
                    }
                });
            });
        }

        listChildren(client, path)
            .then(async children => { 
                for (const rangeZnodeName of children) {
                    try {
                        const claimedRange = await getDataAsync(client, path, rangeZnodeName); 
                        if (claimedRange) {
                            resolve(claimedRange); 
                            return; 
                        }
                    } catch (error) {
                        console.error('Error in getDataAsync:', error);
                    }
                }

                throw new Error('No available ranges found'); 
            })
            .catch(error => {
                console.error('Error interacting with Zookeeper:', error);
                reject(error); 
            });
    });
}

module.exports = {
    connectZooAndGetRange,
    getMinMax 
}