import React, { ReactElement } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface TaskComponentProps {
    index: string;
    item: any;
    deleteTask: any;
    updateTask: any;
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#00BFFF',
        borderRadius: 10,
        padding: 10,
        marginVertical: 8,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        flex: 1,
    },
    wrapActions: {flexDirection: 'row', flex: 0.3, justifyContent: 'space-between'}
});

const TaskComponent: React.FC<TaskComponentProps> = (props): ReactElement => {
    return (
        <View style={styles.item}>
          <Text style={styles.title}>{props.item.title}</Text>
          <View style={styles.wrapActions}>
            <TouchableOpacity onPress={() => props.updateTask(props.index, props.item)} >
                <Image 
                    style={{ width: 25, height: 25, marginRight: 10 }} 
                    source={require('../assets/icons/pencil.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.deleteTask(props.index)}>
                <Image 
                    style={{ width: 25, height: 25, marginRight: 10 }} 
                    source={require('../assets/icons/remove.png')} />
            </TouchableOpacity>
          </View>
        </View>
    )
};

export default TaskComponent;