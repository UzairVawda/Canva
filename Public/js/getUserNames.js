async function getUserNames() {
    const userNames = document.getElementsByClassName("userData")
    for (user of userNames) {
        userProfileImageElement = user.children[0]
        userNameElement = user.children[1]
        const userId = userNameElement.dataset.userid
        const response = await fetch(`/getUserName/${userId}`, {
            method: 'POST'
        });

        const res = await response.json()
        const userName = res.userName
        const userProfileImage = res.userProfileImage

        userProfileImageElement.src = userProfileImage
        userNameElement.innerHTML = (userName)
    }
}

window.onload = getUserNames;