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
