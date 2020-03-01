import React from 'react';
import PropTypes from 'prop-types';
import isoFetch from 'isomorphic-fetch';

import ShopItem from './ShopItem';
import ShopItemForm from './ShopItemForm';
import Pagination from './Pagination';
import BasketButton from './BasketButton';
import {voteEvents} from './events';
import './ShopCompany.css';

class ShopCompany extends React.PureComponent {

    static propTypes = {
        companyData: PropTypes.array.isRequired,
        itemsLength: PropTypes.number.isRequired,
        // pageNumber: PropTypes.number.isRequired,
    };

    state = {
        items: this.props.companyData,
        itemsPerPage: 10,
        pagination: false,
        pagesItems: null,
        mode: 0,                        // 0-start, 1-edit, 2-add
        id: 0,
        key: 0,
    };

    componentDidMount = () => {
        voteEvents.addListener('EEditItem',this.itemEdited);
        voteEvents.addListener('EDeleteItem',this.itemDeleted);
        voteEvents.addListener('ECancel', this.closeModal);
        voteEvents.addListener('EChangeItem', this.editItem);
        voteEvents.addListener('EPaginate', this.paginate);
    };

    componentWillUnmount = () => {
        voteEvents.removeListener('EEditItem',this.itemEdited);
        voteEvents.removeListener('EDeleteItem',this.itemDeleted);
        voteEvents.removeListener('ECancel', this.closeModal);
        voteEvents.removeListener('EChangeItem', this.editItem);
        voteEvents.removeListener('EPaginate', this.paginate);
    };

    paginate = () => {
      if (this.props.match.params.pageNumber>0) {
          isoFetch(`http://localhost:3000/items?_page=${this.props.match.params.pageNumber}`)
              .then(response => {
                  if (!response.ok)
                      throw new Error("fetch error " + response.status);
                  else
                      return response.json();
              })
              .then( data => {
                  this.setState({items: data, pagination: true});
              })
              .catch( error => {
                  this.fetchError(error.message);
              })
      } else {
          this.setState({pagination: false});
      }
    };

    itemEdited = (id) => {
        this.setState({id: id, mode: 1});
    };

    addItem = () => {
      this.setState({mode: 2, key: ++this.state.key});
    };

    closeModal = () => {
      this.setState({mode:0});
    };

    itemDeleted = (id) => {
        let answer = confirm('Удалить товар?');
        if (answer) {
            let newItems = [...this.state.items];
            var filterArr = newItems.filter(item =>
                item.id !== id
            );
            this.setState({items: filterArr});

            isoFetch(`http://localhost:3000/items/${id}`, {
                method: 'DELETE'
            });
        }
    };

    editItem = (newItem) => {

        let newItems = [...this.state.items];

        if (this.state.mode==1) {

            newItems=this.state.items.map((item)=>
                item.id==this.state.id?newItem:item
            );

            isoFetch(`http://localhost:3000/items/${this.state.id}`, {
                method: 'PUT',
                body: JSON.stringify(newItem),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
        } else {

            newItems.push(newItem);

            isoFetch("http://localhost:3000/items", {
                method: 'POST',
                body: JSON.stringify(newItem),
                headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            });
        }
        this.setState({items: newItems, mode: 0});
    };

    filterPopular = () => {
        this.setState({items: this.props.companyData});
    };

    filterCheap =() => {
        let filterItems = [...this.state.items];
        filterItems.sort((a,b) => a.price - b.price);
        this.setState({items: filterItems});
    };

    filterExpensive =() => {
        let filterItems = [...this.state.items];
        filterItems.sort((a,b) => b.price - a.price);
        this.setState({items: filterItems});
    };

    select = (e) => {
      switch (e.target.value) {
          case "Сначала популярные":
              this.filterPopular();
              break;
          case "Сначала дешёвые":
              this.filterCheap();
              break;
          default:
              this.filterExpensive();
      }
    };

    render() {
        console.log("ShopCompany render");

        var itemsCode = this.state.items.map(item => <ShopItem key={item.id} item={item}/>);
        var item = this.state.items.find(item => item.id == this.state.id);
        var newItem = {
            name: "",
            info: "",
            price: 0,
            img: "",
            id: this.state.key +"",
        };

        return (
            <div className="ShopCompanyWrapper">
                <div className='ShopCompany'>
                    <h1 className='shopName'>Online Store</h1>
                    <div className="ShopCompanyHeader">
                        <input type="button" className="addItem" value="Добавить товар" onClick={this.addItem}/>
                        <div className="pagination-wrapper">
                            <Pagination totalItems={this.props.itemsLength} itemsPerPage={this.state.itemsPerPage}/>
                        </div>
                        <div className="filter-wrapper">
                            <BasketButton/>
                            <select className="filterItems" onChange={this.select}>
                                <option value="Сначала популярные">Сначала популярные</option>
                                <option value="Сначала дешёвые">Сначала дешёвые</option>
                                <option value="Сначала дорогие">Сначала дорогие</option>
                            </select>
                        </div>
                    </div>
                    <table className='table'>
                        <tbody className='body'>{itemsCode}</tbody>
                    </table>
                </div>
                {
                    this.state.mode>0&&
                    <ShopItemForm mode={this.state.mode} item={this.state.mode==1?item:newItem}/>
                }
            </div>

        );

    }
};

export default ShopCompany;


