if (!navigator.geolocation) {
    console.log("Geolocation is not supported by this browser.");
 }
 
 navigator.geolocation.getCurrentPosition(success, error);

 function success(position) {
     console.log(position);
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
 
   console.log(latitude + " " + longitude);
   
   initMap(latitude, longitude); 
 }


 function error() {
    console.log("Geolocation is not supported by this browser.");
 }

 var map;
 function initMap(latitude, longitude) {
   map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: latitude, lng: longitude},
     zoom: 8
   });
 }