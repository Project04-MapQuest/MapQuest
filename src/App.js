import { useState } from 'react';
import DisplayMap from './components/DisplayMap.js';
import BaseLocation from './components/BaseLocation.js';
import Search from './components/Search.js'
// import Direction from './Direction.js'
// import DirectionLayer from './components/DirectionLayer.js';


function App() {
	const [lat, setLat] = useState('43.651070')
	const [lng, setLng] = useState('-79.347015')
	const [markers, setMarkers] = useState([])

	// let markers = []
	const setCenter = (lat, lng) => {
		setLat(lat)
		setLng(lng)
		console.log(lat, lng);

		window.L.mapquest.Map.getMap('map').setView(new window.L.LatLng(lat, lng), 12)
	} 

	const addMarker = (lat, lng, title, subtitle) => {
		const marker = window.L.mapquest.textMarker(
			new window.L.LatLng(lat, lng),
			{
				text: title || '',
				subtext: subtitle || '',
				position: 'right',
				type: 'marker',
				icon: {
					primaryColor: '#f7071f',
					secondaryColor: '#cf0c20',
					size: 'md'
				}
			}
		)

		.addTo(window.L.mapquest.Map.getMap('map'))

		const copyMarkers = markers.slice(0)
		copyMarkers.splice(0,0, marker)
		setMarkers(copyMarkers)

		// markers.push(marker)
	}

	
	const clearMarkers = () => {
		markers.forEach(marker => {
			window.L.mapquest.Map.getMap('map').removeLayer(marker)
		})
		setMarkers([])
	}

	const baseLocationName = () => {
		
	}

  return (

		<div>
				<div>
					<Search setCenter={setCenter} addMarker={addMarker} clearMarkers={clearMarkers} lat={lat} lng={lng}/>

				</div>
				{/* <div>
					<DirectionsLayers setCenter={setCenter} addMarker={addMarker} clearMarkers={clearMarkers} lat={lat} lng={lng} />
				</div> */}
				<div>
					<BaseLocation setCenter={setCenter} setMarker={addMarker} />
				</div>
			
			<DisplayMap 
			height='100vh'
			width='100%'
			center={[lat, lng]}
			tileLayer={'map'}
			zoom={11}
			apiKey='AJEFdd4JGrnslno6l848Ejs3b6WAMJjq'
			/>
		</div>
  );
}
export default App;
