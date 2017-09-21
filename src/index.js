import React, { Component } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Details from "./Details";
import PatientForm from "./Form";
import NavBar from "./NavBar";
import firebase from "firebase";
import Home from "./Home";
import Search from "./search1"

class Main extends Component {
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyCpaZp08WHx1Ck9GXtzTs67ohTFAfN8sdQ",
      authDomain: "react-native-todo-c7c06.firebaseapp.com",
      databaseURL: "https://react-native-todo-c7c06.firebaseio.com",
      projectId: "react-native-todo-c7c06",
      storageBucket: "react-native-todo-c7c06.appspot.com",
      messagingSenderId: "256827566044"
    };
    firebase.initializeApp(config);
  }

  static navigationOptions = {
    title: 'Welcome',
  };
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      {/* <StatusBar hidden={true}/> */}
          <Home
          Add={() => navigate("AddPatients")}
          View={() => navigate("Details")}
          />
      </View>
    );
  }
}

const AppHome = TabNavigator({
  Home: {screen: Main},
  List: {screen: Search},
  Search: { 
    screen: StackNavigator({
      Patients : { screen: SearchPatient },
      AddPatients: {screen: PatientForm},
      Details: {screen: Details},
    }),
   }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default (Main, AppHome);