import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './controls/LoadingDots';

class Header extends React.Component {

  constructor(props, context) {
    super(props, context);
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
          {this.props.loading && <div className=""><LoadingDots interval={100} dots={20}/></div>}
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li className={this.activeLink('/')}><IndexLink to="/">Home</IndexLink></li>
            <li className={this.activeLink('/recipes')}><Link to="/recipes">Recipes</Link></li>
            <li className={this.activeLink('/about')}><Link to="/about">About</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  loading: PropTypes.bool.isRequired
};

Header.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Header;