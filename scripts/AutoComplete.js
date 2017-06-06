function AutocompleteDirectionsHandler(map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'WALKING';
    var originInput = document.getElementById('origin-input');
    var destinationInput = document.getElementById('destination-input');
    var modeSelector = document.getElementById('mode-selector');
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
    this.directionsDisplay.setMap(map);

    var originAutocomplete = new google.maps.places.Autocomplete(
        originInput, {placeIdOnly: true});
    var destinationAutocomplete = new google.maps.places.Autocomplete(
        destinationInput, {placeIdOnly: true});

    this.setupClickListener('changemode-walking', 'WALKING');
    this.setupClickListener('changemode-transit', 'TRANSIT');
    this.setupClickListener('changemode-driving', 'DRIVING');

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
}


// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
    var radioButton = document.getElementById(id);
    var me = this;
    radioButton.addEventListener('click', function() {
        me.travelMode = mode;
        me.route();
    });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);
    autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
        return;
        }
        if (mode === 'ORIG') {
        me.originPlaceId = place.place_id;
        } else {
        me.destinationPlaceId = place.place_id;
        }
        me.route();
    });

};

AutocompleteDirectionsHandler.prototype.route = function() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
        return;
    }
    var me = this;

    this.directionsService.route({
        origin: {'placeId': this.originPlaceId},
        destination: {'placeId': this.destinationPlaceId},
        travelMode: this.travelMode
    }, function(response, status) {
        if (status === 'OK') {
            debugger;
            me.directionsDisplay.setDirections(response);
            var streetviews = document.getElementById("streetviews");
            response.routes.forEach(function(route) {
               route.legs.forEach(function(leg) {
                    leg.steps.forEach(function(step, index) {
                        if(index >= 0) {
                            var pos = {
                                lat: step.start_location.lat(),
                                lng: step.start_location.lng()
                            };

                            var newPanoElement = document.createElement("div");
                            newPanoElement.id = "pano" + pos.lat + pos.lng;
                            newPanoElement.setAttribute("class", "map");          
                            streetviews.appendChild(newPanoElement);

                            var newPanorama = new google.maps.StreetViewPanorama(
                                newPanoElement, {
                                    position: pos,
                                    pov: {
                                        heading: 34,
                                        pitch: 10,
                                        zoom: 1
                                    }
                                }
                            );
                        }
                    });
               });
            });

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
};

module.exports = AutocompleteDirectionsHandler;
