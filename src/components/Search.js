// import useState
import { useState } from 'react';
// import axios
import axios from 'axios'; 
// import fontAwsome icons here
import { FaSearch, FaDirections } from "react-icons/fa";
// import styling 
import "../App.css"



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
		getAddressOnDirectionClick();
	}
	// create function so on search click following function will call
	const getBaseAddress = () => {
		clearMarkers()
		baseLocationName();
	}
	// CALLING FUNCTION TO GET LIST OF PLACE 
	const findLocation = () => {
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
			const listOfPlace = res.data.results;
			// ERROR HANDLING MESSAGE LOGIC
			if (listOfPlace.length < 1) {
				setShowError(true)
			}else{
				setShowError(false)
			}
			setListOfPlace(listOfPlace)
			// ADDING MARKER ON PAGE WHERE SEARCH IS FOUND
			listOfPlace.forEach((data) => {
				const listOfPlaces = data.place.geometry.coordinates;
				addMarker(listOfPlaces[1], listOfPlaces[0])
			})
		})
	}

	// sorting addres depending on direction select
	const getAddressOnDirectionClick = (e, placeID) => {
		listOfPlace.forEach((data) => {
			if (data.id === placeID) {
				const { street, city, stateCode } = data.place.properties
				const placeAddress = `${street}, ${city}, ${stateCode}`;
			}
		})
	}

	// adding route on page by clicking get direction button
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
				color: "#5bc5ff",
				opacity: 1.0,
				showTraffic: false
			}
		});
		//  start to end direction.
		directions.route({
			start: start,
			end: end
		});
	}

	return (
		<div>
			<form className='searchBar' onSubmit={handleSubmit}>
				<label htmlFor="query" className='sr-only'>Search</label>
				<input
					type="search"
					id='query'
					placeholder='Search'
					defaultValue={query}
					onChange={handleChange}
				/>
				<button className='search-btn' type='submit' onClick={getBaseAddress} disabled={!query.length}><FaSearch /></button>
				{showError &&
					<p>Data Not available</p>
				}
			</form>
			<div className='list-of-place-section'>
				<ul>
					{
					listOfPlace.map((place) => {
					return (
					<li key={place.id} className='list-of-place' >
						<div className='button-beside'>
							<h3>{place.name}</h3>
							<button className='directionsButton' onClick={() => getDirection(currentAddress, `${place.place.properties.street}, ${place.place.properties.city}, ${place.place.properties.stateCode}`)}><FaDirections /></button>
						</div>
						<p>{place.place.properties.street}, {place.place.properties.city}, {place.place.properties.stateCode}</p>
					</li>
					)})}
				</ul>
			</div>
		</div>
	)
}

export default Search;