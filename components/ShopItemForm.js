import React from 'react';
import PropTypes from 'prop-types';

import './ShopItemForm.css';
import {voteEvents} from "./events";

class ShopItemForm extends React.PureComponent {

    static propTypes = {
        mode: PropTypes.number.isRequired,
        item: PropTypes.shape({
            id:PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            info: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            img: PropTypes.string.isRequired
        })
    };

    state = {
        item: this.props.item,
        isValid: true,
    };

    componentDidMount = () => {
        this.props.mode==2?this.setState({isValid: false}): this.setState({isValid: true});
    };

    closeModal = () => {
        voteEvents.emit('ECancel');
    };

    newNameRef = null;
    newInfoRef =null;
    newImgRef= null;
    newPriceRef = null;

    setNewNameRef = (ref) => {
        this.newNameRef=ref;
    };

    setNewInfoRef = (ref) => {
        this.newInfoRef=ref;
    };

    setNewImgRef = (ref) => {
        this.newImgRef=ref;
    };

    setNewPriceRef = (ref) => {
        this.newPriceRef=ref;
    };

    validFunc = () => {
        if(this.newNameRef.value && this.newInfoRef.value && this.newImgRef.value && this.newPriceRef.value) {
            this.setState({isValid: true});
        } else {
            this.setState({isValid: false});
        }
    };

    setNewItem = () => {
        if ( this.newNameRef && this.newInfoRef && this.newImgRef && this.newPriceRef) {
            let newName=this.newNameRef.value;
            let newInfo=this.newInfoRef.value;
            let newImg=this.newImgRef.value;
            let newPrice=+(this.newPriceRef.value);
            let newItem = {...this.state.item,
                    name: newName,
                    info:newInfo,
                    img: newImg,
                    price: newPrice
            };
            voteEvents.emit('EChangeItem', newItem);
        }
    };

    render() {
        return (
            <div className='bg-modal' hidden={true}>
                <div className="modal-content">
                    <div className="close" onClick={this.closeModal}>+</div>

                    <h3>{this.props.mode==2?"Добавить новый товар":"Редактировать товар"}</h3>
                    <div className="modal-form">
                        <div className="form-error" hidden={this.state.isValid}>Все поля должны быть заполнены!</div>
                        <span className="itemId">№: {this.props.item.id}</span>

                        <label className='inputArea'>
                            <span className="fieldName">Название товара:</span>
                            <input type="text" name="name" onChange={this.validFunc} className="inputField" ref={this.setNewNameRef} defaultValue={this.props.item.name}/>
                        </label>

                        <label className='inputArea'>
                            <span className="fieldName">Описание товара:</span>
                            <textarea className="textField" ref={this.setNewInfoRef} onChange={this.validFunc} defaultValue={this.props.item.info}></textarea>
                        </label>

                        <label className='inputArea'>
                            <span className="fieldName">Цена:</span>
                            <input type="text" name="price" className="inputField" onChange={this.validFunc} ref={this.setNewPriceRef} defaultValue={this.props.item.price}/>
                        </label>

                        <label className='inputArea'>
                            <span className="fieldName">Добавить URL фото:</span>
                            <input type="text" name="price" className="inputField" onChange={this.validFunc} ref={this.setNewImgRef} defaultValue={this.props.item.img}/>
                        </label>

                        <input type="button" className="modalButton" disabled={!this.state.isValid} onClick={this.setNewItem} value={this.props.mode==2?"Добавить":"Сохранить"}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShopItemForm;