const express = require('express');
const cors = require('cors');
const connect = require('./config/database');
const { port } = require('./config/server-config');
const app = express();
const { connectZooAndGetRange } = require('./services/range-manager');

app.use(cors());
const apiRoutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);






app.listen(port, async() => {
    console.log(`App is up and running at Port ${port}`);
    await connect();
    console.log('Mongo db connected');

    connectZooAndGetRange();

})