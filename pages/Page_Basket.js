import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {itemButtonDeleteAll} from '../redux/basketAC';
import './Page_Basket.css';
import BasketItem from "../components/BasketItem";
import {voteEvents} from "../components/events";

class Page_Basket extends React.PureComponent{
    
    state = {
        items: this.props.basket.basketItems,
    };

    componentDidMount = ()=> {
      voteEvents.addListener("EDeleteItem", this.itemDeleted);
    };

    componentWillUnmount = () => {
      voteEvents.removeListener("EDeleteItem", this.itemDeleted)
    };

    itemDeleted = (id) => {
        let newItems = [...this.state.items];
        var filterArr = newItems.filter(item =>
            item.id !== id
        );
        this.setState({items: filterArr});
    };

    deleteAllItems = () => {
        this.props.dispatch(itemButtonDeleteAll());
    };
    
    render() {
        console.log(this.props.basket);
        var itemsCode = this.state.items.map(item => <BasketItem key={item.id} item={item}/>);
        return(
            <div className="basketPage">
              <h1 className='shopBasketName'>Online Store</h1>
              <h2 className="basketName">Корзина</h2>
                {
                    this.state.items.length>0?
                        <div className="basket-table-wrapper">
                            <table className='basketTable'>
                                <tbody className='basketBody'>{itemsCode}</tbody>
                            </table>
                            <NavLink to="/" className="showItems" onClick={this.deleteAllItems} activeClassName="ActivePageLink">Оформить заказ</NavLink>
                        </div> :

                        <div>
                            <img src="../img/cart-empty.png" alt="корзина" className="basketImg"/>
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