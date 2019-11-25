import React, { useState, useEffect } from 'react';
import { useDispatch  } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Alert,
  Picker
} from 'react-native';
import categoryLogo from '../images/ImageProductSelected.png'
import Icon from 'react-native-vector-icons/Ionicons'
import { patchProduct, deleteProduct } from '../Redux/Actions/product';
import { Toast } from 'native-base';
import { connect } from 'react-redux';

const EditProduct = (props) => {

    const [input, setInput] = useState({id:"", name: "", description: "", image: "", category_id: "", price:"" , quantity:""});
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch()
    const { navigation } = props;

    const setModalVisible = (visible) => {
        setModal(visible);
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

    const handleSubmit = (event) => {
        
        dispatch(patchProduct (input, props.item.token))
        .then(response => {
            console.log(response);
            if (response.value.data.status === 200) {
                showToast("Success Edit Product", "success");
                setTimeout(() => {
                    props.navigation.navigate('DataProduct');
                }, 500);
            } else {
                showToast(response.value.data.error, "warning");
            }
        }).catch(error => alert(error));
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct (id, props.item.token))
        .then(response => {
            if (response.value.data.status === 200) {
                showToast("Success Delete Product", "success");
                setTimeout(() => {
                    setModalVisible(!modal);
                    props.navigation.navigate('DataProduct');
                }, 500);
            } else {
                showToast(response.value.data.error, "warning");
                setTimeout(() => {
                    setModalVisible(!modal);
                    props.navigation.navigate('DataProduct');
                }, 500); 
            }
        })
        .catch(error => alert(error));
    };

    useEffect(()=>{
        setInput(navigation.state.params.selectedRow)
    },[])
    
    return (
        <>
        {/* Modal Delete */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        >
            <View style={{ backgroundColor:'transparent', flex:1, justifyContent:'flex-end' }}>
            <View style={{backgroundColor:'#FAB231', height:'30%'}}>

                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:20, color: 'white', fontWeight:'bold', paddingTop:20, alignItems:"center"}}>
                        Delete Category ( {input.product_name} ) ?
                    </Text>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                    <Icon name={'ios-warning'} size={18} color={'white'} style={{paddingTop:10}}/>
                    <Text style={{fontSize:15, color: '#EB3B5A', fontWeight:'bold', paddingTop:10}}> WARNING :</Text>
                    <Text style={{fontSize:15, color: 'white', paddingTop:10}}> This action CANNOT be undone</Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <View style={{paddingRight: 20}}>
                        <TouchableOpacity style={{width:100, height: 35, borderRadius: 8, borderWidth: 1, borderColor: '#fff', marginTop: 30, alignItems:'center', justifyContent:'center'}}
                        onPress={() => {
                            setModalVisible(!modal);
                        }}>
                        <Text style={{color:'white', fontWeight:'bold'}}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{width:100, height: 35, borderRadius: 8, backgroundColor: '#EB3B5A', marginTop: 30, alignItems:'center', justifyContent:'center'}}
                        onPress={() => {
                            handleDelete(input);
                        }}>
                        <Text style={{color:'white', fontWeight:'bold'}}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </View>
        </Modal>

        <View style={{justifyContent:'space-between', alignItems:'center', flexDirection: 'row',height: 89, backgroundColor:'#f7b81f'}}>
            <Text style={{ marginHorizontal:17, fontSize: 25, fontWeight:'bold', color:'white'}}>Edit Product</Text>
            <TouchableOpacity onPress={() => { setModal(true) }}>
                <Icon name={'ios-trash'} size={26} color={'white'} style={{marginHorizontal:17}}/>
            </TouchableOpacity>
        </View>

        <View style={{ alignItems:'center', marginTop:10}}>
            <Image source={categoryLogo} style={{width: 50, height: 50}} />
        </View>

        <View style={{flex:1, marginHorizontal:35}}>
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
          value={input.product_name}
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
          value={input.description}
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
          value={input.image}
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
          value={input.price.toString()}
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
          value={input.quantity.toString()}
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
           {props.dataCategories.map((item,index) => {
            return(
                <Picker.Item key={index} label={item.name} value={item.id} />
            )})}
        </Picker>
        </View>
      </View>
      <TouchableOpacity onPress={ handleSubmit }>
        <View style={{backgroundColor:'#f7b81f', justifyContent:'center', alignItems:'center', height: 60}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', color: 'white'}}>Edit</Text>
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

export default connect (mapStateToProps) (EditProduct);