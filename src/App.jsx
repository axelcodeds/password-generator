import { useEffect, useState } from 'react'

import './App.css'

function App() {
    const [upper, setUpper] = useState(false)
    const [lower, setLower] = useState(true)
    const [numbers, setNumbers] = useState(false)
    const [special, setSpecial] = useState(false)
    const [password, setPassword] = useState('')
    const [security, setSecurity] = useState('Sin seleccionar')
    const [length, setLength] = useState(10)

    const handleLength = event => {
        if (event.target.value !== '') {
            let val = parseInt(event.target.value)
            if (val > 50) {
                setLength(50)
            } else if (val < 5) {
                setLength(5)
            } else setLength(val)
        } else {
            setLength('')
        }
    }

    const handlePassword = event => {
        setPassword(event.target.value)
    }

    const generatePassword = () => {
        if (length === '' || (!upper && !lower && !numbers && !special)) {
            return
        }

        const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const minusculas = 'abcdefghijklmnopqrstuvwxyz'
        const numeros = '0123456789'
        const caracteresEspeciales = '~!@#$%^&*()-_+='

        let caracteresPermitidos = ''

        if (upper) caracteresPermitidos += mayusculas
        if (lower) caracteresPermitidos += minusculas
        if (numbers) caracteresPermitidos += numeros
        if (special) caracteresPermitidos += caracteresEspeciales

        let pass = ''
        for (let i = 0; i < length; i++) {
            const indexAleatorio = Math.floor(
                Math.random() * caracteresPermitidos.length
            )
            pass += caracteresPermitidos.charAt(indexAleatorio)
        }

        setPassword(pass)
    }

    useEffect(() => {
        let puntuacion = 0

        // Evaluar longitud
        if (password.length >= 6 && password.length < 8) puntuacion += 1
        else if (password.length >= 8 && password.length < 12) puntuacion += 2
        else if (password.length >= 12) puntuacion += 3

        // Evaluar diversidad de caracteres
        if (/[a-z]/.test(password)) puntuacion += 1 // Letras minúsculas
        if (/[A-Z]/.test(password)) puntuacion += 1 // Letras mayúsculas
        if (/[0-9]/.test(password)) puntuacion += 1 // Números
        if (/[^a-zA-Z0-9]/.test(password)) puntuacion += 1 // Símbolos especiales

        // Evaluar presencia de patrones comunes
        const patronesComunes = ['123456', 'password', 'qwerty', '111111']
        if (patronesComunes.some(pattern => password.includes(pattern)))
            puntuacion -= 2

        // Clasificación basada en la puntuación
        let sec
        if (puntuacion <= 1) sec = 'insegura'
        else if (puntuacion <= 3) sec = 'buena'
        else if (puntuacion <= 5) sec = 'segura'
        else sec = 'super-segura'

        setSecurity(sec)
    }, [password])

    return (
        <div className='container'>
            <h1 className='title'>Generador de contraseñas automático</h1>
            <div className='input'>
                <input
                    className='contra'
                    type='text'
                    placeholder='contraseña'
                    value={password}
                    onChange={handlePassword}
                />
                <button onClick={generatePassword} className='btn'>
                    Generar
                </button>
            </div>
            <div className='content'>
                <div className='stats'>
                    <div className='security'>
                        <span>Barra de fuerza</span>
                        <div className='bar-security'>
                            <div
                                className={'bar-security-value bar-' + security}
                            ></div>
                        </div>
                        <span className='security-text'>
                            {security.replace('-', ' ')}
                        </span>
                    </div>
                </div>
                <div className='config'>
                    <div className='config-item'>
                        <div
                            className={'checkbox' + (upper ? ' checked' : '')}
                            onClick={() => setUpper(!upper)}
                        >
                            ✓
                        </div>
                        <span className='checkbox-value'>mayúsculas</span>
                    </div>
                    <div className='config-item'>
                        <div
                            className={'checkbox' + (lower ? ' checked' : '')}
                            onClick={() => setLower(!lower)}
                        >
                            ✓
                        </div>
                        <span className='checkbox-value'>minúsculas</span>
                    </div>
                    <div className='config-item'>
                        <div
                            className={'checkbox' + (numbers ? ' checked' : '')}
                            onClick={() => setNumbers(!numbers)}
                        >
                            ✓
                        </div>
                        <span className='checkbox-value'>números</span>
                    </div>
                    <div className='config-item'>
                        <div
                            className={'checkbox' + (special ? ' checked' : '')}
                            onClick={() => setSpecial(!special)}
                        >
                            ✓
                        </div>
                        <span className='checkbox-value'>
                            caracteres especiales
                        </span>
                    </div>
                    <div className='config-item'>
                        <input
                            type='number'
                            value={length}
                            onInput={handleLength}
                            max={50}
                            min={5}
                        />
                        <span className='input-value'>longitud</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
