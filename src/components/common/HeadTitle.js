import React, {PropTypes} from 'react';

const HeadTitle = ({title, statusMessage, navigateBack}) => {
    let showLink = false;
    if(typeof(navigateBack) == "function") {
        showLink = true;
    }

    return (
        <div className="grey lighten-5">
          <div className="row valign-wrapper head-title">
            <div className="col s6">
              <h4 className="header">{title} {showLink && <small>(<a href="javascript:void(0)" onClick={navigateBack}>Go back</a>)</small>}</h4> 
            </div>
            <div className="col s6 ">
              <div className="grey-text right-align truncate">
                {statusMessage}
              </div>
            </div>
          </div>
        </div>
    );
};

HeadTitle.propTypes = {
    title: PropTypes.string.isRequired,
    statusMessage: PropTypes.string,
    navigateBack: PropTypes.func
};

export default HeadTitle;