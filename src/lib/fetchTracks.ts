import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQBEb7F0_uDuZhyf2N2xnqrGLvbruk_wBVkYbOBxT4me2K_P3U6Ym6Z3KT14hyyRECas5ZveQg7-ZlJUWCEpc8MJiCv4SA5blXh5BjQM7KEUSz_nWOsBPsfmnVxnQuEf_xpYisO4oynCzQVmvVpCRBKotrMslef2J9fOMg2CNdH2o5VEi72xgwJAK6D0pjl0eyVM0h7zVYrO3fyjdxMWkQQ';

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
