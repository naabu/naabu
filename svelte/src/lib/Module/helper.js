import { getMapSaveData } from "$lib/Map/helper.js";

export function formatMapObject(module, keepMap = false, formatPoints = true, moduleMap = true) {
  let saveData = {
    moduleName: module.moduleName,
    moduleDescription: module.moduleDescription,
    moduleSvg: module.moduleSvg,
  }

  let map;
  let processMap = false;
  if (moduleMap) {
    if (module.map) {
      map = module.map;
      processMap = true;
    }
  }
  else if (module.mapId) {
    map = module;
    processMap = true;
  }

  if (processMap) {
    let mapData = getMapSaveData(map, formatPoints)
    mapData.mapId = map.mapId;
    saveData = { ...saveData, ...mapData };
    if (keepMap) {
      saveData.map = module.map;
    }
  }
  console.log(saveData);

  return saveData;
}

export function getModuleSaveData(module) {
  return formatMapObject(module);
}

export async function retrieveMapsListFB(db, authorId) {
  let ref = db.collection("modules").where("authorId", "==", authorId).orderBy("modifiedAt", "desc");
  let snapshot = await ref.get();
  let modules = [];
  snapshot.forEach(doc => {
    let module = doc.data();
    module.id = doc.id;
    modules.push(module);
  });
  return modules;
}
