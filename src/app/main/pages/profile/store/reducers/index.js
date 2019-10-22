import {combineReducers} from 'redux';
import user from './user.reducer';

const authReducers = combineReducers({
    user
});

export default authReducers;