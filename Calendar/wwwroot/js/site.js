﻿const date = new Date();
const eventsKey = 'calendarEvents';

console.log('script loaded');
// Load events from local storage
const loadEvents = () => {
    const storedEvents = localStorage.getItem(eventsKey);
    return storedEvents ? JSON.parse(storedEvents) : {};
};

// Save events to local storage
const saveEvents = () => {
    localStorage.setItem(eventsKey, JSON.stringify(events));
};

const events = loadEvents();

const renderCalendar = () => {
    date.setDate(1); // Set to the first day of the month

    const monthDays = document.querySelector(".days");
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    // Get the day of the week for the first day of the month
    const firstDayIndex = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    document.querySelector('.date h1').innerHTML = months[date.getMonth()];
    document.querySelector(".date p").innerHTML = new Date().toDateString();

    let days = "";

    // Render previous month's days
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    const ul = document.createElement('ul');
    // Render current month's days
    for (let i = 1; i <= lastDay; i++) {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
        const formattedDate = currentDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const todayClass = (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) ? 'today' : 'otherdays';

        const li = document.createElement('li');

        if (events[formattedDate]) {
                const deleteButton = document.createElement('button');

                deleteButton.classList.add('delete-event');
                deleteButton['data-date'] = formattedDate;
                deleteButton['data-index'] = i;

                deleteButton.addEventListener('click', () => {
                    console.log('this delete event triggered when clicked');
                    if (events[eventDate]) {
                        delete events[eventDate];
                        saveEvents(events);
                        eventList.innerHTML = '<p>No events for this date.</p>';
                    }
                });

                li.append(deleteButton);
        }
        ul.append(li);

        let eventsMarkup = '';

        days += `<a href="${`/Event/ViewEvent?eventDate=${formattedDate}`}"><div class="${todayClass}" data-date="${formattedDate}">${i}${eventsMarkup}</div></a>`;
    }

    // Render next month's days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
    }

    monthDays.innerHTML = days;
}


document.querySelector('.prev').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
});

document.querySelector('.next').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
});

renderCalendar();

document.querySelector('.days').addEventListener('click', (event) => {
    if (event.target.classList.contains('today') || event.target.classList.contains('prev-date') || event.target.classList.contains('next-date')) {
        const eventDate = event.target.getAttribute('data-date');
        if (date) {
            window.location.href = `/event.html?date=${eventDate}`;
        }
    }
});



// Handle event deletion
document.querySelector('.days').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-event')) {
        const dateToDelete = event.target.getAttribute('data-date');
        const indexToDelete = event.target.getAttribute('data-index');

        if (events[dateToDelete] && events[dateToDelete][indexToDelete]) {
            events[dateToDelete].splice(indexToDelete, 1); // Remove event from array

            // Remove the event key if no events left for the date
            if (events[dateToDelete].length === 0) {
                delete events[dateToDelete];
            }

            saveEvents(); // Save to local storage
            renderCalendar();
        }
    }
});
