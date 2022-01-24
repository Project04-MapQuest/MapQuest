import { useState } from 'react';
import DisplayMap from './DisplayMap';
function App() {
    const [lat, setLat] = useState('40.730610')
    const [lng, setLng] = useState('-73.935242')
  return (
        <div>
                <div>
                    Search
                </div>
            <DisplayMap
            height='100vh'
            width='100%'
            center={[lat, lng]}
            tileLayer={'map'}
            zoom={10}
            apiKey='AJEFdd4JGrnslno6l848Ejs3b6WAMJjq'
            />
        </div>
  );
}
export default App;
