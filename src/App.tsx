import logo from './assets/logo.svg';
import './App.css';
import { useState } from 'react';
import { fetchTracks } from './lib/fetchTracks';
import { useQuery } from '@tanstack/react-query';
import { SavedTrack, Track } from 'spotify-types';

const AlbumCover = (track: SavedTrack) => {
  const src = track.track.album.images[0]?.url;
  return <img src={src} style={{ width: 400, height: 400 }} />;
};

const App = () => {
  const [trackIndex, setTrackIndex] = useState(0);

  const goToNextTrack = () => {
    setTrackIndex(trackIndex + 1);
  };

  const { data: tracks } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });

  console.log(tracks?.length);
  const currentTrack = tracks ? tracks[trackIndex] : undefined;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur le blind test !</h1>
      </header>
      <div className="App-images">
        {currentTrack && <AlbumCover track={currentTrack} />}
        <div>{currentTrack?.track.name}</div>
        <audio src={trackUrls[trackIndex]} autoPlay controls />
        <button onClick={goToNextTrack}>Next track</button>
      </div>
      <div className="App-buttons"></div>
    </div>
  );
};

export default App;
