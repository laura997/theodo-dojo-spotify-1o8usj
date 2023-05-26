import logo from './assets/logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchTracks } from './lib/fetchTracks';
import { useQuery } from '@tanstack/react-query';
import { SavedTrack } from 'spotify-types';
import swal from 'sweetalert';
const AlbumCover = ({ track }: { track: SavedTrack }) => {
  const src = track.track.album.images[0]?.url;
  return <img src={src} style={{ width: 400, height: 400 }} />;
};

const App = () => {
  const { data: tracks } = useQuery({
    queryKey: ['tracks'],
    queryFn: fetchTracks,
  });

  const numberOfTrackBlindTest = 2;
  const totalNumberOfTracks = tracks ? tracks.length : 0;
  const numberOfTracks = Math.min(totalNumberOfTracks, numberOfTrackBlindTest);

  const [trackIndex, setTrackIndex] = useState(0);
  const [shuffledTracks, setShuffledTracks] = useState<SavedTrack[]>([]);
  const [threeRandomChoice, setThreeRandomChoice] = useState<SavedTrack[]>([]);

  useEffect(() => {
    const getRandomArrayOfTracks = () => {
      let shuffledTracks = [];
      for (let i = 0; i < numberOfTracks; i++) {
        const randomChoice = tracks
          ? tracks[Math.floor(numberOfTrackBlindTest * Math.random())]
          : undefined;
        if (randomChoice) shuffledTracks.push(randomChoice);
      }
      return shuffledTracks;
    };
    setShuffledTracks(getRandomArrayOfTracks());
  }, [tracks]);

  const isFirsTrack = () => {
    return trackIndex === 0;
  };

  const isLastTrack = () => {
    return trackIndex === numberOfTracks - 1;
  };

  const goToNextTrack = () => {
    if (!isLastTrack()) setTrackIndex(trackIndex + 1);
  };

  const goToPreviousTrack = () => {
    if (!isFirsTrack()) setTrackIndex(trackIndex - 1);
  };

  const checkAnswer = (answerId: string) => {
    if (currentTrack && answerId === currentTrack.track.id) {
      swal('Bravo', 'Trop fort', 'success');
    } else {
      swal('Alerte !!', 'Ceci est une alerte', 'error');
    }
  };

  const getThreeRandomChoice = () => {
    let choice = [];
    choice.push(currentTrack);
  };

  const previousTrack =
    shuffledTracks && !isFirsTrack()
      ? shuffledTracks[trackIndex - 1]
      : undefined;
  const currentTrack = shuffledTracks ? shuffledTracks[trackIndex] : undefined;
  const nextTrack =
    shuffledTracks && !isLastTrack()
      ? shuffledTracks[trackIndex + 1]
      : undefined;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Bienvenue sur le blind test !</h1>
      </header>
      {currentTrack && (
        <div>
          <h1 className="App-music-title"> {currentTrack.track.name} </h1>
          <div className="App-music-audio">
            <audio src={currentTrack.track.preview_url} autoPlay controls />
          </div>
          <div className="App-images">
            <AlbumCover track={currentTrack} />
          </div>
          <div className="App-buttons">
            {previousTrack && (
              <button onClick={goToPreviousTrack}>
                Previous track : {previousTrack.track.name}{' '}
              </button>
            )}
            <button
              onClick={() => {
                checkAnswer(currentTrack.track.id);
              }}
            >
              Check answer
            </button>
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
