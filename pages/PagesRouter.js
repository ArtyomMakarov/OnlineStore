import React from 'react';
import { Route } from 'react-router-dom';
import ShopRoot from "../components/ShopRoot";
import Page_Basket from "./Page_Basket";

class PagesRouter extends React.Component {
          
  render() {

    return (
      <div>
        <Route exact path="/" component={ShopRoot} />
        <Route path="/items/:pageNumber" component={ShopRoot} />
        <Route path="/basket" component={Page_Basket} />
      </div>
    );
  }
}
    
export default PagesRouter;
    