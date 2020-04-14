package org.mvb.oms.orders;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.kafka.common.serialization.Deserializer;
import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.common.serialization.Serializer;
import org.apache.kafka.connect.json.JsonDeserializer;
import org.apache.kafka.connect.json.JsonSerializer;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.kstream.*;

import java.util.ArrayList;
import java.util.List;

public class OrderStream {
    public Topology createTopology() {
        final StreamsBuilder builder = new StreamsBuilder();
        final Serializer<JsonNode> jsonSerializer = new JsonSerializer();
        final Deserializer<JsonNode> jsonDeserializer = new JsonDeserializer();
        final Serde<JsonNode> jsonSerdes = Serdes.serdeFrom(jsonSerializer, jsonDeserializer);

        GlobalKTable<String, JsonNode> productsTable  = builder.globalTable("products", Consumed.with(Serdes.String(), jsonSerdes));
        GlobalKTable<String, JsonNode> customersTable = builder.globalTable("customers", Consumed.with(Serdes.String(), jsonSerdes));
        GlobalKTable<String, JsonNode> addressTable   = builder.globalTable("address", Consumed.with(Serdes.String(), jsonSerdes));
        KStream<String, JsonNode> ordersStream        = builder.stream("orders", Consumed.with(Serdes.String(), jsonSerdes));
        /**
         * FIXME I need a way to copy the stream in a right way
         */
        ordersStream.flatMapValues(this::flatItems)
                .join(productsTable, this::selectProduct, this::addProductItem)
                .to("orders-with-product", Produced.with(Serdes.String(), jsonSerdes));

        KTable<String, JsonNode> ordersWithProduct = builder.table("orders-with-product", Consumed.with(Serdes.String(), jsonSerdes));

        ordersStream.join(
                customersTable, this::selectCustomer, this::joinCustomer
        )
        .join(ordersWithProduct, this::joinProduct)
        .mapValues(this::formatOrder)
        .to("orders-enriched", Produced.with(Serdes.String(), jsonSerdes));

        return builder.build();
    }
    private JsonNode formatOrder(String key, JsonNode object) {
        ObjectNode cleanOrder = JsonNodeFactory.instance.objectNode();
        ObjectNode customer =  (ObjectNode)object.get("customer");
        ObjectNode orderInfo =  (ObjectNode)object.get("orderInfo");
        customer.remove("id");
        cleanOrder.put("orderId", orderInfo.get("id").asText());
        cleanOrder.set("customer",customer);
        cleanOrder.set("products", object.get("products"));
        return cleanOrder;
    }
    /**
     * Select product relevant info as a new Object
     *
     * @param baseProduct
     * @param product
     * @return
     */
    public JsonNode addProductItem(JsonNode baseProduct, JsonNode product) {
        ObjectNode itemInfo = JsonNodeFactory.instance.objectNode();
        itemInfo.set("skuCode", product.get("skuCode"));
        itemInfo.set("description", product.get("description"));
        itemInfo.put("quantity",baseProduct.get("quantity").asInt());
        return itemInfo;
    }

    public List<JsonNode> flatItems(JsonNode order) {
        List<JsonNode> result = new ArrayList<>();
        order.withArray("items").elements().forEachRemaining(result::add);
        return result;
    }

    public String selectProduct(String key, JsonNode value) {
        return value.get("id").asText();
    }

    public String selectCustomer(String key, JsonNode value) {
        return value.get("customerId").asText();
    }

    public JsonNode joinProduct(JsonNode order, JsonNode product) {
        ObjectNode newOrder = JsonNodeFactory.instance.objectNode();
        newOrder.set("orderInfo", order.get("orderInfo"));
        newOrder.set("customer", order.get("customer"));
        List<JsonNode> products = new ArrayList<>();
        if (order.has("products")) {
            order.withArray("products").elements().forEachRemaining(products::add);
        }
        products.add(product);
        newOrder.putArray("products").addAll(products);
        return newOrder;
    }
    public JsonNode joinCustomer(JsonNode order, JsonNode customer) {
        ObjectNode newOrder = JsonNodeFactory.instance.objectNode();
        newOrder.set("orderInfo", order);
        newOrder.set("customer", customer);
        return newOrder;
    }
}
