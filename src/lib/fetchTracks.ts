import { SavedTrack } from 'spotify-types';

const apiToken: string =
  'BQBxpRcJbcwkP8vswQAt8VYATfsg3E97FEEhQ2Lqz5rjuUju3wFenkLvKzUDMGBZk69FPo83soWzmgCdulqX7SgzFn546nrC7jA97lbOYrj4F4RfnLiBm881HyppN2dbVclHUmh3r1CAY2Pt1ofm6JZY8LbZS5Nlk314gP6bmITcazk9FuKDtQOg7V7l-dOGBn3N4EMt-s8SNC8QM2al6KQ';

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
