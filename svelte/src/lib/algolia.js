import algoliasearch from 'algoliasearch';

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
  return algoliasearch(
    '6868GHOPYM',
    '91b10504939fb851e4fab041ddd92618'
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




