// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import style from './ContactForm.module.css';

const ContactForm = ({ contactsName, onSubmit }) => {
  // state = { name: '', number: '' };
  const [formData, setFormData] = useState({ name: '', number: '' });

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSubmit(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleChange = event => {
    const { name, value } = event.currentTarget;

    if (name === 'number' && !/^[0-9\s-+()]*$/.test(value)) {
      alert('Введіть лише цифри, символи та пробіл!');
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { name, number } = formData;

    const matchName = contactsName.some(
      contactName => name.toLowerCase() === contactName.toLowerCase()
    );
    if (matchName) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    onSubmit(newContact);
    reset();
  };

  const reset = () => {
    setFormData({ name: '', number: '' });
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <label className={style.label}>
        Name
        <input
          type="text"
          name="name"
          className={style.input}
          pattern="^[a-zA-Za-яА-Я]+(([' \-][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
          value={formData.name}
          autoFocus
        />
      </label>

      <label className={style.label}>
        Number
        <input
          type="tel"
          name="number"
          className={style.input}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          title="Phone number must contain only digits, symbols (+, -, (, ), space)"
          required
          onChange={handleChange}
          value={formData.number}
        />
      </label>

      <button type="submit" className={style.submit_btn}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        add contact
      </button>
    </form>
  );
};

export default ContactForm;
