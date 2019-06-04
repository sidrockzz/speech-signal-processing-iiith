async function getFile(audioContext, filepath) {
  const response = await fetch(filepath);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
}

async function setupSample() {
    const filePath = 'ex1.wav';
    const sample = await getFile(audioCtx, filePath);
    return sample;
}

function playSample(audioContext, audioBuffer) {
    const sampleSource = audioContext.createBufferSource();
    sampleSource.buffer = audioBuffer;
    sampleSource.playbackRate.setValueAtTime(playbackRate, audioCtx.currentTime);
    sampleSource.connect(audioContext.destination)
    sampleSource.start();
    return sampleSource;
}

let playbackRate = 1;
const rateControl = document.querySelector('#rate');
rateControl.addEventListener('input', function() {
    playbackRate = Number(this.value);
}, false);


