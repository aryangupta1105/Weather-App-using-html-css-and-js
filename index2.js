const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const searchForm = document.querySelector("[data-searchForm]");
const grantAccessButton = document.querySelector("[data-AccessBtn]")

const grantAccessContainer = document.querySelector(".grant-location");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".display-container");
const errorPage = document.querySelector(".error-page");

console.log(userTab)
console.log(searchTab)
console.log(searchForm)
console.log(userInfoContainer)
console.log(userContainer)
console.log(grantAccessContainer)
console.log(loadingScreen)
// The preusable Variables

let oldTab = userTab;
const api_key = "72a9695b76539a67310f87d0a6681a75";

oldTab.classList.add("current-tab");
getfromSessionStorage();
// Adding event listeners to the tabs for switching them


function switchTab(newTab)
{ 
    if(newTab != oldTab)
    {
        oldTab.classList.remove("current-tab");
        oldTab = newTab
        oldTab.classList.add("current-tab");
        
        // To know what tab we are on we will check the tab: using the active class:
        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            
            grantAccessContainer.classList.remove("active");                        
            searchForm.classList.add("active");
        }
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // Now we are in the main container so we need to check the local storage first or we need access:
            getfromSessionStorage();
            
        }
    }
}
userTab.addEventListener("click" , ()=>
{
    switchTab(userTab);
});
// We will create the switch tab function later:

searchTab.addEventListener("click" , ()=>
{
    switchTab(searchTab);
});



// It checks if coordinates are already in session storage:
function getfromSessionStorage()
{
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        grantAccessContainer.classList.add("active");
    }
    else{
        // Here we are checking if local coordinates means the user location is not in the local storage then fetching them and the user infor...
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}


// now fucntion fetchuserinfo fetches the user data"
async function fetchUserWeatherInfo(coordinates)
{
    const {lat, lon} = coordinates;
// To show the loader we need to disappear the grantAcess container first then 
    grantAccessContainer.classList.remove("active");  
// Now we need to display the loader:   
    loadingScreen.classList.add("active");

// API CALL: Now we will fetch the infor using the api call :
try{
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}
    `); 
    const resultData = await result.json(); 
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");
    errorPage.classList.remove("active");
    console.log(resultData);
    // Now we need to render weather info to the Ui:
    RenderDataUI(resultData);
}

catch(er){
    loadingScreen.classList.remove("active");
    errorPage.classList.add("active");
    userInfoContainer.classList.remove("active");
}
}



// The question mark in the optional chaining operator:

function RenderDataUI(weatherInfo){
    const cityName = document.querySelector("[ data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]")
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const weatherTemp = document.querySelector("[data-temp");
    const windspeed = document.querySelector("[data-windspeed]")
    const humidity = document.querySelector("[data-humidity]")
    
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`
    desc.innerText = weatherInfo?.weather[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    // console.log(clouds.innerText);
    weatherTemp.innerText  = `${weatherInfo?.main?.temp} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    const clouds = document.querySelector("[data-Cloud]");
    clouds.innerText = `${weatherInfo?.clouds?.all}%`;
}

// We know that after clicking on the grant access it fetches coordinates of the user: so adding event listeners
grantAccessButton.addEventListener("click" , getLocation);

function getLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("No GeoLocation support!")
    }
}

function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
   
    console.log(userCoordinates);
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);

}








// The search tab functionality : code:

const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let cityName = searchInput.value;
    console.log(cityName);
    if(cityName === "") return; 
    else{
fetchSearchWeatherInfo(cityName);
    }
})


async function fetchSearchWeatherInfo(city){

    console.log(city);
loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try {
        const response = await fetch(      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
          );
       const data = await response.json();
        
       console.log(data);
    loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        errorPage.classList.remove("active");
        RenderDataUI(data);

    }
    catch(err){
        errorPage.classList.add("active");
        userInfoContainer.classList.remove("active");
    }
}

