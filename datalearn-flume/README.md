# Apache Flume

## issues

1. Failed to start collector because dependencies were not found in classpath. 
Error follows. org/apache/hadoop/io/SequenceFile$CompressionType

The way to solve:

https://community.hortonworks.com/questions/22067/flume-agent-failed-because-dependencies-were-not-f.html

2. No FileSystem for scheme "hdfs"

Solution:  copy hdfs related jars into the flume lib folder 

## run collector

### commands to start collector

$FLUME_HOME/bin/flume-ng agent -n collector -c conf -f $FLUME_HOME/conf/collector-conf.properties | tail -f logs/flume.log

### command to start agent1

$FLUME_HOME/bin/flume-ng agent -n agent1 -c conf -f $FLUME_HOME/conf/flume-conf.properties | tail -f logs/flume.log

### command to start RSS seed generator in agent1

java -cp . RSSReader > /var/log/flume-ng/source.txt &


tail -f /var/log/flume-ng/source.txt


# Apache Kafka 

## create topic
`
bin/kafka-topics --create \
    --zookeeper 35.185.184.76:2181 \
    --replication-factor 1 \
    --partitions 1 \
    --topic weblogs
`
## check topic exist

`
bin/kafka-topics \
    --zookeeper 35.198.250.50:2181 \
    --list
`

## send messages
`
bin/kafka-console-producer --broker-list 35.197.154.212:9092 --topic weblogs

bin/kafka-console-producer.sh --broker-list 35.197.154.212:9092 --topic test
`


bin/kafka-console-producer.sh --broker-list 35.185.176.184:9092 --topic weblogs
bin/kafka-console-consumer.sh --bootstrap-server 192.168.0.5:9092 --topic weblogs --from-beginning
    

