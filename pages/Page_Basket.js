import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import './Page_Basket.css';

class Page_Basket extends React.PureComponent{
    
    state = {
        items: this.props.basket.basket,
    };
    
    render() {
        console.log(this.props.basket);
        return(
            <div className="basketPage">
              <h1 className='shopName'>Online Store</h1>
              <h2 className="basketName">Корзина</h2>
                {
                    this.state.items.length>0?
                        <div>
                            <table className='basketTable'>
                                <tbody className='basketBody'>{this.state.items}</tbody>
                            </table>
                            <NavLink to="/" className="showItems" activeClassName="ActivePageLink">Оформить заказ</NavLink>
                        </div> :

                        <div>
                            <img src="../img/cart_empty.png" alt="корзина"/>
                            <NavLink to="/" className="showItems" activeClassName="ActivePageLink">Посмотреть товары</NavLink>
                        </div>
                }

            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        basket: state.basket,
    };
};

export default connect(mapStateToProps)(Page_Basket);