import { useContext } from 'react';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onClose, cards, onCardLike, onCardDelete,}) {
  
  const { name, about, avatar } = useContext(CurrentUserContext);
  
  return (
    <main>
      <section className='profile'>
        <div className='profile__data'>
          <div className='profile__avatar-edit' onClick={onEditAvatar}>
            <img className='profile__avatar' src={avatar} alt='аватар пользователя странички'/>
          </div>
          <div className='profile__info'>
            <div className='profile__title'>
              <h2 className='profile__title-name'>{name}</h2>
              <button className='profile__edit-button' type='button' onClick={onEditProfile}></button>
            </div>
            <p className='profile__subtitle'>{about}</p>
          </div>
        </div>
        <button className='profile__add-button' type='button' onClick={onAddPlace}></button>
      </section>
      
      <section className='elements'>
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onClose={onClose}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;