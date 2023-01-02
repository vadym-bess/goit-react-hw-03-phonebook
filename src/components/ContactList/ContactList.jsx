import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';



export const ContactList = ({ contacts, onClick }) => {
  return (
    <div >
      {contacts.map(contact => {
        return (
            <div className = "ContactListThumb"  key={nanoid()}>
            <p>
              {contact.name}: {contact.number}
            </p>
            <button className = "button"
              type="button"
              onClick={() => {
                onClick(contact.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ),
    onClick: PropTypes.func.isRequired
}