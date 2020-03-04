import React from 'react';
import { withDataLoad } from '../components/withDataLoad';
import ShopCompany from '../components/ShopCompany';

class Page_Company extends React.Component {

    fetchConfig={
        URL: "http://localhost:3000/items",
        method: 'GET',
        headers: {
            "Accept": "application/json",
        },
    };

    ShopCompanyWithData = withDataLoad(this.fetchConfig, "companyData")(ShopCompany);

    render() {

        let ShopCompanyWithData = this.ShopCompanyWithData;

        return (
            <ShopCompanyWithData/>
        );
    }
}

export default Page_Company;