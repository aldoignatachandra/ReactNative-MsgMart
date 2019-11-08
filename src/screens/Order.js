import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {
    View,
    Image,
    TextInput,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { connect } from 'react-redux';
import { getProduct, postProduct, patchProduct, deleteProduct } from '../Redux/Actions/product';
import { Badge } from 'react-native-elements'
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';

const Order = (props) => {

    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [infoPage, setInfoPage] = useState({maxPage: 0, totalAllProduct: 0});
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const fetchDataProduct = async () => {
        await dispatch( getProduct(rowsPerPage, page + 1, props.item.token))
        .then (response => {
            setInfoPage (response.value.data.result.infoPage);
        })
        .catch (error => {
            console.log (error);
        })
    }

    useEffect(() => {
        fetchDataProduct ();
    },[page, rowsPerPage])

    return (
        <>
            <StatusBar backgroundColor="#f7b81f"></StatusBar>

            <View style={{justifyContent:'space-between', flexDirection: 'row', alignItems:'center', height: 80, backgroundColor:'#f7b81f'}}>
                <Text style={{marginHorizontal:17, fontSize: 25, fontWeight:'bold', color:'white'}}>Order List</Text>
            </View>

            {/* SEARCH NAVIGATION & CHART NAVIGATION*/}
            <View style={{marginTop: "5%",flexDirection:'row', justifyContent:"center"}}>
                {/* SEARCH NAVIGATION */}
                <TextInput placeholder='what MSG do you want to search....'
                    style={{borderWidth:3, borderColor:'#ffce1e', borderRadius: 20, height: 50, fontSize: 13,
                            paddingLeft: 45, paddingRight: 20, backgroundColor:'white', marginRight:5}}
                />
                <Image style={{width:25, height:25, position:'absolute', top: 12, left: 35}}
                    source={require('../images/ImageSearch.png')}
                />
                {/* CHART NAVIGATION */}
                <Image 
                    style={{marginLeft:"2%",marginTop:"3%"}}
                    source={require('../images/ImageCart.png')}
                />
            </View>
            
            {/* FEATURE APPS */}
            <View style={styles.viewFeature}>
                <View style={styles.viewMenu}>
                    <View style={styles.viewMenuBlue}>
                        <TouchableOpacity>
                            <View style = {styles.TouchableOpacity}>
                                <Text style = {styles.textMenu}>New</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewMenuBlue}>
                        <TouchableOpacity>
                            <View style = {styles.TouchableOpacityCategory}>
                                <Text style = {styles.textMenu}>Category</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewMenuBlue}>
                        <TouchableOpacity>
                            <View style = {styles.TouchableOpacityName}>
                                <Text style = {styles.textMenu}>Name</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* PRODUCT APPS */}
            <ScrollView style={styles.scrollMargin} showsVerticalScrollIndicator={false}>
                { props.dataProduct.map((data, index) => {
                    return (
                    <View key={index} style={{
                                borderWidth: 3,
                                borderRadius: 2,
                                borderColor: '#ddd',
                                borderBottomWidth: 0,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 1}}>
                    <ListItem
                            Component={TouchableScale}
                            friction={90}
                            tension={100}
                            activeScale={0.90}
                            style={{padding:5}}
                            title={data.product_name}
                            titleStyle={{ color: 'black', fontWeight: 'bold' }}
                            subtitle= { <View style={{marginTop:10}}>
                                        <Text>{data.description}</Text>
                                        <Text style={{color:"green"}}>{data.price}</Text>
                                        </View> }
                            leftAvatar={{ size: 70,rounded: true, source: { uri: data.image }}}
                            badge={{
                                    badgeStyle: { backgroundColor:"red", width:70, height:40},
                                    value: "Add To Cart", 
                                    textStyle: { fontWeight:"bold",color: 'white', textAlign:"center" 
                                }}}
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
        userDetail: state.auth.resultsLogin
    };
};

export default connect (mapStateToProps) (Order);

const styles = StyleSheet.create({
    inputText:{
      borderWidth:1,
      borderColor:'#E8E8E8',
      borderRadius: 25,
      height: 50,
      fontSize: 13,
      paddingLeft: 45,
      paddingRight: 20,
      backgroundColor:'white',
      marginRight: 9
    },
    viewBody: {
      flex: 1,
      backgroundColor:'white'
    },
    viewSearchCart: {
      marginHorizontal: 17,
      flexDirection:'row',
      paddingTop:15
    },
    viewSearch: {
      position:'relative',
      flex:1
    },
    cartImage: {
      width:25,
      height:25,
      position:'absolute',
      top: 12,
      left: 12
    },
    viewCartIcons: {
      width:35,
      alignItems:'center',
      justifyContent:'center'
    },
    imageBasket: {
      width: 28,
      height: 28
    },
  
  // FEATURE APPS STYLE
    viewFeature: {
      marginHorizontal:17,
      marginTop: 15
    },
    viewLogo: {
      flexDirection: 'row',
      justifyContent:'space-between',
      backgroundColor:'#fdd42a',
      borderTopLeftRadius: 7,
      borderTopRightRadius: 7,
      padding:13
    },
    imageLogo: {
      width: 115,
      height: 20
    },
    textLogo: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white'
    },
    viewMenu: {
      flexDirection: 'row',
      paddingTop:20,
      paddingBottom: 14,
      backgroundColor:'white',
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 7
    },
  
  // MENU BLUE STYLE
    viewMenuBlue: {
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      marginTop: -20
    },
    TouchableOpacity:{
      backgroundColor: '#f7b81f',
      paddingRight:25,
      paddingLeft:25,
      paddingTop:3,
      paddingBottom:3,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      height: 35
    },
    TouchableOpacityCategory:{
      backgroundColor: '#f7b81f',
      paddingRight:15,
      paddingLeft:15,
      paddingTop:3,
      paddingBottom:3,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      height: 35
    },
    TouchableOpacityName:{
      backgroundColor: '#f7b81f',
      paddingRight:19,
      paddingLeft:19,
      paddingTop:3,
      paddingBottom:3,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      height: 35
    },
    textMenu:{
      color: 'white',
      fontWeight: "bold"
    },
  
    //CONTENT APP STYLE
    scrollMargin: {
      marginTop: -5,
    },
    viewContentImage: {
      marginHorizontal:17,
      marginTop: 10,
      flexDirection:'row',
      position:'relative'
    },
    imageContent: {
      width: 50,
      height:50,
      borderRadius:5
    },
    viewContentText:{
      marginHorizontal:17,
      width:'69%'
    },
    contentTitle:{
      fontSize: 18,
      fontWeight: 'bold',
      paddingTop:5
    },
    contentDesc:{
      fontSize: 15,
      paddingTop:5
    },
    viewContentPrice:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    textContent:{
      fontSize: 15,
      fontWeight: 'bold',
      paddingTop:15
    },
    contentTouchable:{
      borderRadius: 25,
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: '#0DAC50',
      padding: 5,
      paddingLeft:20,
      paddingRight:20
    },
    textCart:{
      fontWeight: 'bold',
      color:'white'
    }
  });