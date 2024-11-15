const imgs = document.querySelectorAll('.header-slider ul img');
  const prev_btn = document.querySelector('.prev');
  const next_btn = document.querySelector('.next');
  let n = 0;

  function slideChanger() {
      imgs.forEach((img) => img.style.display = 'none');
      imgs[n].style.display = 'block';
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      if (n < imgs.length - 1) {
        n++;
      } else {
        n = 0;
      }
      slideChanger();
    }, 4000); // Change slides every 3 seconds
  }
  startAutoSlide();
  slideChanger();

  prev_btn.addEventListener('click', (e) => {
      e.preventDefault();  // Prevents default anchor behavior
      if (n > 0) {
          n--;
      } else {
          n = imgs.length - 1;
      }
      slideChanger();
  });

  next_btn.addEventListener('click', (e) => {
      e.preventDefault();  // Prevents default anchor behavior
      if (n < imgs.length - 1) {
          n++;
      } else {
          n = 0;
      }
      slideChanger();
  });