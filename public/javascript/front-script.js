const records = document.querySelectorAll('#record-item')
let isPrint = true

records.forEach(record => {
  if (isPrint) {
    record.style.backgroundColor = "lightgray"
    isPrint = false
  } else {
    isPrint = true
  }
})