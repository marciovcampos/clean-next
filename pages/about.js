import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const About = (props) => {
  const { t } = useTranslation('common');

  return <h1>{t('about')}</h1>;
  // return <h1>{props.teste}</h1>;
};

export const getStaticProps = async ({ locale }) => {
  console.log(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      teste: '<p>texto 1</p>',
    },
  };
};

export default About;
