$(function () {
    //显示新增图片集
    $('.createSet').click(function () {
        $('.photoSetInput').show();
    });
    //取消新增
    $('#cancel-btn').click(function () {
        $('.photoSetInput').hide();
    })
    //提交图片集名称
    $('#submit-btn').click(function () {
        var photoSetName = $('#photoSetName').val();
        var parentId = $('#parentId').val();
        var fileReader = new FileReader();
        var file = $('#f-file')[0].files[0];
        console.log(file);
        fileReader.readAsDataURL(file);
        fileReader.onload=function () {
            var formData = new FormData();
            formData.append('imgData', this.result);
            formData.append('photoSetName',photoSetName);
            formData.append('parentId',parentId);
            $.ajax({
                type : 'POST',
                url : '/addPhotoSet',
                data : formData,
                async: false,
                cache: false,
                contentType: false,
                processData: false,
                success : function (msg) {
                    if (msg.code == 200){
                        var dataArray = msg.data;
                        var html = "";
                        for (var i = 0 ;i <dataArray.length;i++){
                            html += "<div class='name-item'><div class='img'><img src='/img/group_icon.jpg' /></div><div class='text-center'>"+dataArray[i].photoSetName+"</div>" +
                                "<div class='text-center'>" +"<a class='btn btn-primary' href='/photoSetAddView/"+dataArray[i].parentId+"/"+dataArray[i]._id+"'>上传图片</a>"
                            "</div></div>";
                        }
                        $('.photoSetList').html(html);
                        $('.photoSetInput').hide();
                    }
                },
                error : function (msg) {
                    console.log("网络出错 :"+msg);
                }
            })
        }

       //

    })
    //获取所有图片集的名称
    $('#clientListBtn').click(function () {
        $.ajax({
            type : 'GET',
            url : "/PhotoSetList",
            success : function (msg) {
                if (msg.code == 200){
                    var dataArray = msg.data;
                    var html = "";
                    for (var i = 0 ;i <dataArray.length;i++){
                        html += "<div class='name-item'><div class='img'><img src='/img/group_icon.jpg' /></div><div class='text-center'>"+dataArray[i].photoSetName+"</div>" +
                            "<div class='text-center'>" +"<a class='btn btn-primary' href='/photoSetAddView/"+dataArray[i].parentId+"/"+dataArray[i]._id+"'>上传图片</a>"
                        "</div></div>";
                    }
                    $('.photoSetList').html(html);
                }
            }
        })
    })
    //提交关于我们
    $('.submit-about').click(function () {
        var formData = new FormData();
        for (var i = 1; i <8 ; i++){
            var file = $('#file'+i)[0].files[0];
            formData.append('file'+i, file);
        }
        var file3Text = $('#file3-text').val()
        formData.append('file3Text',file3Text)
        var file4Text = $('#file4-text').val()
        formData.append('file4Text',file4Text)
        var file5Text = $('#file5-text').val()
        formData.append('file5Text',file5Text)
        var file6Text = $('#file6-text').val()
        formData.append('file6Text',file6Text)

        var imgText1 = $('#imgText1').val()
        formData.append('imgText1',imgText1)
        var imgText2 = $('#imgText2').val()
        formData.append('imgText2',imgText2)


        $.ajax({
            type : 'POST',
            url : '/photoMulitAddSubmit',
            data : formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success : function (msg) {
               console.log(msg)
            },
            error : function (msg) {
                console.log("网络出错 :"+msg);
            }
        })
    })
})