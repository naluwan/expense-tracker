const functions = {
  // 擷取年月日
  getDate: function getDate(time) {
    const dateString = new Date(time);
    const year = dateString.getFullYear();
    const month = ("0" + (dateString.getMonth() + 1)).slice(-2);
    const date = ("0" + dateString.getDate()).slice(-2);
    return `${year}-${month}-${date}`;
  }
}

module.exports = functions