import React from 'react';
// import { MdPerson } from 'react-icons/md';
import List from '../../containers/List/List';
import { Time } from '../../components/Time/Time';

import './Main.css';

const MainView: React.FC = () => {
  return (
    <div className="main-view">
      {/* <MdPerson className="main-view__person" /> */}
      <Time />
      <List />
    </div>
  );
}

export default MainView;
