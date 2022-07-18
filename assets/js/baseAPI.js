//每次调用ajax前会先调用此函数
var _URL = 'http://www.liulongbin.top:3007'
$.ajaxPrefilter(function (options) {
  options.url = _URL + options.url
  //设置请求头
  if (options.url.indexOf('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }
  options.complete = function (res) {
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      localStorage.removeItem('token')
      location.href = './login.html'
    }
  }
})