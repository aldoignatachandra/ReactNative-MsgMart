import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, ListItem, Icon, Left, Body, Right, Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

const Profile = (props) => {

    const deleteToken = async () => {
        try {
            await AsyncStorage.removeItem('user')
            props.navigation.navigate('Login')
            showToast("Logout Success", "success");
        } catch (err) {
            console.log(`The error is: ${err}`)
        }
    }

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
        <>
            <View style={{backgroundColor:'#f7b81f', height:230}}></View>
            <View style={{height:80}}></View>
            
            {/* USERNAME AND LOGIN */}
            <View style={{marginHorizontal: 17,flexDirection:'row'}}>
                <View style={{ position: 'absolute',left: "60%", top: -250, alignItems:'center', flex:1}}>
                    <Text style={{color:'white', fontSize: 20, fontWeight:'bold'}}> Username </Text>
                    <Text style={{fontWeight:"bold"}}> {props.item.username} </Text>
                </View>

                <View style={{ position: 'absolute',left: "57%", top: -170, alignItems:'center', flex:1}}>
                    <Text style={{color:'white', fontSize: 20, fontWeight:'bold'}}> Last Login </Text>
                    <Text style={{fontWeight:"bold"}}> 20.00 : 09-11-2019</Text>
                </View>
            </View>

            {/* BUTTON FEEDBACK */}
            <View style={{marginHorizontal:10, marginTop:-25}}>
                <ListItem icon>
                <Left>
                    <Button style={{ backgroundColor: "#FF9501" }}>
                        <Icon active name="paper-plane" />
                    </Button>
                </Left>
                <Body>
                    <TouchableOpacity>
                        <Text style={{fontWeight: "bold"}}>Feedback</Text>
                    </TouchableOpacity>
                </Body>
                <Right>
                    <Icon active name="arrow-forward" />
                </Right>
                </ListItem>
            </View>
                    
            {/* Contact Button */}
            <View style={{marginHorizontal:10, marginTop:20}}>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "blue" }}>
                        <Icon active name="contact" />
                        </Button>
                    </Left>
                    <Body>
                        <TouchableOpacity>
                            <Text style={{fontWeight: "bold"}}>Contact</Text>
                        </TouchableOpacity>
                    </Body>
                    <Right>
                        <Icon active name="arrow-forward" />
                    </Right>
                </ListItem>
            </View>

            {/* Logut Button */}
            <View style={{marginHorizontal:10, marginTop:20}}>
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "red" }}>
                            <Icon active name="person" />
                        </Button>
                    </Left>
                    <Body>
                        <TouchableOpacity onPress={() => deleteToken()}>
                            <Text style={{fontWeight: "bold"}}>Logout</Text>
                        </TouchableOpacity>
                    </Body>
                    <Right>
                        <Icon active name="exit" />
                    </Right>
                </ListItem>
            </View>

            {/* IMAGE PROFILE */}
            <Image source={{uri: 'https://image.flaticon.com/icons/png/512/64/64572.png'}}
                style={{width: 150, height: 150, borderRadius:100, position: 'absolute', left: "5%", top: 50, flexDirection: 'row', justifyContent: 'center',}}
            />
        </>
    )
}

const mapStateToProps = state => {
    return {
        item : state.auth.resultItem,
        dataCategories: state.categories.listCategory,
        userDetail: state.auth.resultsLogin
    };
};

export default connect(mapStateToProps)(Profile);