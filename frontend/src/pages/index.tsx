import React, { useState } from 'react';
import Head from 'next/head';

//MY IMPORTS
import styles from '@/styles/Home.module.scss';
import { Button } from '../components/UI/Button';


export default function Home() {

  const [loading, setLoaging] = useState(false);

  return (
    <>
      <Head>
        <title>Sistema - dashboard</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.header}>
          <Button loading={loading}></Button>
        </div>
      </main>
    </>
  )
}
