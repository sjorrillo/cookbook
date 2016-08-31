import React, { PropTypes } from 'react';
import { RecipeAddComment } from './RecipeAddComment';

export const RecipeComments = ({comments, newComment, onAddComment, onDeleteComment, onChange, saving, errors}) => {
  return (
        <div className="card white">
            <div className="card-content">
                {comments.length > 0 && <h4 className="header">Comments</h4>}
                <div className="collection">
                    {comments.length > 0 && comments.map(comment =>
                     <div key={comment.id} className="collection-item avatar">
                        <div>
                            <i className="circle green">{comment.id}</i>
                            <span className="title">Comment {comment.id}</span>

                            <p>{comment.content}</p>
                        </div>
                        <a href="javascript:void(0);" className="secondary-content" onClick={onDeleteComment.bind(this, comment)}><i className="material-icons">delete</i></a>
                    </div>
                )}
                </div>
                <RecipeAddComment comment={newComment} onAddComment={onAddComment} onChange={onChange} saving={saving} errors={errors}/>
            </div>
        </div>
  );
};

RecipeComments.propTypes = {
  comments: PropTypes.array.isRequired,
  newComment: PropTypes.object.isRequired, 
  onAddComment: PropTypes.func.isRequired, 
  onDeleteComment: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired, 
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.object
};