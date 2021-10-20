const magnifying_area = $("#magnifying_area");
const magnifying_img = $("#mainProductImage");

magnifying_area.on("mousemove", function (e) {
  let clientX = e.clientX - magnifying_area.offset().left;
  let clientY = e.clientY - magnifying_area.offset().top;

  let mWidth = magnifying_area[0].offsetWidth;
  let mHeight = magnifying_area[0].offsetHeight;

  clientX = (clientX / mWidth) * 100;
  clientY = (clientY / mHeight) * 100;

  magnifying_img[0].style.transform = `translate(-${clientX}%, -${clientY}%) scale(1.5)`;
  magnifying_img[0].style.transform = `translate(-${clientX}%, -${clientY}%) scale(1.5)`;
});

magnifying_area.on("mouseleave", function () {
  magnifying_img.css("transform", "translate(-50%, -50%) scale(1)");
});
