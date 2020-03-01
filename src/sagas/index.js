import { put, delay, call ,all,takeLatest,takeEvery} from "redux-saga/effects";
import axios from "axios";
import {AUTH_SW,AUTH_SUCCESS,AUTH_FAILURE,SEARCH_TEXT,SEARCH_SUCCESS,SEARCH_FAILURE,SEARCH_NOT_REQUIRED} from '../actions/ActionTypes'

export function* checkUser(action) {
  try {
    if(action.payload.username==''||action.payload.password==''){
      yield put({ type: AUTH_FAILURE, payload:"*Please enter username and password"});
    }
    else{
    const response = yield call(
      axios.get,
      `https://swapi.co/api/people/?search=${action.payload.username}`
    );
    if(response.data.count==0){
      yield put({ type: AUTH_FAILURE, payload:"*Invalid user"});
    }
    else{
      var res=response.data.results;
      var matchinRes=res.find((person)=>{
          return person.name==action.payload.username
      })
      if(matchinRes===undefined){
        yield put({ type: AUTH_FAILURE, payload:"*Invalid user"});
      }
      else{
        if(matchinRes.birth_year!=action.payload.password){
          yield put({ type: AUTH_FAILURE, payload:"*Invalid password"});
        }
        else{
          yield put({ type: AUTH_SUCCESS , payload:matchinRes});
        }
      }
    }
  }
} catch (error) {
    yield put({ type: AUTH_FAILURE, payload:'**Issue while signing-in' });
  }
}

export function* searchText(action) {
  try {
    if(action.payload!=''){
      var response = yield call(axios.get,`https://swapi.co/api/planets/?search=${action.payload}`);
        if(response.data.count==0){
          yield put({ type: SEARCH_FAILURE, payload:"No search results found!!"});
        }else{
          var results=[];
          results.push(...response.data.results);
          while(response.data.next != null){
            response = yield call(axios.get,response.data.next);
            results.push(...response.data.results)
          }
          yield put({ type: SEARCH_SUCCESS, payload:results});
        }
      }else{
        yield put({ type: SEARCH_NOT_REQUIRED, payload:""});
      }
  }catch (error) {
    yield put({ type: SEARCH_FAILURE, payload:'Error while searching planet!!' });
  }
}

export function* watchUser() {
  yield takeLatest(AUTH_SW, checkUser);
}

export function* watchSearch() {
  yield takeLatest(SEARCH_TEXT, searchText);
}

export default function* rootSaga() {
  yield all([call (watchUser),call(watchSearch)])
}