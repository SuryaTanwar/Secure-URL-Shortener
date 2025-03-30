#!/bin/bash
sleep 10  # Ensure ZooKeeper is fully initialized

BASE_ID=100000000000
RANGE_SIZE=10000000
TOTAL_RANGES=100  

ZK_CLI="/usr/share/zookeeper/bin/zkCli.sh"  # Correct path

# Ensure the base node exists
$ZK_CLI create /idranges "" 2>/dev/null || echo "/idranges already exists"

for i in $(seq 1 $TOTAL_RANGES); do
  START=$((BASE_ID + (i-1)*RANGE_SIZE))
  END=$((START + RANGE_SIZE - 1))
  $ZK_CLI create /idranges/range$i "$START-$END:false" 2>/dev/null || echo "Skipping range$i (already exists)"
done

echo "Created $TOTAL_RANGES ID ranges in ZooKeeper"
