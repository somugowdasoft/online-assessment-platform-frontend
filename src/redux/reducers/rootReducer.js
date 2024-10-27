import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { examReducer } from './examReducer';
import { studentReducer } from './studentReducers';
import questionReducer from './questionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  exams: examReducer,
  question: questionReducer,
  studentState: studentReducer,
});

export default rootReducer;
