async function fetchUserProfileImage() {
    const response = await fetch('/userProfileImage', {
        method: 'GET'
    });
    const res = await response.json()
    document.getElementById("userProfileImg").src = `${res.userProfileImg}`;
}

window.onload = fetchUserProfileImage;