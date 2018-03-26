/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { createStore,combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export default class App extends Component {
  render() {
    return (
      <View>

      </View>
    );
  }
}

//state
const appState = { val: 1, msgError: '', histories: [1]};
//action
const add = {
  type: 'ADD',
  number: 1
};

const sub = {
  type: 'SUB',
  number: 1
};
//reducer
const numberReducer = (state=appState,action) => {
  switch (action.type) {
    case 'ADD':
    //mustalbe
      //state.val += action.number;
    //inmustable
      let result = state.val+action.number; 
      state = {
        ...state,
        histories: [...state.histories,result],
        val: result
      }
      break;
    case 'SUB':
      //state.val -= action.number;
      result = state.val-action.number; 
      state = {
        ...state,
        histories: [...state.histories,result],
        val: result
      }
      break;
    default:
      break;
  }
  return state;
}

const errorReducer = (state=appState,action) => {
  if(action.type=='LESS_THAN_ZERO'){
    state = {
      ...state,
      msgError: 'LESS THAN ZERO'
    }
  }

  return state;
};
const reducers = combineReducers({number:numberReducer,error:errorReducer});

//middleware : 1 ham truyen vaof store tra ve 1 hamf khac cos tham so truyen vao la next, ham nayf lai tiep tuc tra ve 1 ham co tham so la action
const logger = store => next => action => {
  console.log('Middleware', store.getState());
  next(action);
  console.log('Middleware updated', store.getState());
};
const checkZero = store =>next => action => {
  let currentVal = store.getState().number.val;
  if(currentVal <= 0 ){
    next({type:'LESS_THAN_ZERO'});
  }else
    next(action);
};
//store
const store = createStore(reducers,applyMiddleware(thunk, logger,checkZero));

//test
const addAter3s = () => {
  return dispatch => {
    setTimeout( () => dispatch(add), 3000);
  }
}
store.subscribe(()=>{
  console.log("State Updated",store.getState().number,store.getState().error);
});
// store.dispatch(add);
// store.dispatch(sub);
// store.dispatch(sub);
// store.dispatch(sub);
store.dispatch(addAter3s());
