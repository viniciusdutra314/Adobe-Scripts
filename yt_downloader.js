const ytdl = require('ytdl-core');
const fs = require('fs');
const args = process.argv.slice(2)
const videoUrl = args[0];
const FileName = args[1];
ytdl.getInfo(videoUrl)
  .then(result => {
    var VideoTitle=result.videoDetails.title
    var Channel=result.videoDetails.ownerChannelName
    console.log(VideoTitle );
    console.log(Channel)
    stream=ytdl(videoUrl,{quality : "highestvideo"})
    stream.pipe(fs.createWriteStream(FileName+".mp4"))
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
