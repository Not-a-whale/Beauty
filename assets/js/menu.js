$(document).ready(function() {
    $(".mobile__nav-trigger").click(function() {
        $(".overlay").toggleClass('overlay-active');
    });

    $(".overlay-cross").click(function() {
        $(".overlay").toggleClass('overlay-active');
    });

    $(".dropdown-nav").mouseleave(function() {
        $("#headerDropdownNav").removeClass("display");
    })

})