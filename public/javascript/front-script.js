const records = document.querySelectorAll('#record-item')
const createBtn = document.querySelector('#create-btn')
const defaultDate = document.querySelector('#inputDate')
const totalAmount = document.querySelector('#totalAmount')
const showAmount = document.querySelector('#showAmount')
formatAmount(totalAmount)
formatAmount(showAmount)

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

// defaultDate btn event
createBtn.addEventListener('click', event => {
  const target = event.target
  if (target.matches('#create-btn')) {
    const today = new Date()
    defaultDate.value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2)
  }
})

//  show , on thousand
function formatAmount(element) {
  const re = new RegExp("(\\d{1,3})(?=(\\d{3})+(?:$|\\D))", "g");
  element.innerText = element.innerText.replace(re, '$1,')
}