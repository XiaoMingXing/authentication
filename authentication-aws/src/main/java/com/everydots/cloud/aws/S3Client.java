package com.everydots.cloud.aws;

import com.amazonaws.auth.ClasspathPropertiesFileCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.Bucket;
import com.everydots.common.S3File;
import com.everydots.utils.PropertiesUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.RandomUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.List;

public class S3Client {

    private static final Log LOGGER = LogFactory.getLog(S3Client.class);
    private static AmazonS3Client instance = null;

    public AmazonS3Client getS3Client() {
        if (instance == null) {
            instance = new AmazonS3Client(new ClasspathPropertiesFileCredentialsProvider());
            instance.setRegion(Region.getRegion(Regions.US_EAST_1));
        }
        return instance;
    }

    public void createBucket(String bucketName) {
        boolean doesBucketExist = getS3Client().doesBucketExist(bucketName);
        if (doesBucketExist) {
            List<Bucket> buckets = getS3Client().listBuckets();
            for (Bucket bucket : buckets) {
                if (bucket.getName().equals(bucketName)) {
                    return;
                }
            }
            bucketName = bucketName + RandomUtils.nextInt(100);
        }
        getS3Client().createBucket(bucketName);
        new PropertiesUtils().writeProperty("bucketName", bucketName);
    }

    public void uploadFiles(String bucketName, List<S3File> inputStreams) {
        try {
            if (!StringUtils.isNotEmpty(bucketName)) {
                return;
            }
            for (S3File inputStream : inputStreams) {
                if (getS3Client().doesObjectExist(bucketName, inputStream.getKey())) {
                    continue;
                }
                getS3Client().putObject(bucketName, inputStream.getKey(),
                        inputStream.getFile());
            }
        } catch (AmazonS3Exception e) {
            LOGGER.error("upload files error!", e);
        }
    }
}
