const API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=hzLfzBEVen487QLPC16szIEaGn3444TS';

//get req
export async function getEvents() {
    try {
        const response = await fetch(API_URL);

        console.log('status:', response.status);
        console.log('response:', response);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        };

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error(`ERROR: ${error}`);
    };
};