//每次调用ajax前会先调用此函数
var _URL = 'http://www.liulongbin.top:3007'
$.ajaxPrefilter(function (options) {
  options.url = _URL + options.url
})