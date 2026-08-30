//render cards
export async function renderEvents(data) {
    document.querySelector('.events_container').innerHTML = '';

    data._embedded.events.forEach(event => {
        // test
        // console.log(event.name);

        // const author = data._embedded.attractions[0].name;

        const card = `
        <div class="events_container_card" data-id="${event.id}">
            <img class="events_container_card--img" src="${event.images[0].url}"></img>
            <h4 class="events_container_card--name">${event.name}</h4>
            <p class="events_container_card--date">${event.dates.start.localDate}</p>
            <p class="events_container_card--place">
                <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 0C1.57011 0 0 1.55933 0 3.47595C0 5.88495 3.50344 10 3.50344 10C3.50344 10 7 5.76648 7 3.47595C7 1.55933 5.42995 0 3.5 0ZM4.55602 4.49371C4.26484 4.78284 3.88245 4.92743 3.5 4.92743C3.11761 4.92743 2.7351 4.78284 2.44404 4.49371C1.86173 3.91547 1.86173 2.97455 2.44404 2.39624C2.72601 2.11609 3.10108 1.96179 3.5 1.96179C3.89892 1.96179 4.27393 2.11615 4.55602 2.39624C5.13833 2.97455 5.13833 3.91547 4.55602 4.49371Z" fill="white"/>
                </svg>
                ${event._embedded.venues[0].city.name}
            <p>
            <div class="events_container_card_rec"></div>
        </div>
        `

        document.querySelector('.events_container').insertAdjacentHTML('beforeend', card);        
    });
};

//pagination
const pagination = document.querySelector('.pagination');

export function renderPagination(currentPage, totalPages, loadPage){
    pagination.innerHTML = '';

    const pages = [];

    if(totalPages <= 5){
        for(let i = 0; i < totalPages; i++){
            pages.push(i);
        };
    } else{

        pages.push(0);

        if (currentPage <= 2) {

            pages.push(1);
            pages.push(2);
            pages.push(3);

            pages.push('...');

        } else if(currentPage >= totalPages - 3){
            pages.push('...');

            pages.push(totalPages - 4);
            pages.push(totalPages - 3);
            pages.push(totalPages - 2);
            pages.push(totalPages - 1);
        } else{
            pages.push('...');

            pages.push(currentPage - 1);
            pages.push(currentPage);
            pages.push(currentPage + 1);

            pages.push('...');
        };

        if (!pages.includes(totalPages - 1)) {
            pages.push(totalPages - 1);
        };
    };

    pages.forEach(page => {

        if (page === '...') {
            const dots = document.createElement('span');

            dots.textContent = '...';

            pagination.append(dots);

            return;
        }

        const button = document.createElement('button');

        button.textContent = page + 1;

        button.classList.add('pagination--btn');

        if (page === currentPage) {
            button.classList.add('active');
        }

        button.addEventListener('click', e => {
            e.preventDefault();

            loadPage(page);
        });

        pagination.append(button);
    });
}

export function clearPagination(){
    pagination.innerHTML = '';
};

//open modal
export function openModal(event){
    const modal = document.querySelector('.modal');

    const modalImg = document.querySelector('.modal--img');
    if (modalImg) modalImg.src = event.images[0].url;

    const modalBanner = document.querySelector('.modal_container--banner');
    if (modalBanner) modalBanner.src = event.images[0].url;

    if(event.info){
        document.querySelector('.minfo').textContent = event.info;
    } else{
        document.querySelector('.minfo').textContent = 'info not provided';
    };
    

    document.querySelector('.mtime').innerHTML =
    `${event.dates.start.localDate}<br>${event.dates.start.localTime} ${event.dates.timezone}`;

    document.querySelector('.mplace').textContent = `${event._embedded.venues[0].city.name}, ${event._embedded.venues[0].country.name}`;

    document.querySelector('.martist').textContent = `${event._embedded.attractions[0].name}`;

    document.querySelector('.mprice').textContent = 'Standart 300-500 UAH';

    document.querySelector('.mvipprice').textContent = 'VIP 1000-1500 UAH';

    document.querySelector('.modal_s--morebtn').dataset.id = event._embedded.attractions[0].id;

    modal.classList.remove('is-hidden');

    const closeBtn = document.querySelector('.modal--closebtn');
    closeBtn.addEventListener('click', () => {
        modal.classList.add('is-hidden');
    });

    const minfo = document.querySelector('.minfo');

    const height = minfo.getBoundingClientRect().height;

    if(height < 160){
        minfo.style.overflow = 'hidden';
    }else{
        minfo.style.overflow = 'auto';
    }
};