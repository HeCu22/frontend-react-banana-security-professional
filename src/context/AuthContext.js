import React, { createContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [isAuth, toggleIsAuth] = useState({
    isAuth: false,
    user: null,           /*  hiermee wordt user een object  en kunnen we meerder items eraantoekennen   */
    status: 'pending',
  });

  const history = useHistory();


  async function getUserdetails(token,id) {
    const newtoken = localStorage.getItem('bananaToken');
    console.log('new2', newtoken);
    try {
      const {data} = await axios.get(`http://localhost:3000/600/users/${id}`,
          {
            headers: {
        "Content-Type": "application/json",
          Authorization: `Bearer ${newtoken}`,
          }}
      );
      console.log('get', data);
      toggleIsAuth({
        ...isAuth,
        isAuth: true,
        user: {
          username: data.username,
          email: data.email,
        }
      });

    } catch (e) {

      console.error(e);
    }

  }

  function login(token) {
    console.log('Gebruiker is ingelogd!');
    localStorage.setItem('bananaToken', token);
    const decodedToken = jwtDecode(token);

    toggleIsAuth({
      ...isAuth,
      isAuth: true,
      user: {
      email: decodedToken.email,
        id: decodedToken.sub}
    });

    getUserdetails(token,decodedToken.sub);

    history.push('/profile');
  }

  function logout() {
    console.log('Gebruiker is uitgelogd!');
    localStorage.removeItem('bananaToken');
    toggleIsAuth({
      isAuth: false,
      user: null,

    });
    history.push('/');
  }

  const contextData = {
    isAuth: isAuth,
    user: isAuth.user,
    email: isAuth.user,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;