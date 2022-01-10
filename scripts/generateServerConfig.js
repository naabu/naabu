
import * as fs from 'fs';

let environment = "development";

if (process.env.environment) {
  environment = process.env.environment;
}

// config-algolia.js
// config-firebase.js

let algoliaConfigFile = fs.readFileSync('/var/www/config/config-algolia.js', 'utf8' , (err, data) => {
  if (err) {
    console.error(err);
    return
  }
  console.log(data);
  return data;
});
console.log(algoliaConfigFile);

if (process.env.algoliaApp) {
  let algoliaApp = process.env.algoliaApp;

  let algoliaApiKey;
  if (process.env.algoliaApiKey) {
    algoliaApiKey = process.env.algoliaApiKey;
  }
  else {
    algoliaApiKey = fs.readFileSync('/run/secrets/algolia-private-api-key', 'utf8' , (err, data) => {
      if (err) {
        console.error(err);
        return
      }
      return data;
    });
  }

  let objectToJson = {
    algolia: {
      app: algoliaApp,
      key: algoliaApiKey
    },
    app: {
      environment: environment
    }
  }

  let json = JSON.stringify(objectToJson, null, 2);
  fs.writeFileSync("/var/www/functions/.runtimeconfig.json", json);

}
else {
  console.error("algoliaApp environment variable is not defined");
}

