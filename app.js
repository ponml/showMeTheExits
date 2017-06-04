function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.277433, lng: -123.116371},
        zoom: 15
    });
}


var Decoder = require("./scripts/Decoder.js");
var AutoComplete = require("./scripts/AutoComplete.js");
var me = this;
var map;
initMap();

var url = "https://www.google.ca/maps/dir/928+Beatty+St,+Vancouver,+BC+V6Z+3G6,+Canada/chairlines/@49.270355,-123.1315508,14z/data=!4m14!4m13!1m5!1m1!1s0x5486717d7b78e701:0xc1bc02486803d017!2m2!1d-123.1156299!2d49.2758282!1m5!1m1!1s0x548671601483d7d9:0xf4bc0201986a9b44!2m2!1d-123.1100155!2d49.2646612!3e2"
me._decoder = new Decoder({url: url});
me._autoCompleter = new AutoComplete({});
me._autoCompleter.init();
me._directionService = new google.maps.DirectionsService();
var geoLocater = document
    .getElementById("autocomplete")
    .addEventListener("focus", me._autoCompleter.geolocate.bind(me._autoCompleter));






 