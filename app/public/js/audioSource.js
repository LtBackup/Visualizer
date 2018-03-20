var source;
var analyser;
var audio = false;

window.onload = function () {

   window.addEventListener('drop', onDrop, false);
   window.addEventListener('dragover', onDrag, false);

   function onDrag(e) {
       e.stopPropagation();
       e.preventDefault();
       return false;
   }
   function onDrop(e) {
       e.stopPropagation();
       e.preventDefault();
       var droppedFiles = e.dataTransfer.files;
      $('#instructions').fadeOut(1000);
       initiateAudio(droppedFiles[0]);
   }
   function animationFrame(){
   };

   function initiateAudio(data) {
       if (audio) {
           audio.pause();
           window.cancelAnimationFrame(animationFrame);
       }
       audio = document.createElement('audio'); // creates an html audio element
       audio.src = URL.createObjectURL(data); // sets the audio source to the dropped file
       audio.autoplay = true;
       var play = true;
       document.body.appendChild(audio);

       if (typeof context !== 'undefined'){
        context.close();
        }
       
       audioAnalyzer(audio);
   }

 
}();
