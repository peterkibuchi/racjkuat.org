import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { BlogCard } from "~/components/content/blog-card";
import { BLOG_CATEGORIES } from "~/config/blog";
import { siteConfig } from "~/config/site";
import { constructMetadata, getBlurDataURL } from "~/lib/utils";

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await props.params;
  const category = BLOG_CATEGORIES.find((category) => category.slug === slug);

  if (!category) return;

  const { title, description } = category;

  return constructMetadata({
    title: `${title} Posts | ${siteConfig.name}`,
    description,
  });
}

export default async function BlogCategory(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const category = BLOG_CATEGORIES.find((ctg) => ctg.slug === slug);

  if (!category) notFound();

  const posts = await Promise.all(
    allPosts
      .filter(
        (post) => post.published && post.categories.includes(category.slug),
      )
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(async (post) => ({
        ...post,
        blurDataURL: await getBlurDataURL(post.image),
      })),
  );

  return (
    <div>
      {posts.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, idx) => (
            <BlogCard key={post._id} data={post} priority={idx <= 2} />
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  );
}
