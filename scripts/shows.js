document.addEventListener("DOMContentLoaded", function () {
    const shows = [
      { date: "Mon Sept 09 2024", venue: "Ronald Lane", location: "San Francisco, CA" },
      { date: "Tue Sept 17 2024", venue: "Pier 3 East", location: "San Francisco, CA" },
      { date: "Sat Oct 12 2024", venue: "View Lounge", location: "San Francisco, CA" },
      { date: "Sat Nov 16 2024", venue: "Hyatt Agency", location: "San Francisco, CA" },
      { date: "Fri Nov 29 2024", venue: "Moscow Center", location: "San Francisco, CA" },
      { date: "Wed Dec 18 2024", venue: "Pres Club", location: "San Francisco, CA" }
    ];
  
    function renderShows(arr) {
        const tableContainer = document.querySelector(".shows__container"); 
        const title = document.querySelector(".shows__title");
        title.innerText = "Shows";
    
        arr.forEach(show => {
        
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
  
    renderShows(shows); 
});
