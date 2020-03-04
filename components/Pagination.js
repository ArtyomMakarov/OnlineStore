import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Pagination.css';

class Pagination extends React.Component {

    static propTypes = {
        totalItems: PropTypes.number.isRequired,
        itemsPerPage: PropTypes.number.isRequired,
    };

    render (){
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(this.props.totalItems / this.props.itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <ul className='pagination'>
                <li className='page-item'>
                    <NavLink exact to="/"  className='main_page' activeClassName="ActivePageLink">
                        Все товары
                    </NavLink>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <NavLink  to={"/items/" + number}  className='page-link' activeClassName="ActivePageLink">
                            {number}
                        </NavLink>
                    </li>
                ))}
            </ul>
        );
    }
}

export default Pagination;