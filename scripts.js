navigator.mediaDevices.getUserMedia({
  audio: false,
  video: { facingMode: { exact: "environment" } }
})
.then((stream) => {
  const video = document.querySelector('video');
  video.srcObject = stream;
  
  // get the active track of the stream
  const track = stream.getVideoTracks()[0];
  let timeOutVar;
  let blink = true;

  video.addEventListener('loadedmetadata', (e) => {  
    let timer = function(terminator = false) {
      if(terminator) {
          clearTimeout(timeOutVar);
          onCapabilitiesReady(track.getCapabilities(), false);
      } else {
          onCapabilitiesReady(track.getCapabilities(), blink);
          blink = !blink;
          timeOutVar = setTimeout(function(){timer();}, 500);
      }
    }   
    // timer(false); //  -> start loop

    let stopBtn = document.querySelector(".stop-btn");
    stopBtn.addEventListener("click", () => {
      timer(true); //  -> end loop
      console.log('stop you bugger');
    })

    let startBtn = document.querySelector(".start-btn");
    startBtn.addEventListener("click", () => {
      timer(false); //  -> start loop
      console.log('get going');
    })

  });

  function onCapabilitiesReady(capabilities, blink) {
    console.log("onCapabilitiesReady", blink);
    if (capabilities.torch) {
      track.applyConstraints({
        advanced: [{torch: blink}]
      }).catch(e => console.log(e));
    }
  }
})
.catch(err => console.error('getUserMedia() failed: ', err));