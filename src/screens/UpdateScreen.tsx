import React, { ReactElement, useState } from 'react';
import { Button, ToastAndroid, View } from 'react-native';
import AppButton from '../components/AppButton';
import TextInputLocal from '../components/TextInput';

interface UpdateScreenProps {
    navigation: any;
    route: any;
};

const UpdateScreen: React.FC<UpdateScreenProps> = (props): ReactElement => {
    const [value, onChangeText] = useState(props.route?.params?.item.title);
    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#FDF4E3' }}>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <TextInputLocal 
                    onChangeText={onChangeText}
                    value={value}
                />
            </View>
            <AppButton title="Update" onPress={() => {
                if (value.trim() === '') {
                    ToastAndroid.show('Please fill the field', ToastAndroid.LONG);
                    return
                }
                props.route.params.onGoBack({
                    title: value
                });
                props.navigation.goBack();
            }} />
        </View>
    )
};

export default UpdateScreen;