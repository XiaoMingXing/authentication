package com.everydots.mongodb;

import com.everydots.analysis.spark.csv.KeyValueRecord;
import org.bson.*;
import org.bson.codecs.*;
import org.bson.types.ObjectId;

public class KeyValueCodec implements CollectibleCodec<KeyValueRecord> {

    private Codec<Document> documentCodec;

    public KeyValueCodec() {
        this.documentCodec = new DocumentCodec();
    }

    public KeyValueCodec(Codec<Document> codec) {
        this.documentCodec = codec;
    }

    @Override
    public void encode(BsonWriter writer, KeyValueRecord value,
                       EncoderContext encoderContext) {
        Document document = new Document();

        ObjectId id = value.getId();
        String key = value.getKey();
        double numericValue = value.getNumericValue();
        String stringValue = value.getStringValue();

        if (null != id) {
            document.put("_id", id);
        }

        if (null != key) {
            document.put("key", key);
        }

        if (null != stringValue) {
            document.put("student_id", stringValue);
        }
        if (numericValue != 0) {
            document.put("type", numericValue);
        }

        documentCodec.encode(writer, document, encoderContext);

    }

    @Override
    public Class<KeyValueRecord> getEncoderClass() {
        return KeyValueRecord.class;
    }

    @Override
    public KeyValueRecord decode(BsonReader reader, DecoderContext decoderContext) {
        Document document = documentCodec.decode(reader, decoderContext);
        System.out.println("document " + document);
        KeyValueRecord grade = new KeyValueRecord();

        grade.setId(document.getObjectId("_id"));

        grade.setKey(document.getString("key"));

        grade.setNumericValue(document.getInteger("numberic_value"));

        grade.setStringValue(document.getString("string_value"));

        return grade;
    }

    @Override
    public KeyValueRecord generateIdIfAbsentFromDocument(KeyValueRecord document) {
        return documentHasId(document) ? document.withNewObjectId() : document;
    }

    @Override
    public boolean documentHasId(KeyValueRecord document) {
        return null == document.getId();
    }

    @Override
    public BsonValue getDocumentId(KeyValueRecord document) {
        if (!documentHasId(document)) {
            throw new IllegalStateException("The document does not contain an _id");
        }

        return new BsonString(document.getId().toHexString());
    }
}
