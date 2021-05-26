import React, { useEffect,useState } from "react";
import Navbar from "./layouts/navbar/navbar";
import Sidebar from "./layouts/sidebar/sidebar";
import Browser from "./layouts/browser/browser";
import { BrowserRouter as Router } from "react-router-dom";
import { useTranslation } from "react-i18next";
import connect from "../../services/connect"
import Spinner from './layouts/spinner/spinner'

const http = new connect();

const Seller = () => {
  const [state, setState] = useState({
    isLoading:false,
    data: [],
    errors: [],
  });
  
  const { i18n } = useTranslation();

  document.body.className = i18n.dir();

  useEffect(() => {
    fetchSeller();
  }, []);

  const fetchSeller = () => {
    http
      .getData(null, `${http.BASE_URL_SELLER}/auth`)
      .then((res) => {
        res.data.status
          ? setState({
              data: res.data.data,
              isLoading:true
            })
          : setState({
              errors: res.data.errors,
            });
      })
      .catch((err) => {
        setState({
          errors: err,
        });
      });
  };

  if(state.isLoading){
    return (
    <Router>
      <div className="container-scroller">
        <Navbar seller={state.data} />
        <div className="container-fluid page-body-wrapper">
          <Sidebar seller={state.data} />
          <div className="main-panel container">
            <div className="content-wrapper">
              <Browser />
            </div>
          </div>
        </div>
      </div>
    </Router>
    );
  }else{
    return <Spinner width="100%" height="100vh" />
  }

};

export default Seller;
