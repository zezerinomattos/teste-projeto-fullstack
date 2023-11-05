import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

//MY IMPORTS
import styles from './styles.module.scss';
import { Button } from '../../../components/UI/Button';
import { Input, TextArea } from '../../../components/UI/Input';

import api from '../../../services/api';

export default function NewUser(){
    const router = useRouter();
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    //FUNCAO PARA EDITAR USUER
    async function handleNewUser(){

        if(!name || !email || !phone){
            toast.warning('Informe os Campos Obrigatórios!');
            return
        }
        
        await api.post('/user', {
            name: name,
            email: email,
            phone: phone
        })
        .then((response) => {
            toast.success('Usuário criado!');
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.erro);
        });
    }

    function handleLista(){
        router.push('/');
    }

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

    return(
        <>
            <div className={styles.container}>
                <h1>NOVO USUÁRIO</h1>

                <form className={styles.form}>
                    <div className={styles.inputsBasicData}>

                        <div className={styles.inputLabel}>
                            <label htmlFor="">NOME</label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} style={{width: '350px', textTransform: 'none'}} />
                        </div>

                        <div className={styles.inputLabel}>
                            <label htmlFor="">E-MAIL</label>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '300px', textTransform: 'none'}} />
                        </div>

                        <div className={styles.inputLabel}>
                            <label htmlFor="">TELEFONE</label>
                            <Input value={phone} onChange={(e) => setPhone(e.target.value)} style={{width: '300px', textTransform: 'none'}} />
                        </div>
                    </div>


                    <div className={styles.inputsBasicData}>
                        <Button loading={loading} onClick={handleNewUser}>NOVO USUÁRIO</Button>

                        <Button loading={loading} onClick={handleLista}>LISTA DE USUÁRIO</Button>
                    </div>
                </form>
                
            </div>
        </>
    )
}