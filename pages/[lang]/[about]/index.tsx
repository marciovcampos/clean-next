import { AppProps } from 'next/dist/next-server/lib/router/router';
import locales from '../../../public/locales/locales';
import * as matter from 'gray-matter';

type Params = {
  lang: String;
  about: String;
};

type AboutProps = {
  post: any;
  body: string;
  title: string;
};

const About = ({ post, body, title }: AboutProps) => {
  return (
    <div>
      <h1>{post.about}</h1>
      <p>{post.about}</p>

      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: body }} />
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

export const getStaticProps = async ({ params }: AppProps) => {
  console.log('lang: ', params.lang);
  let lang: string = params.lang;

  if (lang == undefined) {
    lang = 'en-my';
  }

  let post = JSON.parse(JSON.stringify(locales[lang].default));

  const { data, content } = matter.read('public/locales/en-my/topic.mdx');
  let title: string = data.title;

  return {
    props: {
      post: post,
      body: content,
      title,
    },
  };
};

export default About;
