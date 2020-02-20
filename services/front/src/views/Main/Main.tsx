import React from 'react';

import userService from '../../services/UserService';

import Navbar from '../../containers/Navbar/Navbar';
import List from '../../containers/List/List';
import SignModal from '../../containers/SignModal/SignModal';

import './Main.css';

interface IMainViewProps {
  visits?: boolean;
}

interface IMainViewState {
  auth: boolean;
  loading: boolean;
}

export class MainView extends React.Component<IMainViewProps, IMainViewState> {
  constructor(props: IMainViewProps) {
    super(props);

    this.state = { auth: false, loading: true };
  }

  public async componentDidMount() {
    try {
      await userService.checkSession();
      this.setState({ auth: true });
    } catch(err) {
      this.setState({ auth: false });
    }
    this.setState({ loading: false });
  }

  public render() {
    return (
      <div className="main-view">
        <Navbar />
        {!this.state.loading && this.renderContent()}
      </div>
    );
  }

  public renderContent() {
    return (
      this.state.auth ? <List /> : <SignModal />
    );
  }
}

export default MainView;
