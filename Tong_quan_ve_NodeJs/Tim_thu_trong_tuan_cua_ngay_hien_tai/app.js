let day = ["chủ nhật", "thứ hai", "thứ ba", "thứ tư", "thứ năm", "thứ sáu", "thứ bảy"]
let today = new Date();
let currentDay = today.getDay();
console.log("hôm nay là " + day[currentDay]);