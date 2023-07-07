import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    setName('');
    setLink('')
  }, [isOpen]);

  const handleChangeName = (evt) => {
    setName(evt.target.value)
  }

  const handleChangeLink = (evt) => {
    setLink(evt.target.value)
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddPlace ({
      name: name,
      link: link
    })
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='popup-form'
      isOpen={isOpen}
      onClose={onClose}
      textButton='Сохранить'
      onSubmit={handleSubmit}
    >
      <input className='popup__input popup__input_photo_name' name='name' value={name || ''} onChange={handleChangeName} id='title-input' type='text' placeholder='Название' minLength='2' maxLength='30' required/>
      <span className='popup__input-error title-input-error'></span>
      <input className='popup__input popup__input_photo_link' name='link' value={link || ''} onChange={handleChangeLink} id='link-input' type='url' placeholder='Ссылка на картинку' required/>
      <span className='popup__input-error link-input-error'></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;