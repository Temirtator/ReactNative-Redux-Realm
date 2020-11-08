import { combineReducers } from 'redux';
import { TaskProps } from '../actions/todo';

const initialState: TaskProps[] = [];

const todoReducer = (state = initialState, action: any) => {
    let newList = [...state];
    switch (action.type) {
        case 'add':
            newList.push(action.task);
            return newList;
        case 'delete':
            newList.splice(action.index, 1);
            return newList;
        case 'update':
            newList[action.index].title = action.title;
            return newList;
        case 'setAll':
            return [...action.tasks];
        case 'deleteAll':
            return [];
        default:
            return state
    }
};

export default combineReducers({
  todo: todoReducer
});