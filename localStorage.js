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

window.onload = loadPosts; // Memuat data postingan saat halaman dimuat
