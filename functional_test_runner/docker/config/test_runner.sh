#!/bin/bash

cd /tests

echo "... [CEP] - Confirming Directory"
pwd

echo "... [CEP] - Confirming Package"
cat package.json

# Compile the ts files and transcript to js files
echo "...... [CEP] - Clean and Build the tests"
npm run clean-build

echo "...... [CEP] - Ensure Webdriver-Manager is up to date"
npm run webdriver-update

echo "......... [CEP] - Set the display size"
# Make a new display :21 with virtual screen 0 with resolution 1024x768 24dpi
Xvfb :10 -screen 0 1920x1080x24 2>&1 >/dev/null &

echo "...... [CEP] - Start the Webdriver-Manager"
npm run webdriver-start &

echo "...... [CEP] - Finished starting Webdriver"
sleep 10

echo "... [CEP] - Run the Tests"
DISPLAY=:10 $NODE_PATH/protractor/bin/protractor /tests/typeScript/config/config.js

export RESULT=$?

echo "... [CEP] - Tests Completed"
# Close the XVFB display
pkill Xvfb

# Remove temporary folders
rm -rf .config .local .pki .cache .dbus .gconf .mozilla
# Set the file access permissions (read, write and access) recursively for the result folders
chmod -Rf 777 allure-results test-results

exit $RESULT
