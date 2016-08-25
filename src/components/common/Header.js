import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SearchHeader } from './SearchHeader';
import * as searchActions from '../../actions/searchHeaderActions';

@connect(
  (state, ownProps) => ({}), 
  (dispatch) => ({ actions: bindActionCreators(searchActions, dispatch) })
)
export class Header extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      searchActive: false,
      filter: ""
    };

    this.toggleSearchBox = this.toggleSearchBox.bind(this);
    this.updateFilterState = this.updateFilterState.bind(this);
    this.searchRecords = this.searchRecords.bind(this);
  }

  activeLink(route) {
    const isActive = this.context.router.isActive(route, true);
    return isActive ? "active" : "";
  }

  toggleSearchBox() {
    let showSearchBox = this.state.searchActive;
    const filter = this.state.filter;
    showSearchBox = filter !== "" ? false : showSearchBox;

    this.setState({ searchActive: !showSearchBox });
    this.props.actions.updateFilterState(this.state.filter);
  }

  updateFilterState(event) {
    return this.setState({ filter: event.target.value });
  }

  searchRecords(event) {
    event.preventDefault();
    this.props.actions.updateFilterState(this.state.filter);
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav className="blue darken-2">
          <div className="nav-wrapper">
            <IndexLink to="/" className="brand-logo"><i className="material-icons">library_books</i>Cookbook</IndexLink>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <SearchHeader
                active={this.state.searchActive}
                filter={this.state.filter}
                onToggle={this.toggleSearchBox}
                onChange={this.updateFilterState}
                onSearch={this.searchRecords}/>

              <li className={this.activeLink('/recipes') || this.activeLink('/') ? 'active': ""}><Link to="/recipes">Recipes</Link></li>
              <li className={this.activeLink('/about')}><Link to="/about">About</Link></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
              <li>
                <div className="userView">
                  <img className="background" src="images/office.jpg"/>
                  <a href="#!user"><img className="circle" src="images/yuna.jpg"/></a>
                  <a href="#!name"><span className="white-text name">John Doe</span></a>
                  <a href="#!email"><span className="white-text email">jdandturk @gmail.com</span></a>
                </div>
              </li>
              <li><a href="#!"><i className="material-icons">cloud</i>First Link With Icon</a></li>
              <li><a href="#!">Second Link</a></li>
              <li>
                <div className="divider"></div>
              </li>
              <li><a className="subheader">Subheader</a></li>
              <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}