import Head from 'next/head'
import type {postType} from '../index'
const BlogDetail = ({post}:{post:postType}) => {
    return(
        <>
            <Head>
                <title>
                    SSG tutorial
                </title>
            </Head>
            <h1 className='text-center text-3xl'>SSG tutorial</h1>
            <p>User ID:{post.userId}</p>
            <p>ID:{post.id}</p>
            <p>Title:{post.title}</p>
            <p>Body:{post.body}</p>
        </>
    )
}
export default BlogDetail;

export const getStaticPaths = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const posts:postType[] = await res.json()
    const paths = posts.map((post) => ({params: { id: String(post.id)}}))
    return { 
        paths,
        fallback: false //pathsに含まれないパスは404pageとして表示
    }
};

export const getStaticProps = async({params}:{params:{id:string}}) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts'+'/'+params.id);
    const post:postType = await res.json()
    return {
        props : {post}
    }
};