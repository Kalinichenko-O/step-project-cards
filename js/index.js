import { api, API } from "./API/API.js";
import { filter, Filter } from "./API/Filter.js";
import { modal, Modal } from "./MODAL/Modal.js";
import { visit, Visit } from "./Visit/Visit.js";

const buttonCreateCard = document.createElement("button");
buttonCreateCard.innerText = "Create Card";
buttonCreateCard.classList.add("button-create-card");

const buttonToFilter = document.createElement("button");
buttonToFilter.innerText = "Filter cards";
buttonToFilter.classList.add("filter-search-btn");
buttonToFilter.classList.add("btn-submit");
buttonToFilter.classList.add("filter-box");

const buttonLogIn = document.getElementById('logIn');
window.onload = function () {
  if (localStorage.getItem('token') !== null) {
    filter.render();
    api.getCardList();
    buttonLogIn.remove();
    document.getElementById('header').append(buttonCreateCard);
    document.getElementById('filter-section').append(buttonToFilter);
  } else {
    buttonLogIn.addEventListener('click', function () {
      modal.renderEnterModal();
    })
  }
}
export default function SubmitAndEnter(email, password) {
  api.postLogIn(email, password).then(response => {
    if (response === 200) {
      buttonLogIn.remove();
      filter.render();
      document.getElementById('header').append(buttonCreateCard);
      document.getElementById('filter-section').append(buttonToFilter);
      api.getCardList();
      buttonCreateCard.addEventListener("click", () => {
        modal.closeModal();
      });
    }
  });
}
buttonCreateCard.addEventListener('click', () => {
  modal.renderCreateCardModal();
});
buttonToFilter.addEventListener('click', () => {
  filter.filterCards();
});