import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQD1B_c-8nG0iAhebgrQemQIFTYEkSKOrykbN7dt5mKaQqvAyQPEOeZnT7Me8I754M696IisuY5O19gGJeeztZJy2-nQPk092q4uv5nUWZnoB1uEwjX2v6u3oM2V-JwQ-xL_Ke611ibrsQmhUdhTgUiVIUhGDF60SXlXQDio6djAA8eXFYapNPIJUV7ZeN0qlWgWXpNxGCsnKPLuf3reYQ';

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
