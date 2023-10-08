// import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import style from './App.module.css';
import { useState } from 'react';

export const App = () => {
  // state = {
  //   contacts: [],
  //   filter: '',
  // };

  // переробити 
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleAddNewContact = newContact => {
    setContacts(prevContacts =>  [...prevContact.contacts, newContact])
    };
//  тут закінчив
  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizeFilter)
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const contactsName = contacts.map(contact => contact.name);

    return (
      <div>
        <h1 className={style.title}>Phonebook</h1>
        <ContactForm
          onSubmit={this.handleAddNewContact}
          contactsName={contactsName}
        />

        <h2 className={style.title}>Contacts</h2>
        <div className={style.contact_list_container}>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            visibleContacts={visibleContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        </div>
      </div>
    );
  
}
export default App;
