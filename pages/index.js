import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>

        <div className={styles.grid}>
          <Link href='/en-my/about'>
            <a className={styles.card}>
              <h3>English &rarr;</h3>
            </a>
          </Link>
          <Link href='/ms-my/mengenai'>
            <a className={styles.card}>
              <h3>Malay &rarr;</h3>
            </a>
          </Link>
          <Link href='/zh-my/guanyu'>
            <a className={styles.card}>
              <h3>Chinese &rarr;</h3>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
