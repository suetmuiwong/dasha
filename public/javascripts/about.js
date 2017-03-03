
$(function(){
    $('.slideList dd').on('click',function(event) {
        var _this = $(this),
            _dlCon = _this.parents('dl'),
            _index = _dlCon.index(),
            _width = _dlCon.width();
        if(_index == 1){
            _dlCon.siblings('dl').css('left', -0.85*_width);
        }else if(_index == 0){
            _dlCon.css('left', 0);
        }
    });

    $(window).resize(function(){
        // 手风琴效果
        var _height = $('.slideList dt').height();
        // console.log(_height);
        $('.slideCon,.slideList dd').height(_height);
    })
});

