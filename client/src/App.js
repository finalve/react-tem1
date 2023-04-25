
import { useEffect, useReducer, useState } from "react";
import { lang } from "./admin/components/vitualData";
import { Route, Routes, Navigate, } from "react-router-dom";
import "chart.js/auto";

import 'react-calendar/dist/Calendar.css';
import userService from "./services/user";
import contextProvider from "./admin/components/context/contextProvider";
import Page from "./user/components/Page";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { ThemeProvider, createTheme } from "@mui/material";
import Landing from "./admin/components/Landing/Landing";
import Dashboard from "./admin/components/Landing/SubPage/Dashboard/Dashboard";
import Product from "./admin/components/Landing/SubPage/Add/Product";
import Store from "./admin/components/Landing/SubPage/Add/Store";
import Type from "./admin/components/Landing/SubPage/Add/Type";
import Setting from "./auth/Setting";
import Error404 from "./admin/components/Landing/SubPage/Error/Error404";
import Promotion from "./admin/components/Landing/SubPage/Add/Promotion";
import Purchase from "./user/components/Purchase/Purchase";
import Authed from "./user/components/Authed";
import Nonauth from "./user/components/Nonauth";


const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      const user = userService.getCurrentUser();
      return {
        User: user,
        isAdmin: user.roles.includes("ROLE_ADMIN")
      }
    case "logout":
      localStorage.removeItem("user");
      return null;
    default:
      return state;
  }
}
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});
function App() {
  const [language, setLanguage] = useState(lang[0]);
  const [authState, authDispatch] = useReducer(reducer, null);
  const [thisState, setState] = useState(language.dashboard);
  const [dataPurchase, setPurchase] = useState(null);

  const [sending, setSending] = useState(null);
  const [error, setError] = useState(null);
  const [messaseBox, setMessageBox] = useState(false);

  const handleMessageBoxClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSending(null);
    setError(null);
    setMessageBox(false);
  };


  useEffect(() => {
    const user = userService.getCurrentUser();
    if (user)
      authDispatch({ type: "login" });
  }, []);

  return (

    <contextProvider.Provider value={{
      language,
      setLanguage,
      authState,
      authDispatch,
      thisState,
      setState,
      dataPurchase,
      setPurchase,
      sending,
      setSending,
      error,
      setError,
      messaseBox,
      setMessageBox,
      handleMessageBoxClose
    }}>
      <ThemeProvider theme={theme}>
        <div className="row" id="proBanner"></div>
        {
          <Routes >
            <Route path="/" element={<Page />}  >
              <Route exract path="" element={authState ? <Authed /> : <Nonauth />} />
              <Route path="purchase" element={dataPurchase ? <Purchase /> : <Navigate to='/' />} />
              <Route path='auth' element={authState && <Authed/>}>
                <Route path="login" element={<Login />} />
                <Route path='register' element={<Register />} />
              </Route>
            </Route>
            <Route path='/admin' element={authState?.isAdmin ? <Landing /> : <Error404 />}>
              <Route exract path="" element={<Dashboard />} />
              <Route path="home" element={<Dashboard />} />
              <Route path='product' element={<Product />} />
              <Route path='store' element={<Store />} />
              <Route path='promotion' element={<Promotion />} />
              <Route path='type' element={<Type />} />
              <Route path='setting' element={<Setting />} />
            </Route>

            <Route path='/forgot' element='' />
            <Route path='*' element={<Error404 />} />
          </Routes>
        }
      </ThemeProvider>
    </contextProvider.Provider>
  );
}

export default App;
