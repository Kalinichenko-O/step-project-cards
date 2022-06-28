import { api, API } from '../API/API.js';
import { visit, Visit } from '../Visit/Visit.js';
import SubmitAndEnter from '../index.js';

class Modal {
  constructor() {
    this.form = document.createElement('form');
    this.buttonSubmit = document.createElement('button');
    this.buttonSubmitCrDt = document.createElement('button');
    this.buttonClose = document.createElement('button');
    this.buttonCloseCrDt = document.createElement('button');
    this.wrapper = document.getElementById('root');
    this.cardId = null;
    this.status = null;
  }
  renderEnterModal() {
    const divBackground = document.createElement('div');
    divBackground.innerText = '';
    divBackground.classList.add('background-modal');
    this.wrapper.append(divBackground);
    divBackground.append(this.form);
    this.buttonSubmit.classList.add('btn-submit');
    this.buttonSubmit.id = 'btn-submit';
    this.form.innerText = '';
    this.form.insertAdjacentHTML(
      'beforeend',
      `<div id="modalTest" class="modal">
      <div id="modal-header" class="modal-header">
      <h5 class="modal-title" id="modal-title">Welcome</h5>
      </div>
      <div class="modal-body">
      <div class="form-floating mb-3">
      <label for="floatingInput">Email address</label>
      <input type="email" name ="email" value="kvs001@gmail.com" class="form-control" id="floatingInput" placeholder="name@example.com">
      </div>
      <div class="form-floating">
      <label for="floatingPassword">Password</label>
      <input type="password" name="password" value="123456" class="form-control" id="floatingPassword" placeholder="Password">
      </div>
      </div>
      <div id="modal-footer" class="modal-footer"></div>`
    );
    const divModalHeader = document.getElementById('modal-header');
    divModalHeader.append(this.buttonClose);
    this.buttonClose.innerText = 'X';
    this.buttonClose.classList.add('button-close');
    const divModalFooter = document.getElementById('modal-footer');
    divModalFooter.append(this.buttonSubmit);
    this.buttonSubmit.innerText = 'Submit';
    this.buttonSubmit.setAttribute('type', 'submit');
    divBackground.addEventListener('click',(e) => {
      if (e.target === divBackground || e.target === this.buttonClose) {
        this.removeModal.call(this);
        divBackground.remove();
      }
    });
    this.buttonSubmit.addEventListener('click', e => {
      e.preventDefault();
    });
    this.buttonSubmit.addEventListener('click', () => {
      this.handleSubmitEnterForm();
      divBackground.remove();
      this.removeModal.call(this);
    });
  }
  handleSubmitEnterForm() {
    const inputs = this.form.querySelectorAll('input');
    const formData = {};
    inputs.forEach(item => (formData[item.name] = item.value));
    const { email, password } = formData;
    SubmitAndEnter(email, password);
  }
  removeModal() {
    const removed = document.getElementById('modalTest');
    if(removed){
    removed.remove();
    }
  }

  renderCreateCardModal() {
    const div = document.createElement('div');
    this.form.innerText = '';
    this.wrapper.append(div);
    div.classList.add('background-modal');
    div.Id = 'wrapperId';
    div.append(this.form);
    this.buttonSubmitCrDt.classList.add('btn-submit');
    this.buttonSubmitCrDt.id = 'btn-sub';
    this.form.insertAdjacentHTML(
      'beforeend',
      `<div id="modalTest" class="modal">
      <div id="modal-header" class="modal-header">
      <h5 class="modal-title" id="modal-title">Create new card</h5>
      </div>
      <div class="modal-body">
        <select name="doctor" id="input-select" class="form-select">
          <option selected>Choose the doctor</option>
          <option>Cardiologist</option>
          <option>Dentist</option>
          <option>Therapist</option>
        </select>
      </div>
      <div id="modal-footer" class="modal-footer"></div>`
    );
    const divModalHeader = document.getElementById('modal-header');
    divModalHeader.append(this.buttonCloseCrDt);
    this.buttonCloseCrDt.innerText = 'X';
    this.buttonCloseCrDt.classList.add('button-close');
    this.buttonCloseCrDt.setAttribute('type', 'button');
    this.buttonCloseCrDt.addEventListener('click', ()=> {
      this.removeModal.bind(this);
      div.remove();
    })
    const divModalFooter = document.getElementById('modal-footer');
    divModalFooter.append(this.buttonSubmitCrDt);
    this.buttonSubmitCrDt.innerText = 'Cancel';
    this.buttonSubmitCrDt.setAttribute('type', 'button');
    const selectedDoctor = document.getElementById('input-select');
    selectedDoctor.addEventListener('change', this.handleDoctor.bind(this));
    this.buttonSubmitCrDt.addEventListener('click', () => {
      this.removeModal.bind(this);
      div.remove();
    });
    div.addEventListener('click', event => {
      const divBacground = document.getElementById('modalTest');
      if(divBacground){
      if (!divBacground.contains(event.target)) {
        this.removeModal.bind(this);
        div.remove();
      }
    }
    });
  }

  handleDoctor(e) {
    e.preventDefault();
    const div = this.wrapper.querySelector('.background-modal');
    const select = document.getElementById('input-select');
    const selectedDoctor = select.options[select.selectedIndex].text;
    this.renderAllDoctors(selectedDoctor);
    div.remove();
    this.removeModal();
  }
  renderAllDoctors(selectedDoctor) {
    const div = document.createElement('div');
    div.innerText = '';
    this.wrapper.append(div);
    div.classList.add('form-all-input');
    div.setAttribute('id', 'wrapperIdDivToRem');
    div.append(this.form);
    this.form.insertAdjacentHTML(
      'beforeend',
      `
        <div id="modalTest" class="modal-all-input">
          <div id="modal-head" class="modal-header">
            <h5 class="modal-title" id="modal-title">Create new Card</h5>
          </div>
          <div class="modal-body-all-card">
            <div class="modal-body-el modal-select-doctor">
                <label for="inputUrgency" class="form-label">Choose the doctor</label>
              <select id="input-selectDoctor" required class="form-select-doctor">
                <option value="${selectedDoctor}" selected>${selectedDoctor}</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dentist">Dentist</option>
                <option value="Therapist">Therapist</option>
              </select>
            </div>
            <div class="modal-body-el modal-name">
              <label for="inputName" class="form-label">Name</label>
              <input type="text" required name="fullName" id="name" />
            </div>
            <div class="modal-body-el modal-purpose">
                <label for="inputpurpose" class="form-label">Purpose of the visit</label>
                <input type="text" required name="title" id="purpose" />
              </div>
              <div class="modal-body-el modal-description">
                  <label for="inputName" class="form-label">Description</label>
                  <input type="text" required name="Description" id="description" />
                </div>
                <div class="modal-body-el modal-urgency">
                      <label for="inputUrgency" class="form-label">Urgency</label>
                    <select id="input-urgency" name="Urgency" required class="form-select-urgency">
                    <option selected>Urgency</option>
                    <option>Ordinary</option>
                    <option>Priority</option>
                    <option>Immediately</option>
                    </select>
                </div>
                <div class="modal-body-el modal-status">
                      <label for="inputStatus" class="form-label">Status</label>
                    <select id="input-status" name="Status" required class="form-select-status">
                    <option selected>Open</option>
                    <option>Done</option>
                    </select>
                </div>
                ${
                  (selectedDoctor === 'Cardiologist' &&
                    `
                <div class="modal-body-el modal-age">
                  <label for="inputAge" class="form-label">Age</label>
                  <input type="number" required min="0" max="100" name="Age" id="age" />
                </div>
                <div class="modal-body-el modal-pressure">
                  <label for="inputPressure" class="form-label">Pressure</label>
                  <input type="number" required min="50" max="160" name="Pressure" id="pressure" />
                </div>
                <div class="modal-body-el modal-body-mass-index">
                  <label for="inputBody-mass-index" class="form-label">Body mass index</label>
                  <input type="text" required name="Body_mass_index" id="body-mass-index" />
                </div>
                <div class="modal-body-el modal-past-diseases-cardio-system">
                  <label for="inputPast-diseases-cardio-system" class="form-label">Past diseases of the cardiovascular system</label>
                  <input type="boolean" required name="Past_diseases_cardio_system" id="past-diseases-cardio-system" />
                </div>`) ||
                  ''
                } 
                ${
                  (selectedDoctor === 'Dentist' &&
                    `
                <div class="modal-body-el modal-lastVisit">
                  <label for="inputLastVisit" class="form-label">LastVisit</label>
                  <input type="date" required name="LastVisit" id="lastVisit" />
                </div>`) ||
                  ''
                } 
                ${
                  (selectedDoctor === 'Therapist' &&
                    `
                <div class="modal-body-el modal-age">
                  <label for="inputAge" class="form-label">Age</label>
                  <input type="number" required min="0" max="100" name="Age" id="age" />
                </div>`) ||
                  ''
                } 
              </div>
              <div id="modal-foot" class="modal-footer"></div>
            </div>
          </div>
      `
    );
    const divModalHeader = document.getElementById('modal-head');
    const buttonExit = document.createElement('button');
    divModalHeader.append(buttonExit);
    buttonExit.innerText = 'X';
    buttonExit.classList.add('button-close');
    const divModalFooter = document.getElementById('modal-foot');
    const buttonSub = document.createElement('button');
    divModalFooter.append(buttonSub);
    buttonSub.innerText = 'Submit';
    buttonSub.setAttribute('type', 'submit');
    buttonSub.classList.add('btn-submit');
    const select = document.getElementById('input-selectDoctor');
    select.addEventListener('change', e => {
      let selectedDoctor = select.options[select.selectedIndex].text;
      this.removeModal.call(this);
      div.remove();
      this.renderAllDoctors(selectedDoctor);
    });
    buttonSub.addEventListener('click', e => {
      e.preventDefault();
      // div.remove();
    });
    buttonSub.addEventListener(
      'click',
      this.handleSubmitEnterFromInputs.bind(this)
    );
    buttonExit.addEventListener('click', () => {
      this.removeModal.call(this);
      div.remove();
    });
    div.addEventListener('click', event => {
      const divBacground = document.getElementById('modalTest');
      if(divBacground){
      if (!divBacground.contains(event.target)) {
        this.removeModal.bind(this);
        div.remove();
      }   
    }
    });
  }
  handleSubmitEnterFromInputs() {
    const selectUrgency = this.form.querySelectorAll('select')[1];
    const urgency = selectUrgency.options[selectUrgency.selectedIndex].text;
    const selectStatus = this.form.querySelectorAll('select')[2];
    const status = selectStatus.options[selectStatus.selectedIndex].text;
    const inputs = this.form.querySelectorAll('input');
    const selectDoctor = this.form.querySelectorAll('select')[0];
    const doctor = selectDoctor.options[selectDoctor.selectedIndex].text;
    const formData = { Urgency: urgency, doctor, Status:status };
    inputs.forEach(item => (formData[item.name] = item.value));
    const isEmpty = !Object.values(formData).some(v => v === '');
    if (isEmpty) {
      api.postCard(formData);
      const divToRemove = document.getElementById('wrapperIdDivToRem');
      divToRemove.remove();
      this.removeModal();
      const testBug = document.getElementById('modalTest');
      // testBug.remove();
    } else {
      alert("Заполните форму полностью");
    }
  }
  renderEditCardModal(formData) {
    this.cardId = formData.id;
    const div = document.createElement('div');
    this.form.innerText = '';
    div.innerText = '';
    this.wrapper.append(div);
    div.classList.add('form-all-input');
    div.setAttribute('id', 'wrapperId');
    div.append(this.form);
    this.form.insertAdjacentHTML('beforeend', '');
    this.form.insertAdjacentHTML(
      'beforeend',
      `<div id="modalTest" class="modal-all-input">
          <div id="modal-head" class="modal-header">
            <h5 class="modal-title" id="modal-title">Edit Card</h5>
          </div>
          <div class="modal-body-all-card">
            <div class="modal-body-el modal-select-doctor">
                <label for="inputUrgency" class="form-label">Choose the doctor</label>
              <select id="input-selectDoctor" required class="form-select-doctor">
                <option value="${formData.doctor}" selected>${
        formData.doctor
      }</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Dentist">Dentist</option>
                <option value="Therapist">Therapist</option>
              </select>
            </div>
            <div class="modal-body-el modal-name">
              <label for="inputName" class="form-label">Name</label>
              <input type="text" required name="fullName" id="name" value="${
                formData.fullName
              }" />
            </div>
            <div class="modal-body-el modal-purpose">
                <label for="inputpurpose" class="form-label">Purpose of the visit</label>
                <input type="text" required name="title" id="purpose" value="${
                  formData.title
                }" />
              </div>
              <div class="modal-body-el modal-description">
                  <label for="inputName" class="form-label">Description</label>
                  <input type="text" required name="Description" id="description" value="${
                    formData.Description
                  }" />
                </div>
                <div class="modal-body-el modal-urgency">
                      <label for="inputUrgency" class="form-label">Urgency</label>
                    <select id="input-urgency" name="Urgency" required class="form-select-urgency" value="${
                      formData.Urgency
                    }">
                    <option selected>${formData.Urgency}</option>
                    <option>Ordinary</option>
                    <option>Priority</option>
                    <option>Immediately</option>
                    </select>
                </div>
                <div class="modal-body-el modal-status">
                      <label for="inputStatus" class="form-label">Status</label>
                    <select id="input-status" name="Status" required class="form-select-status">
                    <option selected>${formData.Status}</option>
                    <option>Open</option>
                    <option>Done</option>
                    </select>
                </div>
                ${
                  (formData.doctor === 'Cardiologist' &&
                    `<div class="modal-body-el modal-age">
                  <label for="inputAge" class="form-label">Age</label>
                  <input type="number" required min="0" max="100" name="Age" id="age" value="${formData.Age}" />
                </div>
                <div class="modal-body-el modal-pressure">
                  <label for="inputPressure" class="form-label">Pressure</label>
                  <input type="number" required min="50" max="160" name="Pressure" id="pressure" value="${formData.Pressure}"/>
                </div>
                <div class="modal-body-el modal-body-mass-index">
                  <label for="inputBody-mass-index" class="form-label">Body mass index</label>
                  <input type="text" required name="Body_mass_index" id="body-mass-index" value="${formData.Body_mass_index}" />
                </div>
                <div class="modal-body-el modal-past-diseases-cardio-system">
                  <label for="inputPast-diseases-cardio-system" class="form-label">Past diseases of the cardiovascular system</label>
                  <input type="boolean" required name="Past_diseases_cardio_system" id="past-diseases-cardio-system" value="${formData.Past_diseases_cardio_system}"/>
                </div>`) ||
                  ''
                } 
                ${
                  (formData.doctor === 'Dentist' &&
                    `<div class="modal-body-el modal-lastVisit">
                      <label for="inputLastVisit" class="form-label">LastVisit</label>
                      <input type="date" required name="LastVisit" id="lastVisit" value="${formData.LastVisit}" />
                    </div>`) ||
                  ''
                } 
                ${
                  (formData.doctor === 'Therapist' &&
                    `<div class="modal-body-el modal-age">
                      <label for="inputAge" class="form-label">Age</label>
                      <input type="number" required min="0" max="100" name="Age" id="age" value="${formData.Age}" />
                    </div>`) ||
                  ''
                } 
              </div>
              <div id="modal-foot" class="modal-footer"></div>
            </div>
          </div>
      `
    );
    const divModalHeader = document.getElementById('modal-head');
    const buttonExit = document.createElement('button');
    divModalHeader.append(buttonExit);
    buttonExit.innerText = 'X';
    buttonExit.classList.add('button-close');
    const divModalFooter = document.getElementById('modal-foot');
    const buttonSub = document.createElement('button');
    divModalFooter.append(buttonSub);
    buttonSub.innerText = 'Submit';
    buttonSub.setAttribute('type', 'submit');
    buttonSub.classList.add('btn-submit');
    const select = document.getElementById('input-selectDoctor');
    select.addEventListener('change', e => {
      let selectedDoctor = select.options[select.selectedIndex].text;
      this.removeModal();
      div.remove();
      this.renderAllDoctors(selectedDoctor);
    });
    buttonSub.addEventListener('click', e => {
      e.preventDefault();
      this.handleSubmitEnterFromInputsEdit.call(this);
      this.removeModal.call(this);
      div.remove();
    });
    buttonExit.addEventListener('click', () => {
      this.removeModal.call(this);
      div.remove();
    });
    div.addEventListener('click', event => {
      const divBacground = document.getElementById('modalTest');
      if(divBacground){
      if (!divBacground.contains(event.target)) {
        this.removeModal.call(this);
        div.remove();
      }
    }
    });
  }
  handleSubmitEnterFromInputsEdit() {
    document.getElementById(this.cardId).remove();
    const selectUrgency = this.form.querySelectorAll('select')[1];
    const urgency = selectUrgency.options[selectUrgency.selectedIndex].text;
    const selectStatus = this.form.querySelectorAll('select')[2];
    const status = selectStatus.options[selectStatus.selectedIndex].text;
    const inputs = this.form.querySelectorAll('input');
    const selectDoctor = this.form.querySelectorAll('select')[0];
    const doctor = selectDoctor.options[selectDoctor.selectedIndex].text;
    const formData = { Urgency: urgency, doctor, Status:status };
    formData.id = this.cardId;
    inputs.forEach(item => (formData[item.name] = item.value));
    api
      .putCard(this.cardId, formData)
      .then(response => visit.renderCard(response));
    this.removeModal.call(this);
    document.getElementById('wrapperId').remove();
  }
}
const modal = new Modal();
export { modal, Modal };
