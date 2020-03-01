import React from 'react';
import { withDataLoad } from '../components/withDataLoad';
import ShopCompany from '../components/ShopCompany';
import { withRouter } from 'react-router-dom';

class Page_Items extends React.Component {

    fetchConfig={
        URL: "http://localhost:3000/items",
        method: 'GET',
        headers: {
            "Accept": "application/json",
        },
    };

    ShopPages = withRouter(withDataLoad(this.fetchConfig)(ShopCompany));

    render() {

        let ShopPages = this.ShopPages;

        return (
            <ShopPages/>
        );
    }
}

export default Page_Items;