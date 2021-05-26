import "./App.scss";
import React,{ Fragment,useEffect}  from "react"
import { withRouter } from "react-router-dom"
import Browser from "./components/layouts/browser"
// import SettingsPanel from "./components/seller/shared/SettingsPanel"
import { useTranslation } from "react-i18next"
import { ToastContainer } from 'react-toastify';

const App = () => {
  
  const { i18n } = useTranslation();

  document.body.className = i18n.dir();

  // document.body.classList.add(window.innerWidth <=976 ? 'sidebar-icon-only' : null);
  
  useEffect(() => {

    handlingClass();

  },[]);
  

  const handlingClass = () => {


    window.addEventListener('resize', () => {

      const myWidth  = window.innerWidth;

      if(myWidth <= 976){

        document.body.classList.add('sidebar-icon-only');

      }
      
    });
  }
  return (
    <Fragment>
      <Browser />
      <ToastContainer />
    </Fragment>
  );
};

export default withRouter(App);
