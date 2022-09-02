import Head from 'next/head'

import styles from '@/styles/Home.module.css'

const Home = () => (
  <div className={styles.container}>
    <Head>
      <title>Géocodeur GPF</title>
      <meta name='description' content='Géocodeur de la GéoPlateforme' />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome World
      </h1>
    </main>

    <footer className={styles.footer} />
  </div>
)

export default Home
