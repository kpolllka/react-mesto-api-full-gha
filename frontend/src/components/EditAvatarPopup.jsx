import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    onUpdateAvatar ({
      avatar: avatarRef.current.value
    })
  } 

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='popup-avatar'
      isOpen={isOpen}
      onClose={onClose}
      textButton='Сохранить'
      onSubmit={handleSubmit}
    >
      <input className='popup__input popup__input_avatar' name='avatar' ref={avatarRef} id='avatar-input' type='url' placeholder='Ссылка на фото' minLength='2' required/>
      <span className='popup__input-error avatar-input-error'></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;