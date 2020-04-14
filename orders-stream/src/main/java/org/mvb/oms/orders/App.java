package org.mvb.oms.orders;

import org.apache.kafka.streams.KafkaStreams;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class App {
    public static void main(String[] args) throws IOException {
        InputStream input = new FileInputStream("resources/application.properties");
        Properties properties = new Properties();
        properties.load(input);
        OrderStream app = new OrderStream();
        KafkaStreams streams = new KafkaStreams(app.createTopology(), properties);
        streams.start();
        Runtime.getRuntime().addShutdownHook(new Thread(streams::close));
    }
}
