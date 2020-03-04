import React from 'react';
import ShopCompany from './ShopCompany';
import {withRouter} from 'react-router-dom';

class ShopRoot extends React.Component {

    ShopCompanyWithRouter=withRouter(ShopCompany);

    render() {
        let ShopCompanyWithRouter=this.ShopCompanyWithRouter;
        return (
            <div>
                <ShopCompanyWithRouter/>
            </div>
        );
    }
}

export default ShopRoot;
