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
  Alert
} from 'react-native';
import categoryLogo from '../images/ImageCategorySelected.png'
import Icon from 'react-native-vector-icons/Ionicons'
import { patchCategories, deleteCategories } from '../Redux/Actions/categories';
import { Toast } from 'native-base';
import { connect } from 'react-redux';

const EditCategory = (props) => {

    const [input, setInput] = useState({id:"", name:""});
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
        dispatch(patchCategories (input, props.item.token))
        .then(response => {
            if (response.value.data.status === 200) {
                showToast("Success Edit Category", "success");
                setTimeout(() => {
                    props.navigation.navigate('DataCategory');
                }, 500);
            } else {
                showToast(response.value.data.error, "warning");
            }
        }).catch(error => alert(error));
    };

    const handleDelete = (id) => {
        dispatch(deleteCategories (id, props.item.token))
        .then(response => {
            if (response.value.data.status === 200) {
                showToast("Success Delete Category", "success");
                setTimeout(() => {
                    setModalVisible(!modal);
                    props.navigation.navigate('DataCategory');
                }, 500);
            } else {
                showToast(response.value.data.error, "warning");
                setTimeout(() => {
                    setModalVisible(!modal);
                    props.navigation.navigate('DataCategory');
                }, 500); 
            }
        })
        .catch(error => alert(error));
    };

    useEffect(()=>{
        setInput({
            id: navigation.state.params.selectedRow.id,
            name: navigation.state.params.selectedRow.name
        })
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
                        Delete Category ( {input.name} ) ?
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
            <Text style={{ marginHorizontal:17, fontSize: 25, fontWeight:'bold', color:'white'}}>Edit Category</Text>
            <TouchableOpacity onPress={() => { setModal(true) }}>
                <Icon name={'ios-trash'} size={26} color={'white'} style={{marginHorizontal:17}}/>
            </TouchableOpacity>
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
                    placeholder={'Edit Category Name Here....'}
                    onChangeText={(category) => setInput({...input, name: category })}
                    value={input.name}
                />
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
        item : state.auth.resultItem
    };
};

export default connect (mapStateToProps) (EditCategory);