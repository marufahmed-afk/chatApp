import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getGroups } from '../../actions/groups';

// Component imports
import GroupItem from './GroupItem';
import AddGroup from './AddGroup';

const Groups = ({
  interaction: { openSidebar },
  groups: { groups },
  getGroups,
}) => {
  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const [openForm, setOpenForm] = useState(false);

  return (
    <div className={`group-box ${openSidebar ? 'openSidebar' : ''}`}>
      <div className='group-header'>
        <h2 className='title'>GROUPS</h2>
        <button className='btn' onClick={() => setOpenForm(!openForm)}>
          <img
            src={require('../../assets/add-white.svg')}
            alt=''
            className='brand-logo'
          />
        </button>
      </div>

      {openForm ? (
        <AddGroup openForm={openForm} setOpenForm={setOpenForm} />
      ) : (
        groups &&
        groups.map((group) => <GroupItem key={group._id} group={group} />)
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  interaction: state.interaction,
  groups: state.groups,
});

export default connect(mapStateToProps, { getGroups })(Groups);
