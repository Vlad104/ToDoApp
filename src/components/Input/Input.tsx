import React from 'react';
import { IoIosClose } from 'react-icons/io';
import './Input.css';

interface IInputProps {
    text: string;
    placeholder?: string;
    onChange: (text: string) => void;
    onReset: () => void;
    onSave: () => void;
}

export class Input extends React.Component<IInputProps> {
    render() {
        return (
            <div className="input">
                <input
                    type="text"
                    autoFocus
                    value={this.props.text}
                    placeholder={this.props.placeholder}
                    className="input__text"
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                />
                <IoIosClose
                    className="input__reset"
                    onClick={this.props.onReset}
                />
            </div>
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
