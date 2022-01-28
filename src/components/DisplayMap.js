import { useEffect } from 'react';
// import styling
import "../App.css"

const DisplayMap = ({ height, width, center, tileLayer, zoom, apiKey}) => {
	
	useEffect(() => {
		window.L.mapquest.key = apiKey
		const map = window.L.mapquest.map('map', {
			center, 
			layers: window.L.mapquest.tileLayer(tileLayer),
			zoom
		})
		map.addControl(window.L.mapquest.control())
	},[])
	
	return (
		<div id='map' style={{ width, height }}>
		</div>
	)
}
export default DisplayMap;
