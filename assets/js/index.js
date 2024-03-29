$(function () {
  getUserInfo()

  var layer = layui.layer
  //退出
  $('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      //do something
      localStorage.removeItem('token')
      location.href = './login.html'
      layer.close(index);
    });
  })
})

//获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function (res) {
      if (res.status !== 0) return layui.layer.msg(res.message)
      //渲染用户头像
      renderAvatar(res.data)
    }
  })
}
//渲染用户头像
function renderAvatar(user) {
  var name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (user.user_pic != null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    $('.layui-nav-img').hide()
    var firstChar = name[0].toUpperCase()
    $('.text-avatar').html(firstChar).show()
  }
}

//点击事件
function articleListClick() {
  console.log(1112121);
  $('#dl_article').click()
}