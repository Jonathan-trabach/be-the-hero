import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';

import api from "../../services/api"

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {

    const [id, setid] = useState('');

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id })

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile')
        } catch (error) {
            alert('Falha no Login, tente novamente')
        }

    }

    return (
        <div className="logon-container" >
            <section className="form" >
                <img src={logoImg} />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setid(e.target.value)}

                    />
                    <button className='button' type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho Cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} />
        </div>
    );

}