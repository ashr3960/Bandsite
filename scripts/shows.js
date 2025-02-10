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
            showItem.classList.add("shows__mobile");
            tableContainer.appendChild(showItem);
            
            // Date
            let dateWrapper  = document.createElement("div");
            let labelDate = document.createElement("label");
            labelDate.classList.add("shows__mobile--label", "shows__mobile--hidden");
            labelDate.innerText = "DATE";
            let dateContent = document.createElement("p");
            dateContent.classList.add("shows__mobile--medium");
            dateContent.innerText = new Date(Number(show.date)).toDateString();
            dateWrapper .appendChild(labelDate);
            dateWrapper .appendChild(dateContent);
            showItem.appendChild(dateWrapper );
  
            // Venue
            let venueWrapper = document.createElement("div");
            let labelVenue = document.createElement("label");
            labelVenue.classList.add("shows__mobile--label", "shows__mobile--hidden");
            labelVenue.innerText = "VENUE";
            let venueContent = document.createElement("p");
            venueContent.classList.add("shows__mobile--medium");
            venueContent.innerText = show.venue;
            venueWrapper.appendChild(labelVenue);
            venueWrapper.appendChild(venueContent);
            showItem.appendChild(venueWrapper);
  
            // Location
            let locationWrapper = document.createElement("div");
            let labelLocation = document.createElement("label");
            labelLocation.classList.add("shows__mobile--label", "shows__mobile--hidden");
            labelLocation.innerText = "LOCATION";
            let locationContent = document.createElement("p");
            locationContent.classList.add("shows__mobile--medium");
            locationContent.innerText = show.location;
            locationWrapper.appendChild(labelLocation);
            locationWrapper.appendChild(locationContent);
            showItem.appendChild(locationWrapper);
  
            // Button
            let button = document.createElement("button");
            button.classList.add("shows__mobile--button");
            button.innerText = "BUY TICKETS";
            showItem.appendChild(button);
        });
    }
});
