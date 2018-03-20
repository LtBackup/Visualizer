var averages = [];

/*
* This function creates an audio context that allows us to attach our audio source and analyze/manipulate it.
* It also listens for changes to audio volume and saves those preferences when changed
*
* @param {audio} the audio html element created when audio is added to the page 
* 
* @returns undefined
*/
function audioAnalyzer(audio) {
    if (!window.AudioContext) {
        if (!window.webkitAudioContext) {
            alert("no audiocontext found");
        }
        window.AudioContext = window.webkitAudioContext;
    }
    context = new (window.AudioContext || window.webkitAudioContext)();
    source = context.createMediaElementSource(audio);

    analyser = context.createAnalyser();
    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 1024;
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

    /** Sound Volume Controls */
    musicVolume.addEventListener("change", function () {
        var soundLevel = parseFloat(this.value / 100);
        //smooths out volume change, with a slight imperceptible delay - prevents pops on abrupt amplifcation changes
        gainNode.gain.setTargetAtTime(soundLevel, context.currentTime + 0.3, 0.3);
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
        });
    });

    $("body")
        .off("keydown")
        .keydown(function (e) {
            if (e.which === 32) {
                if (context.state === "running") {
                    context.suspend().then(function () {
                        $("#status")
                            .html("Suspend music...")
                            .fadeIn(1000)
                            .fadeOut(2000);
                    });
                } else if (context.state === "suspended") {
                    context.resume().then(function () {
                        $("#status")
                            .html("Resume music...")
                            .fadeIn(1000)
                            .fadeOut(2000);
                    });
                }
            }
        });
    animate();
}
/**
* This function averages the frequency data across 8 equal sized sections across the audio spectrum.
* It also modifies the averages by certain tested amounts for ideal visual display
* @param {array} the array of raw sound frequency data 
* 
* @returns the 8-length array of frequency averages
*/
function getAverageVolume(array) {
    var values = 0;
    var split = 8;
    var average = [];

    // get all the frequency amplitudes
    for (var i = 0; i < array.length; i++) {
        values += array[i];

        if ((i + 1) % (array.length / split) === 0) {
            average[(i + 1) / (array.length / split) - 1] =
                values / (array.length / split) / 2000 * canvas.height;
            values = 0;
        }
    }
    return average;
}
