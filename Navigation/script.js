let map, directionsRenderer, directionsService, autocompleteStart, autocompleteEnd;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 13.5917, lng: 121.1527 }, // Coordinates for Sienna College Taytay
        zoom: 15
    });

    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true // Suppress default markers for route directions
    });

    directionsService = new google.maps.DirectionsService();

    // Initialize the Places Autocomplete for start location
    autocompleteStart = new google.maps.places.Autocomplete(document.getElementById('start'));
    autocompleteStart.setFields(['place_id', 'geometry', 'formatted_address']);

    // Initialize the Places Autocomplete for end location
    autocompleteEnd = new google.maps.places.Autocomplete(document.getElementById('end'));
    autocompleteEnd.setFields(['place_id', 'geometry', 'formatted_address']);
}

function calculateAndDisplayRoute() {
    const start = autocompleteStart.getPlace();
    const end = autocompleteEnd.getPlace();

    if (start && end) {
        const request = {
            origin: start.geometry.location,
            destination: end.geometry.location,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
            } else {
                alert('Could not find directions: ' + status);
            }
        });
    } else {
        alert('Please enter both start and end locations.');
    }
}

// Initialize the map when the window loads
google.maps.event.addDomListener(window, 'load', initMap);


directionsService = new google.maps.DirectionsService();

// Initialize the Places Autocomplete for start location
autocompleteStart = new google.maps.places.Autocomplete(document.getElementById('start'), { types: ['geocode'] });
autocompleteStart.setFields(['place_id', 'geometry', 'formatted_address']);

// Initialize the Places Autocomplete for end location
autocompleteEnd = new google.maps.places.Autocomplete(document.getElementById('end'), { types: ['geocode'] });
autocompleteEnd.setFields(['place_id', 'geometry', 'formatted_address']);
