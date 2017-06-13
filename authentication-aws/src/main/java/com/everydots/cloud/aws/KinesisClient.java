package com.everydots.cloud.aws;

import com.amazonaws.services.kinesis.AmazonKinesisClient;
import com.amazonaws.services.kinesis.model.CreateStreamRequest;
import com.amazonaws.services.kinesis.model.PutRecordsRequest;

public class KinesisClient {

    private String streamName = "demoStream";

    public void createKinesisStream(String streamName) {
        AmazonKinesisClient kinesisClient = new AmazonKinesisClient();
        CreateStreamRequest createStreamRequest = new CreateStreamRequest();
        kinesisClient.createStream(createStreamRequest);


        PutRecordsRequest putRecordsRequest = new PutRecordsRequest();
        putRecordsRequest.setStreamName(streamName);

        kinesisClient.putRecords(putRecordsRequest);
    }

}
