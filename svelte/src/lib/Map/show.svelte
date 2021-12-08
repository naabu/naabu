<script>
  import { browser } from "$app/env";
  import { goto } from "$app/navigation";
  export let map;
  export let userMap;
  import { onMount } from "svelte";
  import { getStores, session } from "$app/stores";

  let leafletMap;
  let bounds;
  let image;
  let L;
  let mounted = false;
  export let isModule = false;

  $: if (userMap && mounted) {
    putLocationDataOnmap();
  }

  function goToLocation(location) {
    if (isModule) {
      goto("/module/" + map.id + "/locatie/" + location.id);
    } else {
      goto("/kaart/" + map.id + "/locatie/" + location.id);
    }
  }

  onMount(async () => {
    if (browser) {
      const l = await import("leaflet");
      // const lcss = await import("leaflet/dist/leaflet.css");
      L = l.default;
      bounds = [
        [0, 0],
        [963, 1286],
      ];
      var southWest = L.latLng(0, 0),
        northEast = L.latLng(963, 1286);
      var maxBounds = L.latLngBounds(southWest, northEast);
      leafletMap = L.map("map", {
        crs: L.CRS.Simple,
        maxZoom: 2,
        doubleClickZoom: false,
        maxBounds: maxBounds,
      });
      leafletMap.fitBounds(bounds);

      leafletMap.on("drag", function () {
        leafletMap.panInsideBounds(bounds, { animate: false });
      });
      image = await L.imageOverlay(map.image, bounds)
        // .on("load", putLocationDataOnmap)
        .addTo(leafletMap);
    }
    mounted = true;
  });

  function putLocationDataOnmap() {
    if ($session.player) {
      let tooltip = L.tooltip({
        direction: "center",
        permanent: true,
        interactive: true,
        noWrap: true,
        opacity: 1,
      });
      tooltip.setLatLng([870, 140]);
      tooltip.setContent(map.title);
      tooltip.addTo(leafletMap);

      for (let i = 0; i < map.locations.length; i++) {
        let location = map.locations[i];
        let unlockedLocation = false;
        if (
          $session.player &&
          userMap &&
          userMap.unlockedLocations.includes(location.id)
        ) {
          unlockedLocation = true;
        }
        let textLocationX = location.textPositionX;
        let textLocationY = location.textPositionY;
        let markerLocationX = location.markerPositionX;
        let marketLocationY = location.markerPositionY;

        let tooltip3 = L.tooltip({
          direction: "center",
          permanent: true,
          interactive: true,
          noWrap: true,
          opacity: 1,
        })
          .setLatLng([textLocationY, textLocationX])
          .setContent(location.name);

        tooltip3.addTo(leafletMap);

        if (unlockedLocation) {
          let el = tooltip3.getElement();
          el.addEventListener("click", function () {
            goToLocation(location);
          });
          el.style.pointerEvents = "auto";
          el.style.cursor = "pointer";
        }

        let icon = L.icon({
          iconUrl: "/map-icon1.svg",
          iconAnchor: [12, 12],
        });

        for (let i2 = 0; i2 < map.paths.length; i2++) {
          let path = map.paths[i2];
          if (userMap && userMap.unlockedLocations.includes(path.endLocation)) {
            console.log(path.points);
            // let parsedPoints = JSON.parse(path.points);
            let parsedPoints = path.points;
            let polyline = L.polyline(parsedPoints, {
              color: "#EB7B02",
              dashArray: "7 12",
              weight: 5,
              lineCap: "round",
              lineJoin: "round",
            })
              .addTo(leafletMap)
              .bringToBack();
          }
        }

        if (unlockedLocation) {
          icon = L.icon({
            iconUrl: "/map-icon1-unlocked.svg",
            // iconAnchor: [12, 12],
            iconSize: [36, 36],
          });
          let outerCircle = L.circle([marketLocationY, markerLocationX], 18, {
            color: "#707070",
            weight: 1,
            opacity: 1,
            fillColor: "#9ECBFF",
            fillOpacity: 1,
            className: "unlocked_marker_" + i,
          });
          let innerCircle = L.circle([marketLocationY, markerLocationX], 5, {
            color: "#707070",
            weight: 1,
            opacity: 1,
            fillColor: "#7D92FF",
            fillOpacity: 1,
          });
          outerCircle.on("click", function () {
            goToLocation(location);
          });

          innerCircle.on("click", function () {
            goToLocation(location);
          });

          outerCircle.addTo(leafletMap);
          innerCircle.addTo(leafletMap);
          // outerCircle._icon.classList.add("className");
        } else {
          let outerCircle = L.circle([marketLocationY, markerLocationX], 18, {
            color: "#707070",
            weight: 1,
            opacity: 1,
            // fillColor: "#ABF6B2",
            fillColor: "#4A495E",
            fillOpacity: 1,
            className: "locked_marker_" + i,
          });
          let innerCircle = L.circle([marketLocationY, markerLocationX], 5, {
            color: "#707070",
            weight: 1,
            opacity: 1,
            // fillColor: "#25AF2E",
            fillColor: "#1C1D1A",
            fillOpacity: 1,
          });
          outerCircle.addTo(leafletMap);
          innerCircle.addTo(leafletMap);
          let el = outerCircle.getElement();
          el.style.pointerEvents = "auto";
          el.style.cursor = "grab";
          el = innerCircle.getElement();
          el.style.pointerEvents = "auto";
          el.style.cursor = "grab";
        }
      }
    }
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""
  />
  <script
    src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
</svelte:head>

<div id="map" />

<style>
  #map {
    width: 100%;
    padding-top: 70%;
    position: relative;
    top: 0;
  }

  .map {
    position: relative;
  }

  .map img {
    position: absolute;
    z-index: -1;
  }

  #title-image {
    position: absolute;
    margin-top: 5%;
    margin-left: 8%;
    color: #b48456;
    /* border: 1px solid black; */
    text-shadow: 0 0 3px black, 0 0 5px grey;
    font-size: 24px;
  }
</style>
