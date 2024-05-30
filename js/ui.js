import { sortContacts, getContacts } from "./contact.js";
// Fonction pour afficher les contacts
function displayContacts() {
  let contactsList = $("#contactsList");
  contactsList.empty();
  let contacts = getContacts();

  if (contacts.length === 0) {
    contactsList.append("<p>Aucun contact pour le moment</p>");
  } else {
    // Trier les contacts
    let sortedContacts = sortContacts(contacts);

    // Afficher les contacts triés
    sortedContacts.forEach(function (contact, index) {
      // Créer un nouvel élément contact
      let contactItem = $("<li>", {
        class: "contact-item",
        "data-id": index,
      });

      // Ajouter les détails du contact et l'icône
      contactItem.html(
        '<i class="icon fas fa-user"></i>' +
          "<span>" +
          contact.firstName +
          " " +
          contact.lastName +
          "</span>"
      );

      // Ajouter l'élément contact à la liste des contacts
      contactsList.append(contactItem);
    });

    // Ajouter des gestionnaires d'événements pour les éléments contact
    // Event listener for clicking on a contact item
    $(".contact-item").click(function () {
      $(".contact-item").removeClass("selected"); // Remove 'selected' class from all contact items
      $(this).addClass("selected"); // Add 'selected' class to the clicked contact item

      let contactId = $(this).attr("data-id");
      let contact = sortedContacts[contactId]; // Retrieve the contact based on the sorted index

      // Store the selected contact information in the local storage
      localStorage.setItem("selectedContact", JSON.stringify(contact));

      // Display user details in the details card
      $("#userDetails").html(
        "<p><strong>Civilité:</strong> " +
          contact.civility +
          "</p>" +
          "<p><strong>Nom:</strong> " +
          contact.lastName +
          "</p>" +
          "<p><strong>Prénom:</strong> " +
          contact.firstName +
          "</p>" +
          "<p><strong>Numéro de téléphone:</strong> " +
          contact.phone +
          "</p>"
      );

      // Show the user details card and hide the contact form container
      $("#userDetailsContainer").show();
      $("#contactFormContainer").hide();
    });
  }
}

// Export des fonctions
export { displayContacts };
