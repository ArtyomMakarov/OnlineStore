import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Pagination.css';
import {voteEvents} from "./events";

class Pagination extends React.Component {

    static propTypes = {
        totalItems: PropTypes.number.isRequired,
        itemsPerPage: PropTypes.number.isRequired,
    };

    paginate = (e) => {
        voteEvents.emit("EPaginate", e.target.textContent)
    };

    render (){
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(this.props.totalItems / this.props.itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        return (
            <ul className='pagination'>
                <li className='page-item'>
                    <NavLink exact to="/" onClick={this.paginate} className='page-link' >
                        Все товары
                    </NavLink>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <NavLink  to={"/items/" + number} onClick={this.paginate} className='page-link'>
                            {number}
                        </NavLink>
                    </li>
                ))}
            </ul>
        );
    }
}

export default Pagination;