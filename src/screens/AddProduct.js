import React, { useState } from 'react';
import { useDispatch  } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  Image,
  Picker,
  TouchableOpacity
} from 'react-native';

import productLogo from '../images/ImageProductSelected.png'
import { postProduct } from '../Redux/Actions/product';
import { Toast } from 'native-base';
import { connect } from 'react-redux';

const AddProduct = (props) => {

  const [user, setUser] = useState('')

  const [input, setInput] = useState({id:"", name: "", description: "", image: "", category_id: "", price:"" , quantity:"" });
  const dispatch = useDispatch()

  const showToast = (message, types) => {
      Toast.show({
          text: message,
          buttonText: "Okay",
          type: types == "warning" ? "warning":"success",
          duration: 3000,
          position: "bottom"
      })
  } 

  const handleSubmit = (event) => {
    dispatch(postProduct (input,  props.item.token))
    .then(response => {
        if (response.value.data.status === 200) {
            showToast("Success Add New Product", "success");
            setTimeout(() => {
                props.navigation.navigate('DataProduct');
            }, 500);
        } else {
            showToast(response.value.data.error, "warning");
        }
    })
    .catch(error => alert(error));
};

  return (
    <>
      <View style={{justifyContent:'center', alignItems:'center', height: 89, backgroundColor:'#f7b81f'}}>
        <Text style={{ fontSize: 25, fontWeight:'bold', color:'white'}}>Add New Product</Text>
      </View>

      <View style={{ alignItems:'center', marginTop:10}}>
        <Image source={productLogo} style={{width: 50, height: 50}} />
      </View>

      <View style={{flex:1, marginHorizontal:30}}>
        
        {/* Product Name */}
        <View style={{alignItems:'center', paddingBottom:5, flexDirection: 'row'}}>
          <Text style={{fontSize:15, paddingLeft: 3, fontWeight:'bold', color:'#787878'}}>Product Name</Text>
        </View>
        <View>
        <TextInput
          style={{ height: 40, paddingLeft: 8, borderColor: '#787878', borderWidth: 0.5, borderRadius: 7 }}
          placeholder={'Enter Your New Product Name Here ......'}
          maxLength={20}
          onChangeText={(name) => setInput({...input, name: name })}
          />
        </View>

        {/* Product Description */}
        <View style={{alignItems:'center', paddingBottom:5, flexDirection: 'row', paddingTop:10}}>
          <Text style={{fontSize:15, paddingLeft: 3, fontWeight:'bold', color:'#787878'}}>Description</Text>
        </View>
        <View>
        <TextInput
          style={{ height: 40, paddingLeft: 8, borderColor: '#787878', borderWidth: 0.5, borderRadius: 7 }}
          placeholder={'Enter Your New Description Here ......'}
          multiline
          numberOfLines={2}
          onChangeText={(description) => setInput({...input, description: description })}
          />
        </View>

        {/* Product Image */}
        <View style={{alignItems:'center', flexDirection: 'row', paddingTop:10}}>
          <Text style={{fontSize:15, paddingLeft: 3, fontWeight:'bold', color:'#787878'}}>Image</Text>
        </View>
        <View>
        <TextInput
          style={{ height: 40, paddingLeft: 8, borderColor: '#787878', borderWidth: 0.5, borderRadius: 7 }}
          placeholder={'Enter Your Image Here ......'}
          onChangeText={(image) => setInput({...input, image: image })} 
          />
        </View>

        {/* Product Price */}
        <View style={{alignItems:'center', flexDirection: 'row', paddingTop:10}}>
          <Text style={{fontSize:15, paddingLeft: 3, fontWeight:'bold', color:'#787878'}}>Price</Text>
        </View>
        <View>
        <TextInput
          style={{ height: 40, paddingLeft: 8, borderColor: '#787878', borderWidth: 0.5, borderRadius: 7 }}
          placeholder={'Enter Your Quantity Here ......'}
          keyboardType={'numeric'}
          onChangeText={(price) => setInput({...input, price: price })} 
          />
        </View>

        {/* Product Quantity */}
        <View style={{alignItems:'center', flexDirection: 'row', paddingTop:10}}>
          <Text style={{fontSize:15, paddingLeft: 3, fontWeight:'bold', color:'#787878'}}>Quantity</Text>
        </View>
        <View>
        <TextInput
          style={{ height: 40, paddingLeft: 8, borderColor: '#787878', borderWidth: 0.5, borderRadius: 7 }}
          placeholder={'Enter Your Price Here ......'}
          keyboardType={'numeric'}
          onChangeText={(quantity) => setInput({...input, quantity: quantity })} 
          />
        </View>

        {/* Product Category */}
        <View style={{alignItems:'center', flexDirection: 'row', paddingTop:10}}>
          <Text style={{fontSize:15, paddingLeft: 3, fontWeight:'bold', color:'#787878'}}>Category</Text>
        </View>
        <View>

        <Picker style={{border:1, borderColor:"red", borderWidth: 0.5}} 
            selectedValue={input.category_id} 
            onValueChange={(itemValue, itemIndex) => setInput({...input, category_id: itemValue})}
        >
           {props.dataCategories.map((item, index) => {
            return(
                <Picker.Item key={index} label={item.name} value={item.id} />
            )})}
        </Picker>
        </View>
      </View>
      <TouchableOpacity onPress={ handleSubmit }>
        <View style={{backgroundColor:'#f7b81f', justifyContent:'center', alignItems:'center', height: 60}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>Submit</Text>
        </View>
      </TouchableOpacity>
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

export default connect (mapStateToProps) (AddProduct);
