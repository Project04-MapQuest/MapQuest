import React from 'react'
// import { BiCurrentLocation } from "react-icons/bi";
import "../App.css"
import Search from './Search'

const BaseLocation = ({ setCenter, setMarker }) => {

	const findMe = () => {
		if(!navigator.geolocation) {
			alert('this navigation geolocation not supported')
			return
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				const {latitude, longitude} = position.coords
				if(setCenter) {
					setCenter(latitude, longitude)
				}
				if(setMarker) {
						setMarker(latitude, longitude, 'Base Location')
				}
			},
			(error) => {
				alert('error no location')
			}
		)

	}


	return (
		<div className='current-location'>
			<button
			type='button'
				onClick={findMe} > Current Location </button>
		</div>
	)
}

export default BaseLocation;

{/* <button
			type='button'
				onClick={findMe} > Current Location <BiCurrentLocation  className='current-location-icon'/> </button> */}