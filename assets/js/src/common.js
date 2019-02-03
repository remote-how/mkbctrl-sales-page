const toggleMenu = (event) => {
  const burger = event.target
  const navbarMobile = document.getElementById('menuToggle')

  navbarMobile.classList.contains('open') ? navbarMobile.classList.remove('open') : navbarMobile.classList.add('open')
  burger.classList.contains('close') ? burger.classList.remove('close') : burger.classList.add('close')
}

const toggleModal = (event) => {
  event.preventDefault()
  const modalId = event.target.dataset.modal
  const modal = document.getElementById(modalId)
  modal.classList.contains('hide') ? modal.classList.remove('hide') : modal.classList.add('hide')
}

document.addEventListener('DOMContentLoaded', () => {
  const burgerToggle = document.getElementById('burgerToggle')
  const modalTogglers = Array.from(document.getElementsByClassName('modal-toggler'))

  burgerToggle.addEventListener('click', toggleMenu, false)
  modalTogglers.map((toggler) => {
    toggler.addEventListener('click', toggleModal, false)
  })
});

