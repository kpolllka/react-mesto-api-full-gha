import { useContext } from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some(id => id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  
  const cardLikeButtonClassName = ( // Создаём переменную, которую после зададим в `className` для кнопки лайка 
    `element__like ${isLiked && 'element__like_active'}` 
  );
  
  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };
 
  return (
    <article className='element'>
      <div className='element__image'>
        <img className='element__mask-group' src={card.link} alt={card.name} onClick={handleCardClick}/>
        {isOwn && <button className='element__trash' onClick={handleDeleteClick} type='button'></button>}
      </div>
      <div className='element__group'>
        <h2 className='element__group-title'>{card.name}</h2>
        <div className='element__group-like'>
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type='button'></button>
          <p className='element__like-counter'>{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;