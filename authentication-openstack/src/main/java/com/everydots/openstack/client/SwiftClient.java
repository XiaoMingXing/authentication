package com.everydots.openstack.client;

import org.openstack4j.api.OSClient;
import org.openstack4j.api.storage.ObjectStorageContainerService;
import org.openstack4j.api.storage.ObjectStorageService;
import org.openstack4j.model.common.ActionResponse;
import org.openstack4j.model.common.Identifier;
import org.openstack4j.model.common.Payloads;
import org.openstack4j.model.compute.Server;
import org.openstack4j.model.identity.v3.Domain;
import org.openstack4j.model.storage.object.SwiftContainer;
import org.openstack4j.model.storage.object.SwiftObject;
import org.openstack4j.model.storage.object.options.ContainerListOptions;
import org.openstack4j.openstack.OSFactory;

import java.io.File;
import java.util.List;
import java.util.function.Consumer;

/**
 * Created by xiaomingxing on 17/6/14.
 */
public class SwiftClient {


    public void uploadFileToSwift() {

        ObjectStorageService objectStorage = getObjectStorageService();

        List<? extends SwiftContainer> containers = objectStorage.containers().list(
                ContainerListOptions.create().startsWith("testContainer"));
        if (containers.size() == 0) {
            objectStorage.containers().create("testContainer");
        }

        String result = objectStorage.objects().put("testContainer", "testCloudFile",
                Payloads.create(SwiftClient.class.getClassLoader().getResourceAsStream("test.txt")));

        System.out.println("UPLOAD STATUS: " + result);
    }

    private ObjectStorageService getObjectStorageService() {

        Identifier projectIdentifier = Identifier.byId("demo");

        return OSFactory.builderV3()
                .endpoint("http://192.168.56.101/identity/")
                .credentials("admin", "nomoresecret", projectIdentifier)
                .authenticate()
                .objectStorage();
    }

    public void retrieveFiles() {

        ObjectStorageService objectStorageService = getObjectStorageService();

        List<? extends SwiftObject> objects = objectStorageService.objects().list("testContainer");

        objects.forEach((Consumer<SwiftObject>) swiftObject -> {
            System.out.println(swiftObject.getName());
        });
    }

    public void listDomains() {
        List<? extends Domain> domainList = OSFactory.builderV3()
                .endpoint("http://192.168.56.101/identity/")
                .credentials("admin", "nomoresecret", Identifier.byId("demo"))
                .authenticate().identity().domains().list();
        domainList.forEach((Consumer<Domain>) domain -> System.out.println(domain.getName()));
    }
}
