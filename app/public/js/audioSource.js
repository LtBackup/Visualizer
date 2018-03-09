var app = app || {};
var source;
var buffer;
var analyser;
var audio = false;

window.onload = function () {

   // app.init();

   console.log('audio loader connected');
   window.addEventListener('drop', onDrop, false);
   window.addEventListener('dragover', onDrag, false);

   function onDrag(e) {
       e.stopPropagation();
       e.preventDefault();4
       // $('#notification').velocity('fadeOut', { duration: 150 });
       return false;
   }
   function onDrop(e) {
       e.stopPropagation();
       e.preventDefault();
       var droppedFiles = e.dataTransfer.files;
      $('#instructions').fadeOut(1000);
       initiateAudio(droppedFiles[0]); // initiates audio from the dropped file
   }
   function initiateAudio(data) {
       if (audio) {
           audio.pause();
           window.cancelAnimationFrame(animationFrame);
       }
       audio = document.createElement('audio'); // creates an html audio element
       audio.src = URL.createObjectURL(data); // sets the audio source to the dropped file
       audio.autoplay = true;
       // app.audio.play();
       var play = true;
       document.body.appendChild(audio);
       // app.ctx = new (window.AudioContext || window.webkitAudioContext)(); // creates audioNode
       // source = app.ctx.createMediaElementSource(app.audio); // creates audio source
       // analyser = app.ctx.createAnalyser(); // creates analyserNode
       // source.connect(app.ctx.destination); // connects the audioNode to the audioDestinationNode (computer speakers)
       // source.connect(analyser); // connects the analyser node to the audioNode and the audioDestinationNode
       console.log("sending MP3 dropped on page", audio.src);
       audioAnalyzer(audio);
   }

 
}
