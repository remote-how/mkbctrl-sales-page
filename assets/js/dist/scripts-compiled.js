"use strict";

var toggleMenu = function toggleMenu(event) {
  var burger = event.target;
  var navbarMobile = document.getElementById('menuToggle');
  navbarMobile.classList.contains('open') ? navbarMobile.classList.remove('open') : navbarMobile.classList.add('open');
  burger.classList.contains('close') ? burger.classList.remove('close') : burger.classList.add('close');
};

var toggleModal = function toggleModal(event) {
  event.preventDefault();
  var modalId = event.target.dataset.modal;
  var modal = document.getElementById(modalId);
  modal.classList.contains('hide') ? modal.classList.remove('hide') : modal.classList.add('hide');
};

document.addEventListener('DOMContentLoaded', function () {
  var burgerToggle = document.getElementById('burgerToggle');
  var modalTogglers = Array.from(document.getElementsByClassName('modal-toggler'));
  burgerToggle.addEventListener('click', toggleMenu, false);
  modalTogglers.map(function (toggler) {
    toggler.addEventListener('click', toggleModal, false);
  });
});
//# sourceMappingURL=scripts-compiled.js.map
