if (/Mobi|Android/i.test(navigator.userAgent)) {
  


navigator.mediaDevices.getUserMedia({
  audio: false,
  video: { facingMode: { exact: "environment" } }
})
.then((stream) => {
  const video = document.querySelector('video');
  video.srcObject = stream;
  
  // get the active track of the stream
  const track = stream.getVideoTracks()[0];

  video.addEventListener('loadedmetadata', (e) => {

    // settings
    let timer;
    let startBtn = document.querySelector(".start-btn");
    let stopBtn = document.querySelector(".stop-btn");

    // click start
    startBtn.addEventListener("click", () => {
      blinkLight(blink = true);
    })
    
    // begins a loop 
    function blinkLight(blink) {
      timer = setInterval(() => {
        onCapabilitiesReady(track.getCapabilities(), blink = !blink);
      }, 500)
    }
    
    // loop continues until stop button clicked
    stopBtn.addEventListener("click", () => {
      clearInterval(timer);
      onCapabilitiesReady(track.getCapabilities(), blink = false);
    })

  });

  function onCapabilitiesReady(capabilities, blink) {
    if (capabilities.torch) {
      track.applyConstraints({
        advanced: [{torch: blink}]
      }).catch(e => console.log(e));
    }
  }
})
.catch(err => console.error('getUserMedia() failed: ', err));

}