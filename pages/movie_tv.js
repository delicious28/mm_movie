/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component,useState } from 'react';
 import { Platform,Image,ImageBackground, StyleSheet, Text, View,ScrollView,Button,Dimensions,ActivityIndicator,SafeAreaView,FlatList } from 'react-native';
 import getStar from '../components/star';
 import ClickAble from '../components/clickAble';
 import appStore from '../store/index'
 import { observer } from 'mobx-react';

 
 const Movie = (props)=>{

  
   const styles = StyleSheet.create({
     container: {
       flexDirection: 'column',
       justifyContent: 'flex-start',
       alignItems: 'flex-start',
       padding: 10,
       width:130,
       height:200,
       marginBottom:10
     },
     thumbnail: {
       width: 106,
       height: 160
     },
     title: {
       fontSize: 12,
       textAlign: 'center',
       color:'#fff',
       alignItems: 'center',
       justifyContent:'center',
       marginTop:8,
       width:'100%'
      //  fontWeight: 'bold'
     },
     rightContainer: {
       flex: 1,
       alignItems:'flex-start',
     },
     btnDownloadWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:'center'
     },
     btnDownload:{
       width:50,
       height:20,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems:'center',
       backgroundColor:'#008bed',
       color:'#fff',
     },
     btnDownloadText:{
       margin:0,
       padding:0,
       fontSize:12,
       color:'#fff'
     },
     desc:{
       fontSize: 10,
       color:'#bbb',
       marginLeft:10,
       marginBottom:5,
       marginTop:5
     },
     primaryInfo:{
       marginLeft:15,
       flex: 1,
     },
     stars:{
       flexDirection: 'row',
       marginTop:5,
       alignItems:'center'
     },
     starValue:{
       marginLeft:10,
       fontSize:9
     },
     subTitle:{
       marginTop:5,
       color: '#888',
       fontSize: 11
     },
     isSelectd:{
       fontWeight:'bold',
       backgroundColor:'#222',
       padding:0
     },
     isSelectdImg:{
       height:150
     }
   });
   const [isFocus,setisFocus] = useState(false)
   const movie = props.data;
   return (
    <ClickAble
      onFocus = {()=>{
        setisFocus(true)
      }}
      onBlur = {()=>{
        setisFocus(false)
      }}
      onPress = {()=>{
      props.navigation.navigate('Details',{
        movie
      })
    }}>
      <View style={[styles.container,isFocus?styles.isSelectd:{}]}>
        <Image style={[isFocus?styles.isSelectdImg:{}]} source={{uri: movie.pic.normal,width:'100%',height:160}} />
        <Text numberOfLines={1} style={styles.title}>
            {movie.title}
        </Text>
        {isFocus && (
          <View style={{ 
            width:'100%',
            marginTop:5,
            alignItems: 'center',
            justifyContent:'center',
            flexDirection: 'row',
            }}>
              {getStar(movie,8)}
              <Text style={{color:'#fff',fontSize:12,marginLeft:5}}>{movie.rating.value}分</Text>
          </View>
        )}
      </View>
    </ClickAble>
   );
 };

 function Tags({currentTag,tags,onTagPress,darkColor}){
  const styles = StyleSheet.create({
    container: {
      width:'100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 40,
      marginBottom:20,
    },
    tag:{
      padding: 10
    },
    selected:{
      fontWeight:'bold'
    },
    selectedView:{
        backgroundColor:'#333'
    },
    tagText:{
      color:'#fff'
    },
    selectedLine:{
      position:"absolute",
      top:35,
      height:3,
      right:10,
      left:10,
      backgroundColor:'#fff',
    },
    isFocus:{
      color: '#4169E1'
    }
  });
 
   return (
    <SafeAreaView style={styles.container}>
     <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{alignItems:'center'}} style={{height:40}}  horizontal={true}>
        {
          tags.map(item=>{
            let isSelectd = (currentTag == item);
            let [isFocus,setisFocus] = useState(false)

            // let style = {}

            return (
              <ClickAble key={item}
              onFocus = {()=>{
                setisFocus(true)
              }}
              onBlur = {()=>{
                setisFocus(false)
              }}
              onPress={()=>{
                onTagPress(item)
              }}>
                <View style={[styles.tag,(isFocus?styles.selectedView:{})]}>
                  <Text style={[styles.tagText,(isFocus?styles.selected:{})]}>{item}</Text>
                  {isSelectd &&  <View style={styles.selectedLine}></View>}
                </View>
              </ClickAble>
            )
          })
        }
    </ScrollView>
    </SafeAreaView>
   )
 }
 
 @observer class App extends React.Component {
   constructor(props) {
     super(props);   //这一句不能省略，照抄即可
     this.state = {
       movies: null,  //这里放你自己定义的state变量及初始值
       downloadInfo:[],
       pageInfo:null,
       currentTag:'最新电影',
       backgroundColor:'#000',
       darkColor:'#666'
     };
     // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
     // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
     this.fetchData = this.fetchData.bind(this);
   }
   componentDidMount() {
     this.fetchData();
     this.getDownloadData();
   }
   setBackgroundColor(color){
       this.setState({
        backgroundColor:color.light,
        darkColor:color.dark
       })
   }
   async fetchData() {
     
    this.setState({
      movies:null
    })


    let currentTag = this.state.currentTag;
    if(currentTag=='最新电影')
    {
      // 这个是接口获取
      let REQUEST_URL = 'http://mmhh.i234.me:3003/getData';

      fetch(REQUEST_URL)
        .then((response) => response.json())
        .then(async (responseData) => {
          this.setState({
            pageInfo:responseData.pageInfo,
            movies: responseData.list,
          });
      });
    }
    else if(currentTag=='已下载')
    {
      // 这个是接口获取
      let REQUEST_URL = 'http://mmhh.i234.me:3003/getLocalFilm';

      fetch(REQUEST_URL)
        .then((response) => response.json())
        .then(async (responseData) => {

          this.setState({
            pageInfo:responseData.pageInfo,
            movies: responseData.list,
          });
        });
    }
   }
   render() {
     if (!this.state.movies) {
       return this.renderLoadingView();
     }
     return this.renderMovie(this.state.movies,this.state.downloadInfo);
   }
    getDownloadData(){
      let REQUEST_URL = 'http://mmhh.i234.me:3003/getDownloadInfo';
        //获取所有下载过的电影
        fetch(REQUEST_URL)
        .then((response) => response.json())
        .then((responseData) => {
          // console.log("写入的："+responseData[responseData.length-1].completedLength)
          appStore.saveData(responseData)
          //let timeout = (Platform.isTV || Platform.isPad) ? 10000 : 1000;
          setTimeout(()=>{
            this.getDownloadData()
          },1000)
        }).catch(()=>{

        });
    }
   renderLoadingView() {
     return (
      <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems:'center',
        padding: 10,
        backgroundColor:'#000'
      }}>
        <ActivityIndicator color="#008bed" size="large" />
        <Text style={{marginTop:30,paddingLeft:10,color:'#fff'}}>资源加载中...</Text>
      </View>
     );
   }
   renderMovie(movies,downloadInfo) {

     const myDimensions = Dimensions.get('window');

     
     //判断一行可以放几个然后进行分割
     let count =  parseInt(myDimensions.width / 130);

    const renderItem = ({ item }) => (
      <Movie navigation={this.props.navigation} downloadInfo={downloadInfo}  data={item}></Movie>
    );

    const styles = StyleSheet.create({
        container:{
            paddingTop:10,
            paddingLeft:20,
            height:'100%',
            // flexDirection:'row',
            width:'100%',
            // flexWrap:'wrap'
        }
    })
 
     return (
       <View style={{...styles.container,backgroundColor:this.state.backgroundColor}}>
        <Tags currentTag={this.state.currentTag} darkColor={this.state.darkColor} tags={['最新电影','已下载']} onTagPress={(tag)=>{
         this.setState({
          currentTag:tag
         });
         this.fetchData();
        }}></Tags>
            <FlatList data={movies} numColumns={count} renderItem={renderItem} keyExtractor={item=>item.title} />
       </View>
     )
   }
 }
 
 export default App;
 