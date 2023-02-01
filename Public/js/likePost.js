const allLikeBtn = document.querySelectorAll(".like-btn")

async function likePost(event) {
    const blogid = event.target.parentElement.dataset.blogid
    const response = await fetch(`/like/${blogid}`, {
        method: 'POST'
    });

    const res = await response.json()
    const element = event.target.parentElement ;
    if (res.action === 'liked') {
        element.classList.add('liked');
    }
    if (res.action === 'unliked') {
        element.classList.remove('liked');
    }
    event.target.parentElement.nextElementSibling.innerHTML = res.likeCount

}
for (const likeBtn of allLikeBtn) {
    likeBtn.addEventListener('click', likePost)
}