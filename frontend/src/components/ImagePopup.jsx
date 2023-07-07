function ImagePopup({card, onClose}) {

  return (
    <div className={`popup popup_photo ${(Object.keys(card).length!=0) ? `popup_opened` : ''}`}>
      <div className='popup__container-photo'>
        <button className='popup__close-icon' type='button' onClick={onClose}></button>
        <img className='popup__container-img' src={card.link} alt={card.name} />
        <p className='popup__container-photo-name'>{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;