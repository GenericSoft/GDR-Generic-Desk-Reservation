import { all } from 'redux-saga/effects';
// Saga
// **** TODO: IMPORT SAGA FILES
// import loginSaga from '../containers/SignIn/sagas'; // !!! DELETE THIS IS JUST AN EXAMPLE

// API
// **** TODO: IMPORT API
// import loginApi from '../api/carsBackend/loginApi'; // !!! DELETE THIS IS JUST AN EXAMPLE

function* rootSaga() {
  yield all([
    // TODO: connect saga files with api
    // loginSaga(loginApi), // !!! DELETE THIS IS JUST AN EXAMPLE
  ]);
}

export default rootSaga;
