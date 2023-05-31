import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQBUnaj_UwCJyvfJZjHfWOmWWCQkp5GmkYa7rK2QWYkb3rXVtzEs7_N5pNrl_UQluKCadZmJN7prV2lBdjVUnSHSDulw3Mz_Nc-fWbrH3qlG5XSDCCt54NGeNMGDv5JJ9lU8xUxBYcMufGDI9G2YMqJe_oe-CV0SbenD5EHQSe8_05NX6H_fzRCqLzjPTNoEUqD8nJC134EF8w4M4GJcWQ';

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
