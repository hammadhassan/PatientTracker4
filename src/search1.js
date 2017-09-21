import React, { Component } from 'react';
import { View,  TextInput, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import { Container, Header, Content, List, ListItem, Text,
     Separator , Item, Input, Button,Footer,FooterTab } from 'native-base';

class Search extends Component {

    componentWillMount() {
        console.disableYellowBox = true
    }
    static navigationOptions = {
        title: "Search By Name",
        headerLeft: false
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
                    }
                })
                this.setState({
                    data: foundedData
                })
            })
    }

    render() {
        return (
            <Container>
<Content>
          <Item rounded>
            <Input placeholder='Enter Name' 
                   onChangeText={(text) => {
                    this.setState({ name: text })
                }}
            />
          </Item>

                    <Button rounded 
                    style={styles.bigblue}
                     onPress={this.getDataByName.bind(this)}>


                   <Text>Search Patient</Text>


                   </Button>


                {this.state.data.map((data, indexno) => {
                    return    (

           <List key={indexno}>
         
          <ListItem  bordered>
            <Text style={styles.bigblue} >Name : {data.name}</Text>
          </ListItem>

          <ListItem >
            <Text>Disease : {data.problem}</Text>
          </ListItem>

          <ListItem>
            <Text> Medication: {data.doc}</Text>
          </ListItem>

          <ListItem>
            <Text>Fee Charged : {data.day}</Text>
          </ListItem>
		   <ListItem>
            <Text> Date : {data.date}</Text>
          </ListItem>
           </List>
                    )
                })}
                </Content>
            </Container>

        )
    }
}
export default Search

const styles = StyleSheet.create({
  bigblue: {
   marginTop :20,
   marginLeft :20,
  }
})