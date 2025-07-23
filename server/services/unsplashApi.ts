
import axios from 'axios';

const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY!;
const unsplash = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
});

export async function fetchPhoto(query: string): Promise<string> {
  const { data } = await unsplash.get('/search/photos', {
    params: { query, per_page: 1, orientation: 'landscape' }
  });
  return data.results[0]?.urls?.regular || '';
}
