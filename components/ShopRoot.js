import React from 'react';

import ShopCompany from './ShopCompany';
import { withDataLoad } from './withDataLoad';

class ShopRoot extends React.PureComponent {

    fetchConfig={
        URL: "http://localhost:3000/items",
        method: 'GET',
        headers: {
            "Accept": "application/json",
        },
    };

    ShopCompanyWithData=withDataLoad(this.fetchConfig,"companyData")(ShopCompany);

    render() {

        let ShopCompanyWithData=this.ShopCompanyWithData;
        return <ShopCompanyWithData /> ;

    }

}

export default ShopRoot;
