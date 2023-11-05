import React, { useState} from 'react';
import Modal from 'react-modal';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

//MY IMPORTS
import styles from './styles.module.scss';
import { DetailUser } from '../../pages/index';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

import api from '../../services/api';

interface ModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
    user: DetailUser;
}

export function ModalUser({ isOpen, onRequestClose, user }: ModalProps){
    const customStyles = {
        content: {
          top: '50%',
          bottom: 'auto',
          left: '50%',
          right: 'auto',          
          padding: '30px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#606060'
        },
    };

    const [loading, setLoaging] = useState(false);

    //FUNCAO PARA DELETAR USER
    async function handleDelet(id: string){
        await api.delete('/user', {
            params: {
                user_id: id
            }
        })
        .then(response => {
            onRequestClose();
            toast.success('Usuário Deletado com sucesso!');
        })
        .catch(error => {
            console.log(error);
            toast.error(error.response.data.erro);
        })
    }

    //FUNCAO PARA EDITAR USUER
    async function handleEdit(){

    }

    return(
        <Modal isOpen={isOpen} onRequestClose={() => onRequestClose} style={customStyles}>
            <div className={styles.container}>
                <h1>DETALHES DO USUÁRIO</h1>

                <form className={styles.form}>
                    <div className={styles.inputsBasicData}>
                        <div className={styles.inputsBasicData}>
                            <div className={styles.inputLabel}>
                                <label htmlFor="">CÓDIGO</label>
                                <Input value={user.id} disabled style={{width: '300px', textTransform: 'none'}} />
                            </div>
                        </div>

                        <div className={styles.inputLabel}>
                            <label htmlFor="">CÓDIGO</label>
                            <Input value={user.id} disabled style={{width: '300px', textTransform: 'none'}} />
                        </div>

                        <div className={styles.inputLabel}>
                            <label htmlFor="">NOME</label>
                            <Input value={user.name} disabled style={{width: '350px', textTransform: 'none'}} />
                        </div>

                        <div className={styles.inputLabel}>
                            <label htmlFor="">E-MAIL</label>
                            <Input value={user.email} disabled style={{width: '300px', textTransform: 'none'}} />
                        </div>
                    </div>

                    <div className={styles.inputsBasicData}>
                        <div className={styles.inputLabel}>
                            <label htmlFor="">TELEFONE</label>
                            <Input value={user.phone} disabled style={{width: '300px', textTransform: 'none'}} />
                        </div>

                        <div className={styles.inputLabel}>
                            <label htmlFor="">DATA DE CRIAÇÃO</label>
                            <Input value={new Date(user.created_at).toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                        </div>

                        <div className={styles.inputLabel}>
                            <label htmlFor="">ÚLTIMA ATUALIZAÇÃO</label>
                            <Input value={new Date(user.updated_at).toLocaleDateString("pt-BR", {day: '2-digit', month: '2-digit', year: 'numeric'})} disabled style={{width: '120px'}}/>
                        </div>
                    </div>

                    <div className={styles.inputsBasicData}>
                        <Button loading={loading} onClick={handleEdit}>EDITAR</Button>
                        <Button style={{backgroundColor: '#FF3F4B'}} loading={loading} onClick={() => handleDelet(user.id)}>EXCLUIR</Button>
                    </div>
                </form>
                
            </div>
        </Modal>
    )
}