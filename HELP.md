
docker run -network host -d --name=pgadmin -ePGADMIN_DEFAULT_EMAIL=mvillarreal@mango.com -ePGADMIN_DEFAULT_PASSWORD=casa1234 -p 80:80 dpage/pgadmin4


curl -X POST http://localhost:8083/connectors -H "Content-Type: application/json" -d '{
      "name": "jdbc_source_mysql_01",
      "config": {
              "connector.class": "io.confluent.connect.jdbc.JdbcSourceConnector",
              "connection.url": "jdbc:mysql://mysql_database:3306/test",
              "connection.user": "connect_user",
              "connection.password": "connect_password",
              "topic.prefix": "mysql-01-",
              "poll.interval.ms" : 3600000,
              "table.whitelist" : "test.accounts",
              "mode":"bulk",
              "transforms":"createKey,extractInt",
              "transforms.createKey.type":"org.apache.kafka.connect.transforms.ValueToKey",
              "transforms.createKey.fields":"id",
              "transforms.extractInt.type":"org.apache.kafka.connect.transforms.ExtractField$Key",
              "transforms.extractInt.field":"id"
              }
      }'


      {
  "name": "logs-broker",
  "config": {
    "connector.class": "org.apache.kafka.connect.file.FileStreamSourceConnector",
    "file": "/var/log/broker.log",
    "tasks.max": "1",
    "topic": "logs_broker"
  }
}


bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 \
    --topic order \
    --from-beginning \
    --formatter kafka.tools.DefaultMessageFormatter \
    --property print.key=true \
    --property print.value=true \
    --property key.deserializer=org.apache.kafka.common.serialization.StringDeserializer \
    --property value.deserializer=org.apache.kafka.common.serialization.StringDeserializer


