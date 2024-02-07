window.addEventListener("DOMContentLoaded", () => {
    const qs = (selector) => document.querySelector(selector);
    const qsa = (selector) => document.querySelectorAll(selector);
    const geid = (id) => document.getElementById(id);

    const pageTitle = qs("title");
    const bookTitle = qs(".book_title");
    const bookCoverDestop = qs(".book_cover_image_desktop");
    const bookCoverMobile = qs(".book_cover_image_mobile");
    const bookDescription = qs(".book_description");
    const expandButton = qs(".expand_book_description");
    const bookInfoTitle = qsa(".book_info_title");
    const socialMediaAuthor = qs(".social_media_author");
    const authorLinkTwitter = qs(".author_link_twitter");
    const authorLinkFacebook = qs(".author_link_facebook");
    const authorLinkInstagram = qs(".author_link_instagram");
    const userName = geid("user_name");
    const userComment = geid("user_comment");
    const addCommentBtn = geid("add_comment_btn");
    const comments = qs(".comments_wrapper");

    const commentsStorage = [];
    let _userName = "";
    let _userComment = "";

    // Book data
    const bookData = {
        title: "Green mile",
        author: "Stephen King",
        coverPath: "./img/book_cover.jpg",
        plot: `"The Green Mile" is a gripping novel written by Stephen King, set in the 1930s at Cold Mountain Penitentiary, Louisiana, unfolding through the eyes of Paul Edgecombe, the supervisor of the prison's E Block, home to death row inmates awaiting execution, where a towering, soft-spoken African-American man named John Coffey is convicted of the brutal murder of two young girls, changing the lives of those on the Mile irrevocably, revealing Coffey's extraordinary powers challenging Paul's understanding of life and death, as Paul and his fellow guards come to know Coffey's gentle and miraculous spirit capable of healing the sick and reviving the dying, despite his imposing physical presence, leading Paul to question the nature of justice and the true essence of humanity, while tensions escalate within the prison and outside forces conspire against Coffey, Paul grapples with his own morality and the weight of his duty to uphold the law, interwoven with subplots involving other inmates like the sadistic "Wild Bill" Wharton, adding further layers of complexity to the story, as Paul and his colleagues navigate the moral dilemmas presented by their roles, confronting themes of redemption, forgiveness, and the corrupting influence of power, ultimately, "The Green Mile" is a poignant exploration of the human condition, where acts of cruelty and kindness coexist in a world fraught with injustice and suffering, yet illuminated by moments of grace and transcendence.`,
        authorSocialMedias: {
            twitterLink: "https://twitter.com/StephenKing",
            facebookLink: "https://www.facebook.com/stephenkingwriter/",
            instagramLink: "https://www.instagram.com/stephenkingofficialpage/",
        },
        description: {
            ganre: "fantasy",
            year: "1996",
            pages: "536",
        },
    };

    const expandButtonClickHandler = () => {
        const { plot } = bookData;

        expandButton.classList.toggle("expanded");
        expandButton.classList.toggle("collapsed");

        bookDescription.innerText = expandButton.classList.contains("expanded") ? plot : plot.slice(0, 500) + "...";
        expandButton.innerText = expandButton.classList.contains("expanded") ? "Read less" : "Read more";
    };

    const renderContent = () => {
        const { title, author, coverPath, plot, authorSocialMedias, description } = bookData;
        const { twitterLink, facebookLink, instagramLink } = authorSocialMedias;

        pageTitle.innerText = `${author} - ${title}`;
        bookTitle.innerText = title;
        bookDescription.innerText = plot.slice(0, 500) + "...";
        socialMediaAuthor.innerText = `${author}'s social medias:`;

        bookCoverDestop.setAttribute("src", coverPath);
        bookCoverMobile.setAttribute("src", coverPath);
        authorLinkTwitter.setAttribute("href", twitterLink);
        authorLinkFacebook.setAttribute("href", facebookLink);
        authorLinkInstagram.setAttribute("href", instagramLink);

        Object.entries(description).forEach(([title, value], index) => {
            bookInfoTitle[index].innerText = `${title.charAt(0).toUpperCase() + title.slice(1)}: ${value}`;
        });
    };

    const typeCommentHandler = (e) => {
        const { target } = e;
        target.getAttribute("id") === "user_name" ? (_userName = target.value) : (_userComment = target.value);
        submitCommentButtonStatusChecker(_userName, _userComment);

        isEmptyInputsChecker(userName, _userName.trim().length, "grey");
        isEmptyInputsChecker(userComment, _userComment.trim().length, "grey");
    };

    const submitCommentButtonStatusChecker = (name, comment) => {
        if (name.trim().length && comment.trim().length) {
            addCommentBtn.setAttribute("rel", "modal:close");
        } else {
            addCommentBtn.removeAttribute("rel");
        }
    };

    const isEmptyInputsChecker = (element, isEmpty, color) => {
        if (!isEmpty) {
            element.style.borderColor = color ?? "red";
        } else {
            element.style.borderColor = color ?? "grey";
        }
    };

    const submitCommentHandler = (e, name, comment) => {
        let content = "";
        if (name.trim().length && comment.trim().length) {
            commentsStorage.push({ name, comment });
            comments.style.display = "flex";
        } else {
            isEmptyInputsChecker(userName, name.trim().length, "red");
            isEmptyInputsChecker(userComment, comment.trim().length, "red");
        }
        commentsStorage.forEach(({ name, comment }, index) => {
            content += `
            <div class="comment">
                <h4 class="comment_header">Comment ${index + 1}</h4>
                <span>User: ${name}</span>
                <span>Comment: ${comment}</span>
            </div>`;
        });

        comments.innerHTML = content;
    };

    const clearForm = () => {
        _userName = "";
        _userComment = "";
        userName.value = "";
        userComment.value = "";
        userName.style.borderColor = "grey";
        userComment.style.borderColor = "grey";
    };

    expandButton.addEventListener("click", expandButtonClickHandler);
    userName.addEventListener("input", typeCommentHandler);
    userComment.addEventListener("input", typeCommentHandler);
    addCommentBtn.addEventListener("click", (e) => submitCommentHandler(e, _userName, _userComment));
    $(document).on("modal:close", clearForm);
    $(document).on("modal:open", clearForm);

    renderContent();
    submitCommentButtonStatusChecker(_userName, _userComment);
});
