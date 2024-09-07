const getDate = () => {
    const dayString = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const monthString = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const today = new Date();
    const day = today.getDay();
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const todayDate = dayString[day]+", "+ date + " " + monthString[month] + " " + year;
    return todayDate;
}

const getTime = () => {
    const today = new Date();
    const getHours = today.getHours();
    const getMin = today.getMinutes();
    const getSec = today.getSeconds();
    const currTime = getHours+":"+getMin+":"+getSec;
    return currTime;
}

export default {
    getDate,
    getTime
}