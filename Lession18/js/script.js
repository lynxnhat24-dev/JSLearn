let locationButton = document.getElementById("get-location");
let locationDiv = document.getElementById("location-details");

locationButton.addEventListener("click", () => {
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showLocation,checkError);
    }else{
        locationDiv.innerText = "This browser does not support geolocation";
    }
});

const checkError = (error) => {
    switch (error.code){
        case error.PERMISSION_DENIED:
            locationDiv.innerText = "Please allow access to location";
            break;
        case error.POSITION_UNAVAILABLE:
            locationDiv.innerText = "Location Information unavailable";
            break;
        case error.TIMEOUT:
            locationDiv.innerText = "The request to get user location timed out";
    }
}

const showLocation = async (position) => {
     let response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );

    let data = await response.json();
    locationDiv.innerText = `${data.address.city}, ${data.address.country}`;
};

