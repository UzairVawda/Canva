async function getUserData() {
    const userNames = document.getElementsByClassName("userData")
    for (user of userNames) {
        const userProfileImageElement = user.children[0]
        const userNameElement = user.children[1]
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
    const response = await fetch('/userProfileImage', {
        method: 'GET'
    });
    const res = await response.json()
    document.getElementById("userProfileImg").src = `${res.userProfileImg}`;
}

window.onload = getUserData;