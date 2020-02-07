import {ALL, GIBSON, FENDER} from '../actions/guitarActions';
import configuration from '../aws-exports';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { ListGuitars } from '../graphql';

Amplify.configure({...configuration});
let guitars = [];

// Make request to get guitars
API.graphql(graphqlOperation(ListGuitars))
   .then(response => {
     guitars = response.data.listGuitars.items;
   })
   .catch(console.error);

  const initialState = {
    products: guitars
  };
  
  const productsReducer = (state = initialState, action) => {
    //console.log("the action is %", action.payload);
    let productsArray = [];
  
    if (action.type === ALL){
      return {
        products: guitars
      };
    }
  
    if (action.type === GIBSON){
      guitars.forEach(function (product) {
        if (product.category === 'Gibson') {
          productsArray.push(product); 
        }
      })
  
      return {
        products: productsArray
      };
    }
  
    if (action.type === FENDER){
      guitars.forEach(function (product) {
        if (product.category === 'Fender') {
          productsArray.push(product); 
        }
      })
  
      return {
        products: productsArray
      };
    }
  
    return state;
  };

export default productsReducer;