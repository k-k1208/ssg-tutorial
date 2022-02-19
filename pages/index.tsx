import type { NextPage, InferGetStaticPropsType} from 'next'
import Head from 'next/head'
import Link from 'next/link'

type Props = InferGetStaticPropsType<typeof getStaticProps>
const Blog: NextPage<Props> = ({posts}) => {
  return (
    <>
      <Head>
        <title>
          SSG tutorial
        </title>
      </Head>
      <h1 className='text-center text-3xl'>SSG tutorial</h1>
      <ul>
        {posts.map(post => {
          return (
            <li key={post.id}>
              {post.id}:
              <span className='hover:underline'>
                <Link href={'posts/' + String(post.id)}>
                  {post.title}
                </Link>
              </span>
            </li>
          )         
        })}
      </ul>
    </>
  )
}

export default Blog


type postType = {
  "userId": number;
  "id": number;
  "title": string;
  "body": string;
}

// ビルド時に実行
export const getStaticProps = async() => {
  const res: Response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts:postType[] = await res.json()
  return {
    props: {posts}, 
  }// ページコンポーネントにpropsとして渡される
}