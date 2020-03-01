// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')

// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)




$('#btnChooseImage').on('click', function () {
    $('#file').click();
})

//使用formdata上传文件使用的传的也是 e.target.files中的内容   伪数组
$('#file').on('change', function (e) {
    //e.target.files 用户选择的文件列表
    var files = e.target.files
    if (files.length === 0) {
        return layer.msg('请选择图片')
    }

    var newImgURL = URL.createObjectURL(files[0]);
    $image.cropper('destroy')
        .attr('src', newImgURL)
        .cropper(options)

})

$('#upload').on('click', function () {
    var dataURL = $image
        .cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        })
        .toDataURL('image/png')

    $.post('/my/update/avatar', { avatar: dataURL }, function (res) {
        if (res.status != 0) {
            return layui.layer.msg('更换头像失败！')
        }

        layui.layer.msg('更换头像成功！');
        window.parent.fn1();


    }

    )

})