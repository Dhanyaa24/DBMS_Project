
// API Base URL


// API Base URL - Change this to match your backend server
const API_BASE_URL = 'http://localhost:5000/api';

// DOM Elements
const carsGrid = document.getElementById('cars-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const bookingModal = document.getElementById('booking-modal');
const modalClose = document.querySelector('.close');
const bookingForm = document.getElementById('booking-form');
const reviewForm = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');
const stars = document.querySelectorAll('.star');
let selectedRating = 0;

// Global variables
let currentCarId = null;
let carsData = [ {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2023,
    type: "sedan",
    pricePerDay: 3500,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD1Wk9VE-rR_aiDbDdEc6yvx6Kg_qjk07roVSLnvRQOfRXPM9AsIPkZw7GjrAKARzivwM&usqp=CAU",
    features: [],
    status: "available",
    seating: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "12 kmpl"
  },
  {
    id: 2,
    make: "Honda",
    model: "CR-V",
    year: 2023,
    type: "suv",
    pricePerDay: 4500,
    imageUrl: "https://images8.alphacoders.com/549/549210.jpg",
    features: [],
    status: "available",
    seating: 5,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    mileage: "14 kmpl"
  },
  {
    id: 3,
    make: "Mercedes",
    model: "S-Class",
    year: 2023,
    type: "luxury",
    pricePerDay: 12000,
    imageUrl: "https://www.hdcarwallpapers.com/walls/mercedes_benz_s_klasse_lang_amg_line_2020_4k-HD.jpg",
    features: [],
    status: "available",
    seating: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "9 kmpl"
  },
  {
    id: 4,
    make: "BMW",
    model: "M4",
    year: 2023,
    type: "sports",
    pricePerDay: 15000,
    imageUrl: "https://i.ytimg.com/vi/x9fB-2OOHFo/maxresdefault.jpg",
    features: [],
    status: "rented",
    seating: 4,
    luggage: 2,
    transmission: "Manual",
    fuel: "Petrol",
    mileage: "8 kmpl"
  },
  {
    id: 5,
    make: "Tata",
    model: "Nexon EV",
    year: 2023,
    type: "electric",
    pricePerDay: 5000,
    imageUrl: "https://s7ap1.scene7.com/is/image/tatapassenger/City-33?$B-1228-696-S$&fit=crop&fmt=webp",
    features: [],
    status: "available",
    seating: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Electric",
    mileage: "300 km/charge"
  },
  {
    id: 6,
    make: "Hyundai",
    model: "Creta",
    year: 2023,
    type: "suv",
    pricePerDay: 4000,
    imageUrl: "https://w0.peakpx.com/wallpaper/775/571/HD-wallpaper-hyundai-creta-road-2021-cars-crossovers-mx-spec-su2-2021-hyundai-creta-korean-cars-hyundai.jpg",
    features: [],
    status: "available",
    seating: 5,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    mileage: "16 kmpl"
  },
  {
    id: 7,
    make: "Maruti Suzuki",
    model: "Swift",
    year: 2023,
    type: "hatchback",
    pricePerDay: 2000,
    imageUrl: "https://images5.alphacoders.com/136/1365537.jpeg",
    features: [],
    status: "available",
    seating: 5,
    luggage: 2,
    transmission: "Manual",
    fuel: "Petrol",
    mileage: "22 kmpl"
  },
  {
    id: 8,
    make: "Kia",
    model: "Seltos",
    year: 2023,
    type: "suv",
    pricePerDay: 4200,
    imageUrl: "https://www.hdcarwallpapers.com/walls/kia_seltos_2023_4k-HD.jpg",
    features: [],
    status: "rented",
    seating: 5,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    mileage: "18 kmpl"
  },
  {
    id: 9,
    make: "Mahindra",
    model: "Thar",
    year: 2023,
    type: "suv",
    pricePerDay: 5500,
    imageUrl: "https://assets.onecompiler.app/43fngyxa8/43fngz4vv/photo-1633867179970-c54688bcfa33.jpg",
    features: [],
    status: "available",
    seating: 4,
    luggage: 2,
    transmission: "Manual",
    fuel: "Petrol",
    mileage: "15 kmpl"
  },
  {
    id: 10,
    make: "Toyota",
    model: "Fortuner",
    year: 2023,
    type: "suv",
    pricePerDay: 7000,
    imageUrl: "https://wallpapercave.com/wp/wp5345258.jpg",
    features: [],
    status: "available",
    seating: 7,
    luggage: 5,
    transmission: "Automatic",
    fuel: "Diesel",
    mileage: "12 kmpl"
  },
  {
    id: 11,
    make: "Hyundai",
    model: "Verna",
    year: 2023,
    type: "sedan",
    pricePerDay: 3800,
    imageUrl: "https://cdn.wallpapersafari.com/88/26/Wyt3su.jpg",
    features: [],
    status: "available",
    seating: 5,
    luggage: 3,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "17 kmpl"
  },
  {
    id: 12,
    make: "Renault",
    model: "Kwid",
    year: 2023,
    type: "hatchback",
    pricePerDay: 1800,
    imageUrl: "https://w0.peakpx.com/wallpaper/94/401/HD-wallpaper-renault-kwid-ultra-crossovers-2021-cars-za-spec-2021-renault-kwid-french-cars-renault.jpg",
    features: [],
    status: "available",
    seating: 5,
    luggage: 2,
    transmission: "Manual",
    fuel: "Petrol",
    mileage: "22 kmpl"
  },
  {
    id: 13,
    make: "Tata",
    model: "Safari",
    year: 2023,
    type: "suv",
    pricePerDay: 5200,
    imageUrl: "https://wallpapercave.com/wp/wp4537772.jpg",
    features: [],
    status: "available",
    seating: 7,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Diesel",
    mileage: "14 kmpl"
  },
  {
    id: 14,
    make: "MG",
    model: "Hector",
    year: 2023,
    type: "suv",
    pricePerDay: 4800,
    imageUrl: "https://assets.gqindia.com/photos/5cdc04a7306c1c61f76e2b86/16:9/w_2560%2Cc_limit/top-image103.jpg",
    features: [],
    status: "available",
    seating: 5,
    luggage: 4,
    transmission: "Automatic",
    fuel: "Petrol",
    mileage: "15 kmpl"
  },
  {
    id: 15,
    make: "Maruti",
    model: "Baleno",
    year: 2023,
    type: "hatchback",
    pricePerDay: 2100,
    imageUrl: "https://wallpapercat.com/w/full/f/8/f/1745577-2880x1800-desktop-hd-suzuki-baleno-background-image.jpg",
    features: [],
    status: "available",
    seating: 5,
    luggage: 2,
    transmission: "Manual",
    fuel: "Petrol",
    mileage: "21 kmpl"
  }];

document.addEventListener('DOMContentLoaded', () => {
    fetchCars();
    setupEventListeners();
});

// Fetch all cars from backend
async function fetchCars() {
    try {
        const response = await fetch(`${API_BASE_URL}/cars`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch cars');
        }
        
        carsData = data;
        displayCars(carsData);
    } catch (error) {
        console.error('Error fetching cars:', error);
        carsGrid.innerHTML = `<p class="error">Failed to load cars: ${error.message}</p>`;
    }
}

// Display cars in the grid
function displayCars(cars) {
    if (!cars || cars.length === 0) {
        carsGrid.innerHTML = '<p>No cars available at the moment.</p>';
        return;
    }

    carsGrid.innerHTML = cars.map(car => `
        <div class="car-card ${car.status !== 'available' ? 'unavailable' : ''}">
            <div class="car-img" style="background-image: url('${car.imageUrl || 'https://via.placeholder.com/300'}')">
                <span class="car-type">${car.type}</span>
                <span class="car-status ${car.status}">${car.status}</span>
            </div>
            <div class="car-info">
                <h3>${car.make} ${car.model} (${car.year})</h3>
                <div class="car-features">
                    <span><i class="fas fa-gas-pump"></i> ${car.fuel || 'Petrol'}</span>
                    <span><i class="fas fa-cogs"></i> ${car.transmission || 'Automatic'}</span>
                    <span><i class="fas fa-users"></i> ${car.seating || 5} Seats</span>
                </div>
                <div class="price-container">
                    <div class="price">$${car.price_per_day}<span>/day</span></div>
                    <button class="btn rent-btn" data-id="${car.id}" ${car.status !== 'available' ? 'disabled' : ''}>
                        ${car.status === 'available' ? 'Rent Now' : 'Unavailable'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter cars by type
function filterCars(type) {
    if (type === 'all') {
        displayCars(carsData);
        return;
    }
    const filteredCars = carsData.filter(car => car.type === type);
    displayCars(filteredCars);
}

// Open booking modal with car details
async function openBookingModal(carId) {
    try {
        currentCarId = carId;
        document.getElementById('modal-car-id').value = carId;
        
        const response = await fetch(`${API_BASE_URL}/cars/${carId}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch car details');
        }
        
        const car = await response.json();
        
        document.getElementById('selected-car-info').innerHTML = `
            <div class="selected-car-img" style="background-image: url('${car.image_url}')"></div>
            <div class="selected-car-details">
                <h3>${car.make} ${car.model}</h3>
                <p>$${car.price_per_day}/day</p>
            </div>
        `;
        
        bookingModal.style.display = 'block';
        
        // Setup date change listeners
        const pickupDateInput = document.getElementById('modal-pickup-date');
        const returnDateInput = document.getElementById('modal-return-date');
        
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        pickupDateInput.min = today;
        returnDateInput.min = today;
        
        pickupDateInput.addEventListener('change', function() {
            // Return date should be at least the pickup date
            returnDateInput.min = this.value;
            calculateTotalPrice();
        });
        
        returnDateInput.addEventListener('change', calculateTotalPrice);
        
    } catch (error) {
        console.error('Error fetching car details:', error);
        alert(`Failed to load car details: ${error.message}`);
    }
}

// Calculate total price
function calculateTotalPrice() {
    const pickupDate = new Date(document.getElementById('modal-pickup-date').value);
    const returnDate = new Date(document.getElementById('modal-return-date').value);
    
    // Only calculate if both dates are valid
    if (isNaN(pickupDate.getTime()) || isNaN(returnDate.getTime())) {
        document.getElementById('total-price').textContent = '$0.00';
        return;
    }
    
    const priceText = document.querySelector('.selected-car-details p').textContent;
    const pricePerDay = parseFloat(priceText.replace('$', '').replace('/day', ''));
    
    if (returnDate > pickupDate) {
        const days = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
        const totalPrice = days * pricePerDay;
        document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
    } else if (returnDate.getTime() === pickupDate.getTime()) {
        // Same day rental = 1 day
        document.getElementById('total-price').textContent = `$${pricePerDay.toFixed(2)}`;
    } else {
        document.getElementById('total-price').textContent = '$0.00';
    }
}

// Submit booking form
async function submitBookingForm(e) {
    e.preventDefault();
    
    const formData = {
        carId: parseInt(document.getElementById('modal-car-id').value),
        customerName: document.getElementById('customer-name').value,
        customerEmail: document.getElementById('customer-email').value,
        customerPhone: document.getElementById('customer-phone').value,
        customerAddress: document.getElementById('customer-address').value,
        licenseNumber: document.getElementById('customer-license').value,
        pickupDate: document.getElementById('modal-pickup-date').value,
        returnDate: document.getElementById('modal-return-date').value,
        additionalInfo: document.getElementById('additional-info').value,
        totalPrice: parseFloat(document.getElementById('total-price').textContent.replace('$', ''))
    };
    
    // Basic validation
    if (!formData.pickupDate || !formData.returnDate || formData.totalPrice <= 0) {
        alert('Please select valid pickup and return dates.');
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Booking failed');
        }
        
        alert('Booking successful! Your booking ID is: ' + data.bookingId);
        bookingModal.style.display = 'none';
        bookingForm.reset();
        fetchCars(); // Refresh car list to show updated availability
    } catch (error) {
        console.error('Error submitting booking:', error);
        alert(`Booking failed: ${error.message}`);
    }
}

// Star rating functionality
function setupStarRating() {
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            selectedRating = parseInt(e.target.getAttribute('data-value'));
            updateStarRating(selectedRating);
        });
        
        star.addEventListener('mouseover', (e) => {
            const rating = parseInt(e.target.getAttribute('data-value'));
            highlightStars(rating);
        });
        
        star.addEventListener('mouseout', () => {
            highlightStars(selectedRating);
        });
    });
}

function highlightStars(rating) {
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value'));
        if (starValue <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

function updateStarRating(rating) {
    selectedRating = rating;
    highlightStars(rating);
}

// Submit review form
async function submitReviewForm(e) {
    e.preventDefault();
    
    if (selectedRating === 0) {
        alert('Please select a rating');
        return;
    }
    
    // Get the selected car ID (default to the first car if none selected)
    const carId = currentCarId || (carsData.length > 0 ? carsData[0].id : null);
    
    if (!carId) {
        alert('No car selected. Please select a car to review.');
        return;
    }
    
    const formData = {
        carId: carId,
        reviewerName: document.getElementById('reviewerName').value,
        reviewText: document.getElementById('reviewText').value,
        rating: selectedRating
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Review submission failed');
        }
        
        alert('Review submitted successfully!');
        reviewForm.reset();
        selectedRating = 0;
        updateStarRating(0);
        fetchReviews(carId);
    } catch (error) {
        console.error('Error submitting review:', error);
        alert(`Review submission failed: ${error.message}`);
    }
}

// Fetch reviews for a car
async function fetchReviews(carId) {
    try {
        const response = await fetch(`${API_BASE_URL}/reviews/${carId}`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch reviews');
        }
        
        const reviews = await response.json();
        displayReviews(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        reviewList.innerHTML = `<p class="error">Failed to load reviews: ${error.message}</p>`;
    }
}

// Display reviews
function displayReviews(reviews) {
    if (!reviews || reviews.length === 0) {
        reviewList.innerHTML = '<p>No reviews yet. Be the first to review!</p>';
        return;
    }
    
    reviewList.innerHTML = reviews.map(review => `
        <div class="review">
            <h3>${review.reviewer_name}</h3>
            <div class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p>${review.review_text}</p>
            <small>${new Date(review.created_at).toLocaleDateString()}</small>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterCars(button.getAttribute('data-filter'));
        });
    });
    
    // Modal close button
    modalClose.addEventListener('click', () => {
        bookingModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
    });
    
    // Booking form submission
    bookingForm.addEventListener('submit', submitBookingForm);
    
    // Star rating
    setupStarRating();
    
    // Review form submission
    reviewForm.addEventListener('submit', submitReviewForm);
    
    // Rent Now buttons (delegated event)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('rent-btn')) {
            const carId = e.target.getAttribute('data-id');
            openBookingModal(carId);
        }
    });
}
