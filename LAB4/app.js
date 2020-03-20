class App{
    constructor() {
        this.loadWeather();
        this.lat;
        this.lng;
    }

    loadWeather() {
        let weather = JSON.parse(localStorage.getItem("weather"));
        let lastUpdated = localStorage.getItem("lastUpdated");
        //Check if there is weather data in localstorage and last update is longer then 30 minutes ago
        if (weather && lastUpdated){
            let currentTime = new Date();
            let timeDifference = (currentTime.getTime() - lastUpdated)/1000/100;
            if(timeDifference < 30){
                console.log("Weather loaded form Localstorage");
            } else {
                this.getLocation();
                console.log("Timedifference is bigger than 30, reloading weather!")
            }
        } else {
            this.getLocation();
            console.log("No weatherdata in localstorage, getting weather!")
        }
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            this.gotLocation.bind(this),
            this.errorLocation.bind(this)
        );
    }

    gotLocation(result) {
        this.lat = result.coords.latitude;
        this.lng = result.coords.longitude;
        this.getWeather();
    }

    errorLocation(err) {
        console.log(err);
    }

    getWeather() {
        let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a1e9614f4ea9a1201274fbb063f82e5b/${this.lat},${this.lng}?units=si`
        fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            localStorage.setItem("weather", JSON.stringify(data));
            let today = new Date();
            localStorage.setItem("lastUpdated", today.getTime());
            console.log("Weather and lastUpdated saved in localStorage!")
        }).catch(err => {
            console.log(err);
        });
    }
}

let app = new App();