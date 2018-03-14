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
  musicVolume.addEventListener("change", function() {
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
    }).then(function(response) {
      console.log("volume saved");
    });
  });

  /*MSW*/
  console.log("gainNode", gainNode);
  console.log("gainNode value", gainNode.gain.value);
  console.log("volume", volume.value);
  
  var array = [];
    // get the average for the first channel
    // for (var i = 0; i < 8; i++) {
    array = new Uint8Array(analyser.frequencyBinCount);
    //console.log(array);
    analyser.getByteFrequencyData(array);
    averages = getAverageVolume(array);
  
  /*

  
    /* set volume to 50% loudness by default to match value set in HTML
    if(!loggedIn){
    gainNode.gain.setValueAtTime(0.5, context.currentTime);
    console.log("gainNode volume at time", gainNode.gain.value, "source is...", source);
    }else{
        gainNode.gain.setValueAtTime(parseFloat(volumePref / 100), context.currentTime);
        console.log("set gainNode with database value", volumePref / 100)
    }
    //var javascriptNode;

    /** Sound Volume Controls 
    var musicVolume = document.getElementById("volume");

    musicVolume.addEventListener('change', setSoundLevel);

    function setSoundLevel(input = false){
        var soundLevel;
        console.log("setting the sound level");
        
        // console.log(input);
        if (input){
            soundLevel = input;
            console.log("input is", input);
        } else {
            soundLevel = parseFloat((this.value)/100);
            gainNode.gain.setTargetAtTime(soundLevel, context.currentTime + .3, .3);
        }
        
        
        //gainNode.gain.setValueAtTime(soundLevel, context.currentTime);

        //smooths out volume change, with a slight impercertile delay - prevents pops on abrupt amplifcation changes
        // gainNode.gain.setTargetAtTime(soundLevel, context.currentTime + .3, .3);
        console.log("Volume is now..", soundLevel);
        console.log("gain node", gainNode.gain, "soundLevel...", this.value);
        console.log("soundLevel", soundLevel);
        */

  /*MSW*/
  console.log("gainNode", gainNode);
  console.log("gainNode value", gainNode.gain.value);
  console.log("volume", volume.value);

  // get the context from the canvas to draw on
//   var ctx = $("#canvas")[0].getContext("2d");

//   // create a gradient for the fill. Note the strange
//   // offset, since the gradient is calculated based on
//   // the canvas, not the specific element we draw
//   var gradient = ctx.createLinearGradient(0, 0, 0, 130);
//   gradient.addColorStop(1, "#000000");
//   gradient.addColorStop(0.75, "#ff0000");
//   gradient.addColorStop(0.25, "#ffff00");
//   gradient.addColorStop(0, "#ffffff");

//   animate();

  // load the sound
  // app.ctx = new (window.AudioContext || window.webkitAudioContext)(); // creates audioNode
  //     source = app.ctx.createMediaElementSource(app.audio); // creates audio source
  //     analyser = app.ctx.createAnalyser(); // creates analyserNode
  //     source.connect(app.ctx.destination); // connects the audioNode to the audioDestinationNode (computer speakers)
  //     source.connect(analyser); // connects the analyser node to the audioNode and the audioDestinationNode
  //setupAudioNodes();
  //loadSound(audioURL);
//   function animate() {
//     (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(
//       animate
//     );
//     fillSquares();
//     //console.log(analyser);
//     // stats.begin();
//     // animateParticles();
//     // checkVisualizer();
//     // camera.lookAt( scene.position );
//     // renderer.render( scene, camera );
//     // stats.end();
//   }

//   function fillSquares() {
//     var array = [];
//     // get the average for the first channel
//     // for (var i = 0; i < 8; i++) {
//     array = new Uint8Array(analyser.frequencyBinCount);
//     //console.log(array);
//     analyser.getByteFrequencyData(array);
//     averages = getAverageVolume(array);
//     //console.log(averages);
//     // }
//     // console.log(analyser);
//     // console.log(splitter);
//     // console.log(averages);
//     // get the average for the second channel
//     // var array2 = new Uint8Array(analyser2.frequencyBinCount);
//     // analyser2.getByteFrequencyData(array2);
//     // var average2 = getAverageVolume(array2);

//     // clear the current state
//     //ctx.clearRect(0, 0, 60, 130);

//     // set the fill style
//     ctx.fillStyle = gradient;

//     // create the meters
//     // I cut off the last three averages in the array since that spectrum of the audio frequency area tends to be underwhelming
//     for (
//       var i = 1, startPoint = canvas.width * 0.025;
//       i < 6;
//       i++, startPoint += canvas.width * 0.2
//     ) {
//       ctx.clearRect(
//         startPoint - canvas.width * 0.025,
//         0,
//         canvas.width * 0.18,
//         canvas.height
//       );
//       ctx.fillRect(
//         startPoint,
//         200 - averages[i - 1],
//         canvas.width * 0.15,
//         canvas.height
//       );
//     }
//   }


  // toggle sound with space bar, also prevent keydown listeners from stacking.
  $("body")
    .off("keydown")
    .keydown(function(e) {
      if (e.which === 32) {
        console.log("context.state", context.state);
        console.log("Spacebar click...");
        if (context.state === "running") {
          context.suspend().then(function() {
            $("#status")
              .html("Suspend music...")
              .fadeOut(2000);
          });
        } else if (context.state === "suspended") {
          context.resume().then(function() {
            $("#status")
              .html("Resume music...")
              .fadeOut(2000);
          });
        }
      }
      //console.log("Audio context(s)...", context);
    });

  function setupAudioNodes() {
    // setup a javascript node
    //javascriptNode = context.createScriptProcessor(2048, 1, 1);
    // connect to destination, else it isn't called
    //javascriptNode.connect(context.destination);
    // setup analyzers
    // for (var i = 0; i < 8; i++) {
    //analyser = context.createAnalyser();
    // analyser.smoothingTimeConstant = 0.3;
    // analyser.fftSize = 1024;
    // }
    // analyser2 = context.createAnalyser();
    // analyser2.smoothingTimeConstant = 0.0;
    // analyser2.fftSize = 1024;
    // create a buffer source node
    //sourceNode = context.createBufferSource();
    //sourceNode = context.createBufferSource();
    // splitter = context.createChannelSplitter();
    // connect the source to the analyser and the splitter
    // sourceNode.connect(splitter);
    //sourceNode.connect(analyser);
    // connect one of the outputs from the splitter to
    // the analyser
    // for (var i = 0; i < 8; i++) {
    // splitter.connect(analyser[i], i, 0);
    //splitter.connect(analyser2, 1, 0);
    // }
    // connect the splitter to the javascriptnode
    // we use the javascript node to draw at a
    // specific interval.
    // for (var i = 0; i < analyser.length; i++) {
    //analyser.connect(javascriptNode);
    // }
    // splitter.connect(context.destination,0,0);
    // splitter.connect(context.destination,0,1);
    // and connect to destination
    // source.connect(app.context.destination);
  }

  // load the specified sound
  function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    // When loaded decode the data
    request.onload = function() {
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
  // when the javascript node is called
  // we use information from the analyzer node
  // to draw the volume
  // javascriptNode.onaudioprocess = function () {

  //     var averages = [];
  //     var array = [];
  //     // get the average for the first channel
  //     // for (var i = 0; i < 8; i++) {
  //     array = new Uint8Array(analyser.frequencyBinCount);
  //     analyser.getByteFrequencyData(array);
  //     averages = getAverageVolume(array);
  //     console.log(averages);
  //     // }
  //     // console.log(analyser);
  //     // console.log(splitter);
  //     // console.log(averages);
  //     // get the average for the second channel
  //     // var array2 = new Uint8Array(analyser2.frequencyBinCount);
  //     // analyser2.getByteFrequencyData(array2);
  //     // var average2 = getAverageVolume(array2);

  //     // clear the current state
  //     //ctx.clearRect(0, 0, 60, 130);

  //     // set the fill style
  //     ctx.fillStyle = gradient;

  //     // create the meters
  //     // I cut off the last three averages in the array since that spectrum of the audio frequency area tends to be underwhelming
  //     for (var i = 1, startPoint = canvas.width * .025; i < 6; i++ , startPoint += canvas.width * .2) {
  //         ctx.clearRect(startPoint - canvas.width * .025, 0, canvas.width * .18, canvas.height);
  //         ctx.fillRect(startPoint, 200 - averages[i - 1], canvas.width * .15, canvas.height);
  //     }
  // }

  // function getAverageVolume(array) {
  //     var values = 0;
  //     var split = 8;
  //     var average = [];
  //     // var length = array.length;

  //     // get all the frequency amplitudes
  //     for (var i = 0; i < array.length; i++) {
  //         values += array[i];
  //         //console.log(array[i]);

  //         if ((i + 1) % (array.length / split) === 0) {
  //             average[((i + 1) / (array.length / split)) -1] = values / (array.length / split) / 200 * canvas.height;
  //             values = 0;
  //         }
  //     }
  //     return average;
  // }

  //begin three.js logic
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
          values / (array.length / split) / 7000 * canvas.height;
        values = 0;
      }
    }
    return average;
  }