import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IListItem, ListActionTypes } from '../../store/List/types';
import { addItem, deleteItem, resetAll, saveState, loadState } from '../../store/List/actions';
import { AppState } from '../../store/index';

import { InputForm } from '../../components/InputForm/InputForm';
import { ListItem } from './Item/ListItem';

import './List.css';

interface IListProps {
    items: IListItem[];
    onAddItem: typeof addItem;
    onDeleteItem: typeof deleteItem;
    onResetAll: typeof resetAll;
    onSaveState: typeof saveState;
    onLoadState: typeof loadState;
}

class List extends React.Component<IListProps> {
    constructor(props: IListProps) {
        super(props);
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            this.props.onSaveState();
        });
    }

    public componentDidMount() {
        this.props.onLoadState();
    }

    public render() {
        return (
            <div className="list">
                <InputForm
                    placeholder="Enter new task ..."
                    onSave={this.onAddItem}
                    onReset={this.props.onResetAll}
                />
                {this.props.items.map((item, index) =>
                    <ListItem
                        key={index}
                        item={item}
                        onClick={this.onDelete(index)}
                    />
                )}
            </div>
        )
    }

    private onAddItem = (text: string) => {
        this.props.onAddItem({ text });
    }

    private onDelete = (index: number) => {
        return () => {
            this.props.onDeleteItem(this.props.items[index])
        }
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
        onSaveState: () => dispatch(saveState()),
        onLoadState: () => dispatch(loadState()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
