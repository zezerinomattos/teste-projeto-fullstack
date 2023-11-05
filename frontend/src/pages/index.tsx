import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import Modal from 'react-modal';
import { useRouter } from 'next/router';

//MY IMPORTS
import styles from '@/styles/Home.module.scss';
import { Button } from '../components/UI/Button';
import { Input, TextArea } from '../components/UI/Input';
import { ModalUser } from '../components/ModalUser';

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
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [loading, setLoaging] = useState(false);
  const [message, setMessage] = useState('');

  const [selectedFilter, setSelectedFilter] = useState('decre');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('')
  const [userLyList, setUserList] = useState<ListUser[]>();

  const [userLyDetailModal, setUserDetailModal] = useState<DetailUser>();
  const [modalVisible, setModalVisible] = useState(false);

  //FUNCAO DETALHE USER
  async function userDetail(id: string){
    await api.get('/user/detail', {
      params:{
        user_id: id
      }
    })
    .then(response =>{
      setUserDetailModal(response.data);
      setModalVisible(true);
    })
    .catch(error => {
      console.log(error);
      setMessage(error.response.data.erro);
    });
  }

  // FUNCAO FECHAR MODAL
  function handleCloseModal(){
    setModalVisible(false);
  }

  // FUNCAO FILTROS
  async function handleFilter(){

    if(userLyList){
      const filterUser = userLyList.filter((user) => user.id.includes(userId));
      setUserList(filterUser);
    }

    //FILTRANDO POR NOME
    if(!userId && name){
      await api.get('/users/name', {
        params: {
          name: name,
        },
      })
      .then(response => {
        setUserList(response.data);
      })
      .catch(error => {
        console.log(error);
        setMessage(error.response.data.erro);
      });
    }

    //FILTRANDO DO MAIOR PARA O MENOR
    if(!userId && !name && selectedFilter === 'decre'){
      await api.get('/users/desc').then((response) => {
        setUserList(response.data);
      })
      .catch(error => {
        console.log(error);
        setMessage(error.response.data.erro);
      });
    }

    //FILTRANDO DO MENOR PARA O MAIOR
    if(!userId && !name && selectedFilter === 'cresc'){
      await api.get('/users/asce').then((response) => {
        setUserList(response.data);
      })
      .catch(error => {
        console.log(error);
        setMessage(error.response.data.erro);
      });
    }

    //FILTRANDO POR PERIODO
    if(!userId && !name && selectedFilter === 'periodo'){
      const initial = initialDate.toString();
      const final = finalDate.toString();

      await api.get('/users/date', {
        params: {
          initialDate: initial,
          finalDate: final,
        }
      })
      .then(response => {
        setUserList(response.data);
      })
      .catch(error => {
        console.log(error);
        setMessage(error.response.data.erro);
      });
    }

    //FILTRANDO TODOS
    if(!name && !userId && !selectedFilter){
      await api.get('/users').then((response) => {
        setUserList(response.data);
      });
    }
  }

  //FUNCAO NAVEGATE PAGE NEW USER
  function handleNewUser(){
    router.push('/user/newuser');
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

Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title>Sistema - dashboard</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.header}>
          <div className={styles.filter}>
              <Input onChange={(e) => setUserId(e.target.value)} placeholder='CÓDIGO DO USUÁRIO' style={{width: '300px'}}/>
          </div>

          <div className={styles.filter}>
              <Input onChange={(e) => setName(e.target.value)} placeholder='NOME DO USUÁRIO' style={{width: '350px'}}/>
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
            <Button onClick={handleFilter}><FcSearch size={22}/></Button>
          </div>

          <div className={styles.filter}>
            <Button style={{marginLeft: '10px'}} onClick={handleNewUser}>NOVO USUÁRIO</Button>
          </div>
        </div>

        {
          selectedFilter === 'periodo' && (
            <div className={styles.header}>
              <div className={styles.filter}>
                <Input type='date' onChange={(e) => setInitialDate(e.target.value)}  style={{width: '200px'}}/>
              </div>

              <div className={styles.filter}>
                  <Input type='date' onChange={(e) => setFinalDate(e.target.value)} style={{width: '200px'}}/>
              </div>
            </div>
          )
        }
        
        {message && <span className={styles.spanMenssage}>{message}</span>}

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
      {
        modalVisible && userLyDetailModal && (
          <ModalUser
              isOpen={modalVisible}
              onRequestClose={handleCloseModal}
              user={userLyDetailModal}
          />
        )
      }
    </>
  )
}

