
import * as fs from 'fs';

let environment = "development";

if (process.env.environment) {
  environment = process.env.environment;
}

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
  fs.writeFileSync("/var/www/svelte/functions/.runtimeconfig.json", json);

}
else {
  console.error("algoliaApp environment variable is not defined");
}

