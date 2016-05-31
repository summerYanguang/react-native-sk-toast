'use strict';

var React = require('react-native');
var {
  NativeModules,
  // ToastAndroid, // Do not use this, or you will get a fuck error: undefined is not a function (evaluating `ToastAndroid.show(message, ToastAndroid.SHORT)`)
  Platform
} = React;
var ToastIOS = NativeModules.SKToastManager,
    ToastAndroid = NativeModules.ToastAndroid;

var delegate = {};
['top', 'center', 'bottom'].map((pos) => {
  delegate[pos] = function(title ,message, duration=1.0, color='#909090'){
    if(Platform.OS === 'ios'){ // ios: show(String message, int duration, String position), 其中position为 top/center/bottom
      ToastIOS.show(message, duration, pos, title, color);
    }else{ // android: show(String message, int type)，其中type为 ToastAndroid.SHORT / ToastAndroid.LONG
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  }
})
module.exports = delegate;
