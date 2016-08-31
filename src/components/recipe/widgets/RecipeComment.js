import React, { PropTypes } from 'react';

export const RecipeComment = ({comment, onDeleteComment }) => {
    const handleDelete = () => {
        if(typeof(onDeleteComment) == "function") onDeleteComment(comment);
    };

    return (
        <div className="collection-item avatar">
            <div>
                <i className="circle green">{comment.id}</i>
                <span className="title">Comment {comment.id}</span>

                <p>{comment.content}</p>
            </div>
            <a href="javascript:void(0);" className="secondary-content" onClick={handleDelete}><i className="material-icons">delete </i></a>
        </div>
    );
};

RecipeComment.propTypes = {
    comment: PropTypes.object.isRequired,
    onDeleteComment: PropTypes.func.isRequired
};