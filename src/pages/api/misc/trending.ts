import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { type, period } = req.query;

  if (type) {
    const media = (type as string) ?? 'all';
    const time = (period as string) ?? 'day';

    const response = await axios.get(`https://api.themoviedb.org/3/trending/${media}/${time}`, {
      params: { api_key: process.env.TMDB_API_KEY_V3 },
    });

    if (response.status === 200) {
      return res.status(200).json({ ...response.data });
    }

    return res.status(response.status).send(response.statusText);
  }

  return res.status(400);
};

export default handler;
