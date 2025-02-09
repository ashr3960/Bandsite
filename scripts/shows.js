import BandSiteApi from  "./band-site-api.js"; 

document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "579cdec9-1d8a-4e2b-95ed-de97038a36a5";  
    const bandSiteApi = new BandSiteApi(apiKey); 

    try {
        const shows = await bandSiteApi.getShows();

        renderShows(shows);
    } catch (error) {
        console.error("Error fetching shows:", error);
    }

    function renderShows(shows) {
        const tableContainer = document.querySelector(".shows__container");
        const title = document.querySelector(".shows__title");
        title.innerText = "Shows";

        shows.forEach(show => {
            let showItem = document.createElement("li");
            showItem.classList.add("shows__list");
            tableContainer.appendChild(showItem);

            // Date
            let date = document.createElement("p");
            date.classList.add("shows__list--medium");
            date.innerText = show.date;
            showItem.appendChild(date);

            // Venue
            let venue = document.createElement("p");
            venue.classList.add("shows__list--medium");
            venue.innerText = show.venue;
            showItem.appendChild(venue);

            // Location
            let location = document.createElement("p");
            location.classList.add("shows__list--medium");
            location.innerText = show.location;
            showItem.appendChild(location);

            // Button
            let button = document.createElement("button");
            button.classList.add("shows__list--button");
            button.innerText = "BUY TICKETS";
            showItem.appendChild(button);
        });
    }
});
