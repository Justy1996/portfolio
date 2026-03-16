// Mobile Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        hamburger.innerHTML = '<i class="fa-solid fa-times"></i>';
    } else {
        hamburger.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.innerHTML = '<i class="fa-solid fa-bars-staggered"></i>';
    });
});

// Sticky Header
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Stop observing once animated in
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
});

// Dynamic Modal Generation
const modalContainer = document.getElementById('modal-container');
const overlay = document.getElementById('overlay');

// experiencesData is defined in index.html script tag
if (typeof experiencesData !== 'undefined') {
    Object.keys(experiencesData).forEach(modalId => {
        const data = experiencesData[modalId];
        
        let skillsHtml = '';
        data.skills.forEach(skill => {
            skillsHtml += `<li>${skill}</li>`;
        });

        const modalHtml = `
            <div class="modal" id="${modalId}">
                <button class="close-modal" onclick="closeModal('${modalId}')"><i class="fa-solid fa-times"></i></button>
                <div class="modal-header text-center mb-6">
                    <div class="inline-flex w-16 h-16 rounded-full bg-white/5 items-center justify-center mb-4 border border-white/10" style="background-color: #4a2f1b;">
                        <i class="${data.icon} text-3xl" style="color: #ff9800;"></i>
                    </div>
                    <h2 class="text-2xl font-bold text-white mb-2 font-outfit">${data.title}</h2>
                    <p class="text-sm font-semibold text-blue-400">${data.meta}</p>
                </div>
                <div class="modal-body">
                    <p class="text-gray-300 mb-6 leading-relaxed">${data.desc}</p>
                    <div class="glass p-5 rounded-xl">
                        <h4 class="text-white font-semibold mb-3">Core Skills & Curriculum:</h4>
                        <ul class="skills-list">
                            ${skillsHtml}
                        </ul>
                    </div>
                </div>
                <div class="mt-6 text-center">
                    <a href="#contact" class="btn btn-glow w-full justify-center" onclick="closeModal('${modalId}')">Book a Workshop <i class="fa-solid fa-arrow-right ml-2 text-sm"></i></a>
                </div>
            </div>
        `;
        modalContainer.insertAdjacentHTML('beforeend', modalHtml);
    });
}

// Modal Logic
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

overlay.addEventListener('click', () => {
    document.querySelectorAll('.modal.active').forEach(modal => {
        modal.classList.remove('active');
    });
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Parallax effect on ambient background blobs based on mouse movement
document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.blob');
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});
