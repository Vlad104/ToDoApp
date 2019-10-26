import React from 'react';
import './Input.css';

interface IInputProps {
    text: string;
    placeholder?: string;
    onChange: (text: string) => void;
    onSave: () => void;
}

export class Input extends React.Component<IInputProps> {
    render() {
        return (
            <input
                type="text"
                autoFocus
                value={this.props.text}
                placeholder={this.props.placeholder}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
            />
        )
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.value);
    }

    private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.props.onSave();
        }
    }
}
