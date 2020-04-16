// Title: Weather Application from Dev Ed youtube tutorial
// Author:  Nzde
// Created: 17th April 2020
window.addEventListener('load', ()=>{
    let long;
    let lat;
    let long2;
    let lat2;
    let temperatureDescription =  document.querySelector('.temperature-description');
    let temperatureDegree =  document.querySelector('.temperature-degree');
    let locationTimezone =  document.querySelector('.location-timezone');
    let temperatureSection =  document.querySelector('.temperature');
    let temperatureSpan =  document.querySelector('.temperature span'); 

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(postion => {
            long2 = postion.coords.longitude;
            lat2 = postion.coords.latitude;
            lat = '-43.5321';
            long = '172.6362';
            const key = '';
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}`;


            fetch(api)
                .then(response =>{
                    return response.json();
            })
            .then (data =>{
                const {temperature, summary,icon} = data.currently;
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //formula for celsius 
                let celsius = (temperature - 32) * (5/9);
                //set icon
                setIcon(icon, document.querySelector('.icon'));

                //change temp from F to C
                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);

                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;

                    }
                });


            });

        });
    }
    function setIcon(icon, iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});