 //SET UP AUDIO BITS
 var averages = [];

 function audioAnalyzer(audio) {
     // create the audio context (chrome only for now)
     // create the audio context (chrome only for now)
     if (!window.AudioContext) {
         if (!window.webkitAudioContext) {
             alert("no audiocontext found");
         }
         window.AudioContext = window.webkitAudioContext;
     }
     context = new (window.AudioContext || window.webkitAudioContext)();
     source = context.createMediaElementSource(audio);
     console.log("Source", source);
     //var audioBuffer;
     //var sourceNode;
     //var splitter;
     analyser = context.createAnalyser();
     analyser.smoothingTimeConstant = 0.3;
     analyser.fftSize = 1024;
     //source.connect(context.destination); /*this is necessary for gainNode to work*/
     source.connect(analyser);

     var gainNode = context.createGain();
     source.connect(gainNode);
     gainNode.connect(context.destination);
     var musicVolume = document.getElementById("volume");
     /* set volume to 50% loudness by default to match value set in HTML */
     if (loggedIn) {
         gainNode.gain.setValueAtTime(volumePref / 100, context.currentTime);
         musicVolume.value = volumePref;
     } else {
         gainNode.gain.setValueAtTime(0.5, context.currentTime);
     }
     //might need to set the slider to user value
     console.log(
         "gainNode volume at time",
         gainNode.gain.value,
         "source is...",
         source
     );
     //var javascriptNode;
     /** Sound Volume Controls */
     musicVolume.addEventListener("change", function () {
         var soundLevel = parseFloat(this.value / 100);
         //gainNode.gain.setValueAtTime(soundLevel, context.currentTime);
         //smooths out volume change, with a slight impercertile delay - prevents pops on abrupt amplifcation changes
         gainNode.gain.setTargetAtTime(soundLevel, context.currentTime + 0.3, 0.3);
         console.log("Volume is now..", soundLevel);
         console.log("gain node", gainNode.gain, "soundLevel...", this.value);
         let updateVol = {
             username: name,
             displayPreference: keypress,
             volumeLevel: volume.value
         };

         $.ajax({
             url: "api/existingUsers",
             type: "PUT",
             dataType: "JSON",
             data: updateVol
         }).then(function (response) {
             console.log("volume saved");
         });
     });

     /*MSW*/
     console.log("gainNode", gainNode);
     console.log("gainNode value", gainNode.gain.value);
     console.log("volume", volume.value);

     //   var array = [];
     //     // get the average for the first channel
     //     // for (var i = 0; i < 8; i++) {
     //     array = new Uint8Array(analyser.frequencyBinCount);
     //     //console.log(array);
     //     analyser.getByteFrequencyData(array);
     //     averages = getAverageVolume(array);

     $("body")
         .off("keydown")
         .keydown(function (e) {
             if (e.which === 32) {
                 console.log("context.state", context.state);
                 console.log("Spacebar click...");
                 if (context.state === "running") {
                     context.suspend().then(function () {
                         $("#status")
                             .html("Suspend music...")
                             .fadeOut(2000);
                     });
                 } else if (context.state === "suspended") {
                     context.resume().then(function () {
                         $("#status")
                             .html("Resume music...")
                             .fadeOut(2000);
                     });
                 }
             }
             //console.log("Audio context(s)...", context);
         });

     function loadSound(url) {
         var request = new XMLHttpRequest();
         request.open("GET", url, true);
         request.responseType = "arraybuffer";

         // When loaded decode the data
         request.onload = function () {
             // decode the data
             //context.decodeAudioData(request.response, function (buffer) {
             // when the audio is decoded play the sound
             //playSound(buffer);
             //}, onError);
         };
         request.send();
     }

     function playSound(buffer) {
         sourceNode.buffer = buffer;
         sourceNode.start(0);
     }

     // log if an error occurs
     function onError(e) {
         console.log(e);
     }

     animate();
 }

 function getAverageVolume(array) {
     var values = 0;
     var split = 8;
     var average = [];
     // var length = array.length;

     // get all the frequency amplitudes
     for (var i = 0; i < array.length; i++) {
         values += array[i];
         //console.log(array[i]);

         if ((i + 1) % (array.length / split) === 0) {
             average[(i + 1) / (array.length / split) - 1] =
                 values / (array.length / split) / 2000 * canvas.height;
             values = 0;
         }
     }
     return average;
 }
