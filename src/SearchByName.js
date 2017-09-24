import React, { Component } from 'react';
import { View,  TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import * as firebase from "firebase";
import { Container, Header, Content, List, ListItem, Text, Separator , Item, Input, Button } from 'native-base';

class SearchByName extends Component {

    componentWillMount() {
        console.disableYellowBox = true
    }
    static navigationOptions = {
        title: "Search By Name",
    }
    constructor() {
        super()
        this.state = {
            data: [],
            name: ""
        }
    }

	getDataByName() {
            var array = []
            var foundedData = []
            let dataBase = firebase.database().ref().child("Patients")
            dataBase.on("value", (object) => {
                let key = object.val()
                for (var a in key) {
                    array.push(key[a].Patient)
                }
                array.map((Patient) => {
                    if (Patient.name === this.state.name) {
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

// renderButtonAndLoader() {
    //     if (this.state.isLoading) {
    //         return <ActivityIndicator />
    //     }
    //     return (
    //         <Button 
    //           style={styles.pList}
    //            onPress={this.getDataByName}>
    //            <Text>Search Patient</Text>
    //          </Button>
    //     )
    // }

    render() {
        return (
            <Container style={styles.container}>
            <Content style={styles.container}>
          <Item bordered>
            <Input placeholder='Enter Name'
                   autoCapitalize = 'none'
                   onChangeText={(text) => {
                    this.setState({
                      name: text
                    })
                }}
                // toLowerCase()
            />
          </Item>
              <Button 
              style={styles.pList}
               onPress={this.getDataByName.bind(this)}>
               <Text>Search Patient</Text>
             </Button>
                {this.state.data.map((data, index) => {
                    return    (
            <List key={index} style={styles.list}>
                <ListItem  bordered>
                  <Text style={styles.pList} >Name : {data.name.toLowerCase()}</Text>
                </ListItem>
                <ListItem >
                  <Text style={styles.pList}>Problem : {data.problem.toLowerCase()}</Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.pList}> Date: {data.date}</Text>
                </ListItem>
                <ListItem>
                  <Text style={styles.pList}>Gender : {data.gender}</Text>
                </ListItem>
      		   <ListItem>
                  <Text style={styles.pList}> Doctor : {data.doctor}</Text>
                </ListItem>
           </List>
                    )
                })}
                </Content>
            </Container>
        )
    }
}
export default SearchByName;

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