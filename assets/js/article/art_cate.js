$(function () {
  initArtCateList()
  //获取文章分类列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        // console.log(res);
        var tableStr = template('tpl-table', res)
        $('tbody').empty().html(tableStr)
      }
    })
  }
  var layer = layui.layer
  var layer_add = null;
  //添加类别按钮点击事件
  $('#btnAddCate').on('click', function () {
    layer_add = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    });
  })
  //通过代理的形式给form-add绑定提交事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      // data: {
      //   id: 333333,
      //   name: '情感',
      //   alias: 'QG',
      //   is_delete: 0
      // },
      success: function (res) {
        if (res.status !== 0) layer.msg('新增分类失败')
        initArtCateList()
        layer.msg('新增分类成功')
        layer.close(layer_add)
      }
    })
  })

  var layer_edit = null
  //通过代理给编辑绑定事件
  $('body').on('click', '.btn-edit', function (e) {
    layer_edit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    });

    var id = $(this).attr('data-id')
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        console.log(res);
        layui.form.val('form-edit', res.data)
      }
    })
  })

  //通过代理给form-edit绑定提交事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) layer.msg('更新分类失败')
        initArtCateList()
        layer.msg('更新分类成功')
        layer.close(layer_edit)
      }
    })
  })

  //通过代理给删除按钮绑定事件
  $('body').on('click', '.btn-delete', function (e) {
    var id = $(this).attr('data-id')
    layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) return layer.msg('删除失败')
          layer.msg('删除成功')
          layer.close(index);
          initArtCateList()
        }
      })

    });
  })
})