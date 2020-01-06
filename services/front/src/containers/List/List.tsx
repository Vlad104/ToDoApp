import React from 'react';
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux';
import moment from 'moment';

import { ITask, ListActionTypes } from '../../store/List/types';
import {
    fetchTasks, createTask, deleteTask,
    deleteAllTasks
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
    onFetchTasks: () => Promise<void>;
    onCreateTask: (item: ITask) => Promise<void>;
    onDeleteTask: (item: ITask) => Promise<void>;
    onDeleteAllTasks: () => Promise<void>;
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
                    onSave={this.onAddTask}
                    onReset={this.props.onDeleteAllTasks}
                />
                {this.props.items.map((item) =>
                    <ListItem
                        key={item.id}
                        item={item}
                        onClick={this.onDelete(item)}
                    />
                )}
            </div>
        )
    }

    private onAddTask = (text: string) => {
        const id = this.props.items[0] ? this.props.items[0].id + 1 : 1;
        const created = moment().format();
        this.props.onCreateTask({ id, text, created });
    }

    private onDelete = (item: ITask) => {
        return () => {
            this.props.onDeleteTask(item)
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
        onFetchTasks: () => dispatch(fetchTasks()),
        onCreateTask: (item: ITask) => dispatch(createTask(item)),
        onDeleteTask: (item: ITask) => dispatch(deleteTask(item)),
        onDeleteAllTasks: () => dispatch(deleteAllTasks()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
