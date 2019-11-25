import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Item, Input, Form, Label, Text, Toast } from 'native-base';
import { login, getItem } from "../Redux/Actions/auth";
import { connect } from "react-redux";
import AsyncStorage from '@react-native-community/async-storage';

const Login = (props) => {

    const [dataLogin, setDataLogin] = useState({username: '', password: ''});
    const dispatch = useDispatch();
    let inputs = {};

    const focusTheField = (id) => {
        inputs[id]._root.focus()
    };

    const handleLogin = () => {
        dispatch(login(dataLogin))
        .then(response => {
            if (response.value.data.status === 200) {
                AsyncStorage.setItem('user', JSON.stringify(response.value.data.result), () => {});
                showToast("Login Success", "success");
                checkUser();
                setTimeout(() => {
                    props.navigation.navigate('TabNavigation');
                }, 500);
            } else {
                showToast(response.value.data.error, "warning");
            }
        }).catch(error => alert(error.value.data.error));
    };

    const checkUser = () => {
        dispatch(getItem())
        .then(response => {
            if (response.value != null) {
                props.navigation.navigate('TabNavigation');
                showToast("Login Success", "success");
            }       
        })
        .catch(error => {
            console.log (error);
        })
    }

    const showToast = (message, types) => {
        Toast.show({
            text: message,
            buttonText: "Okay",
            type: types == "warning" ? "warning" : "success",
            duration: 3000,
            position: "bottom"
        })
    }   

    useEffect(() => {
        const check = setTimeout(() => {
            checkUser();
        }, 0);

        return () => {
            clearTimeout(check)
        }
    },[]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#f7b81f"></StatusBar>

            {/* Logo */}
            <View style={styles.logo}>
                <Image style={styles.icon} source={require('../images/Icon.png')}></Image>
            </View>

            {/* Form Login */}
            <Form style={styles.loginForm}>
                <Item floatingLabel>
                    <Label>
                        <Text style={styles.inputLabel}>Username</Text>
                    </Label>
                    <Input
                        onChangeText={(text) => { setDataLogin({...dataLogin, username: text})}}
                        value={dataLogin.username}
                        style={styles.input}
                        returnKeyType={"next"}
                        blurOnSubmit={ false }
                        onSubmitEditing={() => { focusTheField('username') }}
                    />
                </Item>
                <Item floatingLabel>
                    <Label>
                        <Text style={styles.inputLabel}>Password</Text>
                    </Label>
                    <Input
                        onChangeText={(text) => {setDataLogin({...dataLogin, password: text})}}
                        value={dataLogin.password}
                        style={styles.input}
                        secureTextEntry={true}
                        returnKeyType={"go"}
                        getRef={input => { inputs['password'] = input }}
                        onSubmitEditing={() => {focusTheField('password') }}
                    />
                </Item>
            </Form>

            {/* Button Login */}
            <TouchableOpacity activeOpacity={.7} style={styles.buttonLogin} onPress={()=> handleLogin()}>
                <Text style={styles.textLogin}>Login</Text>
            </TouchableOpacity>

            {/* Button Go To Register Screen */}
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
                <Text>Don't Have An Account ? </Text>
                <TouchableOpacity onPress={()=>{props.navigation.navigate('Register')}}>
                    <Text style={{color: '#f7b81f'}}>Register</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
};
  
export default connect()(Login);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1'
    },
    containerImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.8,
    },
    logo: {
        marginTop: 70,
        alignItems: 'center',
    },
    icon: {
        width: 150,
        height: 150
    },
    loginForm: {
        marginTop: 80,
        marginHorizontal: 40,
        marginRight: 60
    },
    input: {
        color: 'black',
        marginBottom: 6,
        fontSize: 14,
    },
    inputLabel: {
        fontWeight: 'bold',
        color: '#f7b81f',
        marginBottom: 6,
        fontSize: 14,
    },
    buttonLogin: {
        backgroundColor: '#f7b81f',
        marginTop: 50,
        marginHorizontal:50,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50
    },
    textResgister: {
        marginTop: 40,
        textAlign: "center"
    },
    textLogin: {
        alignItems:"center",
        justifyContent:"center",
        fontSize: 20,
        fontWeight:"bold",
        color:"#ecf0f1"
    }
});