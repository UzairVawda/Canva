const allLikeBtn = document.querySelectorAll(".like-btn")
const likeCountField = document.getElementById("likeCount")


async function likePost(event) {
    const blogid = event.target.parentElement.dataset.blogid
    console.log(blogid)
    const response = await fetch(`/like/${blogid}`, {
        method: 'POST'
    });
    const res = await response.json()
    console.log(res)
    element = document.getElementById("like");
    if (res.action === 'liked') {
        element.classList.add('liked');
        console.log('hi')
    }
    if (res.action === 'unliked') {
        element.classList.remove('liked');
        console.log('hi')
    }
    likeCountField.innerHTML = res.likeCount

}
console.log(allLikeBtn)
for (const likeBtn of allLikeBtn) {
    likeBtn.addEventListener('click', likePost)
}