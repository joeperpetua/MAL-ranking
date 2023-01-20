import Head from 'next/head'
import Image from 'next/image'
import { AppProps } from 'next/app';
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import { clientID } from '../clientID'

const inter = Inter({ subsets: ['latin'] })


type RankingElement = {
  id: number,
  title: string,
  main_picture: {
    medium: string,
    large: string
  },
  mean: number,
  media_type: string,
  num_episodes: number,
  num_scoring_users: number
};

type RankingProps = [
  RankingElement
];

type FetchElement = {
  node: {
    id: number,
    title: string,
    main_picture: {
      medium: string,
      large: string
    },
    mean: number,
    media_type: string,
    num_episodes: number,
    num_scoring_users: number
  },
  ranking: {
    rank: number
  }
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=500\n&fields=mean,media_type,num_episodes,num_scoring_users",
    {headers: {"X-MAL-CLIENT-ID": clientID}}
  ).catch(err => err);
  const rankingRaw = await res.json()
  let rankingFiltered: RankingElement[] = [];
  
  rankingRaw.data.forEach((element: FetchElement) => {
    rankingFiltered.push(
      {
        id: element.node.id,
        title: element.node.title,
        main_picture: element.node.main_picture,
        mean: element.node.mean,
        media_type: element.node.media_type,
        num_episodes: element.node.num_episodes,
        num_scoring_users: element.node.num_scoring_users
      }
    );
  });

  console.log('================= type of array =================', typeof(rankingFiltered));


  // By returning { props: { data } }, the component
  // will receive `ranking` as a prop at build time
  return {
    props: {
      rankingFiltered
    },
  }
}


export default function Home({ ranking } : { ranking: RankingProps }) {
  console.log('================= type of prop =================', typeof(ranking));
  return (
    <>
      <Head>
        <title>MAL - Top Ranking</title>
        <meta name="description" content="A non-seasonal ranking from the top animes in My Anime List." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>MyAnimeList Top 100 Anime</h1>
        <ul>
          {ranking.map((element, index) => (
            <li>{index} | {element.title} | {element.mean}</li>
          ))}
        </ul>
      </main>
    </>
  )
}


