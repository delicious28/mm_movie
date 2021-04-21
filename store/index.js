import {observable, action } from 'mobx'

let appState = observable({
    timer:0,
    data:null,
    currentTag:'最新电影',
    movieList:[]
})

appState.saveData = function(data){
    this.data = data;
}

appState.setMovieList = function(data){
    this.movieList = data;
}

appState.increase = ()=>{
    appState.timer++
}

appState.decrease = ()=>{  
    appState.timer--
}

export default appState;
