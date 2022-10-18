import React, {useContext, useState} from 'react'
import axios from "axios";
import {Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

function SignIn() {
    const {login} = useContext(AuthContext);

    const [formState, setFormState] = useState({
        inputEmail: "",
        inputPw: "",
    })

    async function handleSubmit(e) {
        e.preventDefault();
        console.log({formState});
        try {
            const {data: {accessToken}} = await axios.post(`http://localhost:3000/login`,
                {
                    email: formState.inputEmail,
                    password: formState.inputPw,
                }
            );
            login(accessToken);
        } catch (e) {

            console.error(e);
        }

    }

    function handleChange(evt) {
        evt.preventDefault()
        const value = evt.target.value;
        setFormState({...formState, [evt.target.name]: value});
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>

            <form onSubmit={handleSubmit}>


                <p>*invoervelden*</p>
                <legend>
                    <label htmlFor="input-user">
                        <span> user email:</span>

                        <input type="tekst"
                               id="input-user"
                               name="inputEmail"
                               value={formState.inputEmail}
                               onChange={handleChange}/>

                    </label>
                    <br></br>
                    <label htmlFor="input-pw">
                        <span>Password:</span>
                        <input type="tekst"
                               id="input-pw"
                               name="inputPw"
                               value={formState.inputPw}
                               onChange={handleChange}/>


                    </label>
                </legend>

                <button type="submit"
                        disabled={(formState.inputEmail.length > 0 && formState.inputPw.length > 0) === false ? true : false}>
                    Inloggen
                </button>


            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;