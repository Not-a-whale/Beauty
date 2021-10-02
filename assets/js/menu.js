$(document).ready(function() {
    const container = $(".main-menu__container");
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
        const sumbenu1 =  $(".main-menu__submenu-1");
        $("#firstList").css({
            transform: `translateX(-100%)`,
        });
        sumbenu1.css({
            transform: `translateX(100%)`,
            visibility: "visible"
        });
        container.animate({
            height: `${sumbenu1[0].offsetHeight}px`
        });
    })

    $("#backToMenu0").click(function(e) {
        const sumbenu1 =  $("#firstList");
        e.stopPropagation();
        $("#firstList").css({
            transform: `translateX(1%)`,
        });
        container.animate({
            height: `${sumbenu1[0].offsetHeight}px`
        });
    })
})