    // ===================>
    const html5QrCode = new Html5Qrcode("reader", {
      formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128],
    });
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      console.log(decodedText);
      document.getElementById("idInput").value = decodedText;
      consulta();
      html5QrCode
        .stop()
        .then((ignore) => {
          setTimeout(() => {
            html5QrCode.start(
              { facingMode: "user" },
              config,
              qrCodeSuccessCallback
            );
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const config = { fps: 15, qrbox: { width: 500, height: 200 }, aspectRatio: 1.777778 };
    html5QrCode.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback
    );
    // ===================>