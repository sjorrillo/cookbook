import React, { PropTypes } from 'react';
import { Header } from './common/Header';
import { Footer } from './common/Footer';
import { connect } from 'react-redux';

@connect((state, ownProps) => ({loading: state.ajaxCallsInProgress > 0}))
export class App extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container-fluid">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }
}