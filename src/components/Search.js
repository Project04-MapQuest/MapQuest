import { useState } from 'react';
import axios from 'axios'; 
// import BaseLocation from './BaseLocation';
// import fontAwsome icons here
// import { FaSearch, FaDirections } from "react-icons/fa";
// import styling 
import "../App.css"


const Search = ( { setCenter, addMarker, clearMarkers, baseLocationName, currentAddress } ) => {

	const [query, setQuery] = useState('')
	const [listOfPlace, setListOfPlace] = useState([])
	const [showError,setShowError] = useState(false);


		const handleChange = (e) => {
			setQuery(e.target.value)
		}

		const handleSubmit = (e) => {
			e.preventDefault()
			findLocation()
			
		}

		// create function so on search click following function will call
	const getBaseAddress = () => {
		clearMarkers()
		baseLocationName();
	}

		// CALLING FUNCTION TO GET LIST OF PLACE 
		const findLocation = () => {
			// if (!query.length) return

			// if (clearMarkers) clearMarkers()


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
				console.log('data', res);
				const listOfPlace = res.data.results
				// setCenter(listOfPlace[0].place.geometry.coordinates[0], listOfPlace[0].place.geometry.coordinates[1])
				if (listOfPlace.length < 1) {
					setShowError(true)
				}else{
					setShowError(false)
				}
				setListOfPlace(listOfPlace)
				listOfPlace.forEach((data) => {
					console.log(data.place.geometry.coordinates);
					// addMarker(data.place.geometry.coordinates)
					const listOfPlaces = data.place.geometry.coordinates
					addMarker(listOfPlaces[1], listOfPlaces[0])

				})
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
		  color: "#2aa6ce",
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
			<label htmlFor="query" className='sr-only' ></label>
			<input 
			type="search" 
			id='query'
			placeholder='Search'
			defaultValue={query}
			onChange={handleChange}
			/>
			<button type='submit' className='search-btn' onClick={getBaseAddress} disabled={!query.length}>Search</button>
			{showError &&
					<p>Data Not available</p>
				}
		</form>
		
		{/* {query.map((indivdualQuery) => {
			return (
				<div key={indivdualQuery.id}>
					<h2>{displayString}</h2>


				</div>
			)
		})} */}

			<div className='list-of-place-section'>
				<ul>
					{
					listOfPlace.map((place) => {
					return (
					<li key={place.id} className='list-of-place' >
						<div className='button-beside'>
							<h3>{place.name}</h3>
							<button className='directionsButton' onClick={() => getDirection('46 Captain Hall Court, Scarborough, ON', `${place.place.properties.street}, ${place.place.properties.city}, ${place.place.properties.stateCode}`)}> Directions </button>
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

