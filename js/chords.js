/* Аккорды: Web Audio API (ТЗ 3.3) */
(function () {
  'use strict';
  var ctx = null;

  // Частоты нот для каждого аккорда
  var CHORDS = {
    Am: [220.00, 261.63, 329.63], // A3 C4 E4
    C:  [261.63, 329.63, 392.00], // C4 E4 G4
    G:  [196.00, 246.94, 392.00], // G3 B3 G4
    Em: [164.81, 196.00, 246.94], // E3 G3 B3
    Dm: [146.83, 220.00, 293.66]  // D3 A3 D4
  };

  function playChord(name) {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    var freqs = CHORDS[name] || [];
    freqs.forEach(function (f, i) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.02);
      osc.stop(ctx.currentTime + 1.7);
    });
    gtag('event', 'chord_play', { chord_name: name });
  }

  document.querySelectorAll('[data-chord]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      playChord(btn.getAttribute('data-chord'));
    });
  });
})();