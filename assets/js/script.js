'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}



/**
 * header active on scroll
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});

document.getElementById('search-form').addEventListener('submit', getCarList);

function getCarList(e){
    e.preventDefault();
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://api.example.com/cars?location=${searchInputTxt}`) // Replace with actual API endpoint
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.cars){
            data.cars.forEach(car => {
                html += `
                    <div class="car-item" data-id="${car.id}">
                        <div class="car-img">
                            <img src="${car.image}" alt="car">
                        </div>
                        <div class="car-name">
                            <h3>${car.name}</h3>
                            <a href="#" class="details-btn">View Details</a>
                        </div>
                    </div>
                `;
            });
            document.getElementById('car-list').classList.remove('notFound');
        } else {
            html = "Sorry, we didn't find any cars!";
            document.getElementById('car-list').classList.add('notFound');
        }
        document.getElementById('car-list').innerHTML = html;
    });
}

document.getElementById('car-list').addEventListener('click', getCarDetails);

function getCarDetails(e){
    e.preventDefault();
    if(e.target.classList.contains('details-btn')){
        let carItem = e.target.parentElement.parentElement;
        fetch(`https://api.example.com/car?id=${carItem.dataset.id}`) // Replace with actual API endpoint
        .then(response => response.json())
        .then(data => carDetailsModal(data.car));
    }
}

function carDetailsModal(car){
    let html = `
        <h2 class="car-title">${car.name}</h2>
        <p class="car-category">${car.category}</p>
        <div class="car-instruct">
            <h3>Details:</h3>
            <p>${car.details}</p>
        </div>
        <div class="car-img">
            <img src="${car.image}" alt="car">
        </div>
        <div class="car-link">
            <a href="${car.link}" target="_blank">More Info</a>
        </div>
    `;
    document.getElementById('car-details-content').innerHTML = html;
    document.querySelector('.car-details-modal').classList.add('showRecipe');
}

// Close modal when clicking outside of it
document.querySelector('.car-details-modal').addEventListener('click', function(e) {
    if(e.target === this) {
        this.classList.remove('showRecipe');
    }
});
\