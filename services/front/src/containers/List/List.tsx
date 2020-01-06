import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';

import { ITask, ListActionTypes } from '../../store/List/types';
import {
    deleteItem, resetAll,
    fetchTasks, createTask
} from '../../store/List/actions';
import { AppState } from '../../store/index';

import { InputForm } from '../../components/InputForm/InputForm';
import { Loading } from '../../components/Loading/Loading';
import { ListItem } from './Item/ListItem';

import './List.css';

interface IListProps {
    items: ITask[];
    loading: boolean;
    error: boolean;
    onDeleteItem: typeof deleteItem;
    onResetAll: typeof resetAll;
    onFetchTasks: () => Promise<void>;
    onCreateTask: (item: ITask) => Promise<void>;
}

class List extends React.Component<IListProps> {

    public componentDidMount() {
        this.props.onFetchTasks();
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
                    onSave={this.onaddTask}
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

    private onaddTask = (text: string) => {
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
        onDeleteItem: (item: ITask) => dispatch(deleteItem(item)),
        onResetAll: () => dispatch(resetAll()),
        onFetchTasks: () => dispatch(fetchTasks()),
        onCreateTask: (item: ITask) => dispatch(createTask(item)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
