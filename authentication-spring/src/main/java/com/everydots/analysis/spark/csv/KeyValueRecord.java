package com.everydots.analysis.spark.csv;

import org.bson.BsonDocument;
import org.bson.BsonDocumentWrapper;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

public class KeyValueRecord implements Bson {

    private String key;

    private double numericValue;

    private String stringValue;
    private ObjectId id;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public double getNumericValue() {
        return numericValue;
    }

    public void setNumericValue(int numericValue) {
        this.numericValue = numericValue;
    }

    public String getStringValue() {
        return stringValue;
    }

    public void setStringValue(String stringValue) {
        this.stringValue = stringValue;
    }

    public KeyValueRecord withKey(String key) {
        this.key = key;
        return this;
    }

    public KeyValueRecord withNumericValue(Double value) {
        this.numericValue = value;
        return this;
    }

    public KeyValueRecord withStringValue(String value) {
        this.stringValue = value;
        return this;
    }

    @Override
    public <TDocument> BsonDocument
    toBsonDocument(Class<TDocument> aClass, CodecRegistry codecRegistry) {
        return new BsonDocumentWrapper<>(this, codecRegistry.get(KeyValueRecord.class));
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public KeyValueRecord withNewObjectId() {

        KeyValueRecord record = new KeyValueRecord();
        record.setId(new ObjectId());
        return record;
    }
}
