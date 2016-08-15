import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const ReceipeListRow = ({receipe}) => {
  return (
    <tr>
      <td><a href={receipe.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/receipe/' + receipe.id}>{receipe.title}</Link></td>
      <td>{receipe.authorId}</td>
      <td>{receipe.category}</td>
      <td>{receipe.length}</td>
    </tr>
  );
};

ReceipeListRow.propTypes = {
  receipe: PropTypes.object.isRequired
};

export default ReceipeListRow;