const About = ({ post }) => {
  return (
    <div>
      <h1>{post.about}</h1>
      <p>{post.about}</p>
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

export const getStaticProps = async ({ params }) => {
  console.log('lang: ', params.lang);
  let lang = params.lang;

  if (lang == undefined) {
    lang = 'en-my';
  }

  let rawdata = require(`../../../public/locales/${lang.toLowerCase()}/common.json`);
  let post = JSON.parse(JSON.stringify(rawdata));

  return {
    props: {
      post,
    },
  };
};

export default About;
