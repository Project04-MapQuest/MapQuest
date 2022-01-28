import { useState } from 'react';
import DisplayMap from './components/DisplayMap.js';
import BaseLocation from './components/BaseLocation.js';
import Search from './components/Search.js'
// import Direction from './Direction.js'
// import DirectionLayer from './components/DirectionLayer.js';
// axios import
import axios from 'axios';
// import styling
import "./App.css"


function App() {
	const [lat, setLat] = useState('43.651070')
	const [lng, setLng] = useState('-79.347015')
	const [markers, setMarkers] = useState([])
	const [revertAddress, setRevertAddress] = useState("")

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
		const KEY = "AJEFdd4JGrnslno6l848Ejs3b6WAMJjq"
		axios({
		url: `http://open.mapquestapi.com/geocoding/v1/reverse?key=${KEY}&location=${lat},${lng}&includeRoadMetadata=true&includeNearestIntersection=true`,
		dataResponse: 'json',
		method: 'GET',
		header: {
			"accept-language": "CA"
		}}).then((res) => {
			const convertedAddress = res.data.results[0].locations[0];
			const { street, adminArea5, adminArea3 } = convertedAddress;
			const address = `${street}, ${adminArea5}, ${adminArea3}.`
			setRevertAddress(address);
	 })
	
}

  return (
	<main className='wrapper'>
	<div className='contentFlex'>		
		<section className='search-section'>
			<div className='map-logo'>
				<h1>shopper mapper</h1>
			</div>
			<div className='baseLocation'>
				<BaseLocation setCenter={setCenter} setMarker={addMarker}  />
			</div>
			
			<div>
				<Search setCenter={setCenter} addMarker={addMarker} clearMarkers={clearMarkers} lat={lat} lng={lng} />
			</div>
		</section>
		<section className='map'>
			<DisplayMap
			height='100vh'
			width='100%'
			center={[lat, lng]}
			tileLayer={'map'}
			zoom={11}
			apiKey='AJEFdd4JGrnslno6l848Ejs3b6WAMJjq'
			/>
		
		</section>
	</div>
</main>
  );
}
export default App;


{/* <Search setCenter={setCenter} addMarker={addMarker} clearMarkers={clearMarkers} lat={lat} lng={lng} baseLocationName={baseLocationName} currentAddress={revertAddress}/> */}