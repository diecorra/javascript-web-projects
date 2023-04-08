const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  console.log(joke + "\n");
  let e = document.getElementById("language");
  let value = e.value;
  VoiceRSS.speech({
    key: "559054287cbe459e93952425be1d7a42",
    src: joke,
    hl: value,
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  const apiUrl = "https://v2.jokeapi.dev/joke/Programming";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    tellMe(data.joke ? data.joke : data.setup + data.delivery);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log("Error: " + error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
