import config from 'config';
import { authHeader } from '../_helpers';

export const gameService = {
    getGames,
};

function handleResponse(response) {
    return response.text().then(text => {
        //console.log("text", text);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        //console.log("handleResponse data: ", data);
        return data;
    });
}

function getGames() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/games`, requestOptions).then(handleResponse);
}
