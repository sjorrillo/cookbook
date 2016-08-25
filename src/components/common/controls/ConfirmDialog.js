import React, {PropTypes} from 'react';
import autobind from 'autobind-decorator';

export class ConfirmDialog extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            active: this.props.active
        };
    }

    hideDialog(){
        setTimeout(() => {
            this.setState({active: false});
        }, 400);
    }

    @autobind
    okAction(){
        this.hideDialog();
        this.props.onOk();
    }

    @autobind
    cancelAction(){
       this.hideDialog();
       if (typeof (onCancel) == "function") {
            this.props.onCancel();
       }
    }
   
    render() {
        const id = this.props.id;
        const wrapperClass = `dialog-container ${this.state.active ? "active": ""}`;
        console.log(wrapperClass);
        return (
            <div id={id} className={wrapperClass}>
                <div className="card">
                    <div className="card-content">
                        <div className="card-title">Titulo de modal</div>
                        <div>Mensaje de modal</div>
                    </div>
                    <div className="card-action dialog-button-bar">
                        <button className="btn-flat" id="cancelButton" onClick={this.cancelAction}>Cancelar</button>
                        <button className="btn-flat" id="okButton" onCkick={this.okAction}>Aceptar</button>
                    </div>
                </div>
            </div>
        );
    }
}

ConfirmDialog.propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};