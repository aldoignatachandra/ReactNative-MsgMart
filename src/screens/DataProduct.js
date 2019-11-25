import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getProduct, postProduct, patchProduct, deleteProduct } from '../Redux/Actions/product';
import { ListItem, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import TouchableScale from 'react-native-touchable-scale';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DataProduct = (props) => {

    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [infoPage, setInfoPage] = useState({maxPage: 0, totalAllProduct: 0});
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const fetchDataProduct = async () => {
        try {
            const response = await dispatch( getProduct(rowsPerPage, page + 1, props.item.token));
            setInfoPage (response.value.data.result.infoPage);
        } catch (error) {
            console.log (error);
        }
    }

    useEffect(() => {
        fetchDataProduct ();
    },[page, rowsPerPage, props.dataCategories])

    return (
        <>
            <View style={{justifyContent:'space-between', flexDirection: 'row', alignItems:'center', height: 80, backgroundColor:'#f7b81f'}}>
                <Text style={{marginHorizontal:17, fontSize: 25, fontWeight:'bold', color:'white'}}>Data Product</Text>
                <TouchableOpacity onPress = {() =>{ props.navigation.navigate('AddProduct') }}>
                    <Icon  name={'circle-with-plus'} size={30} color={'white'} style={{marginHorizontal:17}}/>
                </TouchableOpacity>
            </View>
            <ScrollView style={{marginHorizontal:17, flex:1, backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
                { props.dataProduct.map((data, index) => {
                    return (
                    <View key={index}>
                        <ListItem onPress = {() =>{ props.navigation.navigate('EditProduct',{selectedRow:data})}}
                            Component={TouchableScale}
                            friction={90}
                            tension={100}
                            activeScale={0.90}
                            title={data.product_name}
                            titleStyle={{ color: 'black', fontWeight: 'bold' }}
                            subtitle= { <View>
                                        <Text style={{color:"green"}}>Price : Rp.{data.price}</Text>
                                        <Text>Quantity : {data.quantity}</Text>
                                        </View> }
                            leftAvatar={{ rounded: true, source: { uri: data.image } }}
                            chevron={{ color: 'black' }}
                            badge={{ 
                                value: data.category, 
                                textStyle: { color: 'white' },
                                badgeStyle: { backgroundColor:"red"}
                                }}
                        />
                        <Divider/>
                    </View>
                    )
                })}
            </ScrollView>
        </> 
    )
}

const mapStateToProps = state => {
    return {
        item : state.auth.resultItem,
        dataProduct: state.product.listProduct,
        dataCategories: state.categories.listCategory,
        userDetail: state.auth.resultsLogin
    };
};
  
export default connect (mapStateToProps) (DataProduct);