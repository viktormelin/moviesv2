import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await axios.get(`https://api.themoviedb.org/3/tv/on_the_air`, {
    params: { api_key: process.env.TMDB_API_KEY_V3, language: 'en-GB' },
  });

  if (response.status === 200) {
    return res.status(200).json({ ...response.data });
  }

  return res.status(response.status).send(response.statusText);
};

export default handler;
