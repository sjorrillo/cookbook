import React, {PropTypes} from 'react';

export const LoadingWheel = ({active}) => {
    let wrapperClass = `preloader-wrapper big ${active ? 'active' : ''}`; 
    return (
        <div className={wrapperClass}>
            <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                </div><div className="gap-patch">
                    <div className="circle"></div>
                </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
        </div>
    );
};

LoadingWheel.propTypes = {
    active: PropTypes.bool.isRequired
};