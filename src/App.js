import { useEffect, useState } from 'react';
import './App.css';
import cloud from "./assets/cloud.png"
import mist from "./assets/cloud.png"

import { FaLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { GiPaperWindmill } from "react-icons/gi";
import { Simulate } from 'react-dom/test-utils';
const key = "a8148c0443f82a668db36ac2ad781c1c";
const name = "mumbai"


function App() {
  const [wind , setWind] = useState();
  const [humidity , setHumidity] = useState();
  const [celsius , setCelsius] = useState()
  const [smoke , setSmoke] = useState()
  const [add , setAdd] = useState("");
  const [rish, setRish] = useState("mumbai")
  const [found , setFound] = useState(true)
  const [ icon , setIcon] = useState()
  

  function City(item){
    setRish(item)

  }

  useEffect(function() {
    async function Weather(){
      setFound(true)
 
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${rish}&appid=${key}`);
      const data = res.json();
      console.log(data)

      


      data.then(result => {
        setSmoke(result.weather[0].description)
        setHumidity(result.main.humidity);
        setCelsius(Math.round(result.main.temp - 273.15))
        
        setWind(result.wind.speed);
        setIcon(result.weather[0].icon)
        
     }).catch(error => {
       console.log("not found" , error)
       setFound(false)
       
    });
      

    }
    Weather()

  } , [rish])
  return (
    <div className="App">
      <div className='container'>
        <Search City={City} setAdd={setAdd} add={add}/>
        <Cloud celsius={celsius} smoke={smoke} found={found} icon={icon}/>
        <Footer wind={wind} humidity={humidity}/>
      </div>
    </div>
  );
}
function Cloud({celsius , smoke , found , icon}){


  
  
  return <div className='cloud'>
    {found ?  <> <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt='cloud'/>
    <span className='c'>{celsius}<sup>°c</sup> </span>
    <span className='cl'>{smoke}</span></> : <span className='notfound'>not found</span> }
   
  
  </div>
}

function Search({City , setAdd , add }){
  return <div className='search'>
    <FaLocationDot size={32}/>
    <input placeholder='Mumbai'  onChange={(e)=>setAdd(e.target.value)}/>
    <button size={32} onClick={()=>City(add)}>Search</button>

  </div>
}
function Footer({wind , humidity}){
  return <footer className='footer'>
    <div className='humidity'>
      <WiHumidity size={50}/>
      <div className='f'>
        <span>{humidity}%</span>
        <span>Humidity</span>
      </div>
    </div>
    <div className='windspeed'>
      <GiPaperWindmill size={35}/>
      <div className='f'>
        <span>{wind}Km/h</span>
        <span>WindSpeed</span>
      </div>
    </div>
  </footer>
}
export default App;

