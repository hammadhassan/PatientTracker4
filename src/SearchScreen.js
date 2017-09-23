import React, { Component } from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class SearchScreen extends Component {
static navigationOptions = {
        title: "Search",
        header: null
    }
  render() {
    return (
        <View style={styles.container}>
            <Text style={styles.search}>Search By Name</Text>
            <Button onPress={() => this.props.navigation.navigate("Searchbyname")} title="Search By Name"/>
            <Text style={styles.search}>Search By Date</Text>
            <Button style={styles.btn} onPress={() => this.props.navigation.navigate("Searchbydate")} title="Search By Date"/>
            <Text style={styles.search}>Search By Doctor </Text>
            <Button style={styles.btn} onPress={() => this.props.navigation.navigate("Searchbydoctor")} title="Search By Doctor"/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    search: {
        paddingBottom: 10,
        fontSize: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
});