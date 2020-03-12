import React from 'react';
import { MdPerson } from 'react-icons/md';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';

import { IUser, UserActionTypes } from '../../store/User/types';
import { AppState } from '../../store/index';
import { signOut } from '../../store/User/actions';

import './User.css';

interface IUserProps {
    className?: string;
    user: IUser;
    isAuth: boolean;
    error: boolean;
    onSignOut: () => Promise<void>;
}

interface IUserState {
    panelShow: boolean;
}

class User extends React.Component<IUserProps, IUserState> {
    constructor(props: IUserProps) {
        super(props);

        this.state = { panelShow: false };
    }

    public render() {
        return (
            <>
                <MdPerson
                    className={`user__image ${this.props.className}`}
                    onClick={this.tooglePanel}
                />
                {this.state.panelShow && this.renderPanel()}
            </>
        );
    }

    private renderPanel() {
        return (
            <div className="panel" onClick={this.tooglePanel}>
                {this.props.isAuth ? (
                    <>
                        <a className="panel__button">Настройки</a>
                        <a className="panel__button" onClick={this.props.onSignOut}>Выход</a>
                    </>
                ) : (
                    <>
                        <a className="panel__button">Вход</a>
                        <a className="panel__button">Регистрация</a>
                    </>
                )}
            </div>
        );
    }

    private tooglePanel = () => {
        this.setState({ panelShow: !this.state.panelShow });
    }
}

const mapStateToProps = (state: AppState) => ({
    user: state.user.user,
    isAuth: state.user.isAuth,
    error: state.user.error,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, UserActionTypes>) => {
    return {
        onSignOut: () => dispatch(signOut()),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(User);
