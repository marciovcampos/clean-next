const About = ({ post }) => {
  return (
    <div>
      <h1>{post.about}</h1>
      <p>{post.about}</p>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  console.log(locale);

  if (locale == undefined) {
    locale = 'en-my';
  }

  let rawdata = require(`../public/locales/${locale.toLowerCase()}/common.json`);
  let post = JSON.parse(JSON.stringify(rawdata));

  return {
    props: {
      post,
    },
  };
};

export default About;
