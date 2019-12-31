import React from 'react';
import { MdPerson } from 'react-icons/md';

import './User.css';

interface IUserProps {
    className?: string;
}

interface IUserState {
    panelShow: boolean;
}

export default class User extends React.Component<IUserProps, IUserState> {
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
            <div className="panel">
                <a className="panel__button">Вход</a>
                <a className="panel__button">Регистрация</a>
            </div>
        );
    }

    private tooglePanel = () => {
        this.setState({ panelShow: !this.state.panelShow });
    }
}
