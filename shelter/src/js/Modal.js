export class Modal {
  constructor(classes) {
    this.classes = classes;
    this.modal = '';
    this.modalContent = '';
    this.modalCloseBtn = '';
    this.overlay = '';
  }

  buildModal(content) {
    this.overlay = this.createDomeNode(this.overlay, 'div', 'overlay', 'overlay_modal');

    this.modal = this.createDomeNode(this.modal, 'div', 'modal', this.classes);

    this.modalContent = this.createDomeNode(this.modalContent, 'div', 'modal__content');

    this.modalCloseBtn = this.createDomeNode(this.modalCloseBtn, 'div', 'modal__close-icon');

    // this.modalCloseBtn.innerHTML = '';
    this.setContent(content);
    this.appendModalElements();
    this.bindEvents();
    this.openModal();
  }
  createDomeNode(node, element, ...classes) {
    node = document.createElement(element);
    node.classList.add(...classes);
    return node;
  }

  setContent(content) {
    if (typeof content === 'string') {
      this.modalContent.innerHtml = content;
    } else {
      this.modalContent.innerHtml = '';
      this.modalContent.appendChild(content);
    }
  }

  appendModalElements() {
    this.modal.append(this.modalCloseBtn);
    this.modal.append(this.modalContent);
    this.overlay.append(this.modal);
  }

  bindEvents() {
    this.modalCloseBtn.addEventListener('click', this.closeModal);
    this.overlay.addEventListener('click', this.closeModal);
  }

  openModal() {
    document.body.append(this.overlay);
    // document.body.style.position = 'fixed';
  }

  closeModal(evt) {
    let classes = evt.target.classList;
    // document.body.style.position = 'absolute';
    if (classes.contains('overlay') || classes.contains('modal__close-icon')) {
      document.querySelector('.overlay').remove();
    }
  }
}
