function showSnackbar(message, isError) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.className = "show";
    if (isError) {
        snackbar.classList.add('error');
    }
    else {
        snackbar.classList.add('success');
    }
    setTimeout(() => { snackbar.className = ""; }, 3000);
}