mapboxgl.accessToken = 'pk.eyJ1IjoibG1hbmNoaWsiLCJhIjoiY2pvdGl1cW9zMTFyeDNxbmg5MGFnam53aiJ9.9VK_ROK_ae2DQcXntmWjWQ'; 

var geojson = {
type: 'FeatureCollection',
features: [{
    type: 'Feature',
    geometry: {
    type: 'Point',
    coordinates: [ -82.343272, 29.649086]
    },
    properties: {
    title: 'Mapbox',
    description: 'Century Tower'
    }
},
{
    type: 'Feature',
    geometry: {
    type: 'Point',
    coordinates: [-82.347936, 29.646815]
    },
    properties: {
    title: 'Mapbox',
    description: 'Reitz Union'
    }
},
{
    type: 'Feature',
    geometry: {
    type: 'Point',
    coordinates: [-82.345553, 29.648422]
    },
    properties: {
    title: 'Mapbox',
    description: 'The Hub'
    }
},
{
    type: 'Feature',
    geometry: {
    type: 'Point',
    coordinates: [-82.342879, 29.651775]
    },
    properties: {
    title: 'Mapbox',
    description: 'Library West'
    }
},
{
    type: 'Feature',
    geometry: {
    type: 'Point',
    coordinates: [-82.368337, 29.638665]
    },
    properties: {
    title: 'Mapbox',
    description: 'Southwest Rec'
    }
}]
};

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/lmanchik/cjotivsc886s12spgiwk56899',
center: [-82.341,29.644],
zoom: 12
});

geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';           

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 20 }) // add popups
    .setHTML('<p>' + marker.properties.description + '</p>'))
    .addTo(map);

    console.log('added');
});

// zooms into century tower location when picked from dropdown
// document.getElementById('ct').addEventListener('click', function () {
//     map.flyTo({
//         center: [ -82.343272, 29.649086],
//         zoom: 18
//     });
// });

//  //zooms into reitz location when picked from dropdown  
// document.getElementById('ru').addEventListener('click', function () {
//     map.flyTo({
//         center: [-82.347936, 29.646815],
//         zoom: 18
//     });
// });

// //zooms into the hub location when picked from dropdown
// document.getElementById('hub').addEventListener('click', function () {
//     map.flyTo({
//         center: [-82.345553, 29.648422],
//         zoom: 18
//     });
// });

// //zooms into lib west location when picked from dropdown
// document.getElementById('lw').addEventListener('click', function () {
//     map.flyTo({
//         center: [-82.342879, 29.651775],
//         zoom: 18
//     });
// });

// //zooms into southwest rec location when picked from dropdown
// document.getElementById('sw').addEventListener('click', function () {
//     map.flyTo({
//         center: [-82.368337, 29.638665],
//         zoom: 18
//     });
// });