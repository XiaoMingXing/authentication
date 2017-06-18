#!/bin/bash
#use ruby 2.3.0
#bash --login
#rvm --default use 2.3.0
# start mock services
bundle exec pact-mock-service -p 9001 --pact-specification-version 2.0.0 -l log/pact.logs --pact-dir tmp/pacts

#grunt pact
#bundle exec pact-mock-service stop -p 9001
