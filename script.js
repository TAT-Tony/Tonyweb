// Visitor Counter
function updateVisitorCount() {
    // Get current date
    const today = new Date().toDateString();
    
    // Get stored counts
    let todayVisitors = parseInt(localStorage.getItem('todayVisitors') || '0');
    let totalVisitors = parseInt(localStorage.getItem('totalVisitors') || '0');
    let lastVisitDate = localStorage.getItem('lastVisitDate');
    
    // Reset today's count if it's a new day
    if (lastVisitDate !== today) {
        todayVisitors = 0;
        localStorage.setItem('lastVisitDate', today);
    }
    
    // Increment counters
    todayVisitors++;
    totalVisitors++;
    
    // Update localStorage
    localStorage.setItem('todayVisitors', todayVisitors);
    localStorage.setItem('totalVisitors', totalVisitors);
    
    // Update display
    document.getElementById('todayVisitors').textContent = todayVisitors;
    document.getElementById('totalVisitors').textContent = totalVisitors;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active section highlighting
function updateActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateVisitorCount();
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection(); // Initial check
});

// Calculate duration for present positions
function calculateDuration(startDate, isPresent = false) {
    const start = new Date(startDate);
    const end = isPresent ? new Date() : new Date();
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    let duration = '';
    
    if (years > 0) {
        duration += `${years} year${years > 1 ? 's' : ''} `;
    }
    if (months > 0) {
        duration += `${months} month${months > 1 ? 's' : ''}`;
    }
    
    return duration.trim();
}

// Update period text for present positions
document.addEventListener('DOMContentLoaded', function() {
    const periods = document.querySelectorAll('.period');
    periods.forEach(period => {
        if (period.textContent.includes('Present')) {
            const startDate = period.textContent.split(' - ')[0];
            const duration = calculateDuration(startDate, true);
            period.textContent = `${startDate} - Present (${duration})`;
        }
    });
});

// Photo carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize each photo container independently
    document.querySelectorAll('.photo-container').forEach(container => {
        const photoWrappers = container.querySelectorAll('.photo-wrapper');
        const prevBtn = container.querySelector('.photo-nav.prev');
        const nextBtn = container.querySelector('.photo-nav.next');
        let currentPhotoIndex = 0;

        // Preload images for this container
        const images = container.querySelectorAll('.experience-photo');
        images.forEach(img => {
            const newImg = new Image();
            newImg.src = img.src;
        });

        function showPhoto(index) {
            photoWrappers.forEach(wrapper => wrapper.classList.remove('active'));
            photoWrappers[index].classList.add('active');
        }

        function nextPhoto() {
            currentPhotoIndex = (currentPhotoIndex + 1) % photoWrappers.length;
            showPhoto(currentPhotoIndex);
        }

        function prevPhoto() {
            currentPhotoIndex = (currentPhotoIndex - 1 + photoWrappers.length) % photoWrappers.length;
            showPhoto(currentPhotoIndex);
        }

        // Show first photo immediately
        showPhoto(0);

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevPhoto);
            nextBtn.addEventListener('click', nextPhoto);
        }
    });
}); 