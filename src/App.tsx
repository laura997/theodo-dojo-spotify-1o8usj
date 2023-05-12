import logo from './assets/logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchTracks } from './lib/fetchTracks';
import { useQuery } from '@tanstack/react-query';
import { SavedTrack, Track } from 'spotify-types';

const AlbumCover = ({ track }: { track: SavedTrack }) => {
  const src = track.track.album.images[0]?.url;
  return <img src={src} style={{ width: 400, height: 400 }} />;
};

const App = () => {
  const { data: tracks } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });

  const totalNumberOfTracks = tracks ? tracks.length : 0;
  const [trackIndex, setTrackIndex] = useState(0);

  const isFirsTrack = () => {
    return trackIndex === 0;
  };

  const isLastTrack = () => {
    return trackIndex === totalNumberOfTracks - 1;
  };

  const goToNextTrack = () => {
    if (!isLastTrack()) setTrackIndex(trackIndex + 1);
  };

  const goToPreviousTrack = () => {
    if (!isFirsTrack()) setTrackIndex(trackIndex - 1);
  };

  const previousTrack =
    tracks && !isFirsTrack() ? tracks[trackIndex - 1] : undefined;
  const currentTrack = tracks ? tracks[trackIndex] : undefined;
  const nextTrack =
    tracks && !isLastTrack() ? tracks[trackIndex + 1] : undefined;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur le blind test !</h1>
      </header>
      {currentTrack && (
        <div>
          <h1 className="App-music-title"> {currentTrack.track.name} </h1>
          <div className="App-images">
            <AlbumCover track={currentTrack} />
            <div>{currentTrack?.track.name}</div>
            <audio src={currentTrack.track.preview_url} autoPlay controls />
          </div>
          <div className="App-buttons">
            {previousTrack && (
              <button onClick={goToPreviousTrack}>
                Previous track : {previousTrack.track.name}{' '}
              </button>
            )}
            {nextTrack && (
              <button onClick={goToNextTrack}>
                Next track : {nextTrack.track.name}{' '}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
