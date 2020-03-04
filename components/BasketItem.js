import React from 'react';
import PropTypes from 'prop-types';
import {voteEvents} from "./events";
import {itemButtonDelete} from '../redux/basketAC';
import {connect} from "react-redux";

class BasketItem extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
    };

    deleteItem = () => {
        let answer = confirm('Удалить товар из корзины?');
        if (answer) {
            this.props.dispatch(itemButtonDelete(this.props.item.id));
            voteEvents.emit("EDeleteItem", this.props.item.id);
        }
    };

    render() {
        return(
            <tr>
                <td className='cell'><img src={this.props.item.img} className="itemImg"/></td>
                <td className='cell'>
                    <span className="itemName">{this.props.item.name}</span>
                    <span className="itemInfo">{this.props.item.info}</span>
                </td>
                <td className='cell itemPrice'>{this.props.item.price + ' р.'}</td>
                <td className="cell">
                    <input type='button' className='controlButton' onClick={this.deleteItem} value='Удалить'/>
                </td>
            </tr>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        basket: state.basket,
    };
};

export default connect(mapStateToProps)(BasketItem);