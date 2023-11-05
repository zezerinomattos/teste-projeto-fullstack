import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";

//MY IMPORTS
import styles from '@/styles/Home.module.scss';
import { Button } from '../components/UI/Button';
import { Input, TextArea } from '../components/UI/Input';


export default function Home() {
  const [carregando, setCarregando] = useState(true);
  const [loading, setLoaging] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState('decre');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('')

  
  useEffect(() => {
    
    
    setCarregando(false);
  }, [])

  if (carregando) {
    return(
      <div className={styles.loadingContainer}>
        <FaSpinner color='#000' size={46} className={styles.loading}/>
      </div>
    );
}

//Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Sistema - dashboard</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.header}>
          <div className={styles.filter}>
              <Input placeholder='CÓDIGO DO USUÁRIO' style={{width: '300px'}}/>
          </div>

          <div className={styles.filter}>
              <Input placeholder='NOME DO USUÁRIO' style={{width: '350px'}}/>
          </div>

          <div className={styles.filter}>
            <select 
                name="product" 
                id="product"
                value={selectedFilter} 
                onChange={(e) => setSelectedFilter(e.target.value)}
                className={styles.selectInput}
            >
                <option value="decre">DECRESCENTE</option>
                <option value="cresc">CRESCENTE</option>
                <option value="periodo">PERÍODO</option>
            </select>
          </div>

          <div className={styles.filter}>
            <Button><FcSearch size={22}/></Button>
          </div>
        </div>
        
        <div className={styles.containerList}></div>

      </main>
    </>
  )
}

