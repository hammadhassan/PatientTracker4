import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Dimensions} from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from "firebase";
// import { List, ListItem } from 'react-native-elements';
import { Container, Header, Content, List, ListItem, Text, Separator , Item, Input, Button } from 'native-base';

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

componentDidMount() {
  this.PatientsData();
    console.disableYellowBox = true
};

  render() {
    return (
        <ScrollView style={styles.container}>
          <Container style={styles.container}>
          <Content style={styles.container}>
          {this.state.Data.map((value, i) => {
            return <List style={styles.list} key={i}>
              <ListItem>
              <Text style={styles.text}>Name: {value.Patient.name}</Text>
              </ListItem>
              <ListItem>
              <Text style={styles.text}>Problem: {value.Patient.problem}</Text>
              </ListItem>
              <ListItem>
              <Text style={styles.text}>Date: {value.Patient.date}</Text>
              </ListItem>
              <ListItem>
              <Text style={styles.text}>Gender: {value.Patient.gender}</Text>
              </ListItem>
              <ListItem>
              <Text style={styles.text}>Doctor: {value.Patient.doc}</Text>
              </ListItem>
              <ListItem>
              <Text style={styles.text}>Day of Appointment: {value.Patient.day}</Text>
              </ListItem>
            </List>
          })}
          </Content>
          </Container>
          </ScrollView>
      );
    }
  }

const { height, width } = Dimensions.get('window') ;

const styles = StyleSheet.create({
  container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  backgroundColor: "white"
  },
  list: {
    borderWidth: 1
  },
  text: {
    marginTop :20,
    marginLeft :20,
    marginRight: 20
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