import { useState } from 'react';
import axios from 'axios'; 
// import BaseLocation from './BaseLocation';


const Search = ( { setCenter, addMarker, clearMarkers, lat, lng } ) => {

	const [query, setQuery] = useState('')
	const [listOfPlace, setListOfPlace] = useState([])

		const handleChange = (e) => {
			setQuery(e.target.value)
		}

		const handleSubmit = (e) => {
			e.preventDefault()
			findLocation()
			clearMarkers()
			// setQuery(query)
			getData()
		}

		const findLocation = () => {
			if (!query.length) return

			if (clearMarkers) clearMarkers()


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
				setCenter(listOfPlace[0].place.geometry.coordinates[0], listOfPlace[0].place.geometry.coordinates[1])

				setListOfPlace(listOfPlace)
				listOfPlace.forEach((data) => {
					console.log(data.place.geometry.coordinates);
					// addMarker(data.place.geometry.coordinates)
					const listOfPlaces = data.place.geometry.coordinates
					addMarker(listOfPlaces[1], listOfPlaces[0])

				})
			})


		}
		

			// const selectedPlace = []
	const getData = (e,placeID) => {
		listOfPlace.filter( (data)=>{
			if(data.id === placeID){
				const { street, city, stateCode } = data.place.properties
				const placeAddress = `${street}, ${city}, ${stateCode}`
				console.log('getData', placeAddress)
			}
		})
   }
   
   // const bas = listOfPlace.length / 2;
   // const high = listOfPlace[5];
   // console.log(high);

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



		// axios({
		// 	url: 'http://www.mapquestapi.com/directions/v2/routeshape',
		// 	dataResponse: 'json',
		// 	method: 'GET',
		// 	params: {
		// 		key: 'AJEFdd4JGrnslno6l848Ejs3b6WAMJjq',
		// 		session_ID: '61f2d3b6-02e8-6750-02b4-36ae-0e81911b6a59',
		// 		mapWidth: '320',
		// 		mapHeight: '240',
		// 		mapScale: '1733371',
		// 		mapLat: '40.491304',
		// 		mapLng: '-77.2614665'

		// 	}
		// })
		// console.log('getShape', res);
	// })

//    }


// const directionsLayer = () =>  {
// 	window.L.mapquest.key = apiKey
// const map = window.L.mapquest.map('map', {
// 	center: [lat, lng],
// 	layers: window.L.mapquest.tileLayer('dark'),
// 	zoom: 11
// })
// // map.addControl(window.L.mapquest.control())

// const directions = window.L.mapquest.directions()
// directions.setLayerOptions({
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
//   });

//   directions.route({
// 	start: '46 Captain Hall Court, Scarborough, ON',
// 	end: '300 Borough Dr, Scarborough, ON'
//   });
// }




	return (
		<div>

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
		
		{/* {query.map((indivdualQuery) => {
			return (
				<div key={indivdualQuery.id}>
					<h2>{displayString}</h2>


				</div>
			)
		})} */}

		<div>
				<ul>
				{
					listOfPlace.map((place) => {
						return(
							<li key={place.id} >
								<h3>Name:{place.name}</h3>
								<p>{place.place.properties.street}, {place.place.properties.city}, {place.place.properties.stateCode}</p>
								<button onClick={() => getDirection('46 Captain Hall Court, Scarborough, ON', `${place.place.properties.street}, ${place.place.properties.city}, ${place.place.properties.stateCode}`)}>Get Direction</button>
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