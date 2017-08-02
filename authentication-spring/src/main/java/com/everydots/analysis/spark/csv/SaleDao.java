package com.everydots.analysis.spark.csv;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.List;

public class SaleDao {

    public void insertRecords(List<KeyValueRecord> sales) {
        MongoClient mongoClient = new MongoClient();
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Document> topNTables = database.getCollection("topNTables");
        Document doc = new Document("name", "topNRepairMobiles")
                .append("values", sales)
                .append("size", sales.size());
        topNTables.insertOne(doc);
    }
}
