$(function () {
    var layer = layui.layer;


    fn1()

    $('#btnLogout').on('click', function () {

        layer.confirm('确认退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        });


    })




})

function fn1() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',

        success: function (res) {
            if (res.status !== 0) {
                console.log(res)
                return layui.layer.msg('获取用户信息失败！')
            }

            fn2(res.data);
        }


    })
}


function fn2(data) {

    var uname = data.nickname || data.username;
    $('.wecolme').html('欢迎&nbsp;&nbsp;' + uname)
    if (data.user_pic) {
        $('.layui-nav-img').show().prop('src', data.user_pic);
        $('.touxiang2').hide()
    } else {
        $('.layui-nav-img').hide();
        var first = uname[0].toUpperCase()
        $('.touxiang2').show().text(first)
    }

}




