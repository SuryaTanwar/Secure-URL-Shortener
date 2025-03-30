FROM zookeeper:3.8

# Copy configuration and init script
COPY zoo.cfg /conf/
COPY init-ranges.sh /docker-entrypoint-initdb.d/

# Set permissions
RUN chmod +x /docker-entrypoint-initdb.d/init-ranges.sh && \
    chown zookeeper:zookeeper /docker-entrypoint-initdb.d/init-ranges.sh