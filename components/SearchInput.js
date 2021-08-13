import React from "react";
import { StyleSheet, TextInput, View } from 'react-native';

//Exporto un componente con un placeholder
export default class SearchInput extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <TextInput 
                    autoCorrect={false}
                    placeholder={this.props.placeholder} //me permite poner cualquier placeholder haciendo el componente reutilizable
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent' //saca un subrayado automatico de android
                    style={styles.textInput}
                    clearButtonMode='always'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    textInput: {
        flex: 1,
        color: 'white',
        paddingHorizontal: 10,
        width: 300
    }
})