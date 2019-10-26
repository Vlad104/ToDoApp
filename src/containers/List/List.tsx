import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IListState, IListItem, ListActionTypes } from '../../store/List/types';
import { addItem, deleteItem, resetAll } from '../../store/List/actions';
import { AppState } from '../../store/index';

import { InputForm } from '../../components/InputForm/InputForm';
import { ListItem } from './Item/ListItem';

import './List.css';

interface IListProps {
    items: IListItem[];
    onAddItem: typeof addItem;
    onDeleteItem: typeof deleteItem;
    onResetAll: typeof resetAll;
}

class List extends React.Component<IListProps> {
    render() {
        return (
            <div>
                <InputForm
                    placeholder="Enter new task"
                    onSave={this.onAddItem}
                />
                {this.props.items.map((item, index) =>
                    <ListItem
                        key={index}
                        item={item}
                    />
                )}
            </div>
        )
    }

    private onAddItem = (text: string) => {
        this.props.onAddItem({ text });
    }
}

const mapStateToProps = (state: AppState) => ({
    items: state.list.items
});

const mapDispatchToProps = (dispatch: Dispatch<ListActionTypes>) => {
    return {
        onAddItem: (item: IListItem) => dispatch(addItem(item)),
        onDeleteItem: (item: IListItem) => dispatch(deleteItem(item)),
        onResetAll: () => dispatch(resetAll()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
