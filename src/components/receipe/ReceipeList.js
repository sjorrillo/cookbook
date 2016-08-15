import React, {PropTypes} from 'react';
import ReceipeListRow from './ReceipeListRow';

const ReceipeList = (props) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
      </tr>
      </thead>
      <tbody>
      {props.receipes.map(receipe =>
        <ReceipeListRow key={receipe.id} receipe={receipe}/>
      )}
      </tbody>
    </table>
  );
};

ReceipeList.propTypes = {
  receipes: PropTypes.array.isRequired
};

export default ReceipeList;