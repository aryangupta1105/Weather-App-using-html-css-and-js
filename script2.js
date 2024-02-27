const api_key = "72a9695b76539a67310f87d0a6681a75";
const api = "https://api.openweathermap.org/data/3.0/onecall";

console.log(api_key);
console.log(api);


async function showWeather()
{
    try{
        let latitude = 15.4423;
        let longitude = 74.8833;
        city = "indore"
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
        );
        const data = await response.json();
        RenderDataUI(data);
    }
    catch(er){

    }
}

function RenderDataUI(data)
{
    let newPara = document.createElement('p');
    newPara.textContent = `${data?.main?.temp.toFixed(2)} C `;
    document.body.appendChild(newPara);
}

async function GetOwnWeather(latitude , longitude){
    const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}
    `); 
    const resultData = await result.json();
    console.log(resultData)
    RenderDataUI(resultData);
}

function switchTab(clickOnTab)
{

}

function getLocation()
{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("No geolocation support!")
    }
}

function showPosition(position)
{
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    console.log(lat + "\n" + lng);
    GetOwnWeather(lat , lng);
} 
getLocation();