import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const About = ({ post }) => {
  const { t } = useTranslation('common');

  return (
    <div>
      <h1>{t('about')}</h1>
      <p>{post.about}</p>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  console.log(locale);

  let rawdata = require(`../public/locales/${locale.toLowerCase()}/common.json`);
  let post = JSON.parse(JSON.stringify(rawdata));

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      post,
    },
  };
};

export default About;
