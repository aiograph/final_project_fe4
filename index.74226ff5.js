!async function(){try{const o=await fetch("https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=hzLfzBEVen487QLPC16szIEaGn3444TS");if(console.log("status:",o.status),console.log("response:",o),!o.ok)throw new Error(`HTTP error: ${o.status}`);const s=await o.json();console.log(s)}catch(o){console.error(`ERROR: ${o}`)}}();
//# sourceMappingURL=index.74226ff5.js.map
