import React from 'react';
import ShopCompany from './ShopCompany';
import { withDataLoad } from './withDataLoad';
import {withRouter} from 'react-router-dom';

class ShopRoot extends React.Component {

    fetchConfig={
        URL: "http://localhost:3000/items",
        method: 'GET',
        headers: {
            "Accept": "application/json",
        },
    };

    ShopPagesWithData=withDataLoad(this.fetchConfig,"companyData")(withRouter(ShopCompany));

    render() {
        let ShopPagesWithData=this.ShopPagesWithData;
        return (
            <div>
                <ShopPagesWithData/>
            </div>
        );
    }
}

export default ShopRoot;
