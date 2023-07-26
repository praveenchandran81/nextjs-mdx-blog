import { getPostsMeta, getPostsByName } from '@/lib/posts'
import React from 'react'
import { notFound } from 'next/navigation'
import getFormattedDate from '@/lib/getFormattedDate'
import Link from 'next/link'
import 'highlight.js/styles/github-dark.css'
export const revalidate = 86400

type Props = {
  params: {
    postId: string
  }
}

 export async function generateStaticParams(){
    const posts= await getPostsMeta(); //deduped

    if(!posts)return []

    return posts.map((post)=>{
        return{
            postId:post.id
        }
    })
 }

export async function generateMetadata({
  params,
}: {
  params: { postId: string }
}) {
  const { postId } = params
  const post = await getPostsByName(`${postId}.mdx`) //deduped

  if (!post) {
    return {
      title: 'Post Not found',
    }
  }

  return {
    title: post.meta.title,
  }
}

const Post = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params
  const post = await getPostsByName(`${postId}.mdx`) //deduped

  if (!post) notFound()

  const { meta, content } = post

  const pubDate = getFormattedDate(meta.date)

  const tags = meta.tags.map((tag, i) => {
    return (
      <Link key={i} href={`/tags/${tag}`}>
        {tag}
      </Link>
    )
  })

  return (
    <>
      <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
      <p className="mt-0 text-sm">{pubDate}</p>
      <article>{content}</article>
      <section>
        <h3>Related:</h3>
        <div className="flex flex-row gap-4">{tags}</div>
      </section>
      <p className="mb-10">
        <Link href="/"> ◀️ Back to home</Link>
      </p>
    </>
  )
}

export default Post
