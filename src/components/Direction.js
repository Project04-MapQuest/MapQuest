import { useState } from 'react';
import axios from 'axios';
import BaseLocation from './BaseLocation';

const Direction = ( { setCenter, addMarker, clearMarkers } ) => {

	const [direction, setDirection] = useState('')


	const findDirection = () => {

		axios({
			url: 'http://www.mapquestapi.com/directions/v2/route',
			dataResponse: 'json',
			method: 'GET',
			params: {
				key: 'AJEFdd4JGrnslno6l848Ejs3b6WAMJjq',
				from: BaseLocation,
				to: '300 Borough Dr, Scarborough'
			}
		}).then((res) => {
			console.log('DIRECTIONS', res);
		})
	}

}

export default Direction;