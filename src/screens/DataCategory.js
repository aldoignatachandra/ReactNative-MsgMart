import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getCategories } from '../Redux/Actions/categories';
import { ListItem, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import TouchableScale from 'react-native-touchable-scale';

const DataCategory = (props) => {

    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [infoPage, setInfoPage] = useState({maxPage: 0, totalAllCategories: 0});
    const [rowsPerPage, setRowsPerPage] = useState(20);

    //GET ALL DATA CATEGORY
    const fetchDataCategory = async () => {
        try {
            const response = await dispatch( getCategories(rowsPerPage, page + 1, props.item.token))
            setInfoPage (response.value.data.result.infoPage);
        } catch (error) {
            console.log (error);
        }
    }

    useEffect(() => {
        fetchDataCategory ();
    },[page, rowsPerPage])

    return (
        <>
        <View style={{justifyContent:'space-between', flexDirection: 'row', alignItems:'center', height: 80, backgroundColor:'#f7b81f'}}>
            <Text style={{marginHorizontal:17, fontSize: 25, fontWeight:'bold', color:'white'}}>Data Category</Text>
            <TouchableOpacity onPress = {() =>{ props.navigation.navigate('AddCategory') }}>
                <Icon name={'circle-with-plus'} size={30} color={'white'} style={{marginHorizontal:17}}/>
            </TouchableOpacity>
        </View>
        <ScrollView style={{marginHorizontal:17, flex:1, backgroundColor:'white'}} showsVerticalScrollIndicator={false}>
            {props.dataCategories.map((data, index) => {
                return (
                    <View key={index}>
                    <ListItem onPress = {() =>{ props.navigation.navigate('EditCategory',{selectedRow:data})}}
                        Component={TouchableScale}
                        friction={90}
                        tension={100}
                        activeScale={0.90}
                        title={data.name}
                        chevron={{ color: 'black' }}
                        badge={{ 
                            value: "Halal", textStyle: { color: 'white' },
                            badgeStyle: { backgroundColor:"green"}
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
        dataCategories: state.categories.listCategory,
        userDetail: state.auth.resultsLogin
    };
};
  
export default connect (mapStateToProps) (DataCategory);