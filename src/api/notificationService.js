import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notifications/';
import { getAuthHeader } from './activityService'; 

const getMyNotifications = () => {
    return axios.get(API_URL, { headers: getAuthHeader() });
};

export default { getMyNotifications };