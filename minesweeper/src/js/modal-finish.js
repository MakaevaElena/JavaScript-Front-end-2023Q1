import { Modal } from './modal.js';

export class FinishModal extends Modal {
  constructor(classes, { score, time, massage, ...rest }) {
    super(classes);
    this.score = score;
    this.time = time;
    this.massage = massage;
  }

  createMainFinishModal() {
    let template = '';
    const popup = document.createElement('div');
    popup.className = 'modal__finish';

    template += ` 
    
      <div class="modal__image"></div>
      <div class="modal__text">
        <h3 class="score">Movies: ${this.score} clicks</h3>
        <h3 class="time">Time: ${this.time} seconds</h3>
        <h3 class="massage">${this.massage}</h3>
      </div>`;

    popup.innerHTML = template;

    return popup;
  }

  renderModal() {
    let content = this.createMainFinishModal();
    // console.log(content);
    super.buildModal(content);
  }
}
