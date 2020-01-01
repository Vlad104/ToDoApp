import React from 'react';

import { Modal } from '../../components/Modal/Modal';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';

import './SignModal.css';

interface ISignModalProps {

}

interface ISignModalState {
    isOpen: boolean;
    login: string;
    password: string;
}

export default class SignModal extends React.Component<ISignModalProps, ISignModalState> {
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
                <Button
                    text="Войти"
                    onClick={() => true}
                />
            </div>
        );
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
}
