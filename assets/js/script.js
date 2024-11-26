document.addEventListener("DOMContentLoaded", function () {
  let input = document.getElementById("input");
  let qrCodeContainer = document.getElementById("qr");

  let qrCode = new QRCode(qrCodeContainer, {
    text: input.value,
    width: 290,
    height: 290,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  input.addEventListener("input", function () {
    qrCode.clear();
    qrCode.makeCode(input.value);
  });

  input.value = "https://example.com";
  input.select();
  qrCode.makeCode(input.value);
});

function toast(text) {
  Toastify({
    text: text,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#98971a",
      color: "#ebdbb2",
    },
  }).showToast();
}
async function copy() {
  let dataUrl = document.getElementById("qr").querySelector("img").src;
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const clipboardItem = new ClipboardItem({
    [blob.type]: blob,
  });
  await navigator.clipboard.write([clipboardItem]);
  toast("QR code copied to clipboard!");
}

async function download() {
  let dataUrl = document.getElementById("qr").querySelector("img").src;
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "qr-code.png";
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  toast("QR code ready to download!");
}
