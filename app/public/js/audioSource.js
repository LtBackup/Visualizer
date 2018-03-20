var app = app || {};
var source;
var buffer;
var analyser;
var audio = false;

/**
 * Onload on windows object which provides initialization for Visualizer application 
 */
window.onload = function () {

   window.addEventListener('drop', onDrop, false);
   window.addEventListener('dragover', onDrag, false);
 /**
  * Function to handle onDrag event listener added to the window object
  * @param {object} e - Event object
  */
   function onDrag(e) {
       e.stopPropagation();
       e.preventDefault();
       return false;
   }
 /**
  * Function to handle onDrop event listener added to the window object
  * @param {object} e - Event object
  */
   function onDrop(e) {
       e.stopPropagation();
       e.preventDefault();
       var droppedFiles = e.dataTransfer.files;
      $('#instructions').fadeOut(1000);
       initiateAudio(droppedFiles[0]); // initiates audio from the dropped file
   }
/**
 * Callnack function to support pausing.
 */
   function animationFrame(){
       console.log("Hi. Animation canceled.")
   };
/**
 * Handles drag and drop functionality, and passes on MP3 file for further processing
 * @param {Object} data - object URL representing audio input
 */
   function initiateAudio(data) {
       if (audio) {
           audio.pause();
           window.cancelAnimationFrame(animationFrame);
       }
       audio = document.createElement('audio');
       audio.src = URL.createObjectURL(data);
       audio.autoplay = true;
       var play = true;
       document.body.appendChild(audio);

       if (typeof context !== 'undefined'){
        console.log("Out with the old.. in with the new!");
        context.close();
        }
        
       audioAnalyzer(audio);
   }

 
}();
