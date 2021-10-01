$(document).ready(function() {
    $(".mobile__nav-trigger").click(function() {
        $(".overlay").toggleClass('overlay-active');
    });

    $(".overlay-cross").click(function() {
        $(".overlay").toggleClass('overlay-active');
    });

    $(".dropdown-nav").mouseleave(function() {
        setTimeout(() => {
            $("#headerDropdownNav").removeClass("display");
        }, 1000)
    });

    $("#overlayMenu1Trigger").click(function() {
        let firstMenuWidth = $("#firstList").width();
        let secondMenuWidth = $(".main-menu__submenu-1").width();
        $("#firstList").css({
            transform: `translateX(-${firstMenuWidth}px)`,
        });
        $(".main-menu__submenu-1").css({
            transform: `translateX(${secondMenuWidth}px)`
        })
    })

})