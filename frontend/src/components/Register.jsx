import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const [values, setValues] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister(values.email, values.password);
  }

  useEffect(() => {
    setValues({ email: '', password: '' });  
  }, []);

return (
  <div className='auth'>
    <h2 className='auth__title'>Регистрация</h2>
    <form className='auth__form' name='register' onSubmit={handleSubmit}>
      <input className='auth__input' name='email' value={values.email || ''} onChange={handleChange} id='email' type='email' placeholder='Email' required />
      <span className='auth__error email-input-error' type='text'></span>
      <input className='auth__input' name='password' value={values.password || ''} onChange={handleChange} id='password' type='password' placeholder='Пароль' required />
      <span className='auth__error password-input-error' type='text'></span>
      <div className='auth__button-container'>
        <button className='auth__button' type='submit'>Зарегистрироваться</button>
        <p className='auth__text'>Уже зарегистрированы?&nbsp;<Link to='/signin' className='auth__text-link'>Войти</Link></p>
      </div>
    </form>
  </div>
  )
}

export default Register;