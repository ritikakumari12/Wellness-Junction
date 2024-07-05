import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

import axios from 'axios'

//Global State management System using react Context API
//manage and share global state across different components of application
export const GlobalState = createContext()

//Wraps all child companents in the application
//{children} -> all child components that will have access to global state
export const DataProvider = ({children}) =>{
    const [token, setToken] = useState('')


    useEffect(() => {
        const checkLogin = async () => {
          //getting token from localStorage tokenStore 
          const accessToken = localStorage.getItem('tokenStore');
          console.log(accessToken);
          if (accessToken) {
            // Axios makes a GET request to “get” data from a server API
            // In second Parameter, we are setting the Authorization Header (HTTP Request Header)
            // As Authorization header is set up, after making a get request to verify route...
            // ...It will check if there is token available in Authorization header and send response as...
            // ...True or false which will be in ***response.data***

            //Verifying Token by passing token in headers
            //If token is verified we will set the value of token as true
            const verified = await axios.get('https://wellness-junction.onrender.com/user/verify', {
              headers: { Authorization: accessToken },
            });
            console.log(verified.data);
            setToken(accessToken);
            if (verified === false) return localStorage.clear();
          } else {
            setToken('');
          }
        };
        checkLogin();
      }, []);
      //Empty dependancy array -> hook runs only once

    //All Global states and API interfaces
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),   
        // products -> all products array, callback, category -> mongoDB filter, sort -> mongoDB filter, search -> mongoDB filter, 
        //page -> mongoDB filter, result -> total number of products
        userAPI: UserAPI(token), //isLogged, isAdmin, cart of User and addCart function
        categoriesAPI: CategoriesAPI() //categories array, callBack -> when callBack is changed getCategories is called
    }

    return (
      //Provides access to state object to all components wrapped under DataProvider 
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}