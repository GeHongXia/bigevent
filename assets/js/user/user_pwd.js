$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        somenewPwd: function (value) {
            var oldPwd = $('[name=oldPwd]').val()
            if (oldPwd === value) {
                return "旧密码与新密码不能相同"

            }
        },

        somenewPwd2: function (value) {
            var newPwd = $('[name=newPwd]').val()
            if (newPwd !== value) {
                return "密码输入不一致"
            }
        }


    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('原密码错误')
                }
                layer.msg('更新密码成功')
                $('.layui-form')[0].reset();



            }
        })

    })

})

