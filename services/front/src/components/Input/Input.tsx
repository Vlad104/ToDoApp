import React from 'react';
import { IoIosClose } from 'react-icons/io';
import './Input.css';

interface IInputProps {
    text: string;
    placeholder?: string;
    type: string;
    className?: string;
    onChange: (text: string) => void;
    onReset: () => void;
    onSave: () => void;
}

export class Input extends React.Component<IInputProps> {
    private ref = React.createRef<HTMLInputElement>();

    static defaultProps = {
        type: "text",
    };

    public render() {
        return (
            <div className={`${this.props.className} input`}>
                <input
                    ref={this.ref}
                    type={this.props.type}
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

    public focus = () => {
        this.ref.current?.focus();
    }
}
