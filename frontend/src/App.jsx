import { useState } from 'react'

import './App.css'
import videojs from 'video.js'
import VideoPlayer from './VideoPlayer.jsx'
import {useRef} from 'react'

function App() {
  const playerRef=useRef(null);
  const videoLink = "http://localhost:8000/uploads/courses/affb647c-b449-4615-bbd5-97333f5ade2f/index.m3u8"
const videoPlayerOptions={
  controls:true,
  responsive:true,
  fluid:true,
  sources:[
    {
      src:videoLink,
      type:"application/x-mpegURL"
    }
  ]
}
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };
  return (
    <>
     <div>
      <h1>VideoPlayer</h1>
      <VideoPlayer
        options={videoPlayerOptions}
        onReady={handlePlayerReady} />
     </div>
    </>
  )
}

export default App
