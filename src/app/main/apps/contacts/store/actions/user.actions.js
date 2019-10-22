import axios from 'axios';

export const GET_USER_DATA = '[CONTACTS APP] GET USER DATA';

export function getUserData()
{
    const request = axios.get('/api/contacts-app/user');
    return (dispatch) =>
        request.then((response) => {
			console.log(response);
            dispatch({
                type   : GET_USER_DATA,
                payload: response.data
            })
		}
        );
}
