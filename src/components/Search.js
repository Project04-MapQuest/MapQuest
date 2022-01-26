import { useState } from 'react';
import axios from 'axios'; 


const Search = ( { setCenter, addMarker, clearMarkers } ) => {

	const [query, setQuery] = useState('')

		const handleChange = (e) => {
			setQuery(e.target.value)
		}

		const handleSubmit = (e) => {
			e.preventDefault()
			findLocation()
			// setQuery(query)
		}

		const findLocation = () => {
			// if(!query.length) return

			// if(clearMarkers) clearMarkers()


			axios({
				url:'https://www.mapquestapi.com/search/v4/place',
				dataResponse: 'json',
				method: 'GET',
				params: {
				key: 'AJEFdd4JGrnslno6l848Ejs3b6WAMJjq',
				location: '-10, 10',
				sort: 'distance',
				feedback: false,
				q: query
				}
			}).then((res) => {
				console.log(res);
				setQuery(res.data.results)

				// setCenter(addMarker)
				// addMarker(res.data.results)
				// addMarker(lat, lng)
				// setCenter(lat, lng)
				// const { street, adminArea5, adminArea3, latlng } = location
				// const { latLng } = location

				// setCenter(latLng.lat, latLng.lng)
				// addMarker (
				// 	latLng.lat,
				// 	latLng.lng,
				// 	// `lat: ${latLng.lat}, lng: ${latLng.lng}`,
				// 	// `${street || ''}, ${adminArea5}, ${adminArea3}`
				// )
			})
			

			


			// window.placeSearch({
			// 	key: 'AJEFdd4JGrnslno6l848Ejs3b6WAMJjq',
			// 	container: 'query',
			// 	useDeviceLocation: true,
			// 	collection: [
			// 		'poi',
			// 		'airport',
			// 		'address',
			// 		'adminArea',
			// 	]
			// })

			// window.L.mapquest.geocoding().geocode(query, 
			// 	(error, response) => {
			// 		console.log(response);
			// 		response.results.forEach((result, res_index) => {
			// 			result.locations.forEach(location => {
			// 				const { street, adminArea5, adminArea3, latLng } = location
			// 				if (res_index === 0) {
			// 					setCenter(latLng.lat, latLng.lng) 
			// 				}
							
			// 				addMarker (
			// 					latLng.lat,
			// 					latLng.lng,
			// 					`lat: ${latLng.lat}, lng: ${latLng.lng}`,
			// 					`${street || ''}, ${adminArea5}, ${adminArea3}`
			// 				)
			// 			})
			// 		})
			// 	}
			// )
		}


	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="query">Search:</label>
			<input 
			type="search" 
			id='query'
			defaultValue={query}
			onChange={handleChange}
			/>
			<button type='submit' disabled={!query.length}>Search</button>
		</form>
	)
}

export default Search;