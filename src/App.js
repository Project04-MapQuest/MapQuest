import { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayMap from './component/DisplayMap';
import BaseLocationHead from './component/BaseLocationHead';

function App() {
    const [lat, setLat] = useState(43.799)
    const [lng, setLng] = useState(-79.654)
    const [userInput, setUserInput] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

useEffect(() => {
    axios({
        url: "http://www.mapquestapi.com/search/v2/radius",
        dataResponse: "json",
        method: "GET",
        params: {
            key: "AJEFdd4JGrnslno6l848Ejs3b6WAMJjq",
            origin: searchTerm
        }
    }).then((res) => {
        console.log(res.data.origin.latLng)
        console.log(searchTerm)
        const { lat, lng } = res.data.origin.latLng
        setLat(lat);
        setLng(lng);

        // 
        // const latLng = window.L.latLng({lat,lng});
        // console.log(latLng)
        // 
        console.log(lat);
        console.log(lng);

    })

}, [searchTerm])

const handleFormSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(userInput);
}


  return (
        <section>
            <BaseLocationHead 
            userInput={userInput}
            setUserInput={setUserInput}
            handleFormSubmit={handleFormSubmit} 
            />

            <DisplayMap
            height='100vh'
            width='100%'
            center={[lat, lng]}
            tileLayer={'map'}
            zoom={13}
            apiKey='AJEFdd4JGrnslno6l848Ejs3b6WAMJjq'
            />
            
        </section>
  );
}
export default App;
