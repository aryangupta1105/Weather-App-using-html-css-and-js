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
    }
    else{
        searchForm.classList.remove("active");
    }
}