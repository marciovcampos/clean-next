import { AppProps } from 'next/dist/next-server/lib/router/router';
import locales from '../../../public/locales/locales';

type Params = {
  lang: String;
  about: String;
};

type Post = {
  about: String;
};

const About = (post: any) => {
  const data = post.post;
  return (
    <div>
      <h1>{data.about}</h1>
      <p>{data.about}</p>
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

  console.log('json - ', post);

  return {
    props: {
      post: post,
    },
  };
};

export default About;
