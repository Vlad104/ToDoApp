import React from 'react';

import { Modal } from '../../components/Modal/Modal';
import { Input } from '../../components/Input/Input'; 

interface ISignModalProps {

}

interface ISignModalState {
    isOpen: boolean;
}

export default class SignModal extends React.Component<ISignModalProps, ISignModalState> {
    constructor(props: ISignModalProps) {
        super(props);

        this.state = { isOpen: true };
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
            <>
                <Input
                    text="Логин"
                    onChange={(txt: string) => true}
                    onReset={() => true}
                    onSave={() => true}
                />
                <Input
                    text="Пароль"
                    onChange={(txt: string) => true}
                    onReset={() => true}
                    onSave={() => true}
                />
            </>
        );
    }

    private onClose = () => {
        this.setState({ isOpen: false });
    }
}
