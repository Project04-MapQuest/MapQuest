import { useState } from 'react';
import DisplayMap from './components/DisplayMap.js';
import BaseLocation from './components/BaseLocation.js';

function App() {
	const [lat, setLat] = useState('43.651070')
	const [lng, setLng] = useState('-79.347015')

	let markers = []


	const setCenter = (lat, lng) => {
		setLat(lat)
		setLng(lng)

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

		markers.push(marker)
	}




  return (

		<div>
				<div>
					Search
				</div>
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
