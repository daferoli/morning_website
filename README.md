# morning_website
A website to display information I want for my morning commute

HOW TO USE:

SETTING UP THE API's

This website requires an API key from https://developer.forecast.io/
you also need an API key for https://developer.mapquest.com/

afterwards, create a file called strings.json and add the following:
{
    "forecastKey":"YOUR_FORECAST_IO_KEY_HERE"
    "trafficKey":"YOUR_MAPQUEST_KEY_HERE"
}

This will allow the app to use your developer account keys.

STARTING THE APP:

prerequisites: must have node/npm installed

1. run "npm install" on the root folder that contains package.json

2. run "node index.js" from the root folder

3. In your browser, go to localhost:8081 to see the page!
