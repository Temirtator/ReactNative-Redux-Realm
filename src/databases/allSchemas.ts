import Realm from 'realm';
import { TaskProps } from '../actions/todo';

export const todolist_schema = 'Todolist';
export const todo_schema = 'Todo';

export const TodoSchema = {
    name: todo_schema,
    primaryKey: 'id',
    properties: {
        id: 'string',
        title: { type: 'string', indexed: true },
        done: { type: 'bool', default: false }
    }    
};

export const TodoListSchema = {
    name: todolist_schema,
    primaryKey: 'id',
    properties: {
        id: 'string',
        title: 'string',
        creationDate: 'date',
    }
};

const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoListSchema, TodoSchema],
    schemaVersion: 0, // optional
}

export const insertNewTodoList = (newTodoList: TaskProps) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(todolist_schema, newTodoList);
            resolve(newTodoList);
        }); 
    }).catch((error) => reject(error));
});

export const updateTodoList = (todoList: TaskProps) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let updatingTodoList: any = realm.objectForPrimaryKey(todolist_schema, todoList.id);
            updatingTodoList.title = todoList.title; 
            resolve(); 
        }); 
    }).catch((error) => reject(error));
});

export const deleteTodoList = (todoListId: string) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let deletingTodoList = realm.objectForPrimaryKey(todolist_schema, todoListId);
            realm.delete(deletingTodoList); 
            resolve();
        }); 
    }).catch((error) => reject(error));
});

export const deleteAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allTodoLists = realm.objects(todolist_schema); 
            realm.delete(allTodoLists);
            resolve();
        }); 
    }).catch((error) => reject(error));
});

export const queryAllTodoLists = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let allTodoLists = realm.objects(todolist_schema); 
            resolve(allTodoLists);
        }); 
    }).catch((error) => reject(error));
}); 

export default new Realm(databaseOptions);