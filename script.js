// DOM Elements
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const typingText = document.getElementById('typing-text');

// Text untuk efek mengetik
const texts = [
    "Freelancer & Web Developer",
    "UI/UX Designer",
    "Frontend Specialist"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Fungsi untuk efek mengetik
function typeEffect() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        // Menghapus teks
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        // Mengetik teks
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    // Jika teks selesai diketik
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 1000; // Jeda sebelum mulai menghapus
    } 
    // Jika teks selesai dihapus
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500; // Jeda sebelum mulai mengetik teks berikutnya
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Fungsi untuk toggle sidebar di mobile
hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    hamburger.innerHTML = sidebar.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fungsi untuk navigasi antar section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Hapus kelas active dari semua link
        navLinks.forEach(item => item.classList.remove('active'));
        
        // Tambah kelas active ke link yang diklik
        link.classList.add('active');
        
        // Sembunyikan semua section
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Tampilkan section yang sesuai
        const targetSection = link.getAttribute('data-section');
        document.getElementById(targetSection).classList.add('active');
        
        // Tutup sidebar di mobile setelah memilih menu
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Fungsi untuk animasi progress bar saat section skills terlihat
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Observer untuk memicu animasi saat section skills masuk viewport
const skillsSection = document.getElementById('skills');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
        }
    });
}, observerOptions);

if (skillsSection) {
    observer.observe(skillsSection);
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Pesan Anda telah berhasil dikirim! Saya akan membalasnya secepatnya.');
        contactForm.reset();
    });
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    // Mulai efek mengetik
    setTimeout(typeEffect, 1000);
    
    // Animasi saat scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.profile-card');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});