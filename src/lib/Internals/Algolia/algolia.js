import algoliasearch from 'algoliasearch';
import { algoliaConfig } from "$lib/Internals/Algolia/config";

function getIndex(suffix, environment) {
  let index = suffix;
  if (environment === 'development') {
    index = "dev_" + suffix;
  }
  else if (environment === 'cypress' || environment === 'test') {
    index = "cypress_" + suffix;
  }
  else if (environment === 'acceptance') {
    index = "acc_" + suffix;
  }
  else if (environment === 'production') {
    index = "prod_" + suffix;
  }
  return index;
}

export function getAlgoliaSearchClient() {
  console.log(algoliaConfig);
  return algoliasearch(
    algoliaConfig.applicationID,
    algoliaConfig.searchOnlyApiKey
  );
}

export function getGoalIndex(environment = 'development') {
  return getIndex("goals", environment);
}

export function getActivityIndex(environment = 'development') {
  return getIndex("activities", environment);
}

export function getMapIndex(environment = 'development') {
  return getIndex("maps", environment);
}




