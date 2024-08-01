document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.scroll-image');
    const imageCount = images.length;
    const bodyPadding = 56; // הערך של padding-top של ה-body
    
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - bodyPadding;
      const scrollPercentage = scrollPosition / (documentHeight - windowHeight);
      
      const imageIndex = Math.min(Math.floor(scrollPercentage * imageCount), imageCount - 1);
      
      images.forEach((img, index) => {
        if (index === imageIndex) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    });
    
    // הצג את התמונה הראשונה בטעינה
    // images[0].classList.add('active');
  });