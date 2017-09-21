import React, { Component } from 'react';
import {StyleSheet, Text, Button, View} from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Home extends Component {

  render() {
    return (
        <View>
            <Text style={styles.home}>Welcome to the Patient App</Text>
            <Button onPress={this.props.Add} title="Add Patients"/>
            <Text></Text>
            <Button style={styles.btn} onPress={this.props.View} title="View Patients"/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    home: {
        paddingBottom: 10,
        fontSize: 24,
    }
});