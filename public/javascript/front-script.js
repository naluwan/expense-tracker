const records = document.querySelectorAll('#record-item')
const defaultDate = document.querySelector('#inputDate')
const dataPanel = document.querySelector('#data-panel')
const confirmCreate = document.querySelector('#confirm-create')
const errorMessages = document.querySelectorAll('#errorMessage')
const modalAmount = document.querySelector('#modal-amount')
const amount = document.querySelector('#amount')
const modalContents = document.querySelectorAll('.modal-content')

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

  // delete btn
  if (target.matches('#delete-btn')) {
    const deleteName = document.querySelector('#delete-name')
    const deleteAmount = document.querySelector('#delete-amount')
    const deleteForm = document.querySelector('#delete-form')

    deleteName.innerText = '「' + target.dataset.name + '」'
    deleteAmount.innerText = '$' + target.dataset.amount
    deleteForm.action = `/records/${target.dataset.id}?_method=DELETE`
    // 要在呼叫一次modal內才會有效果
    formatAmount()
  }
})

modalContents.forEach(modalContent => {
  modalContent.addEventListener('click', event => {
    const target = event.target

    if (target.matches('#confirm-create')) {
      checkAmount(amount)
    }

    if (target.matches('#confirm-save')) {
      checkAmount(modalAmount)
    }
  })
})





//  function
//  show , on thousand
function formatAmount() {
  const totalAmount = document.querySelector('#totalAmount')
  const showAmounts = document.querySelectorAll('#showAmount')
  const deleteAmount = document.querySelector('#delete-amount')
  const re = new RegExp("(\\d{1,3})(?=(\\d{3})+(?:$|\\D))", "g");

  totalAmount.innerText = totalAmount.innerText.replace(re, '$1,')
  deleteAmount.innerText = deleteAmount.innerText.replace(re, '$1,')
  showAmounts.forEach(showAmount => {
    showAmount.innerText = showAmount.innerText.replace(re, '$1,')
  })
}

// check amount
function checkAmount(amount) {
  if (amount.value <= 0) {
    errorMessages.forEach(errorMessage => {
      errorMessage.innerText = '支出金額有誤，請重新輸入!'

      amount.addEventListener('focus', event => {
        if (event.target) {
          amount.value = ''
          errorMessage.innerText = ''
        }
      })
    })
  }
}