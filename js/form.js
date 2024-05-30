function updateForm(e) {
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
}

function submitForm() {
  e.preventDefault();

  let contact = {
    civility: $("#addCivility").val(),
    firstName: $("#addFirstName").val(),
    lastName: $("#addLastName").val(),
    phone: $("#addPhone").val(),
  };

  saveContact(contact);
  displayContacts();
  $("#contactForm")[0].reset();
  $("#formContainer").hide();
}

export { updateForm, submitForm };
