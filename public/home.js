document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.scroll-image');
    let currentImageIndex = 0;

    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        const imageIndex = Math.floor(scrollPercentage / (100 / images.length));

        if (imageIndex !== currentImageIndex) {
        images[currentImageIndex].classList.remove('active');
        images[imageIndex].classList.add('active');
        currentImageIndex = imageIndex;
        }
    });

    // הצג את התמונה הראשונה בטעינה
    images[0].classList.add('active');
});