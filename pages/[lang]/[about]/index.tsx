import { AppProps } from 'next/dist/next-server/lib/router/router';
import locales from '../../../public/locales/locales';
import * as matter from 'gray-matter';
import Link from 'next/Link';

type AboutProps = {
  post: any;
  topics: Topic[];
  questions: Question[];
};

type Topic = {
  slug: any;
  title: string;
  body: string;
  order: number;
};

type Question = {
  slug: any;
  title: string;
  body: string;
  order: number;
};

const About = ({ post, topics, questions }: AboutProps) => {
  return (
    <>
      <div>
        <li>
          <Link href='/en-my/about'>
            <a>English</a>
          </Link>
        </li>
        <li>
          <Link href='/ms-my/mengenai'>
            <a>Malay</a>
          </Link>
        </li>
        <li>
          <Link href='/zh-my/guanyu'>
            <a>Chinese</a>
          </Link>
        </li>
      </div>
      <div>
        <h1>{post.about}</h1>
        <p>{post.about}</p>

        {topics.map((data) => (
          <>
            <h1>{data.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.body }} />
          </>
        ))}

        {questions.map((data) => (
          <>
            <h1>{data.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data.body }} />
          </>
        ))}
      </div>
    </>
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

export async function getAllFiles(lang: string, folder: string) {
  const context = require.context('../../../public/locales', true, /\.mdx$/);
  const topics = [];

  for (const key of context.keys()) {
    const topic = key.slice(2);
    if (topic.startsWith(`${lang}/${folder}`)) {
      const { data, content } = matter.read(`public/locales/${topic}`);
      topics.push({
        slug: topic.replace('.mdx', ''),
        title: data.title,
        order: data.order,
        body: content,
      });
    }
  }
  return topics;
}

export const getStaticProps = async ({ params }: AppProps) => {
  console.log('lang: ', params.lang);
  let lang: string = params.lang;

  if (lang == undefined) {
    lang = 'en-my';
  }

  let post = JSON.parse(JSON.stringify(locales[lang].default));

  let topics = await getAllFiles(lang, 'topics');
  let questions = await getAllFiles(lang, 'faq');

  return {
    props: {
      post,
      topics,
      questions,
    },
  };
};

export default About;
