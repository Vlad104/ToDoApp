import React from 'react';
import { ThunkDispatch } from 'redux-thunk';
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

enum AutoFocus {
    LOGIN = 'LOGIN',
    PASSWORD = 'PASSWORD',
};

interface ISignModalProps {
    user: IUser;
    isAuth: boolean;
    error: boolean;
    onSignIn: (login: string, password: string) => Promise<void>;
    onSignUp: (login: string, password: string) => Promise<void>;
}

interface ISignModalState {
    login: string;
    password: string;
    formType: FormType;
    autoFocus: AutoFocus,
}

class SignModal extends React.Component<ISignModalProps, ISignModalState> {
    private inputLoginRef = React.createRef<Input>();
    private inputPasswordRef = React.createRef<Input>();

    constructor(props: ISignModalProps) {
        super(props);

        this.state = {
            login: '',
            password: '',
            formType: FormType.SIGNIN,
            autoFocus: AutoFocus.LOGIN,
        };
    }

    public render() {
        return (
            <Modal
                isOpen={!this.props.isAuth}
                header={this.renderHeader()}
                body={this.renderBody()}
                onClose={this.onClose}
            />
        );
    }

    private renderHeader() {
        const activeStyle = `sign-modal__header sign-modal__header_active`;
        const nonActiveStyle = `sign-modal__header`;

        return (
            <>
                <span
                    className={this.state.formType === FormType.SIGNIN ? activeStyle : nonActiveStyle}
                    onClick={this.changeFormType(FormType.SIGNIN)}
                >
                    Вход
                </span>
                <span
                    className={this.state.formType === FormType.SIGNUP ? activeStyle : nonActiveStyle}
                    onClick={this.changeFormType(FormType.SIGNUP)}
                >
                    Регистрация
                </span>
            </>
        );
    }

    private changeFormType = (formType: FormType) => {
        return () => {
            this.setState({
                formType
            });
        }
    }

    private renderBody() {
        return (
            <div className="sign-modal">
                <Input
                    ref={this.inputLoginRef}
                    text={this.state.login}
                    placeholder="yourmail@same.com"
                    className="sign-modal__field"
                    onChange={this.onChangeLogin}
                    onReset={this.onResetLogin}
                    onSave={this.focus(this.inputPasswordRef)}
                />
                <Input
                    ref={this.inputPasswordRef}
                    text={this.state.password}
                    type="password"
                    placeholder="password"
                    className="sign-modal__field"
                    onChange={this.onChangePassword}
                    onReset={this.onResetPassword}
                    onSave={this.signFormAction(this.state.formType)}
                />
                {this.renderSubmitButton()}
            </div>
        );
    }

    private renderSubmitButton() {
        return (
            <Button
                text={this.signFormText(this.state.formType)}
                onClick={this.signFormAction(this.state.formType)}
            />
        );
    }

    private focus = (ref: React.RefObject<Input>) => {
        return () => {
            ref.current?.focus();
        }
    } 

    private signFormText(type: FormType) {
        return FormType.SIGNIN ? 'Вход' : 'Регистрация';
    }

    private signFormAction(type: FormType) {
        return FormType.SIGNIN ? this.onClickSignIn : this.onClickSignUp;
    }

    private toogleInput = () => {
        this.setState({ autoFocus: AutoFocus.PASSWORD });
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
        return true;
    }

    private onClickSignIn = () => {
        this.props.onSignIn(this.state.login, this.state.password);
    }

    private onClickSignUp = () => {
        this.props.onSignUp(this.state.login, this.state.password);
    }
}

const mapStateToProps = (state: AppState) => ({
    user: state.user.user,
    isAuth: state.user.isAuth,
    error: state.user.error,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, UserActionTypes>) => {
    return {
        onSignIn: (login: string, password: string) => dispatch(signIn(login, password)),
        onSignUp: (login: string, password: string) => dispatch(signUp(login, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignModal);
