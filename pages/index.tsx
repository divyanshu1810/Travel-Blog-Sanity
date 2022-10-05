import { getClient } from '../lib/sanity.server'
import groq from 'groq'
import Head from 'next/head'
import Card from '../components/Card'
const Home = ({ posts }: any) => {
  return (
    <div className='dashboard w-[100%]'>
      <Head>
        <title>Travel Blog</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>{posts.username}</h1>
      <div className='posts-container flex flex-wrap justify-center'>
        {posts?.map((post: any) => (
            <Card post={post} key={post._id}/>
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps({ preview = false }: any) {
  const posts = await getClient(preview).fetch(groq`
    *[_type == 'post' && publishedAt < now()] | order(publishedAt desc){
      _id,
      title,
      "username":author->username,
      "categories":categories[]->{id,title},
      "authorImage":author->avatar,
      body,
      mainImage,
      slug,
      publishedAt
    }
  `)
  return {
    props: {
      posts,
    },
  }
}

export default Home
