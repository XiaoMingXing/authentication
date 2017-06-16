# cost-web-ui
bash --login
rvm --default use 2.3.0
bundle exec pact-mock-service -p 9001 --pact-specification-version 2.0.0 -l log/pact.logs --pact-dir tmp/pacts
grunt pact

## cost-nodejs-service
stop mock
run services
./node_modules/.bin/babel-node pact-test/pacts.js

restart services
/cost-nodejs-services/scripts/controllers/auth

## cost-web-test
grunt e2e-local

change path of img 

node cucumber-test/features/tools/diff.js
