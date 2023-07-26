import Video from '@/app/components/Video';
import { BlogPost, Meta } from '@/types';
import {compileMDX} from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings/lib';
import rehypeHighlight from 'rehype-highlight/lib';
import rehypeSlug from 'rehype-slug';

import CustomImage from '@/app/components/CustomImage';

type FileTree = {
  tree: [
    {
      path: string;
    }
  ];
};

export const getPostsByName = async (
  fileName: string
): Promise<BlogPost | undefined> => {

    const res = await fetch(
        `https://raw.githubusercontent.com/praveenchandran81/blog-posts/main/${fileName}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      if (!res.ok) return undefined;

      const rawMDX=await res.text();
      if(rawMDX === '404: Not Found') return undefined;

      const {frontmatter,content}=await compileMDX<{title:string,date:string,tags:string[]}>({
        source:rawMDX,
        components:{
          Video,
          CustomImage
        },
        options:{
          parseFrontmatter:true,
          mdxOptions:{
              rehypePlugins:[
                rehypeHighlight,
                rehypeSlug,
                [rehypeAutolinkHeadings,{
                  behavior:'wrap'
                }],
              ]

          }
        }
      })

      const id= fileName.replace(/\.mdx$/,'');

      const blogPostObj:BlogPost={
        meta:{
            id,
            title:frontmatter.title,
            date:frontmatter.date,
            tags:frontmatter.tags
        },
        content
      }

      return blogPostObj;
   
};

export async function getPostsMeta(): Promise<Meta[] | undefined> {
  const res = await fetch(
    "https://api.github.com/repos/praveenchandran81/blog-posts/git/trees/main?recursive=1",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  if (!res.ok) return undefined;

  const repoFileTree: FileTree = await res.json();
  const filesArray = repoFileTree.tree
    .map((obj) => obj.path)
    .filter((path) => path.endsWith(".mdx"));

  const posts: Meta[] = [];
  for (const file of filesArray) {
    const post = await getPostsByName(file);
    if (post) {
      const { meta } = post;
      posts.push(meta);
    }
  }

  return posts.sort((a,b)=>a.date<b.date?1:-1);

}
