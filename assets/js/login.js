$(function () {
  //点击去注册账号和去登录链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  $('#link_login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })


  //layui验证
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    //校验两次密码必须一致
    repwd: function (val) {
      if (val != $('.reg-box [name=password]').val())
        return '两次密码不一致'
    }
  });

  //注册表单的提交事件
  $('#form-reg').on('submit', function (e) {
    e.preventDefault()
    $.post('/api/reguser',
      $(this).serialize(), function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        layer.msg(res.message)
        $('#link_login').click()
        $('#form-reg')[0].reset()
      })
  })
  //登录表单的提交事件
  $('#form-login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message)
        localStorage.setItem('token', res.token)
        location.href = './index.html'
      }
    })
  })
})