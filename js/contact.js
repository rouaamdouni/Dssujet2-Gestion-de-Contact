// Fonction pour récupérer les contacts
import { displayContacts } from "./ui.js";
function getContacts() {
  let contacts = localStorage.getItem("contacts");
  return contacts ? JSON.parse(contacts) : [];
}

function sortContactsByName(contacts) {
  return contacts.slice().sort((a, b) => {
    // Compare last names first
    let lastNameA = a.lastName.toLowerCase();
    let lastNameB = b.lastName.toLowerCase();
    if (lastNameA < lastNameB) return -1;
    if (lastNameA > lastNameB) return 1;

    // If last names are the same, compare first names
    let firstNameA = a.firstName.toLowerCase();
    let firstNameB = b.firstName.toLowerCase();
    if (firstNameA < firstNameB) return -1;
    if (firstNameA > firstNameB) return 1;

    return 0; // Les noms sont égaux
  });
}

function sortContacts(contacts) {
  // Trier par civilité
  const sortedByCivility = contacts.slice().sort((a, b) => {
    const civilityOrder = { Madame: 1, Mademoiselle: 2, Monsieur: 3 };
    const civilityA = civilityOrder[a.civility];
    const civilityB = civilityOrder[b.civility];

    if (civilityA < civilityB) return -1;
    if (civilityA > civilityB) return 1;

    // Si les civilités sont les mêmes, trier par nom et prénom
    return sortContactsByName([a, b])[0] === a ? -1 : 1;
  });

  return sortedByCivility;
}

// function sortContacts(contacts) {
//   return contacts.slice().sort((a, b) => {
//     const civilityOrder = { Madame: 1, Mademoiselle: 2, Monsieur: 3 };
//     const civilityA = civilityOrder[a.civility];
//     const civilityB = civilityOrder[b.civility];

//     if (civilityA < civilityB) return -1;
//     if (civilityA > civilityB) return 1;

//     let lastNameA = a.lastName.toLowerCase();
//     let lastNameB = b.lastName.toLowerCase();
//     if (lastNameA < lastNameB) return -1;
//     if (lastNameA > lastNameB) return 1;

//     let firstNameA = a.firstName.toLowerCase();
//     let firstNameB = b.firstName.toLowerCase();
//     if (firstNameA < firstNameB) return -1;
//     if (firstNameA > firstNameB) return 1;
//     return 0;
//   });
// }

function geteditContact() {
  // Retrieve the selected contact information from the local storage
  let selectedContact = JSON.parse(localStorage.getItem("selectedContact"));

  // Populate edit form fields with the selected contact data for editing
  $("#editCivility").val(selectedContact.civility);
  $("#editFirstName").val(selectedContact.firstName);
  $("#editLastName").val(selectedContact.lastName);
  $("#editPhone").val(selectedContact.phone);

  // Show the edit contact form container and hide the user details container
  $("#contactFormContainer").show();
  $("#userDetailsContainer").hide();
}

// Function to save a new contact
function saveContact(contact) {
  let contacts = getContacts();
  contacts.push(contact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Function to delete a contact
function deleteContact(contactId) {
  let contacts = getContacts();
  contacts.splice(contactId, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts(); // Refresh contacts list after deletion
}

// Function to delete all contacts
function deleteAllContacts() {
  localStorage.removeItem("contacts");
  displayContacts(); // Refresh contacts list after deletion
}

function checkUserExists(firstName, lastName) {
  let contacts = getContacts();
  if (
    contacts.some(
      (contact) =>
        contact.firstName === firstName && contact.lastName === lastName
    )
  ) {
    $("#UserExistsModal").css("display", "block"); // Affiche le modal d'alerte
    return true; // L'utilisateur existe déjà
  }
  return false; // L'utilisateur est unique
}

// Export des fonctions
export {
  getContacts,
  sortContacts,
  geteditContact,
  saveContact,
  deleteContact,
  deleteAllContacts,
  checkUserExists,
};
