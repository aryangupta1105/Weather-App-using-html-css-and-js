const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const searchForm = document.querySelector(".form-container");


const grantAccessContainer = document.querySelector(".grant-location");
const loadingScreen = document.querySelector(".loadingContainer");
const userInfoContainer = document.querySelector(".display-container");


console.log(userTab);

// The preusable Variables

let currentTab = userTab;
const api_key = "72a9695b76539a67310f87d0a6681a75";
const api = "https://api.openweathermap.org/data/3.0/onecall";

currentTab.classList.add("current-tab");

// Adding event listeners to the tabs for switching them
userTab.addEventListener("click" , ()=>
{
    switchTab(userTab);
});
// We will create the switch tab function later:

searchTab.addEventListener("click" , ()=>
{
    switchTab(searchTab);
});

function switchTab(Clicked_tab)
{ 
    if(Clicked_tab != currentTab)
    {
        currentTab.classList.remove("current-tab");
        currentTab = Clicked_tab
        currentTab.classList.add("current-tab");
    }

    // To know what tab we are on we will check the tab: using the active class:
    if(!searchForm.classList.contains("active")){
        searchForm.classList.add("active");
        userInfoContainer.classList.remove("active");
    }
    else{
        searchForm.classList.remove("active");
        userInfoContainer.classList.add("active");
        // Now we are in the main container so we need to check the local storage first or we need access:
        getfromSessionStorage();

    }
}

// It checks if coordinates are already in session storage:
function getfromSessionStorage()
{
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(localCoordinates){
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
    const{ lat , lng  }= coordinates;
// To show the loader we need to disappear the grantAcess container first then 
    grantAccessContainer.classList.remove("active");  
// Now we need to display the loader:   
    loadingScreen.classList.add("activer");

// API CALL: Now we will fetch the infor using the api call :
try{
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}
    `); 
    const resultData = await result.json(); 
    loadingScreen.classList.remove("active");
    userInfoContainer.classList.add("active");

    // Now we need to render weather info to the Ui:
    RenderDataUI(resultData);
}

catch(er){
    // homework...
}
}



// The question mark in the optional chaining operator:

function RenderDataUI(data){
    const cityName = document.querySelector("[ data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]")
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const windspeed = document.querySelector("[data-windspeed]")
    const humidity = document.querySelector("[data-humidity]")
    const clouds = document.querySelector("[data-clouds]")

    cityName.innerText = `data?.name`;
    countryIcon.src = `https://flagcon.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`

}