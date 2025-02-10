import BandSiteApi from "./band-site-api.js";

document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "579cdec9-1d8a-4e2b-95ed-de97038a36a5"; 
    const api = new BandSiteApi(apiKey);
    const commentList = document.querySelector(".post__item");

    async function getComments() {
        try {
            const comments = await api.getComments();
            commentList.innerHTML = "";

            comments.forEach(item => {
                let listItems = document.createElement("li");
                listItems.classList.add("post__list-item", "post__list-item--top");
                listItems.setAttribute("data-id", item.id);

                let postHeader = document.createElement("div");
                postHeader.classList.add("post__header");

                let headName = document.createElement("h3");
                headName.innerText = item.name;

                let headDate = document.createElement("p");
                headDate.classList.add("post__header--date");
                headDate.innerText = new Date(item.timestamp).toDateString();

                let text = document.createElement("p");
                text.classList.add("post__comment");
                text.innerText = item.comment;

                let profile = document.createElement("img");
                profile.classList.add("post__profile");

                let deleteButton = document.createElement("button");
                deleteButton.classList.add("delete-button");

                let deleteIcon = document.createElement("i");
                deleteIcon.classList.add("fa-solid", "fa-trash");
                deleteButton.appendChild(deleteIcon);

                deleteButton.addEventListener("click", async function () {
                    await api.deleteComment(item.id);
                    getComments(); 
                });

                listItems.appendChild(postHeader);
                postHeader.appendChild(headName);
                postHeader.appendChild(headDate);
                listItems.appendChild(text);
                listItems.appendChild(profile);
                listItems.appendChild(deleteButton);
                commentList.appendChild(listItems);
            });
        } catch (err) {
            alert("There was an issue fetching comments.");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let nameText = e.target.nametext.value.trim();
        let commentText = e.target.commenttext.value.trim();

        if (!nameText || !commentText) {
            alert("Both name and comment are required.");
            return;
        }

        try {
            await api.postComment({ name: nameText, comment: commentText });
            alert("Comment posted successfully!");
            getComments();
        } catch (err) {
            alert("There was an error posting your comment.");
        }

        e.target.reset(); 
    }

    document.querySelector(".comment__text").addEventListener("submit", handleSubmit);
    
    getComments(); 
});
