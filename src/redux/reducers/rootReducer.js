import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { examReducer } from './examReducer';
import { studentReducer } from './studentReducers';
import questionReducer from './questionReducer';
import examSubmitReducer from './examSubmitReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  exams: examReducer,
  question: questionReducer,
  studentState: studentReducer,
  examSubmit: examSubmitReducer,
});

export default rootReducer;
