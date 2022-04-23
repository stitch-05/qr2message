import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect } from 'react';

const qrcodeRegionId = "html5qr-code-full-region";

function Html5QrcodePlugin(props) {
  useEffect(() => {
    function createConfig(props) {
      var config = {};
      if (props.fps) {
      config.fps = props.fps;
      }
      if (props.qrbox) {
      config.qrbox = props.qrbox;
      }
      if (props.aspectRatio) {
      config.aspectRatio = props.aspectRatio;
      }
      if (props.disableFlip !== undefined) {
      config.disableFlip = props.disableFlip;
      }
      return config;
    }

    const config = createConfig(props);
    const verbose = props.verbose === true;

    // Suceess callback is required.
    if (!(props.qrCodeSuccessCallback )) {
      throw "qrCodeSuccessCallback is required callback.";
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId, config, verbose
    );

    html5QrcodeScanner.render(
      function(decodedText, decodedResult) {
        props.qrCodeSuccessCallback(decodedText, decodedResult);
        html5QrcodeScanner.clear();
      },
      props.qrCodeErrorCallback
    );
  }, [props]);

  return (
    <div id={qrcodeRegionId} />
  )
}

export default Html5QrcodePlugin;