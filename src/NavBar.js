import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, TextInput, Form} from 'react-native';
import firebase from "firebase";

// var data = getOrder(dataList);

// function getOrder(list) {
//   return Object.keys(list);
// }

// function moveOrderItem(ScrollView, fromIndex, toIndex) {
//   Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
//   if (ScrollView.forceUpdate) ScrollView.forceUpdate();
// }

class NavBar extends Component {
    constructor(props) {
        super(props)
        this.PatientsData = this.PatientsSearch.bind(this);
        this.state = {
        Data : []
      };
    }
    
    PatientsSearch() {
      var DataArray = [];
      let dbRef = firebase.database().ref("Patients");
      dbRef.on("child_added", snap => {
        DataArray = this.state.Data;
        DataArray.push(snap.val());
        this.setState({
          Data: DataArray
        });
      });
    };
    
    componentWillMount() {
  //     const ds = ListView.DataSource({
  //   rowHasChanged: (r1 , r2) r1 !== r2,
  // });
  // this.DataSource = ds.cloneWithRows(this.props.Data);
      this.PatientsSearch();
    };

 // _onCompletedChange(dataItem, index) {
 //    let fromIndex = data.indexOf(index);
 //    let toIndex = dataItem.completed ? data.length - 1 : 0;
 //    moveOrderItem(this, fromIndex, toIndex);
 //  }
//   onPress() {
//     alert("you press");
//   }
  render() {
      {/* <View style={styles.navbar}>
          <Text style={styles.navbarTitle}>Patients Tracker App</Text>
          <Text style={styles.navbarButton} onPress={this.onPress}>Search</Text>
      </View> 
        // <ListView>
          //   enableEmptySection={true}
          //   DataSource={this.DataSource}
          //   renderRow={(rowData) => {
          //     <NavBar list={rowData} />
          //   }}
          // </ListView>
      */
    }
    return (
          <View>
              <View style={styles.searchBar}>
              <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Search for Patients"
              style={styles.searchBarInput}
              returnKeyType="search"
              enablesReturnKeyAutomatically={true}
              ></TextInput>
              </View>
              {this.state.Data.map((value, i) => {
            return <View key={i}>
              <Text>Name: {value.Patient.name}</Text>
              <Text>Date: {value.Patient.date}</Text>
            </View>
          })}

         </View>
    );
  }
}

// import React from 'react';
// import { View, Text, StyleSheet, TextInput } from 'react-native';


// const Header = (props) => (
//     <View style={styles.container}>
//     <TextInput
//       style={styles.input}
//       placeholder="Search..."
//       onChangeText={(text) => console.log('searching for ', text)}
//     />
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#C1C1C1',
//   },
//   input: {
//     height: 30,
//     flex: 1,
//     paddingHorizontal: 8,
//     fontSize: 15,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 2,
//   },
// });

// export default Header;

const styles = StyleSheet.create({
    /*navbar: {
        backgroundColor: "black",
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: "row",
        // alignItems: "center"
    },
    navbarTitle: {
        color: "#FEFEFE",
        textAlign: "center",
        fontWeight: "bold",
        // flex: 1
    },
    navbarButton: {
        width: 50,
        color: "#FEFEFE",
        textAlign: "center"
    },*/
    searchBar: {
        marginTop: 10,
        padding: 3,
        paddingLeft: 8,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        alignSelf: "center",
    },
    searchBarInput: {
        flex: 1,
        fontSize: 15,
        // height: 35,
    }
});

export default NavBar;  