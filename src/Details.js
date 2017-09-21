import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Dimensions} from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from "firebase";
import { List, ListItem } from 'react-native-elements';

export default class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
    Data : []
  };
  this.PatientsData = this.PatientsData.bind(this);
}

static navigationOptions = {
    title: 'Patients Details',
  };

PatientsData() {
  var DataArr = [];
  let dbRef = firebase.database().ref("Patients");
  dbRef.on("child_added", snap => {
    DataArr = this.state.Data;
    DataArr.push(snap.val());
    this.setState({
      Data: DataArr
    });
  });
};

componentWillMount() {
  this.PatientsData();
    console.disableYellowBox = true
};

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.Data.map((value, i) => {
            return <View style={styles.pat} key={i}>
              <Text style={styles.text}>Name: {value.Patient.name}</Text>
              <Text style={styles.text}>Problem: {value.Patient.problem}</Text>
              <Text style={styles.text}>Date: {value.Patient.date}</Text>
              <Text style={styles.text}>Gender: {value.Patient.gender}</Text>
              <Text style={styles.text}>Doctor: {value.Patient.doc}</Text>
              <Text style={styles.text}>Day of Appointment: {value.Patient.day}</Text>
            </View>
          })}
          </ScrollView>
      </View>
      );
    }
  }

const { height, width } = Dimensions.get('window') ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pat: {
    marginTop: 10,
    // width: width - 38 ,
    // height: height - 50 ,
    backgroundColor: "#03A9F4",
    // flexDirection: horizontal
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  }
})

// /*
// {this.state.Data.map((value, i) => {
//             return <View key={i}>
//               <Text>Name: {value.Patient.name}</Text>
//               <Text>Problem: {value.Patient.problem}</Text>
//               <Text>Date: {value.Patient.date}</Text>
//               <Text>Gender: {value.Patient.gender}</Text>
//               <Text>Doctor: {value.Patient.doc}</Text>
//               <Text>Day of Appointment: {value.Patient.day}</Text>
//             </View>
//           })}

//           <FlatList
//         data={this.state.Data}
//         renderItem={({item, index}) => {
//           <View style={styles.margin20} key={index}>
//             <Text>Name: {item.name}</Text>
//               <Text>Problem: {item.problem}</Text>
//               <Text>Date: {item.date}</Text>
//               <Text>Gender: {item.gender}</Text>
//               <Text>Doctor: {item.doc}</Text>
//               <Text>Day of Appointment: {item.day}</Text>
//           </View>
//         }}/>
// */