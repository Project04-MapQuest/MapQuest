import { useEffect } from 'react';
import "../App.css"


const DisplayMap = ({ height, width, center, tileLayer, zoom, apiKey }) => {
    useEffect(() => {
        window.L.mapquest.key = apiKey
        const map = window.L.mapquest.map('map', {
            center,
            layers: window.L.mapquest.tileLayer(tileLayer),
            zoom
        })
        map.addControl(window.L.mapquest.control())

	// 	const directions = window.L.mapquest.directions()
	// 	directions.setLayerOptions({
	// 	startMarker: {
	// 	  icon: 'circle',
	// 	  iconOptions: {
	// 		size: 'sm',
	// 		primaryColor: '#1fc715',
	// 		secondaryColor: '#1fc715',
	// 		symbol: 'A'
	// 	  }
	// 	},
	// 	endMarker: {
	// 	  icon: 'circle',
	// 	  iconOptions: {
	// 		size: 'sm',
	// 		primaryColor: '#e9304f',
	// 		secondaryColor: '#e9304f',
	// 		symbol: 'B'
	// 	  }
	// 	},
	// 	routeRibbon: {
	// 	  color: "#2aa6ce",
	// 	  opacity: 1.0,
	// 	  showTraffic: false
	// 	}
	//   }).directions.add(map)
	
	//   directions.route({
	// 	start: '46 Captain Hall Court, Scarborough, ON',
	// 	end: '300 Borough Dr, Scarborough, ON'
	//   });
    },[])
    return (
        <div id='map' style={{ width, height }}>
            <p>Loading...</p>
        </div>
    )
}
export default DisplayMap;