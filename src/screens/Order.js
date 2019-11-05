import React from 'react';
import {
    View,
    Image,
    TextInput,
    Text
} from 'react-native';

const Order = () => {
    return (
        <View>
            <View style={{marginLeft:"3%", flexDirection:'row', justifyContent:"center"}}>
                {/* SEARCH NAVIGATION */}
                <TextInput placeholder='what MSG do you want to search....'
                    style={{borderWidth:1, borderColor:'#ffce1e', borderRadius: 20, height: 50, fontSize: 13,
                            paddingLeft: 45, paddingRight: 20, backgroundColor:'white', marginRight:5}}
                />
                <Image style={{width:25, height:25, position:'absolute', top: 12, left: 12}}
                    source={require('../images/ImageSearch.png')}
                />
                {/* CHART NAVIGATION */}
                <Image 
                    style={{marginLeft:"2%",marginTop:"3%"}}
                    source={require('../images/ImageCart.png')}
                />
            </View>
            <Text style={{alignSelf:"center", fontWeight:"bold", fontSize:30, paddingTop:"50%"}}>SCREEN ORDER</Text>
        </View>
    )
}

export default Order;