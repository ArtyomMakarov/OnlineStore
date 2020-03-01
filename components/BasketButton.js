import React from 'react';
import './BasketButton.css';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';

class BasketButton extends React.Component{

    render() {
        let itemsNumber = this.props.basket.basket.length;
        return(
            <div className="basket-wrapper">
                <NavLink to="/basket" className="PageLink" activeClassName="ActivePageLink">Корзина</NavLink>
                <div className="itemsNumber" hidden={!itemsNumber}>{itemsNumber}</div>
            </div>
        )
    }
};

const mapStateToProps = function (state) {
    return {
        basket: state.basket,
    };
};

export default connect(mapStateToProps)(BasketButton);