 import React, { Component,useState } from 'react';
 import Ripple from 'react-native-material-ripple';
 import { Platform,TouchableHighlight } from 'react-native';


 function clickAble({isSupportTV = true,onFocus,onBlur,onPress,children}){
     if(Platform.isTV){

        if(isSupportTV){
            return (
                <TouchableHighlight onPress={onPress} onFocus={onFocus} onBlur={onBlur}>
                    {children}
                </TouchableHighlight>
            )
        }
        else
        {
            return <TouchableHighlight>{children}</TouchableHighlight>
        }
         
     }
     else
     {  return (
            <Ripple onPress={onPress}>
                {children}
            </Ripple>
        );
     }
 }

export default clickAble;