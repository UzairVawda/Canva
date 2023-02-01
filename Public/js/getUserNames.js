async function getUserNames() {
    const userNames = document.getElementsByClassName("userName")
    for (user of userNames) {
        const userId = user.dataset.userid
        const response = await fetch(`/getUserName/${userId}`, {
            method: 'POST'
        });

        const res = await response.json()
        const userName = res.userName

        user.innerHTML = (`Posted by ${userName}`)
    }
}

window.onload = getUserNames;