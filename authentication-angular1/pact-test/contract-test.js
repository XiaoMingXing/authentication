(function () {

  describe("Auth services", function () {

    var email = "920477852@qq.com";
    var client, authProvider, requestBody = JSON.stringify({
      "username": "siyu",
      "password": "password",
      "email": email
    });

    beforeEach(function () {
      client = example.createClient('http://localhost:9001');
      authProvider = Pact.mockService({
        consumer: 'service_consumer',
        provider: 'service_provider',
        port: 9001,
        done: function (error) {
          expect(error).toBe(null);
        }
      });
    });

    it("should login", function (done) {
      authProvider
        .given("there is a valid username and password")
        .uponReceiving("expect login success")
        .withRequest({
          method: "POST",
          path: "/cost/rest/auth/loginPact",
          body: requestBody
        })
        .willRespondWith(200, {
          "Content-Type": "application/json; charset=utf-8"
        }, {
          data: {email: "920477852@qq.com"}
        });

      //Run the tests
      authProvider.run(done, function (runComplete) {
        expect(client.login(requestBody).data.email).toEqual("920477852@qq.com");
        runComplete();
      });
    });
  });
})();
