import React from 'react';

import Navbar from '../../containers/Navbar/Navbar';
import List from '../../containers/List/List';
import SignModal from '../../containers/SignModal/SignModal';

import './Main.css';

const MainView: React.FC = () => {
  return (
    <div className="main-view">
      <Navbar />
      <List />
      <SignModal />
    </div>
  );
}

export default MainView;
