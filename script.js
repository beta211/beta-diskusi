let posts = [];

function addPost() {
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    if (title === "" || content === "") {
        alert("Judul dan konten postingan tidak boleh kosong!");
        return;
    }

    const newPost = {
        title: title,
        content: content,
        comments: [] // Menambahkan array komentar kosong untuk postingan baru
    };

    posts.push(newPost);
    displayPosts();
    savePosts(); // Menyimpan postingan ke localStorage
    clearForm();
}


function displayPosts() {
    const postList = document.getElementById("postList");
    postList.innerHTML = ""; // Kosongkan daftar postingan yang ada

    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        // HTML untuk postingan
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="toggleComments(${index})">anomali lain</button>
            <div id="comments-${index}" style="display: none;">
                <h4>ni tmpt diskusi y</h4>
                <div id="comment-list-${index}">
                    ${post.comments.map(comment => `<p>${comment}</p>`).join('')}
                </div>
                <textarea id="comment-input-${index}" placeholder="bales wir"></textarea>
                <button onclick="addComment(${index})">jebret</button>
            </div>
        `;
        
        postList.appendChild(postElement);
    });
}

function addComment(postIndex) {
    const commentInput = document.getElementById(`comment-input-${postIndex}`);
    const comment = commentInput.value.trim();

    if (comment === "") {
        alert("Komentar tidak boleh kosong!");
        return;
    }

    // Menambahkan komentar ke array postingan
    posts[postIndex].comments.push(comment);
    displayPosts(); // Tampilkan ulang daftar postingan dengan komentar baru
    savePosts(); // Simpan postingan dan komentar
    commentInput.value = ""; // Bersihkan input komentar
}

function toggleComments(postIndex) {
    const commentSection = document.getElementById(`comments-${postIndex}`);
    commentSection.style.display = commentSection.style.display === "none" ? "block" : "none";
}

function clearForm() {
    document.getElementById("postTitle").value = "";
    document.getElementById("postContent").value = "";
}

function savePosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPosts() {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
        posts = JSON.parse(savedPosts);
        displayPosts();
    }
}

window.onload = loadPosts; //