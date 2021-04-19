import { AppProps } from 'next/dist/next-server/lib/router/router';
import locales from '../../../public/locales/locales';
import * as matter from 'gray-matter';

type AboutProps = {
  post: any;
  body: string;
  title: string;
  allData: AllData[];
};

type AllData = {
  slug: any;
  title: {
    [key: string]: any;
  };
  body: string;
};

const About = ({ post, body, title, allData }: AboutProps) => {
  return (
    <div>
      <h1>{post.about}</h1>
      <p>{post.about}</p>

      {allData.map((data) => (
        <>
          <h1>{data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </>
      ))}
    </div>
  );
};

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { lang: 'en-my', about: 'about' } },
      { params: { lang: 'ms-my', about: 'mengenai' } },
      { params: { lang: 'zh-my', about: 'guanyu' } },
    ],
    fallback: false,
  };
};

export async function getAllTopics(lang: string) {
  const context = require.context('../../../public/locales', true, /\.mdx$/);
  const posts = [];

  for (const key of context.keys()) {
    const topic = key.slice(2);
    if (topic.startsWith(lang)) {
      const { data, content } = matter.read(`public/locales/${topic}`);

      posts.push({
        slug: topic.replace('.mdx', ''),
        title: data.title,
        order: data.order,
        body: content,
      });
    }
  }
  return posts;
}

export const getStaticProps = async ({ params }: AppProps) => {
  console.log('lang: ', params.lang);
  let lang: string = params.lang;

  if (lang == undefined) {
    lang = 'en-my';
  }

  let post = JSON.parse(JSON.stringify(locales[lang].default));

  const { data, content } = matter.read('public/locales/en-my/topic1.mdx');
  let title: string = data.title;

  let allData = await getAllTopics(lang);

  return {
    props: {
      post: post,
      body: content,
      title,
      allData,
    },
  };
};

export default About;
