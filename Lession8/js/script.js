$(document).ready(function () {
    var value = 0;
    var countClicked = 0;
    var clicked = false;
    var message = "";

    function getPosition(position) {
        if (position <= 30) {
            message = 'CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT NHÀ LẦU 4 TẦNG';
        }
        else if (position <= 90) {
            message = 'CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHUYẾN DU LỊCH VŨNG TÀU';
        }
        else if (position <= 150) {
            message = 'CHÚC MỪNG BẠN MAY MẮN LẦN SAU';
        }
        else if (position <= 210) {
            message = 'CHÚC MỪNG BẠN TRÚNG MỘT THẺ CÀO 200K';
        }
        else if (position <= 270) {
            message = 'CHÚC MỪNG BẠN TRÚNG MỘT THẺ CÀO 100K';
        }
        else if (position <= 330) {
            message = 'CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CHUYẾN DU LỊCH MIỀN TÂY';
        }
        else {
            message = 'CHÚC MỪNG BẠN TRÚNG ĐƯỢC MỘT CĂN NHÀ LẦU 4 TẦNG';
        }

        if (message.length > 0) $('.congratulation__note').text(message);

        $('.popup').removeClass('active');
        $('.congratulation').fadeIn();
        clicked = false;
        countClicked = 0;
    }
    $('.wheel__button').click(function () {
        if (clicked == true) {
            countClicked++;
            if (countClicked <= 2) $('.popup__note').text("NGỪNG PHÁ ĐI MEN!");
            else if (countClicked <= 4) $('.popup__note').text("LÌ QUÁ MEN!");
            else $('.popup__note').text("BÓ TAY, RÁNG PHÁ BANH NHA!");

            if (!$('.popup').hasClass('active')) {
                $('.popup').addClass('active');
            }
        } else {
            let random = Math.floor((Math.random() * 360) + 720);
            value += random;
            console.log(random % 360);
            console.log(value % 360);

            $('.wheel__inner').css("transform", `rotate(${value}deg)`);
            setTimeout(() => {
                getPosition(value % 360);
            }, 5000);
        }
        clicked = true;
    });

    $('.congratulation__close').click(function () {
        $('.congratulation').fadeOut();
    });
    $('.congratulation').click(function (event) {
        if (event.target != this) {
            return;
        }
        $(this).fadeOut();
    });
});