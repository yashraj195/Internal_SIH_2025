import axios from 'axios';

const API_URL = 'http://localhost:5000/api/activities/';

const getMyActivities = () => {
    return axios.get(API_URL + 'myactivities', { headers: getAuthHeader() });
};

const submitActivity = (formData) => {
    const headers = {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data',
    };
    return axios.post(API_URL, formData, { headers });
};

export function getAuthHeader() {
  const token = localStorage.getItem('token');
  return {
    Authorization: `Bearer ${token}`,
  };
}

export default { getMyActivities, submitActivity, getAuthHeader };