import React from 'react';
import { Route } from 'react-router-dom';

import Page_Company from './Page_Company';
import Page_Items from './Page_Items';
import Page_Basket from "./Page_Basket";

class PagesRouter extends React.Component {
          
  render() {

    return (
      <div>
        <Route exact path="/" component={Page_Company} />
        <Route path="/basket" component={Page_Basket} />
        <Route path="/items/:pageNumber" component={Page_Items} />

      </div>
    );
    
  }

}
    
export default PagesRouter;
    