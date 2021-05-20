/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component,useState,useEffect } from 'react';
 import { 
   Platform,
   Image, 
   StyleSheet, 
   Text, 
   View,
   ScrollView,
   Button,
   Modal,
   NativeModules,
   ActivityIndicator,
   ImageBackground 
  } from 'react-native';

 import ClickAble from '../components/clickAble';
 import AddUri from '../utils/aria2';
 import moment from 'moment';
 import getStar from '../components/star';
 import 'moment/locale/zh-cn';
 import ImageViewer from 'react-native-image-zoom-viewer';
 import appStore from '../store/index'
 import { computed } from 'mobx';

 const { CalendarModule } = NativeModules;
 moment.locale('zh-cn');
//  let movieStatus = {};

 const MovieDetail = ({navigation,route})=>{


  let movie = route.params.movie;
  let _movieStatus = getFilmStatus(appStore.data,movie);
  let _timeout = null;
  const [showMore, setshowMore] = useState(true);
  const [showImageModal,setshowImageModal]= useState(false);
  const [movieDetail,setMovieDetail] = useState({});
  const [movieStatus,setmovieStatus] = useState(_movieStatus);
  


  useEffect(()=>{
    _movieStatus = getFilmStatus(appStore.data,movie);
    if(movieStatus.completedLength != _movieStatus.completedLength){
      setmovieStatus(getFilmStatus(appStore.data,movie))
    }
    else
    {
      _timeout = setTimeout(()=>{
        setmovieStatus(getFilmStatus(appStore.data,movie))
      },1000)
    }
    return ()=>{
      clearTimeout(_timeout);
    }
  })

  useEffect(()=>{
      fetch("http://mmhh.i234.me:3003/getMovieInfo?name="+movie.title)
            .then((response) => response.json())
            .then(async (responseData) => {
              // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
              setMovieDetail({
                ...movie,
                ...responseData
              })
            });
  },[movie])  

   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#fff',
     },
     headInfoWrap: {
        flexDirection:'row',
        backgroundColor: '#3b3c42',
        // backgroundColor: '#fff',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop:20,
        paddingBottom:20,
     },
     headInfo:{
        flex:1,
        paddingLeft: 15,
     },
     headInfoTitle:{
       fontSize:20,
       color: '#fff'
     },
     headInfoSubTitle:{
       marginTop: 5,
       fontSize:13,
       color: '#fff'
     },
     headInfoOthers:{
       fontSize:11,
       marginTop:4,
       color: '#eee'
     },
     movieModal: {
       flex:1,
       marginRight: 20,
       marginLeft: 20,
       marginTop: 20
     },
     modalTitle:{
       color: '#818181',
       fontSize: 16,
     },
     reportCnt:{
       marginTop:10,
       fontSize:14,
       color: '#000',
       lineHeight:22,
     },
     screenShot:{
       flex:1,
       margin: 20,
     },
     actorsWrap:{
      marginTop:12,
      flexDirection:'row'
     },
     actorItem:{
       marginRight:15
     },
     actAvatar:{
      borderRadius:4,
     },
     actName:{
       fontSize:12,
       marginTop:5,
       textAlign:'center'
     },
     actRoles:{
      fontSize:11,
      color:'#818181',
      textAlign:'center'
     },
     linkMore:{
       marginTop:5,
       textAlign:'right',
       color:'#5094d5'
     },
     commentItem:{
      marginTop:15,
      flexDirection:'row'
     },
     commentUserAvatar:{
       borderRadius:15
     },
     commentInfo:{
       marginLeft:10,
       borderBottomColor: '#efefef',
       borderBottomWidth: 0.3,
       paddingBottom:15,
       
     },
     commentUserWrap:{
      flexDirection:'row',
      alignItems:'center'
     },
     
     commentUserName:{
      marginRight:5,
     },
     commentFromNow:{
       marginLeft:5,
       fontSize:11,
       color:'#c0c0c0'
     },
     comment:{
       marginTop:10,
       paddingRight:25,
       lineHeight:22
     },
     pnlBottom:{
       position:'absolute',
       bottom:0,
       right:0,
       width:'100%',
       backgroundColor:'red'
     },
     tarilerBackground:{
       marginTop:10,
       flex:1,
       resizeMode: "cover",
       justifyContent: "center",
       alignItems:"center",
       height:150,
     },
     btnPlay:{
       width: 50,
       height:50
     },
     btnPlayFocus:{
      width: 70,
      height:70
     }
   });

   const modalImg = [{
     url: movie.pic.large,
     props:{}
   }]

   function cutFonts(cnt,long) {
    if(cnt && cnt.length>long){
      cnt = cnt.substring(0,long)+'...';
    }
    return cnt;
   }

   function Actors({actors,isDirector}){
     let list = [];
     for(var actor of actors){
       if(actor.name){
        list.push(
          <View key={actor.name} style={styles.actorItem}>
            <Image style={styles.actAvatar} source={{uri: actor.avatar.normal,width:60,height:90}} />
            <Text style={styles.actName}>{cutFonts(actor.name,5)}</Text>
            <Text style={styles.actRoles}>{isDirector ? '导演' : cutFonts(actor.roles[0],5)}</Text>
          </View>
         );
       }
     }
     return list;
   }

   function getFilmStatus(downloadedFilms,movie){
      let status = {
        status:0,
        statusName:'未下载'
      };

      if(movie.pathName) {
        return {
          "name": movie.pathName,
          "size": 1190392239,
          "birthtimeMs": 1618206677295.52,
          "status": 2
        }
      }
      
      downloadedFilms.forEach(item=>{

        if(item.name.indexOf(movie.title)>-1){
          if(item.status == 'finished'){
            status = {
              ...item,
              status:2,
              statusName:'已下载'
            };
          }
          else if(item.status == 'active'){
            status = {
              ...item,
              status:1,
              statusName:'正在下载'
            };
          }
        }
      })

      return status;
   }

   function DownloadButton(){

    const [isFocus,setisFocus] = useState(false)
    let button =null;

    let color = isFocus ? "#FF8C00" : '#'+movieDetail.color_scheme.primary_color_light;

    let onPress = ()=>{};

    if(movieStatus.status == 0){
      onPress=() => {
        AddUri(movie.downloadUrl,()=>{});
        alert('开始发起下载请求')
      }
      button = <Button title="下载" style={isFocus?styles.btnFocus:{}} color={color} />;
    }
    if(movieStatus.status == 1)
    {
      let statusName = movieStatus.statusName;
      if(movieStatus.completedLength){
        statusName = "已下载 "+(movieStatus.completedLength / movieStatus.totalLength * 100).toFixed(2)+"%"
      }

      button = <Button title={statusName} style={isFocus?styles.btnFocus:{}} color={color} />;
    }
    else if(movieStatus.status == 2){
      onPress=()=>{
        CalendarModule.openPlayer("http://mmhh.i234.me:3003/movies/"+movieStatus.name,movie.title);
        // CalendarModule.setDataEnabled(true);
      }
      button = <Button title="播放" style={isFocus?styles.btnFocus:{}} color={color} />;
    }



    return (
      <ClickAble 
        onFocus = {()=>{
          setisFocus(true)
        }}
        onBlur = {()=>{
          setisFocus(false)
        }}
        onPress={onPress}
      >
        {button}
      </ClickAble>
    );
   }

   function Comments({comments}){

     return comments.interests.map((item,index)=>{
       return (
         <View style={styles.commentItem} key={item.id}>
            <Image style={styles.commentUserAvatar} source={{uri: item.user.avatar,width:25,height:25}} />
            <View style={{...styles.commentInfo,borderBottomWidth:((index<comments.interests.length-1)?0.3:0)}}>
              <View style={styles.commentUserWrap}>
                <Text style={styles.commentUserName}>
                  {item.user.name}
                </Text>
                { getStar(item,10) }
                <Text style={styles.commentFromNow}>
                    {moment(item.create_time).fromNow().replace(' ','')}
                  </Text>
              </View>
              <Text style={styles.comment}>
                {item.comment}
              </Text>
            </View>
         </View>
       )
     })
   }

   function renderLoadingView() {
    return (
     <View style={{
       flex: 1,
       justifyContent: "center",
       alignItems:'center',
       padding: 10
     }}>
       <ActivityIndicator color="#008bed" size="large" />
       <Text style={{marginTop:30,paddingLeft:10}}>资源加载中...</Text>
     </View>
    );
  }

  function TrailerVideo({trailer}){
    const [isFocus,setisFocus] = useState(false)
    return (
      <ClickAble 
        onFocus = {()=>{
          setisFocus(true)
        }}
        onBlur = {()=>{
          setisFocus(false)
        }}
        onPress={()=>{
          CalendarModule.openPlayer(trailer.video_url,trailer.title);
        }}
      >
        <ImageBackground style={styles.tarilerBackground} source={{uri:trailer.cover_url}}>
          <Image style={[styles.btnPlay,isFocus?styles.btnPlayFocus:{}]} source={require('../static/images/play-black.png')} />
        </ImageBackground>
      </ClickAble>
    )
  }

  function PlayButton(){
    let style = StyleSheet.create({
      container: {
        flex: 1,
        alignItems:"center",
        justifyContent:"center",
        width:120
      },
      btnPlayFocus:{
        width: 80,
        height:80
      },
      btnPlay:{
        width: 60,
        height:60
      }
    });
    const [isFocus,setisFocus] = useState(false);

    if((Platform.isTV || Platform.isPad) && movieStatus.status == 2){
      return   (
        <ClickAble 
            onFocus = {()=>{
              setisFocus(true)
            }}
            onBlur = {()=>{
              setisFocus(false)
            }}
            onPress={()=>{
              CalendarModule.openPlayer("http://mmhh.i234.me:3003/movies/"+movieStatus.name,movie.title);
              
            }}
          >
            <View style={style.container}>
              <Image style={[style.btnPlay,isFocus?style.btnPlayFocus:{}]} source={require('../static/images/play-black.png')} />
            </View>
          </ClickAble>
        )
    }

    return null
    
  }

   return movieDetail.title ? (
     <View>
       <View style={{paddingBottom:40,backgroundColor:'#fff'}}>
        <ScrollView>
          <View style={styles.container}>
              <View style={{...styles.headInfoWrap,backgroundColor:('#'+movieDetail.color_scheme.primary_color_light)}}>
                <ClickAble isSupportTV={false} onPress = {()=>{
                  setshowImageModal(true)
                }}>
                <Image onPress={()=>{
                  setshowImageModal(true)
                }} style={styles.headInfoImage} source={{uri: movieDetail.pic.large,width:88,height:130}} />
                </ClickAble>
                <View style={styles.headInfo}>
                  <Text style={styles.headInfoTitle}>{movieDetail.title}</Text>
                  <Text style={styles.headInfoSubTitle}>{movieDetail.original_title} ({movieDetail.year})</Text>
                  <Text style={styles.headInfoOthers}>{movieDetail.countries[0]} / {movieDetail.genres.join(' / ')}</Text>
                  <Text style={styles.headInfoOthers}>片长: {movieDetail.durations[0]}</Text>
                  <View style={{...styles.headInfoOthers,flexDirection:'row',alignItems:'center'}}>
                    {getStar(movieDetail,8)} 
                    <Text style={{
                      marginLeft:5,
                      fontSize:12,
                      color: '#eee'}}>{parseFloat(movieDetail.rating.value).toFixed(1)}  ({movieDetail.rating.count}人评分)</Text>
                  </View>
                </View>
                <PlayButton></PlayButton>
              </View>

              {movieDetail.trailer ? (
              <View style={styles.movieModal}>
                <Text style={styles.modalTitle}>预告片</Text>
                <TrailerVideo trailer={movieDetail.trailer}></TrailerVideo>
              </View>
              ): null}

              {movieDetail.intro ? (
                <View style={styles.movieModal}>
                  <Text style={styles.modalTitle}>剧情简介</Text>
                  <Text onPress={()=>{setshowMore(!showMore)}} numberOfLines={showMore ? 3 : 1000} style={styles.reportCnt}>
                    {movieDetail.intro}
                  </Text>
                  {movieDetail.intro.length>70 &&  <Text onPress={()=>{setshowMore(!showMore)}} style={styles.linkMore}>{showMore?'展开':'收起'}</Text>}
                </View>
              ): null}

              <View style={styles.movieModal}>
                <Text style={styles.modalTitle}>演职员</Text>
                <ScrollView showsHorizontalScrollIndicator={false}  horizontal={true}>
                  <View style={styles.actorsWrap}>
                    <Actors actors={movieDetail.directors} isDirector={true}></Actors>
                    <Actors actors={movieDetail.actors}></Actors>
                  </View>
                </ScrollView>
              </View>

              <View style={styles.movieModal}>
                <Text style={styles.modalTitle}>评论</Text>
                <ScrollView>
                  <Comments comments={movieDetail.comments}></Comments>
                </ScrollView>
              </View>
          </View>
          <Modal visible={showImageModal} transparent={true}>
              <ImageViewer imageUrls={modalImg} onClick={()=>{setshowImageModal(false)}}/>
          </Modal>
        </ScrollView>
        </View>
        <View style={styles.pnlBottom}>
            <DownloadButton movieStatus={movieStatus}></DownloadButton>       
        </View>
     </View>
   ) : (
    renderLoadingView()
   );
 }


 export default MovieDetail;
 