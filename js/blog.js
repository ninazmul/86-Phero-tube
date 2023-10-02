const showLoadingSpinner = () => {
    const loadingSpinner = document.getElementById('load');
    loadingSpinner.classList.remove('hidden');
  };
  
  const hideLoadingSpinner = () => {
    const loadingSpinner = document.getElementById('load');
    loadingSpinner.classList.add('hidden');
  };

const blogButton = document.getElementById('home-btn');
showLoadingSpinner();
blogButton.addEventListener('click', function () {
    window.location.href = 'index.html';
});
hideLoadingSpinner();

loadCategory();