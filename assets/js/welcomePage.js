document.addEventListener('DOMContentLoaded', function () {
    var welcomeDiv = document.getElementById('welcome');

    setTimeout(function () {
        welcomeDiv.style.opacity = 0;
        welcomeDiv.style.transition = '.5s ease-in-out';
        
        setTimeout(function () {
            welcomeDiv.style.display = 'none';
        }, 500);
    }, 900);
});