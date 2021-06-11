const url = 'https://api.github.com/users/nitabogdan98/gists';
const axios = require('axios');

async function getGistsById() {
    var gists = axios.get(url)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("Error at receiving data from API");
        });
        
    return gists;
}

module.exports.getGistsById = getGistsById;