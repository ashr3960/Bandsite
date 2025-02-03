document.addEventListener("DOMContentLoaded", function () {
    let comments = [
        {
            name: "Victor Pinto",
            timestamp: new Date("11/02/2023"),
            comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
        },
        {
            name: "Christina Cabrera",
            timestamp: new Date("10/28/2023"),
            comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
        },
        {
            name: "Isaac Tadesse",
            timestamp: new Date("10/20/2023"),
            comment: "I can t stop listening. Every time I hear one of their songs the vocals it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can t get enough."
        }
    ];

    function renderComments() {
        const commentList = document.querySelector(".post__item");
        commentList.innerHTML = '';

        comments.forEach(comment => {
            const listItem = document.createElement("li");
            listItem.classList.add("post__list-item");

            const postHeader = document.createElement("div");
            postHeader.classList.add("post__header");

            const headName = document.createElement("h3");
            headName.innerText = comment.name;

            const headDate = document.createElement("p");
            headDate.classList.add("post__header--date");
            headDate.innerText = comment.timestamp.toLocaleDateString('en-US');

            const commentText = document.createElement("p");
            commentText.classList.add("post__comment");
            commentText.innerText = comment.comment;

            listItem.appendChild(postHeader);
            postHeader.appendChild(headName);
            postHeader.appendChild(headDate);
            listItem.appendChild(commentText);

            commentList.appendChild(listItem);
        });
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        const nameInput = document.querySelector(".comment__text__name");
        const commentInput = document.querySelector(".comment__text__comment");

        const newComment = {
            name: nameInput.value,
            timestamp: new Date(),
            comment: commentInput.value
        };

        comments.push(newComment);

        nameInput.value = "";
        commentInput.value = "";

        renderComments();
    }

    const form = document.querySelector(".comment__text");
    form.addEventListener("submit", handleFormSubmit);

    renderComments();
});



//did the connection locally not sure if this was the correct way but it shows up when clicking submit
//was planning on creating an API but it was too time consuming so ended up making the js connection local