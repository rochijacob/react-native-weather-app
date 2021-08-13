import React from "react";
import { render } from "react-dom";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator, //circular loading spinner
  Platform, // aplica estilo basado en el OS
  StatusBar,
} from "react-native"; //La primera declaracion trae el stylesheet api

import SearchInput from "./components/SearchInput";

import { fetchLocationId, fetchWeather } from "./utils/api";
import getImageForWeather from "./utils/getImageForWeather";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: false,
      location: " ",
      temperature: 0,
      weather: "",
    };
  }

  componentDidMount() {
    //me permite acceder a lo que se llaman React "lifecycle methods" que me muestran puntos especificos en la vida de un componente
    this.handleUpdateLocation("San Francisco");
  }

  handleUpdateLocation = async (city) => {
    if (!city) return;

    this.setState({ loading: true }, async () => {
      //cuando empieza a correr la funcion carga
      try {
        const locationId = await fetchLocationId(city);
        const { location, weather, temperature } = await fetchWeather(
          locationId
        );

        this.setState({
          loading: false, //termina de cargar
          error: false,
          location,
          weather,
          temperature,
        });
      } catch (e) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    });
  };
  render() {
    const { loading, error, location, weather, temperature } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && (
              <View>
                {error && (
                  <Text style={[styles.smallText, styles.textStyle]}>
                    Could Not load weather, please try a different city
                  </Text>
                )}

                {!error && (
                  <View>
                    <Text style={[styles.largeText, styles.textStyle]}>
                      {location}
                    </Text>
                    <Text style={[styles.smallText, styles.textStyle]}>
                      {weather}
                    </Text>
                    <Text
                      style={[styles.largeText, styles.textStyle]}
                    >{`${Math.round(temperature)}°`}</Text>
                  </View>
                )}

                <SearchInput
                  placeholder="Search any ciy"
                  onSubmit={this.handleUpdateLocation}
                />
              </View>
            )}
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

//Puedo usar reactnative stylesheet api
const styles = StyleSheet.create({
  container: {
    flex: 1, //el elemento va a ocupar todo el espacio de su componente "padre"
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  textStyle: {
    textAlign: "center",
    ...Platform.select({
      ios: {
        fontFamily: "AvenirNext-Regular",
      },
      android: {
        fontFamily: "Roboto",
      },
    }),
    //fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: "white",
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textInput: {
    backgroundColor: "#666",
    color: "white",
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
});
