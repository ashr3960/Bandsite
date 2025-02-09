document.addEventListener("DOMContentLoaded", function () {
    const url = "https://unit-2-project-api-25c1595833b2.herokuapp.com/";
    const apiKey = "579cdec9-1d8a-4e2b-95ed-de97038a36a5"; 
    const commentList = document.querySelector(".post__item");

    // Function to get comments
    function getComments() {
        axios
            .get(`${url}comments?api_key=${apiKey}`)
            .then(response => {
                console.log(response.data);
                if (response.data && Array.isArray(response.data)) {
                    let commentArray = response.data.sort((a, b) => b.timestamp - a.timestamp);

                    commentList.innerHTML = ""; 

                    commentArray.forEach(item => {
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

                        deleteButton.addEventListener("click", function () {
                            deleteComment(item.id);
                        });

                        commentList.appendChild(listItems);
                        listItems.appendChild(postHeader);
                        postHeader.appendChild(headName);
                        postHeader.appendChild(headDate);
                        listItems.appendChild(text);
                        listItems.appendChild(profile);
                        listItems.appendChild(deleteButton);
                    });
                } else {
                    console.warn("No comments available.");
                }
            })
            .catch(err => {
                console.error("Error fetching comments:", err);
                alert("Sorry, there was an issue fetching comments.");
            });
    }

    // Function to delete a comment
    function deleteComment(commentId) {
        axios
            .delete(`${url}comments/${commentId}?api_key=${apiKey}`)
            .then(response => {
                if (response.status === 200) {
                    alert("Comment deleted successfully!");
                    getComments(); 
                }
            })
            .catch(err => {
                console.error("Error deleting comment:", err);
                alert("Failed to delete the comment.");
            });
    }

    getComments();

    let formCta = document.querySelector(".comment__text");

    formCta.addEventListener("submit", (e) => {
        e.preventDefault();

        let nameText = e.target.nametext.value;
        let commentText = e.target.commenttext.value;

        if (nameText.trim() === "" || commentText.trim() === "") {
            alert("Both name and comment are required.");
            return;
        }

        let newComment = { name: nameText, comment: commentText };

        axios
            .post(`${url}comments?api_key=${apiKey}`, newComment, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (response.status === 201) {
                    alert("Comment posted successfully!");
                    getComments(); 
                    // setTimeout(() => {
                    //     location.reload();
                    // }, 1000);
                }
            })
            .catch(err => {
                console.error("Error posting comment:", err);
                alert("There was an error posting your comment.");
            });

        document.querySelector(".comment__text__name").value = "";
        document.querySelector(".comment__text__comment").value = "";
    });
});
