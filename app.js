window.addEventListener("load",function start()
    {
        console.log("loaded");

        
        const ltn = document.querySelector("#location");
        const name =document.querySelector(".name")
        const weather_description=document.querySelector(".weather_description")
        const cloud_percentage=document.querySelector(".cloud_percentage")
        const temp=document.querySelector(".temp")
        const feels_like=document.querySelector(".feels_like")
        const temp_min=document.querySelector(".temp-min")
        const temp_max=document.querySelector(".temp-max")      
        const humidity=document.querySelector(".humidity")
        const wind_speed=document.querySelector(".wind_speed")
        const icon=document.querySelector(".icon");

        
        
        const APIkey = "420d4ec67fe967a81f9e85b2f8c638e7";

        if('geolocation' in navigator)//checks if the geolocator is supported or not
        {
            console.log(" Geolocation Present");
            navigator.geolocation.getCurrentPosition(function locate(position)//the object from navigator comes as a parametric into the callback 
            {
                
                const lat=position.coords.latitude;
                const lon=position.coords.longitude;
                const URL ="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+APIkey;
                fetch(URL)
                .then(response => response.json())
                .then(json => appendData(json))//sends the json object of the browser/user agent to the appendData()  
                
                
            })
        }
        else
        console.log(" Geolocation Not Present");




        
    const form = document.querySelector("#form")//returns the form element
    form.addEventListener("submit", function eventHandler(event)
    {
        //the default event from the form element after submitting a form is to reload.
        //when the form is submitted, it does everything as required but in the end refreshes/reloades the page and removes all data
        //The callback takes that event as an input    
        event.preventDefault();//this preventDefault() takes that event and prevents the page from reloading and saves the data


        fetch(serverURL(ltn.value))
        .then(response => response.json())
        .then(json => appendData(json))
        .catch(errorHandler);//sends the json object of the searched location


        function errorHandler()
        {
            alert("The server can't recognise the location");
        }
    
        

        function serverURL(text)//constructs the url
        {

         
            var apiURL = "https://api.openweathermap.org/data/2.5/weather?q="

            return apiURL+text+"&units=metric&appid="+APIkey;
        }

    })

    
    function appendData(data)//places the required datas from the object into the HTML document
        {
            
                name.innerText = data.name;
                
               icon.setAttribute("src","http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png")//changes the icon depending upon the weather
                
                weather_description.innerText = data.weather[0].description;
               
                cloud_percentage.innerText = data.clouds.all+"%";
               
                temp.innerText = data.main.temp+"°C";
                
                feels_like.innerText = data.main.feels_like+"°C";
             
                temp_min.innerText = data.main.temp_min+"°C";
               
                temp_max.innerText = data.main.temp_max+"°C";
                
                humidity.innerText = data.main.humidity+" %";
                
                wind_speed.innerText = data.wind.speed+" m/sec";
            
        }

        

})




 