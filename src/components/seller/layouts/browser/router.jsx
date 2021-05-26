import React, { lazy,Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Spinner from '../spinner/spinner';

const Dashboard = lazy(() => import("../../dashboard/dashboard.jsx"));

const Settings = lazy(() => import("../../settings/settings"));

/**
 * This Route For Product
 */

const Products = lazy(() => import("../../products/product"));

const AddProduct = lazy(() => import("../../products/addProduct"));

const EditProduct = lazy(() => import("../../products/editProduct"));

// const ViewProduct = lazy(() => import("../../products/viewProduct"));

/**
 * This Route For Subseller
 */

const Subseller = lazy(() => import("../../subsellers/subseller"));

const Addsubseller = lazy(() => import("../../subsellers/addSubseller"));

const Editsubseller = lazy(() => import("../../subsellers/editSubseller"));

// const Viewsubseller= lazy(() => import("../../subsellers/viewSubseller"));

/**
 * This Route For Carousel
 */

const Carousels = lazy(() => import("../../carousels/carousels"));

const Addcarousel = lazy(() => import("../../carousels/addCarousel"));

const Editcarousel = lazy(() => import("../../carousels/editCarousel"));

// const Viewcarousel = lazy(() => import("../../carousels/viewCarousel"));

/**
 * This Route For Invoice
 */

const Invoice = lazy(() => import("../../invoices/invoices"));

const Addinvoice = lazy(() => import("../../invoices/addInvoice"));

const Editinvoice = lazy(() => import("../../invoices/editInvoice"));

/**
 * This Route For Meetings
 */

const Meeting = lazy(() => import("../../meetings/meetings"));



/**
 * This Route For Posts
 */

const Posts = lazy(() => import("../../posts/posts"));

const Addpost = lazy(() => import("../../posts/addPost"));

const Editpost = lazy(() => import("../../posts/editPost"));

/**
 * This Route For Tags
 */

const Tags = lazy(() => import("../../tags/tags"));

const Addtag = lazy(() => import("../../tags/addTag"));

const Edittag = lazy(() => import("../../tags/editTag"));

/**
 * This Route For Messsages
 */

const Messages = lazy(() => import("../../messages/messages"));


/**
 * This Route For Orders
 */

const Orders = lazy(() => import("../../orders/orders"));

/**
 * This Route For Negotiate
 */

const Negotiate = lazy(() => import("../../negotiate/negotiate"));

const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
    <Switch>

    <Route exact path="/dashboard/setting" component={Settings} />

      <Route exact path="/dashboard" component={Dashboard} />

      {/***** Product Router *****/}

      <Route exact path="/dashboard/product" component={Products} />

      <Route exact path="/dashboard/product/create" component={AddProduct} />

      <Route
        exact
        path="/dashboard/product/:slug/edit"
        component={EditProduct}
      />

      <Route
        exact
        path="/dashboard/product/:slug"
        component={EditProduct}
      />

      {/***** Subseller Router *****/}

      <Route exact path="/dashboard/subseller" component={Subseller} />

      <Route
        exact
        path="/dashboard/subseller/create"
        component={Addsubseller}
      />

      <Route
        exact
        path="/dashboard/subseller/:slug/edit"
        component={Editsubseller}
      />

      <Route
        exact
        path="/dashboard/subseller/:slug"
        component={Editsubseller}
      />

      {/***** Carousel Router *****/}

      <Route exact path="/dashboard/carousel" component={Carousels} />

      <Route exact path="/dashboard/carousel/create" component={Addcarousel} />

      <Route
        exact
        path="/dashboard/carousel/:slug/edit"
        component={Editcarousel}
      />

        <Route
        exact
        path="/dashboard/carousel/:slug"
        component={Editcarousel}
/>
      {/***** Invoice Router *****/}

      <Route exact path="/dashboard/invoice" component={Invoice} />

      <Route exact path="/dashboard/invoice/:slug/edit" component={Editinvoice} />

      <Route exact path="/dashboard/invoice/create" component={Addinvoice} />

      <Route
        exact
        path="/dashboard/carousel/:slug/edit"
        component={Editinvoice}
      />

      {/***** Meeting Router *****/}

      <Route exact path="/dashboard/meeting" component={Meeting} />


      {/***** Posts Router *****/}

      <Route exact path="/dashboard/post" component={Posts} />

      <Route exact path="/dashboard/post/create" component={Addpost} />

      <Route exact path="/dashboard/post/:slug/edit" component={Editpost} />

      <Route exact path="/dashboard/post/:slug" component={Editpost} />

      {/***** Tags Router *****/}

      <Route exact path="/dashboard/tag" component={Tags} />

      <Route exact path="/dashboard/tag/create" component={Addtag} />

      <Route exact path="/dashboard/tag/:slug/edit" component={Edittag} />

      <Route exact path="/dashboard/tag/:slug" component={Edittag} />

      {/***** Messages Router *****/}

      <Route exact path="/dashboard/message" component={Messages} />

      {/***** Order Router *****/}

      <Route exact path="/dashboard/order" component={Orders} />

      {/***** Negotiate Router *****/}

      <Route exact path="/dashboard/negotiate" component={Negotiate} />

      <Redirect to="/dashboard" />
    </Switch>
    </Suspense>
  );
};

export default Router;
