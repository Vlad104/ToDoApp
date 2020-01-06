import React from 'react';

import { ITask } from '../../../store/List/types';
import './ListItem.css';

interface ITaskProps {
    item: ITask;
    onClick: () => void;
}

export const ListItem: React.FC<ITaskProps> = (props: ITaskProps) => {
    return (
        <div className="list-item">
            <a
                className="list-item__text"
                onClick={props.onClick}
            >
                {props.item.text}
            </a>
        </div>
    )
}
