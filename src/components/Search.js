import { useState } from 'react';
import axios from 'axios'; 


const Search = ( { setCenter, addMarker, clearMarkers } ) => {

	const [query, setQuery] = useState('')
	const [listOfPlace,setListOfPlace] = useState([])

		const handleChange = (e) => {
			setQuery(e.target.value)
		}

		const handleSubmit = (e) => {
			e.preventDefault()
			findLocation()
			clearMarkers()
		}

		const findLocation = () => {
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
				const listOfPlace = res.data.results;
				console.log(listOfPlace)
				setListOfPlace(listOfPlace)
				listOfPlace.forEach( (data) => {
					const listOfPlaces = data.place.geometry.coordinates;
					addMarker(listOfPlaces[1], listOfPlaces[0])
					
				})
	})}
	
	// const selectedPlace = []
	const getData = (e,placeID) => {
		 listOfPlace.filter( (data)=>{
			 if(data.id === placeID){
				 const { street, city, stateCode } = data.place.properties
				 const placeAddress = `${street}, ${city}, ${stateCode}`
				 console.log(placeAddress)
			 }
		 })
	}
	
	// const bas = listOfPlace.length / 2;
	// const high = listOfPlace[5];
	// console.log(high);

	return (
<<<<<<< HEAD
		<form className='searchBar' onSubmit={handleSubmit}>
			<label htmlFor="query">Search:</label>
			<input 
			type="search" 
			id='query'
			defaultValue={query}
			onChange={handleChange}
			/>
			<button type='submit' disabled={!query.length}>Search</button>
		</form>
=======
		<section>
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
			<div>
				<ul>
				{
					listOfPlace.map( (place) => {
						return(
							<li key={place.id} >
								<h3>Name:{place.name}</h3>
								<p>{place.place.properties.street}, {place.place.properties.city}, {place.place.properties.stateCode}</p>
								<button onClick={(e)=>getData(e,place.id)}>Get Direction</button>
							</li>
						)
					})
					
				}
				</ul>
			</div>
		</section>
>>>>>>> c953d90bb4b0ba857603f4e430f68c56dbfbb68a
	)
}

export default Search;