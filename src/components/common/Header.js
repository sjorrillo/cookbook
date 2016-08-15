import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

class Header extends React.Component {

  constructor(state, context) {
    super(state, context);
  }

  activeLink(route) {
    const isActive = this.context.router.isActive(route, true);
    return isActive ? "active" : "";
  }

  render() {
    return (
      <nav className="red accent-3">
        <div className="nav-wrapper">
          <IndexLink to="/" className="brand-logo">CookBook</IndexLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className={this.activeLink('/')}><IndexLink to="/">Home</IndexLink></li>
            <li className={this.activeLink('/receipes')}><Link to="/receipes">Receipes</Link></li>
            <li className={this.activeLink('/about')}><Link to="/about">About</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Header;