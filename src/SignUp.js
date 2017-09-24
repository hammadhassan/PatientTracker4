import React, { Component } from 'react';
import { View, Text } from 'react-native';
import * as firebase from 'firebase';
import { Spinner } from './common';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

export default class SignupScreen extends Component {
static navigationOptions = {
    title: 'Sign Up',
    // headerLeft: false
  };
    constructor(props) {
        super(props)
        this.state = {
            userFullName: '',
            email: '',
            password: '',
            error: '',
            isLoading: false
        }
    }

    SignUp() {
        const { email, password } = this.state;
        
        this.setState({ 
            error: '',
            isLoading: true
        })

        firebase.auth().createUserWithEmailAndPassword(email, password)
            // Handle respnse here
            .then((response) => {
                firebase.database().ref('/').child(`nativeUser/${response.uid}`).set(this.state);
                this.nowSignupSuccess(),
                this.props.navigation.navigate("Login"),
                console.log("Response", response)
            })
            .catch((error) => {
                // Handle Errors here.
                var errorMessage = error.message;
                this.setState({
                    error: errorMessage,
                    isLoading: false
                })
                console.log(errorMessage);
            });
    }

    nowSignupSuccess() {
        this.setState({
            email: '',
            password: '',
            isLoading: false })
    }

    renderButtonAndLoader() {
        if (this.state.isLoading) {
            return <Spinner />
        }
        return (
        <Button onPress={this.SignUp.bind(this)}
            title="Submit"
            raised={true}
            backgroundColor= "#03A9F4"
            fontSize={24}
            borderRadius= {5}
            fontWeight="bold"
            />
        )
    }

    render() {
        return (
            <View>
                <FormLabel>
                    Full Name:
                </FormLabel>
                        <FormInput 
                            placeholder="Write Your Name"
                            value={this.state.userFullName}
                            onChangeText={userFullName => { this.setState({ userFullName }) }}
                        />
                        <FormValidationMessage>
                        {'This field is required'}
                        </FormValidationMessage> 
                    <FormLabel>
                        Email:
                    </FormLabel>
                        <FormInput
                            label="Email"
                            value={this.state.email}
                            placeholder="Write your Email"
                            onChangeText={email => { this.setState({ email }) }}
                        />
                        <FormValidationMessage>
                        {'This field is required'}
                        </FormValidationMessage> 
                    <FormLabel>
                        Password:
                    </FormLabel>
                        <FormInput
                            label="Password"
                            secureTextEntry
                            value={this.state.password}
                            placeholder="Enter password"
                            onChangeText={password => { this.setState({ password }) }}
                        />
                        <FormValidationMessage>
                        {'This field is required'}
                        </FormValidationMessage> 
                    <FormLabel>
                        <Text style={errorStyle}>
                            {this.state.error}
                        </Text>
                    </FormLabel>
                        {this.renderButtonAndLoader()}
            </View>
        )
    }
}

const errorStyle = {
    color: 'red'
}