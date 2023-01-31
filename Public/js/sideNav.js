async function fetchUserProfileImage() {
    const response = await fetch('/userProfileImage', {
        method: 'GET'
    });
    const res = await response.json()
    document.getElementById("userProfileImage").src = `${res.userProfileImage}`;
}

window.onload = fetchUserProfileImage;