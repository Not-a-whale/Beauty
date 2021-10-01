$(document).ready(function() {
    $(".flag").click(function() {
        $("div").toggleClass('isRTL');
        $("p").toggleClass('isRTL');
        $("body").toggleClass('isRTL');
        $("header").toggleClass('isRTL');
        $("footer").toggleClass('isRTL');
    });

    $(".flag__mobile").click(function() {
        $("div").toggleClass('isRTL');
        $("p").toggleClass('isRTL');
        $("body").toggleClass('isRTL');
        $("header").toggleClass('isRTL');
        $("footer").toggleClass('isRTL');
    });
})