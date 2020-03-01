$(function () {
    var layer = layui.layer;
    var form = layui.form;
    inituserInfo()
    form.verify({
        nickname: [
            /^[\S]{2,6}$/
            , '昵称必须2到6位，且不能出现空格'
        ]
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('修改信息失败')
                }
                inituserInfo()
                window.parent.fn1();
                layer.msg('修改信息成功')
            }

        })
    })

    $('#btn').on('click', function (e) {
        e.preventDefault();
        inituserInfo();
    })



    function inituserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res)
                if (res.status != 0) {
                    return layer.msg("获取信息失败")
                }
                form.val("formTest", res.data)

            }
        })
    }



})