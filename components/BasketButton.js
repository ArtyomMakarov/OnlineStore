import React from 'react';
import './BasketButton.css';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';

class BasketButton extends React.Component{

    state = {
      basketItemsLength: this.props.basket.basketItems.length,
    };

    componentDidMount =() => {
      this.setState({basketItemsLength: 0})  ;
    };

    render() {
        console.log(this.props.basket.basketItems);
        return(
            <div className="basket-wrapper">
                <NavLink to="/basket" className="PageLink" activeClassName="ActivePageLink">Корзина</NavLink>
                <div className="itemsNumber" hidden={!this.props.basket.basketItems.length}>{this.props.basket.basketItems.length}</div>
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