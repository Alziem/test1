import React, {Fragment } from "react";
import { Switch, Route } from "react-router-dom"

/// Handling Components


import Seller from '../seller/seller';
import Login from '../seller/login/login'

const Browser = () => {

    return (
        <Fragment>
            <Switch>
                <Route path="/dashboard" component={Seller} />
                <Route path="/" component={Login} />
            </Switch>
        </Fragment>
    );
}

export default Browser;