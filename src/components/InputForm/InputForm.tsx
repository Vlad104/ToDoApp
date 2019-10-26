import React from 'react';

import { Input } from '../Input/Input'; 

import './InputForm.css';

interface IInputFormProps {
    placeholder?: string;
    onSave: (text: string) => void;
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
            <div>
                <Input
                    text={this.state.text}
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    onSave={this.onSave}
                />
                <input
                    type="button"
                    value="+"
                    onClick={this.onSave}
                />
                <input
                    type="button"
                    value="-"
                    onClick={this.reset}
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
