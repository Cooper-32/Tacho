var speedDisplay = document.getElementById("speed");

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    function(position) {
      var speed = position.coords.speed;
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      if (speed !== null) {
        var kmh = (speed * 3.6).toFixed(1);
        speedDisplay.textContent = kmh + " km/h";
      } else {
        speedDisplay.textContent = "Geschwindigkeit nicht verfügbar (Lat: " + lat.toFixed(5) + ", Lon: " + lon.toFixed(5) + ")";
      }
    },
    function(error) {
      speedDisplay.textContent = "Fehler beim Standortzugriff: " + error.message;
    },
    {
      enableHighAccuracy: true
    }
  );
} else {
  speedDisplay.textContent = "GPS wird nicht unterstützt";
}