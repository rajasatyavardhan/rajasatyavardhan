(() => {
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const form = document.getElementById('contactForm');
  if(form){form.addEventListener('submit', event => {
    event.preventDefault();
    if(!form.reportValidity()) return;
    const name = form.elements.namedItem('name').value.trim();
    const email = form.elements.namedItem('email').value.trim();
    const idea = form.elements.namedItem('idea').value.trim();
    if(!name || !email || !idea) return;
    const subject = `Raja Builds enquiry from ${name}`;
    const body = `Hi Raja,\n\n${idea}\n\nName: ${name}\nEmail: ${email}\n\nThank you!`;
    window.location.href = `mailto:rajasatyavardhana.thippareddy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });}
  const telToggle = document.getElementById('toggleTelugu');
  if(telToggle){telToggle.addEventListener('click', () => {
    const noTelugu = document.body.classList.toggle('no-telugu');
    telToggle.textContent = noTelugu ? 'English + తెలుగు' : 'English only';
    telToggle.setAttribute('aria-pressed',String(noTelugu));
  });}
  const start = document.getElementById('hearIntro');
  const stop = document.getElementById('stopVoice');
  const status = document.getElementById('voiceStatus');
  if(start && stop && status){
    const speech = window.speechSynthesis;
    if(!speech || !window.SpeechSynthesisUtterance){start.disabled=true;start.title='Read-aloud not available in this browser';}
    else{
      start.addEventListener('click', () => {
        speech.cancel();
        const u = new SpeechSynthesisUtterance(start.dataset.speakText);
        u.lang='en-IN';u.rate=.91;u.pitch=1;
        const voices=speech.getVoices();
        u.voice = voices.find(v=>v.lang.toLowerCase()==='en-in')||voices.find(v=>v.lang.toLowerCase().startsWith('en'))||null;
        u.onstart=()=>{status.textContent='Reading aloud…';stop.hidden=false;};
        u.onend=()=>{status.textContent='Finished.';stop.hidden=true;};
        u.onerror=()=>{status.textContent='Audio is not available on this device.';stop.hidden=true;};
        speech.speak(u);
      });
      stop.addEventListener('click',()=>{speech.cancel();stop.hidden=true;status.textContent='Stopped.';});
    }
  }
})();

/* Accessible service enquiry shortcuts */
document.querySelectorAll('[data-service]').forEach(function(card){
 card.addEventListener('click',function(){
   var textarea=document.getElementById('idea');
   if(!textarea)return;
   textarea.value=card.getAttribute('data-service');
   document.getElementById('contact').scrollIntoView({behavior:'smooth',block:'start'});
   setTimeout(function(){textarea.focus({preventScroll:true})},250);
 });
});