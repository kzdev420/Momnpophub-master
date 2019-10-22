import * as Actions from 'app/main/pages/profile/store/actions';

const initialState = {
    role: [],//guest
    data: {
        'displayName': 'John Doe',
        'photoURL'   : 'assets/images/avatars/Velazquez.jpg',
        'email'      : 'johndoe@withinpixels.com',
        shortcuts    : [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
    }
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_PROFILE_DATA:
        {
            return {
                ...initialState,
                ...action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

export default user;