import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import { Item, Input, Form, Label, Text, Toast } from 'native-base';
import { connect } from "react-redux";
import { register } from '../Redux/Actions/auth';

const Register = (props) => {

  const [data, setData] = useState({username: '', password: '', role: ''});
  const dispatch = useDispatch();
  let inputs = {};

  const focusTheField = (id) => {
      inputs[id]._root.focus()
  };

  const handleRegister = async() => {
          await dispatch(register(data))
          .then(response => {
            console.log(response.value.data.error);  
          if (response.value.data.status === 200) {
              showToast("Success Create New User", "success");
              setTimeout(() => {
                props.navigation.navigate('TabNavigation');
              }, 500);
          } else {
            showToast(response.value.data.error, "warning");
          }
      })
      .catch(error => alert(error.value.data.message));
  };

  const showToast = (message, types) => {
    Toast.show({
      text: message,
      buttonText: "Okay",
      type: types == "warning" ? "warning":"success",
      duration: 3000,
      position: "bottom"
    })
  }
  
  return (
      <View style={styles.container}>

        {/* Logo */}
        <View style={styles.logo}>
                <Image style={styles.icon} source={require('../images/Icon.png')}></Image>
        </View>

        {/* Form Register */}
        <Form style={styles.loginForm}>
            <Item floatingLabel>
            <Label>
                <Text style={styles.inputLabel}>Username</Text>
            </Label>
            <Input
                onChangeText={(text) => {setData({...data, username: text})}}
                value={data.username}
                style={styles.input}
                returnKeyType={"next"}
                onSubmitEditing={() => { focusTheField('username'); }}
            />
            </Item>
            <Item floatingLabel>
            <Label>
                <Text style={styles.inputLabel}>Password</Text>
            </Label>
            <Input
                onChangeText={(text) => {setData({...data, password: text})}}
                secureTextEntry={true} 
                value={data.password}
                style={styles.input}
                returnKeyType={"next"}
                getRef={input => { inputs['password'] = input }}
                onSubmitEditing={() => { focusTheField('password'); }}
            />
            </Item>
            <Item floatingLabel>
            <Label>
                <Text style={styles.inputLabel}>Role</Text>
            </Label>
            <Input
                onChangeText={(text) => {setData({...data, role: text})}}
                value={data.role}
                style={styles.input}
                returnKeyType={"next"}
                getRef={input => { inputs['role'] = input }}
                onSubmitEditing={() => { focusTheField('role'); }}
            />
            </Item>
        </Form>

        {/* Button Register */}
        <TouchableOpacity activeOpacity={.7} style={styles.buttonRegister} onPress={()=> handleRegister()}>
            <Text style={styles.textLogin}>Register</Text>
        </TouchableOpacity>

        {/* Button Go To Login Screen */}
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 40}}>
            <Text>Already Have An Account ? </Text>
            <TouchableOpacity onPress={()=>{props.navigation.navigate('Login')}}>
                <Text style={{color: '#f7b81f'}}>Login</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
};

export default connect()(Register);

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
    marginBottom: 80,
    alignItems: 'center',
  },
  icon: {
    width: 150,
    height: 150
},
  loginForm: {
    marginTop: -80,
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
  buttonRegister: {
    backgroundColor: '#f7b81f',
    marginTop: 50,
    marginHorizontal:50,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  textLogin: {
    alignItems:"center",
    justifyContent:"center",
    fontSize: 20,
    fontWeight:"bold",
    color:"#ecf0f1"
  }
});