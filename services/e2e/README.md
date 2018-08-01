# E2E Testing
This folder contains the E2E (End to End) testing structure.

This project is based on the following OpenSource projects:
* https://github.com/epiclabs-io/docker-cucumber-protractor-chrome per the Apache 2.0 License.
* https://github.com/igniteram/protractor-cucumber-typescript per the MIT License.

## Structure
This section is broken out into:
* General nfrastructure (/infrastructure)
* The test runner configuration (/lib)
* The actual test code (/tests)

We'll copy source code into the packaged up docker container to move the tests and configuration into their appropriate places, but this structure allows for segmenting out configuration changes from the details of the tests to be run. 