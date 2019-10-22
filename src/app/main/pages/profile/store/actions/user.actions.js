import firebaseService from 'app/services/firebaseService';

export const GET_PROFILE_DATA = '[USER] GET PROFILE DATA';
export function getProfileData(user)
{
    return (dispatch) => {

			firebaseService.onAuthStateChanged(authUser => {
			if ( authUser )
			{	
				firebaseService.getUserData(authUser.uid).then(user => {
					dispatch({
						type   : GET_PROFILE_DATA,
						payload: user
					})
				}, error => {})
			}
			});		


    }
}

