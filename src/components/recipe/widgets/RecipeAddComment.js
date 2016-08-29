import React, { PropTypes } from 'react';
import { TextArea } from '../../common/controls/TextArea';

export const RecipeAddComment = ({comment, onAddComment, onChange, saving}) => {    
    return (
        <div>
             <form onSubmit={onAddComment}>
                 <div className="row">
                    <h5 className="header">Leave a comment</h5>
                    <TextArea
                        name="content"
                        label="Description of Preparation"
                        placeholder="Comment"
                        value={comment.content}
                        onChange={onChange}
                        wrapperClass="s12"
                        showLabel={false}/>
                  </div>
                   <div className="row">
                        <div className="input-field col s12">
                            <input
                                type="submit"
                                name="saveButton"
                                disabled={saving}
                                value={saving ? 'Adding...' : 'Add Comment'}
                                className="btn waves-effect waves-light right"/>
                        </div>
                  </div>
            </form>
        </div>
    );
};

RecipeAddComment.propTypes = {
    comment: PropTypes.object.isRequired,
    onAddComment: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool.isRequired
};