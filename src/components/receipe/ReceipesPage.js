import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as receipeActions from '../../actions/receipeActions';
import ReceipeList from './ReceipeList';
import {browserHistory} from 'react-router';

class ReceipesPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.addReceipe = this.addReceipe.bind(this);
    }

    addReceipe() {
        browserHistory.push('/receipe');
    }

    render() {
        const {receipes} = this.props;
        return (
            <div className="row">
                <div className="col s12">
                    <div>
                        <h1>Receipes</h1>
                        <input type="button" value="Add Receipe" className="btn" onClick={this.addReceipe}/>
                        <ReceipeList receipes={receipes}/>
                    </div>
                </div>
            </div>
        );
    }
}

ReceipesPage.propTypes = {
    receipes: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToPorps = (state, ownProps) => ({ receipes: state.receipes });

const mapDispatchToProps = (dispatch) => ({actions: bindActionCreators(receipeActions, dispatch)});

export default connect(mapStateToPorps, mapDispatchToProps)(ReceipesPage);