import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQBBaI83fDgOzyx7zmVeCG0L1BfpD6GdyUf1B0sTUmJod9y1YKR9RMpBpEC1fVZk4E6kmyZKcXJTci-ma8oQtvmEH3bKNwut_4R4HLwz2H46l-72HXYc5QYSpmyOWoeEQaacVE383JphUMNRueFwFvZdlHwzJBbQ3U_CjPr1FKCZzwY2O5TttA9i1YKWtcOZYImfAezXJNNh_gFDUxvGtrQ';

export const fetchTracks = async (): Promise<SavedTrack[]> => {
  const response = await fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + apiToken,
    },
  });
  if (!response.ok) {
    throw new Error(`Fetching tracks failed with status ${response.status}`);
  }
  const data = (await response.json()) as { items: SavedTrack[] };

  return data.items;
};
