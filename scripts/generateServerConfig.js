
import * as fs from 'fs';
import("./generateClientConfig.js");

let algoliaConfigFile = fs.readFileSync('/var/www/config/config-algolia.js', 'utf8');
let applicationIDRegex = new RegExp("applicationID:\\s*[\"'](.*)[\"']", "g");
let match = applicationIDRegex.exec(algoliaConfigFile);
let applicationID = match[1];

let environment = "development";

if (process.env.environment) {
  environment = process.env.environment;
}

let algoliaApiKey = "";
let secretPath = '/run/secrets/algolia-private-api-key';
let configPath = '/var/www/config/algolia-secret-admin-api-key.txt';

if (fs.existsSync(secretPath)) {
  algoliaApiKey = fs.readFileSync(secretPath, 'utf8');
}
else if (fs.existsSync(configPath)) {
  algoliaApiKey = fs.readFileSync(configPath, 'utf8');
}

let objectToJson = {
  algolia: {
    app: applicationID,
    key: algoliaApiKey
  },
  app: {
    environment: environment
  }
}

let json = JSON.stringify(objectToJson, null, 2);
fs.writeFileSync("/var/www/functions/.runtimeconfig.json", json);
