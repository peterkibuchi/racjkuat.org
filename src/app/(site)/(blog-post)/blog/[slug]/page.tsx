import { type Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { BlurImage } from "~/components/blur-image";
import { Authors } from "~/components/content/authors";
import { Mdx } from "~/components/content/mdx-components";
import { Icons } from "~/components/icons";
import { MaxWidthWrapper } from "~/components/max-width-wrapper";
import { DashboardTableOfContents } from "~/components/toc";
import { buttonVariants } from "~/components/ui/button";
import { BLOG_CATEGORIES } from "~/config/blog";
import { siteConfig } from "~/config/site";
import { getTableOfContents } from "~/lib/toc";
import {
  absoluteUrl,
  cn,
  constructMetadata,
  formatDate,
  getBlurDataURL,
  placeholderBlurhash,
} from "~/lib/utils";

export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slugAsParams,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await props.params;
  const post = allPosts.find((post) => post.slugAsParams === slug);
  if (!post) return;

  const { title, description, image } = post;

  return constructMetadata({
    title: `${title} | ${siteConfig.name}`,
    description: description,
    image,
    type: "article",
    url: absoluteUrl(post.slug),
  });
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) notFound();

  const categories = BLOG_CATEGORIES.filter((category) =>
    post.categories.includes(category.slug),
  );

  const relatedPosts =
    post.related?.flatMap(
      (slug) => allPosts.find((post) => post.slugAsParams === slug) ?? [],
    ) ?? [];

  const toc = await getTableOfContents(post.body.raw);
  const thumbnailBlurhash = await getBlurDataURL(post.image);

  return (
    <>
      <MaxWidthWrapper className="pt-6 md:pt-10 xl:px-0">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                    rounded: "lg",
                  }),
                  "h-8",
                )}
              >
                {category.title}
              </Link>
            ))}

            <time
              dateTime={post.date}
              className="text-sm font-medium text-muted-foreground"
            >
              {formatDate(post.date)}
            </time>
          </div>

          <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {post.description}
          </p>
          <div className="flex flex-nowrap items-center space-x-5 pt-1 md:space-x-8">
            {post.authors.map((author) => (
              <Authors username={author} key={post._id + author} />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>

      <div className="relative">
        <div className="absolute top-52 w-full border-t" />

        <MaxWidthWrapper className="grid grid-cols-4 gap-10 pt-8 max-md:px-0 xl:px-0">
          <div className="relative col-span-4 mb-10 flex flex-col space-y-8 bg-background sm:border md:rounded-xl lg:col-span-3">
            <BlurImage
              src={post.image}
              alt={post.title}
              width={1200}
              height={630}
              priority
              placeholder="blur"
              sizes="(max-width: 768px) 770px, 1000px"
              blurDataURL={thumbnailBlurhash ?? placeholderBlurhash}
              className="aspect-1200/630 border-b object-cover md:rounded-t-xl"
            />

            <div className="px-[.8rem] pb-10 md:px-8">
              <Mdx code={post.body.code} />
            </div>

            <hr className="mt-12 w-11/12 self-center" />

            <div className="flex justify-center pt-2 pb-8 lg:pt-2 lg:pb-12">
              <Link
                href="/blog"
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                See all posts
              </Link>
            </div>
          </div>

          <div className="sticky top-20 col-span-1 mt-52 hidden flex-col divide-y divide-muted self-start pb-24 lg:flex">
            <DashboardTableOfContents toc={toc} />
          </div>
        </MaxWidthWrapper>
      </div>

      <MaxWidthWrapper>
        {relatedPosts.length > 0 && (
          <div className="flex flex-col space-y-4 pb-16">
            <p className="font-heading text-2xl text-foreground">
              More Articles
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={post.slug}
                  className="flex flex-col space-y-2 rounded-xl border p-5 transition-colors duration-300 hover:bg-muted/80"
                >
                  <h3 className="font-heading text-xl text-foreground">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 text-[15px] text-muted-foreground">
                    {post.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(post.date)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </>
  );
}
