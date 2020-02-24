import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import { IUser, UserActionTypes } from '../../store/User/types';
import { session } from '../../store/User/actions';
import { AppState } from '../../store/index';

import Navbar from '../../containers/Navbar/Navbar';
import List from '../../containers/List/List';
import SignModal from '../../containers/SignModal/SignModal';

import './Main.css';

interface IMainViewProps {
  user: IUser;
  isAuth: boolean;
  error: boolean;
  onSession: () => Promise<void>;
}

interface IMainViewState {
  loading: boolean;
}

export class MainView extends React.Component<IMainViewProps, IMainViewState> {
  constructor(props: IMainViewProps) {
    super(props);

    this.state = { loading: true };
  }

  public async componentDidMount() {
    await this.props.onSession();
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
      this.props.isAuth ? <List /> : <SignModal />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user.user,
  isAuth: state.user.isAuth,
  error: state.user.error,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, UserActionTypes>) => {
  return {
      onSession: () => dispatch(session()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
