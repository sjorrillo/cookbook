import React, {PropTypes} from 'react';

const RecipeComments = ({comments}) => {
  return (
        <div className="card white">
            <div className="card-content">
                <h4 className="header">Comments</h4>
                {comments.map(comment =>
                    <div key={comment.id}>
                        <p>{comment.content}</p>
                    </div>
                )}
            </div>
        </div>
  );
};

RecipeComments.propTypes = {
  comments: PropTypes.object.isRequired
};

export default RecipeComments;