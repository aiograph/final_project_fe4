import { getEvents, getEventsByAuthor } from "./api.js";
import { renderEvents, renderPagination, openModal, clearPagination } from "./render.js";

let currentPage = 0;
let events;
let currentAuthorId = null;
let currentCountryCode = 'US';
let currentKeyword = '';

async function loadPage(page) {
    currentPage = page;
    let data;

    if(currentAuthorId){
        data = await getEventsByAuthor(
            currentAuthorId,
            page,
            currentCountryCode
        );
    } else{
        data = await getEvents(
            page,
            currentCountryCode,
            currentKeyword
        );
    };

    if(!data){
        events = [];

        renderEvents({
            _embedded: {
                events: []
            }
        });

        clearPagination();
        return;
    }

    events = data._embedded?.events || [];

    renderEvents({
        _embedded: {
            events
        }
    });

    if(events.length === 0){
        clearPagination();
        return;
    };

    const maxPages = 50;

    const totalPages = Math.min(
        data.page.totalPages,
        maxPages
    );

    renderPagination(
        data.page.number,
        totalPages,
        loadPage
    );
};

loadPage(0);

//modal page
const eventsList = document.querySelector('.events_container');

eventsList.addEventListener('click', e => {
    const card = e.target.closest('.events_container_card');

    if(!card) return ;

    // console.log(events);

    const selectedEvent = events.find(event => event.id === card.dataset.id);

    if(!selectedEvent) return ;

    // console.log(selectedEvent.name);
    openModal(selectedEvent);
});

document.querySelector('.modal_s--morebtn').addEventListener('click', e => {
    e.preventDefault();

    const authorId = document.querySelector('.modal_s--morebtn').dataset.id;
    
    currentAuthorId = authorId;
    currentPage = 0;
    
    const modal = document.querySelector('.modal');
    modal.classList.add('is-hidden');
    
    loadPage(0);
});

const countrySelect = document.querySelector('.header_searches_chs--inp');

countrySelect.addEventListener('change', e => {
    const countryCode = e.target.value;

    currentCountryCode = countryCode;
    currentPage = 0;

    loadPage(0);
});

const searchInput = document.querySelector('.header_searches_start--inp');

let searchTimeout;

searchInput.addEventListener('input', e => {
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
        currentKeyword = e.target.value.trim();

        currentPage = 0;
        currentAuthorId = null;

        loadPage(0);
    }, 300);
});