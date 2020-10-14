import axios from 'axios';


const APISettings = {
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json'
}

class Joblisting {

	getJobs = () => {

		return axios(APISettings.baseUrl, {
	      method: 'GET',
	      mode: 'no-cors',
	      headers: {
	        'Access-Control-Allow-Origin': '*',
	        'Content-Type': 'application/json',
	        'crossorigin':true
	      }
	    })

	}

}

export default Joblisting;