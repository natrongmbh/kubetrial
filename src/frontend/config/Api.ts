import Axios from 'axios';
import Cookies from 'js-cookie';

let version = 'v1';

let urls = {
    test: 'http://localhost:8000/api/' + version, // test on kubernetes kind cluster locally
    development: 'http://localhost:8000/api/' + version, // local development
    production: 'http://localhost:8000/api/' + version, // production
}

let Api = Axios.create({
    baseURL: urls[process.env.NODE_ENV], 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const token = Cookies.get('token');
if(token) {
    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default Api;