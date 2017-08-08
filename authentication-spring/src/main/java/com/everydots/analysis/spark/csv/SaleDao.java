package com.everydots.analysis.spark.csv;

import com.everydots.mongodb.KeyValueCodec;
import com.mongodb.BasicDBObject;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.codecs.Codec;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;

import java.io.IOException;
import java.util.List;

class SaleDao {

    void insertRecords(List<KeyValueRecord> sales) {
        Codec<Document> defaultDocumentCodec = MongoClient.getDefaultCodecRegistry().get(
                Document.class);

        KeyValueCodec gradeCodec = new KeyValueCodec(defaultDocumentCodec);

        CodecRegistry codecRegistry = CodecRegistries.fromRegistries(
                MongoClient.getDefaultCodecRegistry(), CodecRegistries.fromCodecs(gradeCodec));

        MongoClientOptions options = MongoClientOptions.builder().codecRegistry(codecRegistry)
                .build();

        MongoClient mongoClient = new MongoClient("localhost:27017", options);
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> topNTables = database.getCollection("topNTables");
        Document doc = new Document("name", "topNRepairMobiles")
                .append("values", sales)
                .append("size", sales.size());
        topNTables.insertOne(doc);
        mongoClient.close();
    }


    void insertJson(String json) throws IOException {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> topNTables = database.getCollection("topNTables");

        Document doc = new Document("name", "topNRepairMobiles")
                .append("values", json);
        topNTables.insertOne(doc);
        mongoClient.close();
    }

    long findAmounts() {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> topNTables = database.getCollection("topNTables");
        return topNTables.count();
    }


    List findStationAverageTimes() {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> topNTables = database.getCollection("topNTables");

        BasicDBObject bson = new BasicDBObject();
        bson.put("Station Name", "SLANS COMMUNICATION");
        return null;
    }


}
