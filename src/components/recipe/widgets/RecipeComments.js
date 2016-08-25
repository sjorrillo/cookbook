import React, { PropTypes } from 'react';

export const RecipeComments = ({comments}) => {
  return (
        <div className="card white">
            <div className="card-content">
                <h4 className="header">Comments</h4>
                <div className="collection">
                    {comments && comments.map(comment =>
                     <div key={comment.id} className="collection-item avatar">
                        <div>
                            <i className="circle green">{comment.id}</i>
                            <span className="title">Comment {comment.id}</span>

                            <p>{comment.content}</p>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </div>
  );
};

RecipeComments.propTypes = {
  comments: PropTypes.array.isRequired
};