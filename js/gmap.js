var mapLocation = new google.maps.LatLng(46.200, -72.4310); //change coordinates here
var marker;
var map;

function initialize() {
    var mapOptions = {
        zoom: 12, // Change zoom here
        center: mapLocation,
        scrollwheel: false,
        styles: [
            {"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},
            {"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},
            {"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
            {"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},
            {"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
            {"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
            {"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
            {"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
            {"featureType":"water","elementType":"all","stylers":[{"color":"#dbdbdb"},{"visibility":"on"}]}]
    };
    
    map = new google.maps.Map(document.getElementById('map'),
    mapOptions);
    
    
    //change address details here
    var contentString = '<div class="map-info">' 
    + '<div class="map-title">' 
    + '<h3><img alt="" width="140" src="img/brand.png"></h3></div>' 
    + '<p class="map-address"><div class="map-address-row"><i class="fa fa-map-marker"></i><span class="text"><strong>St. Kutuzova</strong><br>Krasnodar, Russian Federation</span></div><div class="map-address-row"><i class="fa fa-phone"></i><span class="text">345 678 91 23</span></div><div class="map-address-row"><span class="map-email"><i class="fa fa-envelope"></i><span class="text">vanessamail@mail.com</span></span></p>' 
    + '<p class="gmap-open"><a href="https://www.google.com/maps/place/851+6th+Ave,+New+York,+NY+10001,+USA/data=!4m2!3m1!1s0x89c259af44f80211:0xbd87d30d3c7da9d2?sa=X&amp;ei=KqAdVazxJMTkuQS9sIGIBQ&amp;aved=0CB0Q8gEwAA" target="_blank">Open on Google Maps</a></p></div>';
    
    
    var infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        title: 'Felix', //change title here
        animation: google.maps.Animation.DROP,
        position: mapLocation
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });



}

if ($('#map').length) {
    google.maps.event.addDomListener(window, 'load', initialize);
}

