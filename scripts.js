navigator.mediaDevices.getUserMedia({
  video: { facingMode: { exact: "environment" } }
})
.then((stream) => {
  const video = document.querySelector('video');
  video.srcObject = stream;
  
  // get the active track of the stream
  const track = stream.getVideoTracks()[0];

  video.addEventListener('loadedmetadata', (e) => {  
    window.setTimeout(() => (
      onCapabilitiesReady(track.getCapabilities())
    ), 500);
  });

  function onCapabilitiesReady(capabilities) {
    if (capabilities.torch) {
      
      let touchBlink = false;
            
      setInterval(() => { 
        track.applyConstraints({
          advanced: [{torch: !touchBlink}]
        }).catch(e => console.log(e));
        
        console.log('touchBlink', touchBlink);
       
      }, 1000);
    }
  }
})
.catch(err => console.error('getUserMedia() failed: ', err));