import axios from 'axios';

const API_URL = 'http://localhost:5000/api/portfolio/';

const getPortfolioData = (userId) => {
    return axios.get(API_URL + userId);
};

const generatePdf = (userId) => {
    return axios.get(`${API_URL}/${userId}/download`, {
        responseType: 'blob', 
    });
};

export default { getPortfolioData, generatePdf };