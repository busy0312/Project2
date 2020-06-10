const myMap = L.map("map", {
  center: [30.2672, -97.7431],
  zoom: 13
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


// var found_locationUrl = "Found_Location.json";
// ​
// const map = L.map("map", {
//     center: [30.2672, -97.7431],
//     zoom: 13
//   }); 
// ​
// ​
// L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
// }).addTo(myMap);

// (async function(){
//   url='https://raw.githubusercontent.com/busy0312/Project2/master/Found_Location.json'
//   data = await d3.json(url);
//   markers = data.filter(d => d["Coord1"]!=null).map(d => {
//       console.log(d["Coord1"])
//       var coord = d["Coord1"].split(",").map(d => +d)
//       return  L.marker(coord, {
//           draggable: false,
//           title: d["Found Location"]
//       }).addTo(myMap);
//   })
// }
// )()



// ​
// d3.json(found_locationUrl), function(data) {
//     response = data.features;
  
//     var heatArray = [];
  
//     for (var i = 0; i < response.length; i++) {
//       var location = response[i].geometry;
//         console.log(location);
  
//       if (location) {
//         heatArray.push([location.Coord1[1], location.Coord1[0]]);
//       }
//     }
  
//     var heat = L.heatLayer(heatArray, {
//       radius: 25,
//       maxZoom: 12,
//       minOpacity: 0.5,
//       radius: 10,
//       max: 1,
//       blur: 10,
//       gradient: {
//           0: "#000000",
//           0.2: "#570000",
//           0.4: "#ff0000",
//           0.6: "#ffc800",
//           0.8: "#ffff00",
//           "1.0": "#FFFFFF" , // note the string of the key
//       }
//   }).addTo(map)
// }