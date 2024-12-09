const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

value = params.url;
if (!value) {
  value = "https://example.com";
}
document.addEventListener("DOMContentLoaded", function () {
  let qrCodeContainer = document.getElementById("qr");
  let qrCode = new QRCode(qrCodeContainer, {
    text: value,
    width: 290,
    height: 290,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });
  qrCode.makeCode(value);
});
