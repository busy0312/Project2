console.log("load")
// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
const myMap = L.map("map", {
    center: [30.2672, -97.7431],
    zoom: 11
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 17,
    id: "mapbox.streets",
    accessToken: API_KEY
}).addTo(myMap);

function makeron(x) {
    var markers = x.filter(d => d["Coord1"] != null).map(d => {
        var coord = d["Coord1"].split(",").map(d => +d)
        var type = d['Type']
        var location = d['Found Location']
        var Id = d['Animal ID']
        return L.marker(coord, {
            draggable: false,
            title: d["Found Location"]
        }).addTo(myMap)
        .bindPopup('<b>' + Id + '</b><br>' + type + '<br>' + location)
    })
}

(async function () {
    const url = 'https://raw.githubusercontent.com/busy0312/Project2/master/pet_pals/static/Found_Location.json'
    const data = await d3.json(url);
    // var data = await d3.json("/getData");
    makeron(data)
})()



