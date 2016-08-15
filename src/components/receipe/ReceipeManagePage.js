import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as receipeActions from '../../actions/receipeActions';
import ReceipeForm from './ReceipeForm';

class ReceipeManagePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            receipe: Object.assign({}, this.props.receipe),
            errors: {}
        };

        this.updateReceipeState = this.updateReceipeState.bind(this);
        this.saveReceipe = this.saveReceipe.bind(this);
    }

    updateReceipeState(event) {
        const field = event.target.name;
        let receipe = this.state.receipe;
        receipe[field] = event.target.value;
        return this.setState({receipe: receipe});
    }

    saveReceipe(event) {
        event.preventDefault();
        this.props.actions.saveReceipe(this.state.receipe);
    }

    render() {
        return (
            <div className="row">
                <div className="col s12">
                    <ReceipeForm
                        allAuthors={this.props.authors}
                        receipe={this.state.receipe}
                        errors={this.state.errors}
                        onChange={this.updateReceipeState}
                        onSave={this.saveReceipe}
                        />
                </div>
            </div>
        );
    }
}

ReceipeManagePage.propTypes = {
    receipe: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};


const mapStateToPorps = (state, ownProps) => {
    let receipe = { id: '', watchHref: '', title: '', authorId: '', length: '', category: '' };

    let authorsItemList = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName
        };
    });
    
    return {
        receipe: receipe,
        authors: authorsItemList
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(receipeActions, dispatch) });

export default connect(mapStateToPorps, mapDispatchToProps)(ReceipeManagePage);