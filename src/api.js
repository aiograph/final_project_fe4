const API_URL = 
'https://app.ticketmaster.com/discovery/v2/events.json';

const API_KEY = 'hzLfzBEVen487QLPC16szIEaGn3444TS';


// GET ALL EVENTS
export async function getEvents(page = 0, countryCode = 'US', keyword = ''){
    try{
        const response = await fetch(
            `${API_URL}?countryCode=${countryCode}&keyword=${encodeURIComponent(keyword)}&size=20&page=${page}&apikey=${API_KEY}`
        );

        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch(error){
        console.error(`ERROR: ${error}`);
    };
};

export async function getEventsByAuthor(
    authorId,
    page = 0,
    countryCode = 'US'
){
    try{
        const response = await fetch(
            `${API_URL}?countryCode=${countryCode}&attractionId=${authorId}&size=20&page=${page}&apikey=${API_KEY}`
        );

        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        };

        const data = await response.json();

        return data;

    } catch(error){
        console.error(`ERROR: ${error}`);
    };
};