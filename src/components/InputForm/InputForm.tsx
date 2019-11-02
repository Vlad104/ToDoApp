import React from 'react';
import { IoIosAdd, IoIosRefresh } from 'react-icons/io';
import { Input } from '../Input/Input'; 

import './InputForm.css';

interface IInputFormProps {
    placeholder?: string;
    onSave: (text: string) => void;
    onReset: () => void;
}

interface IInputFormState {
    text: string;
}

export class InputForm extends React.Component<IInputFormProps, IInputFormState> {
    constructor(props: IInputFormProps) {
        super(props);
        this.state = { text: '' };
    }

    render() {
        return (
            <div className="input-form">
                <Input
                    text={this.state.text}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    onReset={this.reset}
                    onSave={this.onSave}
                />
                <IoIosAdd
                    className="input-form__button"
                    onClick={this.onSave}
                />
                <IoIosRefresh
                    className="input-form__button"
                    onClick={this.props.onReset}
                />
            </div>
        )
    }

    private onChange = (text: string) => {
        this.setState({ text });
    }

    private onSave = () => {
        const text = this.state.text.trim();
        this.setState({ text: '' });
        this.props.onSave(text);
    }

    private reset = () => {
        this.setState({ text: '' });
    }
}
