window.addEventListener('load', ()=> {
    //alert('Hello!');
    let lat = 59.43696;
    let long = 24.75353;

    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.degree-section');
    let temperatureSectionSpan = document.querySelector('.degree-section span');

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl= `${proxyUrl}https://api.darksky.net/forecast/8fb1977f500778b842cf655c54a95b9a/${lat},${long}`;
    console.log(apiUrl);

    fetch(apiUrl)
    .then(Response => {
        return Response.json();
    })
    .then(data => {
        console.log(data);
        const {temperature, summary, icon} = data.currently;
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;

        let celsius = (temperature-32)*(5/9);

        setIcons(icon, document.querySelector('.icon'));

        temperatureSection.addEventListener('click', () => {
            if(temperatureSectionSpan.textContent === 'F'){
                temperatureSectionSpan.textContent = 'C';
                temperatureDegree.textContent  = Math.round(celsius);
            } else{
                temperatureSectionSpan.textContent = 'F';
                temperatureDegree.textContent = temperature;

            }
        });
    });

    //Get user's geolocation
    /*if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log('Long',long);
            console.log('lat',lat);
        });
    }*/

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});