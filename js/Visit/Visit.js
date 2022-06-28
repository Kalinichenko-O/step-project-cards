import { api, API } from "../API/API.js";
import { modal } from "../MODAL/Modal.js";

class Visit {
  constructor(showMoreButton) {
    this.root = document.getElementById("root");
    this.cardsWrapper = document.getElementById("card-wrapper");
    this.showMoreButton = showMoreButton;
    this.editButton = document.createElement("button");
  }
  renderCardList(data) {
    data.map(dataEl => {
      this.renderCard(dataEl);
    });
    this.createCardsContainer();
  }
  createCardsContainer() {
    this.root.append(this.cardsWrapper);
    this.cardsWrapper.classList.add("cards__wrapper");
  }
  renderCard(cardData) {
    let noItems = document.querySelector(".no-items");
    if (noItems){
      noItems.remove();
    }
    this.cardWrapper = document.createElement("div");
    this.cardWrapper.setAttribute("urgency", `${cardData.Urgency}`);
    this.cardWrapper.classList.add(
      "card__wrapper",
      `card__wrapper--${cardData.id}`
    );
    this.cardWrapper.id = `${cardData.id}`;

    this.cardWrapper.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card__header--wrapper">  
          <p class="card__status__card">Status: <span class="card__status__wrapper--span">${cardData.Status}</span> </p>
          <button class="card__button--remove">X</button>
        </div>
        <div class="card__info">
          <p class="card__fullName"> <span class="card__fullName--span">Full-name:</span> ${cardData.fullName}</p>
          <p class="card__title"><span class="card__title--span">Title: </span>${cardData.title}</p>
          <p class="card-doctor"><span class="card-descr-b">Doctor:</span>${cardData.doctor}</p>
        </div>
        <div class="card__info--additional"></div>
        <button class="card__button--edit" id="card__button--edit--${cardData.id}">Edit</button>
        <button class="card__button--showMore card__show-more-btn--closed" id="card__button--showMore--${cardData.id}">Show more <span>&#709;</span></button>
      `
    );
    this.statusSelect = this.cardWrapper.querySelector(".card__status");
    this.cardsWrapper.append(this.cardWrapper);
    this.showMore(cardData);
    this.deleteCard(cardData);
    this.editCard(cardData);
    // this.cardStatusFn(cardData);
  }
  showMore(cardData) {
    this.showMoreBtn = this.cardWrapper.querySelector(
      ".card__button--showMore"
    );
    this.showMoreBtn.addEventListener("click", e => {
      e.target.classList.toggle("card__show-more-btn--closed");
      const cardWrapper = document.getElementById(`${cardData.id}`);
      let cardInfoEl = cardWrapper.querySelector(".card__info--additional");
      if (e.target.classList.contains("card__show-more-btn--closed")) {
        cardInfoEl.innerText = "";
        e.target.innerText = "Show more";
      } else {
        e.target.innerText = "Show less";
        const cardInfoEl = cardWrapper.querySelector(".card__info--additional");
        const { fullName, title, doctor, id, Status, ...restData } = cardData;
        let cardInfo = restData;
        Object.keys(cardInfo).forEach(prop => {
          const cardDataEl = document.createElement("p");
          cardDataEl.insertAdjacentHTML(
            "beforeend",
            `<span class="card__title">${prop}</span><span class="card__value"> ${cardData[prop]}</span>`
          );
          cardDataEl.classList.add("card__text");
          cardDataEl.dataset.parametr = "additional";
          cardInfoEl.append(cardDataEl);
        });
      }
    });
  }
  editCard(cardData) {
    this.editButton = this.cardWrapper.querySelector(".card__button--edit");
    this.editButton.addEventListener("click", async () => {
      modal.renderEditCardModal(cardData);
    });
  }


  deleteCard(card) {
    this.deleteButton = this.cardWrapper.querySelector(".card__button--remove");
    this.deleteButton.addEventListener("click", async e => {
      const deleteStatus = await api.deleteCard(card.id);
      if (deleteStatus === 200) {
        e.target.closest(".card__wrapper").remove();
        let items = document.querySelectorAll(".card__wrapper");
        if (items.length === 0) {
          const wrapper = document.getElementById("card-wrapper");
          const noItems = document.createElement("h2");
          noItems.classList.add("no-items");
          wrapper.prepend(noItems);
          noItems.innerText = "No items have been added";
        }
      }
    });
  }
}
const visit = new Visit();
export { visit, Visit };
