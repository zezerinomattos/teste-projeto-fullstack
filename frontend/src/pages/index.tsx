import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";

//MY IMPORTS
import styles from '@/styles/Home.module.scss';
import { Button } from '../components/UI/Button';
import { Input, TextArea } from '../components/UI/Input';

import api from '../services/api';

type ListUser = {
  id: string;
  name: string;
  email: string;
}

export type DetailUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export default function Home() {
  const [carregando, setCarregando] = useState(true);
  const [loading, setLoaging] = useState(false);

  const [selectedFilter, setSelectedFilter] = useState('decre');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [userLyList, setUserList] = useState<ListUser[]>();
  const [userLyDetail, setUserDetail] = useState<DetailUser[]>();

  async function userDetail(id: string){
    await api.get('/user/detail', {
      params:{
        user_id: id
      }
    })
    .then(response =>{
      setUserDetail(response.data);
    })
  }
  
  useEffect(() => {
    async function getList(){
      await api.get('/users').then((response) => {
        //console.log(response.data);
        setUserList(response.data);
      });
    }

    getList();

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
        
        <div className={styles.containerList}>
          <ol className={styles.list}>
            <li>
              <span className={styles.headList}>CODIGO</span>
              <span className={styles.headList}>NOME</span>
              <span className={styles.headList}>EMAIL</span>
            </li>
            {userLyList?.map(user => (
              <li key={user.id} onClick={() => userDetail(user.id)}>
                <span>{user.id}</span>
                <span>{user.name}</span>
                <span>{user.email}</span>
              </li>
            ))}
          </ol>
        </div>

      </main>
    </>
  )
}

