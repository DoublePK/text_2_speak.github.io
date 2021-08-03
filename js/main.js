
//Init SpeechSynth API
const synth = window.speechSynthesis;

 //DOM Elements
 const textForm = document.querySelector('form');
 const textInput = document.querySelector('#text-input')
 const voiceSelect = document.querySelector('#voice-select');
 const rate = document.querySelector('#rate');
 const rateValue = document.querySelector('#rate-value');
 const pitch = document.querySelector('#pitch');
 const pitchValue = document.querySelector('#pitch-value');
 const body = document.querySelector('body');

 //Browser identifier
 //Firefox 1.0+
 var isFirefox = typeof InstallTrigger !== 'undefined';

 //Chrome 1+
 var isChrome = !!window.chrome;

 //Init Voices array
 let voices = [];

 const getVoices = () => {
   voices = synth.getVoices();
   

   //loop through voices and create an option for each one
   voices.forEach(voice => {
     //Create option  element
     const option = document.createElement('option');
     //fill option with voices and languages
     option.textContent = voice.name + '('+voice.lang +')';

     //set needed option attribute
     option.setAttribute('data-lnag', voice.lang);
     option.setAttribute('data-name', voice.name);
     voiceSelect.appendChild(option);

   });
 };


 /*getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}*/

//Fix for duplication, run code depending on the browser
if(isFirefox){
  getVoices();
}
// if (isChrome) {
//   if (synth.onvoiceschanged !== undefined) {
//       synth.onvoiceschanged = getVoices();
//   }
// } 
if(isChrome){
  synth.addEventListener("voiceschanged", () => getVoices());
}


 //Speak
 const speak = () => {
  
  //Check if speaking 
  if(synth.speaking){
    console.error('Already Speaking ....');
    return;
  }
  if(textInput.value !== ''){
    //Add background animation
    body.style.background = "#141414 url(img/wave.gif)";
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';
    
    //Get speak text
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    
    //Speak end
    speakText.onend = e => {
      console.log('Done Speaking ...');
      body.style.background = '#141414';
    }

    //Speak error
    speakText.onerror = e => {
      console.log('Something was wrong..');
    }

    //Selected Voice
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name'); 

    //Loop through voices
    voices.forEach(voice => {
      if(voice.name === selectedVoice){
        speakText.voice = voice;
      }
    });

    //set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    //Speak
    synth.speak(speakText);
  }
 }


 //Event Listener


 //text form submit
 textForm.addEventListener('submit', e => {
  e.preventDefault();
  speak();
  textInput.blur();
 });

 //Rate value Change
 rate.addEventListener('change', e => {
   rateValue.textContent = rate.value;
 });

 //Pitch value Change
 pitch.addEventListener('change', e => {
  pitchValue.textContent = pitch.value;
});

//voice selected change
voiceSelect.addEventListener('change', e => {
  speak(); 
});


