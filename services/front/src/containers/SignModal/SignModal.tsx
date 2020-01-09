import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';

import { IUser, UserActionTypes } from '../../store/User/types';
import { signIn, signUp } from '../../store/User/actions';
import { AppState } from '../../store/index';

import { Modal } from '../../components/Modal/Modal';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

import './SignModal.css';

enum FormType {
    SIGNIN = 'SIGNIN',
    SIGNUP = 'SIGNUP',
};

interface ISignModalProps {
    user: IUser;
    error: boolean;
    onSignIn: (login: string, password: string) => Promise<void>;
    onSignUp: (login: string, password: string) => Promise<void>;
    formType: FormType;
}

interface ISignModalState {
    isOpen: boolean;
    login: string;
    password: string;
}

class SignModal extends React.Component<ISignModalProps, ISignModalState> {
    static defaultProps = {
        formType: FormType.SIGNIN,
    }

    constructor(props: ISignModalProps) {
        super(props);

        this.state = {
            isOpen: true,
            login: '',
            password: ''
        };
    }

    public render() {
        return (
            <Modal
              isOpen={this.state.isOpen}
              header="Войти"
              body={this.renderBody()}
              onClose={this.onClose}
            />
        );
    }

    private renderBody() {
        return (
            <div className="sign-modal">
                <Input
                    text={this.state.login}
                    placeholder="yourmail@same.com"
                    className="sign-modal__field"
                    onChange={this.onChangeLogin}
                    onReset={this.onResetLogin}
                    onSave={() => true}
                />
                <Input
                    text={this.state.password}
                    type="password"
                    placeholder="password"
                    className="sign-modal__field"
                    onChange={this.onChangePassword}
                    onReset={this.onResetPassword}
                    onSave={() => true}
                />
                {this.renderSubmitButton()}
            </div>
        );
    }

    private renderSubmitButton() {
        if (this.props.formType === FormType.SIGNIN) {
            return (
                <Button
                    text="Войти"
                    onClick={this.onClickSignIn}
                />
            );
        } else {
            return (
                <Button
                    text="Регистрация"
                    onClick={this.onClickSignUp}
                />
            );
        }
    }

    private onChangeLogin = (value: string) => {
        this.setState({ login: value });
    }

    private onChangePassword = (value: string) => {
        this.setState({ password: value });
    }

    private onResetLogin = () => {
        this.setState({ login: '' });
    }

    private onResetPassword = () => {
        this.setState({ password: '' });
    }

    private onClose = () => {
        this.setState({ isOpen: false });
    }

    private onClickSignIn = async () => {
        try {
            await this.props.onSignIn(this.state.login, this.state.password);
            if (this.props.error) {
                throw new Error('Sign in error');
            }

            this.setState({ isOpen: false });
        } catch (err) {
            console.log(err);
        }
    }

    private onClickSignUp = async () => {
        try {
            await this.props.onSignUp(this.state.login, this.state.password);
            if (this.props.error) {
                throw new Error('Sign in error');
            }

            this.setState({ isOpen: false });
        } catch (err) {
            console.log(err);
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    user: state.user.user,
    error: state.user.error,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, UserActionTypes>) => {
    return {
        onSignIn: (login: string, password: string) => dispatch(signIn(login, password)),
        onSignUp: (login: string, password: string) => dispatch(signUp(login, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignModal);
