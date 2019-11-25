import React, { useState } from 'react';
import { useDispatch  } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
import categoryLogo from '../images/ImageCategorySelected.png'
import { postCategories } from '../Redux/Actions/categories';
import { Toast } from 'native-base';
import { connect } from 'react-redux';

const AddCategory = (props) => {

    const [input, setInput] = useState({name:""});
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
        dispatch(postCategories (input,  props.item.token))
        .then(response => {
            if (response.value.data.status === 200) {
                showToast("Success New Add Category", "success");
                setTimeout(() => {
                    props.navigation.navigate('DataCategory');
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
        <Text style={{ fontSize: 25, fontWeight:'bold', color:'white'}}>Add New Category</Text>
      </View>

      <View style={{ alignItems:'center', marginTop:10}}>
        <Image source={categoryLogo} style={{width: 70, height: 70}} />
      </View>

      <View style={{flex:1, marginHorizontal:35}}>
        <View style={{alignItems:'center', paddingBottom:5, flexDirection: 'row', paddingTop:15}}>
          <Text style={{fontSize:19, paddingLeft: 3, fontWeight:'bold', color:'#787878'}}>Category Name</Text>
        </View>
        <View>
        <TextInput
          style={{ height: 40, paddingLeft: 8, borderColor: '#787878', borderWidth: 0.5, borderRadius: 7}}
          placeholder={'Add New Category Name Here....'}
          onChangeText={(category) => setInput({...input, name: category })}
          />
        </View>
      </View>

        <TouchableOpacity onPress={ handleSubmit }>
            <View style={{backgroundColor:'#f7b81f', justifyContent:'center', alignItems:'center', height: 60}}>
                <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>Add</Text>
            </View>
        </TouchableOpacity>
    </>
  )
}

const mapStateToProps = state => {
    return {
        item : state.auth.resultItem
    };
};

export default connect (mapStateToProps) (AddCategory);