class App{
    constructor() {
        //this.getLocation();
        this.getCoffee();
        this.lat;
        this.lng;
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
        url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a1e9614f4ea9a1201274fbb063f82e5b/${this.lat},${this.lng}?units=si`
        fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            document.querySelector("#weather").innerHTML =
                data.currently.summary;
        }).catch(err => {
            console.log(err);
        });
    }

    getCoffee() {
        let url = `https://cors-anywhere.herokuapp.com/https://coffee.alexflipnote.dev/random.json`
        fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            let weatherDiv = document.querySelector("#weather");
            weatherDiv.style.backgroundImage = "url(" + data.file + ")";
        });
    }
}

let app = new App();