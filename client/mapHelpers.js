const MB_KEY = config.MB_KEY;


var mymap = L.map('mapid').setView([37.774, -122.41], 13);

L.tileLayer(`https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${MB_KEY}`, {
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: MB_KEY
}).addTo(mymap);