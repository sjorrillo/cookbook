import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import autobind from 'autobind-decorator';
import { SearchHeader } from './SearchHeader';
import { SideNav } from './SideNav';
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
  }

  componentDidMount() {
     $(".button-collapse").sideNav();
  }

  componentDidUpdate(){
     $(".button-collapse").sideNav();
  }

  @autobind
  activeLink(route) {
    const isActive = this.context.router.isActive(route, true);
    return isActive ? "active" : "";
  }
 
  @autobind
  toggleSearchBox() {
    let showSearchBox = this.state.searchActive;
    const filter = this.state.filter;
    showSearchBox = filter !== "" ? false : showSearchBox;

    this.setState({ searchActive: !showSearchBox });
    this.props.actions.updateFilterState(this.state.filter);
  }

  @autobind
  updateFilterState(event) {
    return this.setState({ filter: event.target.value });
  }

  @autobind
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

              <li className={this.activeLink('/recipes') || this.activeLink('/')}><Link to="/recipes">Recipes</Link></li>
              <li className={this.activeLink('/about')}><Link to="/about">About</Link></li>
            </ul>
            <SideNav activeLink={this.activeLink}/>
          </div>
        </nav>
      </div>
    );
  }
}