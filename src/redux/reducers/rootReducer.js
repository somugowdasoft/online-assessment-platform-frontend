import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { examReducer } from './examReducer';
import { studentReducer } from './studentReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  exams: examReducer,
  studentState: studentReducer,
});

export default rootReducer;
