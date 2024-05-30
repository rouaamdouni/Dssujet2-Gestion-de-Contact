// main.js
import {
  getContacts,
  geteditContact,
  saveContact,
  deleteContact,
  deleteAllContacts,
  checkUserExists,
} from "./contact.js";
import { displayContacts } from "./ui.js";

$(document).ready(function () {
  $("#addIcon").click(function () {
    $("#formContainer").toggle();
  });

  $("#deleteAllIcon").click(function () {
    let contacts = getContacts();
    if (contacts.length === 0) {
      $("#noContactsModal").css("display", "block");
    } else {
      $("#deleteAllConfirmationModal").css("display", "block");
    }
  });

  $("#contactForm").submit(function (e) {
    e.preventDefault();

    let contact = {
      civility: $("#addCivility").val(),
      firstName: $("#addFirstName").val(),
      lastName: $("#addLastName").val(),
      phone: $("#addPhone").val(),
    };

    // Vérifiez si l'utilisateur existe déjà
    if (checkUserExists(contact.firstName, contact.lastName)) {
      return; // Arrête l'exécution de la fonction si l'utilisateur existe déjà
    }

    saveContact(contact);
    displayContacts();
    $("#contactForm")[0].reset();
    $("#formContainer").hide();
  });
  // Event listener for editing a contact
  $("#editUserBtn").click(geteditContact);

  // update the selected contact
  $("#updateForm").submit(function (e) {
    e.preventDefault(); // Prevent default form submission

    let contactId = $(".contact-item.selected").attr("data-id");
    let contacts = getContacts();
    let updatedContact = {
      civility: $("#editCivility").val(),
      firstName: $("#editFirstName").val(),
      lastName: $("#editLastName").val(),
      phone: $("#editPhone").val(),
    };

    // Update the contact in the contacts array
    contacts[contactId] = updatedContact;
    localStorage.setItem("contacts", JSON.stringify(contacts));

    // Refresh contacts list and hide the edit contact form container
    displayContacts();
    $("#contactFormContainer").hide();
    $("#updateForm").trigger("reset"); // Reset form fields
    $(".contact-item").removeClass("selected");
  });

  $("#noContactsModal .close").click(function () {
    $("#noContactsModal").css("display", "none");
  });

  $("#resetFormBtn").click(function () {
    $("#contactForm")[0].reset();
  });

  $("#confirmDeleteAllBtn").click(function () {
    deleteAllContacts();
    $("#deleteSuccessNotification")
      .css("display", "block")
      .text("Tous les contacts ont été supprimés.");
    setTimeout(function () {
      $("#deleteSuccessNotification").css("display", "none");
    }, 1000);
    $("#deleteAllConfirmationModal").css("display", "none");
  });

  $("#deleteUserBtn").click(function () {
    let contactId = $(".contact-item.selected").attr("data-id");
    let contacts = getContacts();
    let contact = contacts[contactId];

    $("#deleteUserName").text(contact.firstName + " " + contact.lastName);
    $("#deleteConfirmationModal").css("display", "block");
  });

  $("#confirmDeleteBtn").click(function () {
    let contactId = $(".contact-item.selected").attr("data-id");
    deleteContact(contactId);
    $("#deleteConfirmationModal").css("display", "none");
    $("#contactFormContainer").css("display", "none");
  });

  $("#closeUserDetails").click(function () {
    $("#userDetailsContainer").hide();
    $(".contact-item").removeClass("selected");
  });

  $("#closeContactForm").click(function () {
    $("#contactFormContainer").hide();
  });

  $("#closeFormContainer").click(function () {
    $("#formContainer").hide();
  });

  $("#cancelDeleteAllBtn").click(function () {
    $("#deleteAllConfirmationModal").hide();
  });

  // Fermer le modal quand l'utilisateur clique sur <span> (x)
  $(".close").click(function () {
    $("#UserExistsModal").css("display", "none");
  });

  // Fermer le modal quand l'utilisateur clique n'importe où en dehors du modal
  $(window).click(function (event) {
    if ($(event.target).is("#UserExistsModal")) {
      $("#UserExistsModal").css("display", "none");
    }
  });

  displayContacts();
});
