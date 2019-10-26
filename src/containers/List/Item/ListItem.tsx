import React from 'react';

import { IListItem } from '../../../store/List/types';

interface IListItemProps {
    item: IListItem;
}

export const ListItem: React.FC<IListItemProps> = (props: IListItemProps) => {
    return (
        <p>{props.item.text}</p>
    )
}
