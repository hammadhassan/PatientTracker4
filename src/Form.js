import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Picker, ScrollView, AsyncStorage } from 'react-native';
import firebase from "firebase";
import { FormLabel, FormInput, Button } from 'react-native-elements'

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
      day: ""
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
    var PatientsData = {
      Patient: {
        name: this.state.name, 
        problem: this.state.problem,
        gender: this.state.gender,
        date: fullDate,
        doc: this.state.doc,
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
componentWillMount() {
        console.disableYellowBox = true
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
            <Text>Gender</Text>
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
                    value={this.state.doc} 
                    placeholder="Doctor Name" 
                    onChangeText={(text) => { this.setState({ doc: text }) }}
                    />
            <Text>Day of Appointment</Text>
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
            
            <Button
            onPress={this.addPatients.bind(this)}
            title="Add Patients"
            raised={true}
            backgroundColor= "#03A9F4"
            fontSize={24}
            borderRadius= {5}
            fontWeight="bold"
            />
          </ScrollView>
      </View>
    );
  }
}

// var styles = StyleSheet.create({
//   Button: {
//     margin: 50,
//     width: 50
//   }
// <Button title="Add Patients" onPress={this.addPatients.bind(this)} style={styles.Button}/>
// })