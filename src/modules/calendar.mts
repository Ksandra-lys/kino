let selectedDate = new Date()

export function getSelectedDate() {
    return selectedDate;
}

export function setSelectedDate(date: Date) {
    selectedDate = date;
}