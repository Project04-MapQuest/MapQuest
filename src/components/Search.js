import { useState } from 'react';

import axios from 'axios'; 
import { FaSearch, FaDirections } from "react-icons/fa";



const Search = ({  addMarker, clearMarkers, baseLocationName, currentAddress }) => {

	const [query, setQuery] = useState('')
	const [listOfPlace, setListOfPlace] = useState([])
	const [showError,setShowError] = useState(false);

	const handleChange = (e) => {
		setQuery(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		findLocation()
		getData()
	}
	
	const getBaseAddress = () => {
		clearMarkers()
		baseLocationName();
	}

	const findLocation = () => {

		if (clearMarkers) clearMarkers()
		axios({
			url: 'https://www.mapquestapi.com/search/v4/place',
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
			console.log('data', res);
			const listOfPlace = res.data.results
			console.log(listOfPlace.length)
			if (listOfPlace.length < 1) {
				setShowError(true)
			}else{
				setShowError(false)
			}

			setListOfPlace(listOfPlace)
			listOfPlace.forEach((data) => {
				const listOfPlaces = data.place.geometry.coordinates;
				addMarker(listOfPlaces[1], listOfPlaces[0])
			})
		})
	}
	const getData = (e, placeID) => {
		listOfPlace.filter((data,placeAddress) => {
			if (data.id === placeID) {
				const { street, city, stateCode } = data.place.properties
				return placeAddress = `${street}, ${city}, ${stateCode}`;
			}
		})
	}

	const getDirection = (start, end) => {


		const directions = window.L.mapquest.directions()
		directions.setLayerOptions({
			startMarker: {
				icon: 'circle',
				iconOptions: {
					size: 'sm',
					primaryColor: '#1fc715',
					secondaryColor: '#1fc715',
					symbol: 'A'
				}
			},
			endMarker: {
				icon: 'circle',
				iconOptions: {
					size: 'sm',
					primaryColor: '#e9304f',
					secondaryColor: '#e9304f',
					symbol: 'B'
				}
			},
			routeRibbon: {
				color: "#ff9d7f",
				opacity: 1.0,
				showTraffic: false
			}
		});

		directions.route({
			start: start,
			end: end
		});
	}

	return (
		<div>

			<form className='searchBar' onSubmit={handleSubmit}>
				<label htmlFor="query">Search:</label>
				<input
					type="search"
					id='query'
					placeholder='Search...'
					defaultValue={query}
					onChange={handleChange}
				/>
				<button type='submit' onClick={getBaseAddress} disabled={!query.length}><FaSearch /></button>
				{showError &&
					<p>Data Not available</p>
				}

			</form>
			<div>
				<ul>
					{
					listOfPlace.map((place) => {
						return (
							<li key={place.id} >
								<h3>{place.name}</h3>
								<p>{place.place.properties.street}, {place.place.properties.city}, {place.place.properties.stateCode}</p>
	<button className='directionsButton' onClick={() => getDirection(currentAddress, `${place.place.properties.street}, ${place.place.properties.city}, ${place.place.properties.stateCode}`)}><FaDirections /></button>

							</li>
						)
					})
					}
				</ul>
			</div>
		</div>
	)
}

export default Search;