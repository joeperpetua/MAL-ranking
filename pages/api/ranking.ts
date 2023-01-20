// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { clientID } from '../../clientID'

const getRatings = async () => {
  let response = await fetch(
    "https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=10\n&fields=mean,media_type,num_episodes,num_scoring_users",
    {headers: {"X-MAL-CLIENT-ID": clientID}}
  ).catch(err => err);
  return response.json();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await getRatings();
  res.status(200).send(response);
}
