/**
 * Created by funmi on 4/2/17.
 */

var app = angular.module("starter",[]);

app.filter('decodeHtml',function () {
  return function (str) {
      console.log(str);
      if(str && typeof  str === 'string'){
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = '';
      }
      return str;
  }
});
