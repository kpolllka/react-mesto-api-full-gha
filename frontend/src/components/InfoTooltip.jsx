import isOkRegister from '../images/isOkRegister.svg';
import isNotOkRegister from '../images/isNotOkRegister.svg';

function InfoToolTip({ isOpen, onClose, state }) {

  return (
    <div className={`popup popup__infotooltip ${isOpen ? `popup_opened` : ''}`}>
      <div className='popup__container popup__container-infotooltip'>
        <button className='popup__close-icon' onClick={onClose} type='button'/>
        <img src={state ? isOkRegister : isNotOkRegister} className='popup__image' alt={state ? 'Вы успешно зарегистрировались.' : 'Что-то пошло не так! Попробуйте еще раз.'}/>
        <p className='popup__text-register'>{state ? 'Вы успешно зарегистрировались.' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
      </div>
    </div>
  );
}

export default InfoToolTip;