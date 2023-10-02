const showLoadingSpinner = () => {
    const loadingSpinner = document.getElementById('load');
    loadingSpinner.classList.remove('hidden');
  };
  
  const hideLoadingSpinner = () => {
    const loadingSpinner = document.getElementById('load');
    loadingSpinner.classList.add('hidden');
  };


const loadCategory = async () => {
    showLoadingSpinner();
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await response.json();
    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="loadCategoryItems('${category.category_id}')" class="tab text-black bg-[#25252552] hover:bg-[#FF1F3D] hover:text-white font-semibold">${category.category}</a> 
        `;
        tabContainer.appendChild(div);
    });
    hideLoadingSpinner();
    // console.log(data.data)
}

const loadCategoryItems = async (category_id) => {
    showLoadingSpinner();

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await response.json();
    
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    if (data.data && data.data.length > 0) {
        data.data?.forEach((videos) => {

            const postedDate = new Date(parseInt(videos.others.posted_date) * 1000);
            const now = new Date();
            const timeDifference = postedDate;

            const days = Math.floor(timeDifference / (1000 * 3600 * 24)); 
            const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600)); 
            const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));

            let timeElapsed = '';
            if (days > 0) {
                timeElapsed += `${days} ${days === 1 ? 'day' : 'days'}`;
            }
            if (hours > 0) {
                if (timeElapsed) {
                    timeElapsed += ', ';
                }
                timeElapsed += `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
            }
            if (minutes > 0) {
                if (timeElapsed) {
                    timeElapsed += ', ';
                }
                timeElapsed += `${minutes} ${minutes === 1 ? 'minute' : 'minutes ago'}`;
            }
            
            // console.log(videos)
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="card glass mt-6">
                    <figure class='relative'>
                    <img class='w-80 h-52 rounded-lg ' src="${videos?.thumbnail}" alt="Image"/>
                    <div class="posted-date bg-[#09090989] rounded-md text-sm text-white px-2 absolute right-14 md:right-10 bottom-5">${timeElapsed}</div>
                    </figure>
                        <div class="card-body flex flex-row">
                            <div>
                            <img class='rounded-full w-10 h-10' src=${videos.authors[0]?.profile_picture} alt="Image!"/>
                            </div>
                          <div class="flex flex-1 flex-col">
                            <h2 class="card-title">${videos.title}</h2>
                            <div class="flex">
                                <p class='flex items-center'><span>${videos.authors[0].profile_name}</span><span>${videos.authors[0].verified ? '<img src="86-PHero-tube/fi_10629607.svg" alt="Verified Icon" class="verified-icon" />' : ''}<span></p>
                            </div>
                            <p class="views">${videos.others.views} views</p>
                          </div>
                        </div>
                      </div>
            `;
            
            cardContainer.appendChild(div)
        });
         } else {
        cardContainer.innerHTML = `
        <div class="grid row-span-4 place-items-center justify-items-center text-center col-span-4 my-10 gap-4">
        <img src="86-PHero-tube/Icon.png" alt="">
        <h3 class="text-4xl font-bold">Oops!! Sorry, There is no<br> content here</h3>
    </div>
        `;
    }
    hideLoadingSpinner();
};

const blogButton = document.getElementById('blog-btn');
blogButton.addEventListener('click', function () {
    window.location.href = 'blog.html';
});


let isSortingDescending = false;


const sortVideosByViews = () => {
    const cardContainer = document.getElementById('card-container');
    const videos = Array.from(cardContainer.children);

    videos.sort((a, b) => {
        const viewsA = parseInt(a.querySelector('.views').textContent);
        const viewsB = parseInt(b.querySelector('.views').textContent);

        if (isSortingDescending) {
            return viewsB - viewsA; 
        } else {
            return viewsA - viewsB; 
        }
    });

    
    cardContainer.innerHTML = '';
    videos.forEach((video) => {
        cardContainer.appendChild(video);
    });

    isSortingDescending = !isSortingDescending;
};

const sortButton = document.getElementById('filter-button');
sortButton.addEventListener('click', sortVideosByViews);
const sortButton2 = document.getElementById('filter-button2');
sortButton2.addEventListener('click', sortVideosByViews);




loadCategory();
loadCategoryItems('1000')
