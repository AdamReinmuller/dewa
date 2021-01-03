import { GetStaticProps } from "next";
import Head from "next/head";
import { FC } from "react";
import { getGithubPreviewProps, parseMarkdown } from "next-tinacms-github";
import { usePlugin } from "tinacms";
import { useGithubMarkdownForm } from "react-tinacms-github";

type TinaProps = {
  file: any;
};

const Tina: FC<TinaProps> = ({ file }) => {
  const formOptions = {
    label: "Tina Page",
    fields: [
      {
        name: "title",
        component: "text",
      },
    ],
  };

  const [data, form] = useGithubMarkdownForm(file, formOptions);
  usePlugin(form);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">
          {/**
           * Render the title from `home.md`
           */}
          - Welcome to <a href="https://nextjs.org">Next.js!</a>
          {data.title}
        </h1>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  preview,
  previewData,
}) => {
  if (preview) {
    return getGithubPreviewProps({
      ...previewData,
      fileRelativePath: "cms/posts/test-cikk.md",
      parse: parseMarkdown,
    });
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: "/cms/posts/test-cikk.md",
        // @ts-ignore
        data: (await import("../cms/posts/test-cikk.md")).default,
      },
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const posts = getAllContents("posts", ["slug"]);

//   const paths = posts.map((post) => ({
//     params: {
//       slug: post.slug,
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

export default Tina;