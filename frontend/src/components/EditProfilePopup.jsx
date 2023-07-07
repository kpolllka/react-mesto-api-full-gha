import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from './contexts/CurrentUserContext';

function EditProfilePopup ({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);
  
  useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about)
  }, [currentUser, isOpen]);
    
  const handleChangeName = (evt) => {
      setName(evt.target.value)
  }
    
  const handleChangeDescription = (evt) => {
      setDescription(evt.target.value)
  }
    
  const handleSubmit = (evt) => {
      evt.preventDefault(); // Запрещаем браузеру переходить по адресу формы
      
      onUpdateUser ({ // Передаём значения управляемых компонентов во внешний обработчик
      name: name,
      about: description,
      })
  }
  
  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='popup-form'
      isOpen={isOpen}
      onClose={onClose}
      textButton='Сохранить'
      onSubmit={handleSubmit}
    >
      <input className='popup__input popup__input_info_name' name='name' value={name || ''} onChange={handleChangeName} id='name-input' type='text' placeholder='Имя' minLength='2' maxLength='40' required/>
      <span className='popup__input-error name-input-error'></span>
      <input className='popup__input popup__input_info_job' name='about' value={description || ''} onChange={handleChangeDescription} id='job-input' type='text' placeholder='Профессия' minLength='2' maxLength='200' required/>
      <span className='popup__input-error job-input-error'></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;