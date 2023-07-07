import { Link, Routes, Route } from 'react-router-dom';

function Header(props) {
  return (
    <header className='header'>
      <div className='header__logo'></div>
      <div className='header__menu'>
        <p className='header__email'>{props.email}</p>
        <Routes>
          <Route path='/signin' element={<Link className='header__menu-link' to='/signup'>Регистрация</Link>}></Route>
          <Route path='/signup' element={<Link className='header__menu-link' to='/signin'>Войти</Link>}></Route>
          <Route path='/' element={<Link className='header__menu-link header__menu-link-exit' onClick={props.onSignOut} to='/signin'>Выйти</Link>}></Route>
        </Routes>
      </div>
    </header>
  );
}

export default Header;