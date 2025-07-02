/*create authentication context that will allow any component in our app to access the current users detail
and authentication function so we need to use it so that we will know which user can see certain pages
for example unauthorized user should'nt be able to create Recipes and so on */

import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from 'axios';


export const AuthContext = createContext();//this will  create a context object called AuthContext
//components who used this to access the  authentication states of functions
//so the context will hold the currents user data and login,Register and logout functions

export const AuthProvider = ({children})=> {
    /*so AuthProvider is a React components that wraps the app or part of it to provide authentication context
    to all his child components and {children} props here Represent the nested components that will have access
    to the context so our app for example */
    const [user, setUser] = useState(null);//so user will store the logged in users data once the users Register or login

    useEffect(()=>{
        /*it checks if the jsonwebtoken exist in the localstorage in what case it would be? so it can be
        if it was saved from previous logged in or  previous Registration  */
        const token = localStorage.getItem("token")
        if(token){
            /*so if a token is found it sets the authorization header for all future axios requests to
            include the token formatted as beared token.Its a common way to authenticate API Requests
            Then this makes a get Request to API with /me which is an endpoint that returns the currents user's data
            based on token  */
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
            axios.get('api/auth/me').then((res)=>{
                /*if our axios Request succeds then we sy setUser(res.data) and it will updates the user states
                with users data and IF No token exists nothing happens and user remains the null */
                setUser(res.data)
            })
        }
    },[])


    const login = async(email , password)=> {
        const res = await axios.post("/api/auth/login",{
            email,
            password,
        })
        //console.log(res.data);//we write this so that we will be able to see our data better

        localStorage.setItem("token", res.data.token)//we take this token and we want to store in localStorage
        //token is store in localStorage for future Sessions (res.data.token) this token genereted in backend
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        setUser(res.data);
    }


    const register = async (username , email , password) => {
        const res = await axios.post('/api/auth/register',{
            username , email , password
        })
        //console.log(res.data);//we write this so that we will be able to see our data better


        localStorage.setItem("token", res.data.token)//we take this token and we want to store in localStorage
        //token is store in localStorage for future Sessions (res.data.token) this token genereted in backend
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        setUser(res.data);

    }


    const logout = ()=> {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];//square [] bracket aayega because we are calling object not a function
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{
            user, 
            login, 
            register , 
            logout,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}