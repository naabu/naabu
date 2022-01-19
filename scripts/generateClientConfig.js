
import * as fs from 'fs';
let environment = "development";

if (process.env.environment) {
  environment = process.env.environment;
}

let algoliaConfigFile = fs.readFileSync('/var/www/config/config-algolia.js', 'utf8');
let firebaseConfigFile = fs.readFileSync('/var/www/config/config-firebase.js', 'utf8');

let projectIdRegex = new RegExp("projectId:\\s*[\"'](.*)[\"']", "g");
let match = projectIdRegex.exec(firebaseConfigFile);
let projectId = match[1];
let firebaseRCFileObject = {
  projects: {
    default: projectId
  }
}

let jsonFirebaseRCFile = JSON.stringify(firebaseRCFileObject, null, 2);

firebaseConfigFile = "export " + firebaseConfigFile;
algoliaConfigFile = "export " + algoliaConfigFile;

fs.writeFile('/var/www/src/lib/Internals/Firebase/config.js', firebaseConfigFile, (err) => {
  // throws an error, you could also catch it here
  if (err) throw err;
});

fs.writeFile('/var/www/src/lib/Internals/Algolia/config.js', algoliaConfigFile, (err) => {
  // throws an error, you could also catch it here
  if (err) throw err;
});

fs.writeFile('/var/www/.firebaserc', jsonFirebaseRCFile, (err) => {
  // throws an error, you could also catch it here
  if (err) throw err;
});

