import React from 'react';
import { connect } from 'react-redux';

import { setCurrentGroup } from '../../actions/groups';

const GroupItem = ({ group, setCurrentGroup }) => {
  const handleClick = () => {
    setCurrentGroup(group);
  };

  return (
    <div className='group-item' onClick={handleClick}>
      <h3 className='group-name'>{group.name}</h3>
    </div>
  );
};

export default connect(null, { setCurrentGroup })(GroupItem);
