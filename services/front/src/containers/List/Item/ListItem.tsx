import React from 'react';

import { IListItem } from '../../../store/List/types';
import './ListItem.css';

interface IListItemProps {
    item: IListItem;
    onClick: () => void;
}

export const ListItem: React.FC<IListItemProps> = (props: IListItemProps) => {
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
