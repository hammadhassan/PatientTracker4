import React, { Component } from 'react';
import { View,  TextInput, StyleSheet } from 'react-native';
import * as firebase from "firebase";
import { Container, Header, Content, List, ListItem, Text, Separator , Item, Input, Button } from 'native-base';

class SearchByDoc extends Component {

    componentWillMount() {
        console.disableYellowBox = true
    }
    static navigationOptions = {
        title: "Search By Doctor",
    }
    constructor() {
        super()
        this.state = {
            data: [],
            doctor: ""
        }
        this.getDataByDoc = this.getDataByDoc.bind(this);
    }

	getDataByDoc() {
            var array = []
            var foundedData = []
            let dataBase = firebase.database().ref().child("Patients")
            dataBase.on("value", (object) => {
                let key = object.val()
                for (var a in key) {
                    array.push(key[a].Patient)
                }
                array.map((Patient) => {
                    if (Patient.doctor === this.state.doctor) {
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
            <Input placeholder='Doctor Name' 
                  onChangeText={(text) => {
                    this.setState({ doctor: text })
                }}
            />
          </Item>
              <Button 
              style={styles.pList}
               onPress={this.getDataByDoc}>
               <Text>Search Patient</Text>
             </Button>
                {this.state.data.map((data, index) => {
                    return    (    
            <List key={index} style={styles.list}>
                <ListItem  bordered>
                <ListItem bordered>
                  <Text style={styles.pList}> Doctor : {data.doctor}</Text>
                </ListItem>
                  <Text style={styles.pList} >Patient Name : {data.name}</Text>
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
           </List>
                )
                })}
                </Content>
            </Container>
        )
    }
}
export default SearchByDoc;

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