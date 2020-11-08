import React, { ReactElement, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Button, Image, LogBox, StyleSheet, ToastAndroid, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import TaskComponent from '../components/TaskComponent';
import { bindActionCreators } from 'redux';
import { addTask, deleteTask, updateTask, TaskProps, setTasks, deleteAll } from '../actions/todo';
import TextInputLocal from '../components/TextInput';
import { updateTodoList, deleteTodoList, queryAllTodoLists, insertNewTodoList, deleteAllTodoList  } from '../databases/allSchemas';

interface MainScreenProps {
    todo: TaskProps[];
    navigation: any;
    addTask: any;
    deleteTask: any,
    updateTask: any,
    setTasks: any,
    deleteAll: any,
};

const styles = StyleSheet.create({});

const MainScreen: React.FC<MainScreenProps> = (props): ReactElement => {
    const [value, onChangeText] = useState('');

    const _addTask = (title: string) => {
        if (title.trim() === '') {
            ToastAndroid.show('Please fill the field', ToastAndroid.LONG);
            return
        }
        props.addTask({
            id: String(Math.floor(Date.now() / 1000)), 
            title,
            creationDate: new Date()
        });
        addNewData(title);
        onChangeText('');
    };
    const _deleteTask = (index: number) => {
        props.deleteTask(index);
        deleteData(props.todo[index].id);
    };
    const _updateTask = (index: number, item: TaskProps) => {
        LogBox.ignoreLogs([
            'Non-serializable values were found in the navigation state',
        ]);
        props.navigation.navigate('Update', {
            item,
            onGoBack: (callback: any) => {
                props.updateTask(index, callback.title);
                updateData({
                    id: item.id,
                    title: callback.title,
                    creationDate: item.creationDate
                });
            }
        });
    };
    const renderItem = (props: any) => 
        <TaskComponent 
            item={props.item} 
            index={props.index}
            deleteTask={_deleteTask}
            updateTask={_updateTask} />

    const reloadData = () => {
        queryAllTodoLists().then((todoLists: any) => {
            const r = [];
            for (let i = 0; i < todoLists.length; i++) {
                r.push({
                    id: todoLists[i].id,
                    title: todoLists[i].title,
                    creationDate: todoLists[i].creationDate
                })
            }
            props.setTasks(r);
        }).catch((error:any) => {
            props.setTasks([]);
        });
    };
    const addNewData = (title: string) => {
        const newTodoObj = {
            id: String(Math.floor(Date.now() / 1000)),
            title,
            creationDate: new Date()
        };
        insertNewTodoList(newTodoObj).then().catch(error => {
            ToastAndroid.show(`Error ${error}`, ToastAndroid.LONG);
        });
    }
    const updateData = (data: TaskProps) => {
        updateTodoList(data).then().catch((error) => {
            ToastAndroid.show(`Error ${error}`, ToastAndroid.LONG);
        }) 
    };
    const deleteData = (id: string) => {
        deleteTodoList(id).then().catch((error) => {
            ToastAndroid.show(`Error ${error}`, ToastAndroid.LONG);
        })
    }
    const deleteAllData = () => {
        Alert.alert('Removing all data', 'Are you sure to remove all data?', [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => {
                props.deleteAll();
                deleteAllTodoList().then().catch((error) => {
                    ToastAndroid.show(`Error ${error}`, ToastAndroid.LONG);
                });
            }}
          ],
        { cancelable: false });
    }
    
    useEffect(() => {
        reloadData();
    }, [])

    useLayoutEffect(() => {
        props.navigation.setOptions({
            // headerStyle: {
            //     backgroundColor: '#A52A2A',
            // },
            // headerTintColor: '#FDF4E3',
            // headerTitleStyle: {
            //     fontWeight: 'bold',
            // },
            headerRight: () => (
                <TouchableOpacity onPress={() => deleteAllData()}>
                    <Image 
                        style={{ width: 25, height: 25, marginRight: 10 }} 
                        source={require('../assets/icons/delete.png')} />
                </TouchableOpacity>
              ),
        });
    }, [props.navigation]);

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#FDF4E3' }}>
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 10 
            }}>
                <TextInputLocal
                    onChangeText={onChangeText}
                    value={value}
                />
                <TouchableOpacity onPress={() => _addTask(value)}>
                    <Image 
                        style={{ width: 30, height: 30 }} 
                        source={require('../assets/icons/add-button.png')} />
                </TouchableOpacity>
                {/* <Button title="Add" onPress={() => _addTask(value)} /> */}
            </View>
            <FlatList
                contentContainerStyle={{paddingBottom: 64}}
                data={props.todo}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
            />
        </View>
    )
};

const mapStateToProps = (state: any) => {
    const {todo} = state
    return {todo}
  };

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({ addTask, deleteTask, updateTask, setTasks, deleteAll }, dispatch)
);
  
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);