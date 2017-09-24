import React, { Component } from 'react';
import { StyleSheet, View, TextInput, FlatList, Picker, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import firebase from "firebase";
import { FormLabel, FormInput } from 'react-native-elements'
import { Container, Content, Text, Button } from 'native-base';
import { Spinner } from './common';

export default class PatientForm extends Component {
  static navigationOptions = {
    title: 'Patient Form',
};

  constructor(props){
    super(props)
    this.state={
      name: "",
      problem: "",
      gender: "",
      doctor:"",
      day: "",
      isLoading: false
};
    this.onGenderSelect = this.onGenderSelect.bind(this);
    this.onDaySelect = this.onDaySelect.bind(this);
    console.ignoredYellowBx =[
            'Setting a timer'
        ] ;
  }

  addPatients() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    var fullDate = day + '/' + month + '/' + year;
    // if (this.state !== null ) {
      var PatientsData = {
      Patient: {
        name: this.state.name, 
        problem: this.state.problem,
        gender: this.state.gender,
        date: fullDate,
        doctor: this.state.doctor,
        day: this.state.day,
      }
    }
    var db = firebase.database();
    let dbRef = db.ref().child('Patients');
    dbRef.push(PatientsData);
    alert("You Patient has been added in your list.");
    this.setState({
      name: "",
      problem: "",
      gender: "",
      doctor:"",
      day: ""
    })
    this.props.navigation.navigate('Details');
  // } else {
  //     alert("Please enter data")
  //   }
  }

  onGenderSelect = (gender) => {
    this.setState({
      gender: gender
    });
  }
  onDaySelect = (day) => {
    this.setState({
      day: day
    });
  }

componentDidMount() {
        console.disableYellowBox = true
    }
    renderButton() {
      if (this.state.isLoading) {
            return <Spinner />
        }
        return (
            <Button primary
            onPress={this.addPatients.bind(this)}
            style={styles.button}
            ><Text> Add Patients </Text></Button>
        )
    }

  render() {
    return (
      <View>
          <ScrollView>
                <FormLabel>Full Name</FormLabel>
                  <FormInput
                    value={this.state.name}
                    onChangeText={(text) => { this.setState({ name: text }) }}
                    placeholder="Patient Name"
                  />
                 <FormLabel>Problem</FormLabel>
                  <FormInput
                    value={this.state.problem} 
                    onChangeText={(text) => { this.setState({ problem: text }) }}
                    placeholder="Patient Problem"
                    />
            <FormLabel>Gender</FormLabel>
            <Picker 
            selectedValue={this.state.gender}
            onValueChange={(text) => this.onGenderSelect(text)}
            >
            <Picker.Item label="Select Gender" value="" />
             <Picker.Item label="Male" value="Male" />
             <Picker.Item label="Female" value="Female" />
            </Picker>
                  <FormLabel>Doctor</FormLabel>
                    <FormInput 
                    value={this.state.doctor} 
                    placeholder="Doctor Name" 
                    onChangeText={(text) => { this.setState({ doctor: text }) }}
                    />
            <FormLabel>Day of Appointment</FormLabel>
            <Picker
            selectedValue={this.state.day}
            onValueChange={(text) => this.onDaySelect(text)}
            >
            <Picker.Item label="Select Day" value="" />
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
            
            <Container>
          <Content>
            <Button primary
            onPress={this.addPatients.bind(this)}
            style={styles.button}
            ><Text> Add Patients </Text></Button>
          </Content>
      </Container>
          </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center"
  }
})