const records = document.querySelectorAll('#record-item')
const defaultDate = document.querySelector('#inputDate')
const dataPanel = document.querySelector('#data-panel')
const saveBtn = document.querySelector('#save-btn')

formatAmount()

// li background color
let isPrint = true
records.forEach(record => {
  if (isPrint) {
    record.style.backgroundColor = "lightgray"
    isPrint = false
  } else {
    isPrint = true
  }
})

//  btn event
dataPanel.addEventListener('click', event => {
  const target = event.target
  // create btn
  if (target.matches('#create-btn')) {
    const today = new Date()
    defaultDate.value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)
  }

  // edit btn
  if (target.matches('#edit-btn')) {
    const modalName = document.querySelector('#modal-name')
    const modalCategories = document.querySelectorAll('#modal-category option')
    const modalDate = document.querySelector('#modal-date')
    const modalAmount = document.querySelector('#modal-amount')
    const editForm = document.querySelector('#edit-form')

    modalName.value = target.dataset.name
    modalDate.value = target.dataset.date
    modalAmount.value = target.dataset.amount
    modalCategories.forEach(modalCategory => {
      if (modalCategory.value === target.dataset.category) {
        return modalCategory.selected = true
      }
    })
    editForm.action = `/records/${target.dataset.id}?_method=PUT`
  }
})

//  function
//  show , on thousand
function formatAmount() {
  const totalAmount = document.querySelector('#totalAmount')
  const showAmounts = document.querySelectorAll('#showAmount')
  const re = new RegExp("(\\d{1,3})(?=(\\d{3})+(?:$|\\D))", "g");

  totalAmount.innerText = totalAmount.innerText.replace(re, '$1,')
  showAmounts.forEach(showAmount => {
    showAmount.innerText = showAmount.innerText.replace(re, '$1,')
  })
}