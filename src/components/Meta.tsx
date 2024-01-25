import Head from "next/head";

export type MetaProps = {
  title: string;
  slug: string;
  type?: string;
  image?: string;
  description?: string;
};

export default function Meta({
  title,
  slug,
  type,
  image,
  description,
}: MetaProps) {
  const url = `https://www.travel3exp.xyz/${slug}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
    </Head>
  );
}
