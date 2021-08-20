const channel = document.querySelector(".channel");
const youtubeChannel = document.querySelector("iframe");

let channelNumber = "";
let currentChannel = "";
let prevChannel = "";

let switchChannel;

const KEY = "AIzaSyAi7aqZ8KEGvgkRzEIa_QEtczjSwB_oNb8";

const fetchYoutube = async () => {
  const episodeNumber = channelNumber.replace(/^0+/, "");
  const result = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${KEY}&maxResults=1&q=coding+challenge+${episodeNumber}&channelId=UCvjgXvBlbQiydffZU7m1_aw`,
    {
      method: "GET",
    }
  );

  const data = await result.json();

  if (data.items.length === 0) {
    throw new Error("video not found");
  }

  const videoId = data.items[0].id.videoId;
  youtubeChannel.src = `https://www.youtube.com/embed/${videoId}`;
};

const channelValidation = () => {
  if (channelNumber <= 150 && channelNumber >= 2) {
    fetchYoutube().catch((err) => alert(err.message));
  }

  channelNumber = "";
  channel.textContent = channelNumber;
};

window.addEventListener("keydown", (e) => {
  if (/[0-9]/.test(e.key) && channelNumber.length < 3) {
    channelNumber += e.key;
  }

  if (switchChannel) {
    clearTimeout(switchChannel);
  }

  switchChannel = setTimeout(channelValidation, 2000);

  if (e.key === "Enter") channelValidation();

  channel.textContent = channelNumber;
});
