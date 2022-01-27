import React from 'react'
import { BiCurrentLocation } from "react-icons/bi";

const BaseLocation = ( { setCenter, setMarker }) => {

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
						setMarker(latitude, longitude, 'My location', `lat: ${latitude}, lng: ${longitude}`)
				}
			},
			(error) => {
				alert('error no location')
			}
		)

	}


	return (
		<button
		type='button'
		onClick={findMe}
		>
		Base Location <BiCurrentLocation />
		</button>
	)
}

export default BaseLocation;