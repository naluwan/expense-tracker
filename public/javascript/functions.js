const functions = {
  // 擷取年月日
  getDate: function getDate(time) {
    const dateString = new Date(time);
    const year = dateString.getFullYear();
    const month = ("0" + (dateString.getMonth() + 1)).slice(-2);
    const date = ("0" + dateString.getDate()).slice(-2);
    return `${year}-${month}-${date}`;
  },
  testRegexp: function testRegexp(re, s) {
    return re.test(s)
  },
  checkValue: function checkValue(record) {

    for (const key in record) {
      if (!record[key]) return false
    }

    if (record.name.trim().length === 0) return false

    return true
  }
}

module.exports = functions