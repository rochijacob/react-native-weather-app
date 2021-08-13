import React from "react";
import { StyleSheet, TextInput, View } from 'react-native';

//Exporto un componente con un placeholder
export default class SearchInput extends React.Component {
    
    constructor(props){ //inicializamos el estado del componente y sus datos
        super(props);
        this.state = { //accedemos al estado del componente
            text:'',
        }
    }

    //Update location constant cuando el usuario cambia el campo 
    handleChageText = text => {
        this.setState({ text });
    }

    handleSubmitEditing = () => {
        const {onSubmit} = this.props;
        const {text} = this.state;

        if (!text) return; //nos fijamos que this.state.text no este vacio

        onSubmit(text); //esta funcion corre con lo que obtiiene de props
        this.setState({text: ''}); //borra la propiedad de texto
    }

    render(){
        const {placeholder} = this.props;
        const {text} = this.state;


        return(
            <View style={styles.container}>
                <TextInput 
                    autoCorrect={false}
                    value={text}
                    placeholder={placeholder} //me permite poner cualquier placeholder haciendo el componente reutilizable
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent' //saca un subrayado automatico de android
                    style={styles.textInput}
                    clearButtonMode='always'
                    onChangeText={this.handleChageText} //cada vez que el texto cambia se llama, desde el parent lo tengo que llamar ==> callback
                    onSubmitEditing={this.handleSubmitEditing} 
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