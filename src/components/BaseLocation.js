import React from 'react'
// import Font Awesome
import { BiCurrentLocation } from "react-icons/bi";
// import styling 
import "../App.css"

const BaseLocation = ({ setCenter, setMarker, displayMapOnSearchClick }) => {

	const findMe = () => {
		if (!navigator.geolocation) {
			alert('this navigation geolocation not supported')
			return
		}
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords
				if (setCenter) {
					setCenter(latitude, longitude)
				}
				if (setMarker) {
					setMarker(latitude, longitude, 'Current Location')
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
				onClick={findMe} > Current Location <BiCurrentLocation  className='current-location-icon'/> </button>
		</div>
	)
}

export default BaseLocation;