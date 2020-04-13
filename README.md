# ORDER-MANAGEMENT-SYSTEM

Ecommerce demo microservice platform, a proof of concept for microservices architecture.

![alt text](./oms.png)

# MICROSERVICES

## CUSTOMERS

Rest based api to handle customer data and delivery addresses backed by MySQL

## PRODUCTS

Rest based api to fetch product catalog backed by elastic search.

## ORDERS

Rest based api to place an order backed by MySQL

## ORDERS-GRAPH

Graphql based api to fetch order information, uses a query model backed by postgres

## ORDERS-STREAM

Kafka streams process to enrich order information and expose them into a read model.

# INFRAESTRUCTURE COMPONENTS

## APACHE KAFKA

Apache kafka serves as the main messaging broker, decouples the comunication between services enssuring scalable 

## APACHE KAFKA CONNECT

Connector used to extract information from the different systems into kafka topics for late stream processing.

## SQL DATABASES

### MYSQL

Main database used for fast and simple operations

### POSTGRESQL

Main database used for more complex data models and scalable models.

## NO SQL DATABASES

### ElasticSearch

Document based & text search database used to index product catalog

# ROADMAP

* Implement inventory system(redis based)
* Implement shipping service(backed by event sourcing)

docker run -network host -d --name=pgadmin -ePGADMIN_DEFAULT_EMAIL=mvillarreal@mango.com -ePGADMIN_DEFAULT_PASSWORD=casa1234 -p 80:80 dpage/pgadmin4