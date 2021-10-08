$(document).ready(function() {
    const container = $(".main-menu__container");
    $(".mobile__nav-trigger").click(function() {
        $(".overlay--left").toggleClass('overlay-active');
    });

    $(".overlay-cross").click(function() {
        $(".overlay--left").toggleClass('overlay-active');
    });

    $(".dropdown-nav").mouseleave(function() {
        setTimeout(() => {
            $("#headerDropdownNav").removeClass("display");
        }, 1000)
    });

    $("#overlayMenu1Trigger").click(function() {
        const submenu1 =  $(".main-menu__submenu-1");
        $("#firstList").css({
            transform: `translateX(-100%)`,
        });
        submenu1.css({
            transform: `translateX(100%)`,
            visibility: "visible"
        });
        container.animate({
            height: `${submenu1[0].offsetHeight}px`
        });
    })

    $("#backToMenu0").click(function(e) {
        const submenu1 =  $("#firstList");
        const submenu2 =  $(".main-menu__submenu-1");
        e.stopPropagation();
        $("#firstList").css({
            transform: `translateX(0%)`,
        });
        submenu2.css({
            visibility: 'hidden'
        })
        container.animate({
            height: `${submenu1[0].offsetHeight}px`
        });
    })

    $(".backToMenu1").click(function(e) {
        e.stopPropagation();
        const submenu2_1 =  $("#submenu2_1");
        const submenu2_2 =  $("#submenu2_2");
        const submenu2_3 =  $("#submenu2_3");
        const submenu1 =  $(".main-menu__submenu-1");
        submenu1.css({
            transform: `translateX(100%)`,
            visibility: "visible"
        });
        [submenu2_1, submenu2_2, submenu2_3].forEach(element => {
            $(element).css({
                transform: `translateX(100%)`,
                visibility: 'hidden'
            })
        });
        container.animate({
            height: `${submenu1[0].offsetHeight}px`
        });
    })

    $("#triggerSubmenu2_1").click(function(e) {
        const submenu2 =  $("#submenu2_1");
        const submenu1 =  $(".main-menu__submenu-1");
        e.stopPropagation();
        submenu1.css({
            transform: `translateX(-100%)`,
        });
        submenu2.css({
            transform: `translateX(200%)`,
            visibility: 'visible'
        });
        container.animate({
            height: `${submenu2[0].offsetHeight}px`
        });
    });

    
    $("#triggerSubmenu2_2").click(function(e) {
        const submenu2 =  $("#submenu2_2");
        const submenu1 =  $(".main-menu__submenu-1");
        e.stopPropagation();
        submenu1.css({
            transform: `translateX(-100%)`,
        });
        submenu2.css({
            transform: `translateX(200%)`,
            visibility: 'visible'
        });
        container.animate({
            height: `${submenu2[0].offsetHeight}px`
        });
    });

    $("#triggerSubmenu2_3").click(function(e) {
        const submenu2 =  $("#submenu2_3");
        const submenu1 =  $(".main-menu__submenu-1");
        e.stopPropagation();
        submenu1.css({
            transform: `translateX(-100%)`,
        });
        submenu2.css({
            transform: `translateX(200%)`,
            visibility: 'visible'
        });
        container.animate({
            height: `${submenu2[0].offsetHeight}px`
        });
    });
})