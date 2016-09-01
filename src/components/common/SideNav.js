import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const SideNav = ({ activeLink }) => {

    return (
        <ul className="side-nav" id="mobile-demo">
            <li>
                <div className="userView blue darken-3">
                    <a href="javascript:void(0)"><img className="circle" src="http://cdn.idigitaltimes.com/sites/idigitaltimes.com/files/styles/large/public/2015/04/27/ted-2.jpg"/></a>
                    <a href="javascript:void(0)"><span className="white-text name">Javier Orrillo</span></a>
                    <a href="javascript:void(0)"><span className="white-text email">javier @gmail.com</span></a>
                </div>
            </li>
            <li className={activeLink('/recipes') || activeLink('/')}><Link to="/recipes">Recipes</Link></li>
            <li className={activeLink('/about')}><Link to="/about">About</Link></li>
        </ul>
    );
};

SideNav.propTypes = {
    activeLink: PropTypes.func.isRequired
};