import { visit, Visit } from '../Visit/Visit.js';

const BASE_URL = 'https://ajax.test-danit.com/api/v2/cards';

class API {
  constructor() {
    this.token = localStorage.getItem('token');
  }
  async postLogIn(email, password) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const token = await response.text();
    if (token.length === 36) {
      localStorage.setItem('token', token);
      this.token = token;
    }
    return response.status;
  }
  async getCard(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
    const card = await response.json();
    return card;
  }
  async getCardList() {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
    const cards = await response.json();
    if (cards.length === 0) {
      const wrapper = document.getElementById('card-wrapper');
      console.log('no cards');
      const noItems = document.createElement('h2');
      noItems.classList.add('no-items');
      wrapper.prepend(noItems);
      noItems.innerText = 'No items have been added';
    } else {
      visit.renderCardList(cards);
      const noItems = document.getElementsByClassName('no-items')[0];
      if (noItems) {
        noItems.remove();
      }
    }
    return response.status;
  }
  async deleteCard(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    const responseDelete = await response.status;
    return responseDelete;
  }
  async postCard(body) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    });
    const newCard = await response.json();
    visit.renderCard(newCard);
    // return newCard;
  }
  async putCard(id, body) {
    const cardToPut = this.getCard(id);
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
    });
    const editCard = await response.json();
    return editCard;
  }
}
const api = new API();
export { api, API };
