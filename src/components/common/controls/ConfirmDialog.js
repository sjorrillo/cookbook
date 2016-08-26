import React, {PropTypes} from 'react';

export const ConfirmDialog = ({id, title, message, objectId, onOkAction, onCancelAction}) => {
    return (
            <div id={id} className="modal">
                <div className="modal-content">
                    <h5 className="truncate">{title}</h5>
                    <div>{message}</div>
                </div>
                <div className="modal-footer">
                    <button className="modal-action modal-close waves-effect waves-blue btn-flat" onClick={onOkAction.bind(this, objectId)}>Ok</button>
                    <button className="modal-action modal-close waves-effect waves-blue btn-flat" onClick={onCancelAction}>Cancel</button>
                </div>
            </div>
    );
};

ConfirmDialog.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    objectId: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    onOkAction: PropTypes.func.isRequired,
    onCancelAction: PropTypes.func
}