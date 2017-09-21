import React, { Component } from 'react';
import { View,  TextInput, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import { Container, Header, Content, List, ListItem, Text, Separator , Item, Input, Button } from 'native-base';

class SearchByDate extends Component {

    componentWillMount() {
        console.disableYellowBox = true
    }
    static navigationOptions = {
        title: "Search By Date",
    }
    constructor() {
        super()
        this.state = {
            data: [],
            date: ""
        }
        this.getDataByDate = this.getDataByDate.bind(this);
    }

	getDataByDate() {
            var array = []
            var foundedData = []
            let dataBase = firebase.database().ref().child("Patients")
            dataBase.on("value", (object) => {
                let key = object.val()
                for (var a in key) {
                    array.push(key[a].Patient)
                }
                array.map((Patient) => {
                    if (Patient.date === this.state.date) {
                        foundedData.push(Patient)
                //   this.setState({
                //     data: foundedData
                // })
                    }  
                    // else {
                    //   alert("Data not found");
                    // }
                })
                this.setState({
                    data: foundedData
                })
            })
    }

    render() {
        return (
          <Container style={styles.container}>
          <Content style={styles.container}>
          <Item>
            <Input placeholder='Enter Date : 11/9/2017' 
                  onChangeText={(text) => {
                    this.setState({ date: text })
                }}
            />
          </Item>
              <Button 
              style={styles.pList}
               onPress={this.getDataByDate}>
               <Text>Search Patient</Text>
             </Button>
                {this.state.data.map((data, index) => {
                    return    (    
            <List key={index} style={styles.list}>
                <ListItem  bordered>
                  <Text style={styles.pList} >Name : {data.name}</Text>
                </ListItem>
                <ListItem bordered>
                  <Text style={styles.pList}>Problem : {data.problem}</Text>
                </ListItem>
                <ListItem bordered>
                  <Text style={styles.pList}> Date: {data.date}</Text>
                </ListItem>
                <ListItem bordered>
                  <Text style={styles.pList}>Gender : {data.gender}</Text>
                </ListItem >
      		   <ListItem bordered>
                  <Text style={styles.pList}> Doctor : {data.doc}</Text>
                </ListItem>
           </List>
                    )
                })}
                </Content>
            </Container>
        )
    }
}
export default SearchByDate;

const styles = StyleSheet.create({
  pList: {
   marginTop :20,
   marginLeft :20,
  },
  list: {
    borderWidth: 1
  },
  container: {
    backgroundColor: "white"
  },
})