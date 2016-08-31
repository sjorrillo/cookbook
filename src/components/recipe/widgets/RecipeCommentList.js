import React, { PropTypes } from 'react';
import { RecipeAddComment } from './RecipeAddComment';
import { RecipeComment } from './RecipeComment';

export const RecipeCommentList = ({comments, newComment, onAddComment, onDeleteComment, onChange, saving, errors}) => {
  return (
        <div className="card white">
            <div className="card-content">
                {comments.length > 0 && <h4 className="header">Comments</h4>}
                <div className="collection">
                    {comments.length > 0 && comments.map(comment =>
                        <RecipeComment key={comment.id} comment={comment} onDeleteComment={onDeleteComment} />
                     )}
                </div>
                <RecipeAddComment comment={newComment} onAddComment={onAddComment} onChange={onChange} saving={saving} errors={errors}/>
            </div>
        </div>
  );
};

RecipeCommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  newComment: PropTypes.object.isRequired, 
  onAddComment: PropTypes.func.isRequired, 
  onDeleteComment: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired, 
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.object
};