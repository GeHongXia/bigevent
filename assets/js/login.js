$(function () {



    // 切换到注册页面
    $('.login-box a').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide()

    })

    // 切换到登录页面
    $('.reg-box a').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide()

    })


    // 表单的验证
    var form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepass: function (value) {
            var ipt = $('.layui-form #ipt').val()
            if (ipt != value) {
                return '密码不相同'
            }
        }
    })


    var layer = layui.layer;

    //注册的实现
    $('.reg-box .layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('用户名被占用，请更换其他用户名！');

                }
                layer.msg('注册成功');
                $('.reg-box a').click();

            }
        })
    })


    //登录的实现
    $('.login-box .layui-form').on('submit', function (e) {

        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status != 0) {
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功');
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }

        })
    })






})