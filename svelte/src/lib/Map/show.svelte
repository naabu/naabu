<script>
  import "leaflet/dist/leaflet.css";
 import { goto } from '$app/navigation';
  export let map;
  export let userMap;
  import { onMount } from "svelte";

  $: {
  }

  let leafletMap;
  let bounds;
  let image;
  let L;

  onMount(async () => {
    const l = await import("leaflet");
    L = l.default;
    bounds = [
      [0, 0],
      [963, 1286],
    ];
    leafletMap = L.map("map", {
      crs: L.CRS.Simple,
      maxZoom: 2,
    });

    image = L.imageOverlay(map.image, bounds).addTo(leafletMap);
    leafletMap.fitBounds(bounds);
    var southWest = L.latLng(0, 0),
      northEast = L.latLng(963, 1286);
    var bounds = L.latLngBounds(southWest, northEast);

    leafletMap.setMaxBounds(bounds);

    leafletMap.on("drag", function () {
      leafletMap.panInsideBounds(bounds, { animate: false });
    });

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
      if (userMap && userMap.unlockedLocations.includes(location.id)) {
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
      });
      tooltip3.setLatLng([textLocationY, textLocationX]);
      tooltip3.setContent(location.name);

        // tooltip3.on("click" , function () {
        //   console.log("Tooltip clicked");
        // });
    
      tooltip3.addTo(leafletMap);
      if (unlockedLocation) {
        let el = tooltip3.getElement();
          el.addEventListener('click', function() {
            goto('/kaart/' + map.id + '/locatie/' + location.id);
          });
        el.style.pointerEvents = 'auto';
        el.style.cursor = 'pointer';
      }

      let icon = L.icon({
        iconUrl: "/map-icon1.svg",
        iconAnchor: [12, 12],
      });

      if (unlockedLocation) {
        icon = L.icon({
          iconUrl: "/map-icon1-unlocked.svg",
          iconAnchor: [12, 12],
        });
        let marker = L.marker([marketLocationY, markerLocationX], {
          icon: icon,
        });
        marker.on("click", function () {
          goto('/kaart/' + map.id + '/locatie/' + location.id);
        });

        marker.addTo(leafletMap);
      } else {
        L.marker([marketLocationY, markerLocationX], {
          icon: icon,
        }).addTo(leafletMap);
      }
    }

    for (let i = 0; i < map.paths.length; i++) {
      let path = map.paths[i];
      if (userMap && userMap.unlockedLocations.includes(path.endLocation)) {
        path.points = JSON.parse(path.points);
        let polyline = L.polyline(path.points, {
          color: "#EB7B02",
          dashArray: "7 12",
          weight: 5,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(leafletMap);
      }
    }
  });
</script>

<div id="map" />

<style>
  #map {
    width: 1286px;
    height: 963px;
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
