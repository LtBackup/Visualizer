function audioAnalyzer(audioURL) {
    // create the audio context (chrome only for now)
    // create the audio context (chrome only for now)
    if (!window.AudioContext) {
        if (!window.webkitAudioContext) {
            alert('no audiocontext found');
        }
        window.AudioContext = window.webkitAudioContext;
    }
    var context = new (window.AudioContext || window.webkitAudioContext)();
    var audioBuffer;
    var sourceNode;
    var splitter;
    var analyser;
    var javascriptNode;

    // get the context from the canvas to draw on
    var ctx = $("#canvas")[0].getContext("2d");

    // create a gradient for the fill. Note the strange
    // offset, since the gradient is calculated based on
    // the canvas, not the specific element we draw
    var gradient = ctx.createLinearGradient(0, 0, 0, 130);
    gradient.addColorStop(1, '#000000');
    gradient.addColorStop(0.75, '#ff0000');
    gradient.addColorStop(0.25, '#ffff00');
    gradient.addColorStop(0, '#ffffff');


    // load the sound
    setupAudioNodes();
    loadSound(audioURL);


    function setupAudioNodes() {

        // setup a javascript node
        javascriptNode = context.createScriptProcessor(2048, 1, 1);
        // connect to destination, else it isn't called
        javascriptNode.connect(context.destination);


        // setup analyzers
        // for (var i = 0; i < 8; i++) {
        analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 1024;
        // }

        // analyser2 = context.createAnalyser();
        // analyser2.smoothingTimeConstant = 0.0;
        // analyser2.fftSize = 1024;

        // create a buffer source node
        //sourceNode = context.createBufferSource();
        sourceNode = context.createBufferSource();
        // splitter = context.createChannelSplitter();

        // connect the source to the analyser and the splitter
        // sourceNode.connect(splitter);
        sourceNode.connect(analyser);

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
        analyser.connect(javascriptNode);
        // }

        // splitter.connect(context.destination,0,0);
        // splitter.connect(context.destination,0,1);

        // and connect to destination
        sourceNode.connect(context.destination);
    }

    // load the specified sound
    function loadSound(url) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        // When loaded decode the data
        request.onload = function () {

            // decode the data
            context.decodeAudioData(request.response, function (buffer) {
                // when the audio is decoded play the sound
                playSound(buffer);
            }, onError);
        }
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
    javascriptNode.onaudioprocess = function () {

        var averages = [];
        var array = [];
        // get the average for the first channel
        // for (var i = 0; i < 8; i++) {
        array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        averages = getAverageVolume(array);
        console.log(averages);
        // }
        // console.log(analyser);
        // console.log(splitter);
        // console.log(averages);
        // get the average for the second channel
        // var array2 = new Uint8Array(analyser2.frequencyBinCount);
        // analyser2.getByteFrequencyData(array2);
        // var average2 = getAverageVolume(array2);

        // clear the current state
        ctx.clearRect(0, 0, 60, 130);

        // set the fill style
        ctx.fillStyle = gradient;

        // create the meters
        for (var i = 1, startPoint = 0 + canvas.width * .02; i < 9; i++ , startPoint += canvas.width * .12) {
            //var startPoint = 0 + canvas.width * .02;
            ctx.fillRect(startPoint, 200 - averages[i - 1], canvas.width * .1, canvas.height);
        }
    }

    function getAverageVolume(array) {
        var values = 0;
        var split = 8;
        var average = [];

        // var length = array.length;

        // get all the frequency amplitudes
        for (var i = 0; i < array.length; i++) {
            values += array[i];
            console.log(array[i]);
            
            if (i % (array.length / split) === 0) {
                average[i / (array.length / split)-1] = values / length;
                values = 0;
            }
        }
        return average;
    }
}
