import ContactItem from 'components/ContactItem/ContactItem';
import style from './ContactList.module.css';

const ContactList = ({ visibleContacts, onDeleteContact }) => {
  return (
    <ul className={style.list}>
      {visibleContacts.length !== 0 ? (
        visibleContacts.map(({ id, name, number }) => {
          return (
            <ContactItem
              key={id}
              id={id}
              name={name}
              number={number}
              onDeleteContact={onDeleteContact}
            />
          );
        })
      ) : (
        <li className={style.error}>Not Found name</li>
      )}
    </ul>
  );
};

export default ContactList;
