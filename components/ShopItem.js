import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import isoFetch from 'isomorphic-fetch';

import {itemButtonAdd} from '../redux/basketAC';

import './ShopItem.css';
import {voteEvents} from "./events";

class ShopItem extends React.PureComponent {

    static propTypes = {
        item: PropTypes.object.isRequired,
    };

    state = {
        item: this.props.item,
    };

    editItem = () => {
        voteEvents.emit("EEditItem",this.props.item.id);
    };

    deleteItem = () => {
      voteEvents.emit("EDeleteItem", this.props.item.id);
    };

    addItemToBasket = () => {
        let arr = [];
        function isNegative(number) {
            return number<0;
        }
        this.props.basket.basketItems.forEach((item) => {
            if(item.id == this.props.item.id) {
                alert('Товар уже есть в корзине!');
                arr.push(1);
            } else {
                arr.push(-1);
            }
        });
         if (arr.every(isNegative)) {
             this.props.dispatch(itemButtonAdd(this.props.item));
         }
    };

    render() {
        console.log("ShopItem id=" + this.state.item.id + "render");
        return (
            <tr>
                <td className='cell'><img src={this.props.item.img} className="itemImg"/></td>
                <td className='cell'>
                    <span className="itemName">{this.props.item.name}</span>
                    <span className="itemInfo">{this.props.item.info}</span>
                </td>
                <td className='cell itemPrice'>{this.props.item.price + ' р.'}</td>
                <td className='cell'>
                    <input type='button' className='controlButton' value='Редактировать' onClick={this.editItem}/>
                </td>
                <td className="cell">
                    <input type='button' className='controlButton' value='Удалить' onClick={this.deleteItem}/>
                </td>
                <td className="cell">
                    <input type='button' className='controlButton' value='Добавить в корзину' onClick={this.addItemToBasket}/>
                </td>
            </tr>
        );
    }

}

const mapStateToProps = function (state) {
    return {
        basket: state.basket,
    };
};

export default connect(mapStateToProps)(ShopItem);