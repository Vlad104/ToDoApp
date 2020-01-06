import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';

import { IListItem, ListActionTypes } from '../../store/List/types';
import {
    addItem, deleteItem, resetAll,
    saveState, loadState, fetchState,
    createTask
} from '../../store/List/actions';
import { AppState } from '../../store/index';

import { InputForm } from '../../components/InputForm/InputForm';
import { Loading } from '../../components/Loading/Loading';
import { ListItem } from './Item/ListItem';

import './List.css';

interface IListProps {
    items: IListItem[];
    error: boolean;
    loading: boolean;
    onAddItem: typeof addItem;
    onDeleteItem: typeof deleteItem;
    onResetAll: typeof resetAll;
    onSaveState: typeof saveState;
    onLoadState: typeof loadState;
    onFetchState: () => Promise<void>;
    onCreateTask: (item: IListItem) => Promise<void>;
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
        // this.props.onLoadState();
        this.props.onFetchState();
    }

    public render() {
        if (this.props.error) {
            return <p>ERROR</p>;
        }

        if (this.props.loading) {
            return <Loading />;
        }

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
        // this.props.onAddItem({ text });
        this.props.onCreateTask({ text });
    }

    private onDelete = (index: number) => {
        return () => {
            this.props.onDeleteItem(this.props.items[index])
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    items: state.list.items,
    loading: state.list.loading,
    error: state.list.error,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, ListActionTypes>) => {
    return {
        onAddItem: (item: IListItem) => dispatch(addItem(item)),
        onDeleteItem: (item: IListItem) => dispatch(deleteItem(item)),
        onResetAll: () => dispatch(resetAll()),
        onSaveState: () => dispatch(saveState()),
        onLoadState: () => dispatch(loadState()),
        onFetchState: () => dispatch(fetchState()),
        onCreateTask: (item: IListItem) => dispatch(createTask(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
