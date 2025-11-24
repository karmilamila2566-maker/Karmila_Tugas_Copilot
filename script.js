// DOM Elements
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const typingText = document.getElementById('typing-text');
const profileCard = document.getElementById('home-profile');

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

// Fungsi untuk mengelola tampilan profile card
function manageProfileCard() {
    const activeSection = document.querySelector('.content-section.active');
    if (activeSection && activeSection.id === 'home') {
        profileCard.classList.add('active');
    } else {
        profileCard.classList.remove('active');
    }
}

// FUNGSI BARU: Untuk mengupdate menu aktif berdasarkan scroll
function updateActiveMenu() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('active');
            
            // Kelola tampilan profile card
            if (currentSection === 'home') {
                profileCard.classList.add('active');
            } else {
                profileCard.classList.remove('active');
            }
        }
    });
}

// FUNGSI BARU: Untuk smooth scroll ke section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
}

// FUNGSI YANG DIPERBAIKI: Untuk navigasi antar section
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetSection = link.getAttribute('data-section');
        
        // Smooth scroll ke section (PERUBAHAN)
        scrollToSection(targetSection);
        
        // Update menu aktif
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
        
        // Kelola tampilan profile card
        if (targetSection === 'home') {
            profileCard.classList.add('active');
        } else {
            profileCard.classList.remove('active');
        }
        
        // Animasi skill bars
        if (targetSection === 'skills') {
            setTimeout(animateSkillBars, 300);
        }
        
        // Tutup sidebar di mobile setelah memilih menu
        if (window.innerWidth <= 992) {
            sidebar.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Fungsi untuk animasi skill bars
function animateSkillBars() {
    skillProgressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Inisialisasi YANG DIPERBAIKI
document.addEventListener('DOMContentLoaded', () => {
    // Mulai efek mengetik
    setTimeout(typeEffect, 1000);
    
    // Kelola profile card saat pertama load
    manageProfileCard();
    
    // Update menu aktif berdasarkan posisi scroll awal (BARU)
    updateActiveMenu();
    
    // Animasi skill bars jika skills section aktif
    if (document.getElementById('skills').classList.contains('active')) {
        animateSkillBars();
    }
    
    // EVENT LISTENER BARU: Untuk update menu saat scroll
    window.addEventListener('scroll', updateActiveMenu);
    
    // Animasi saat scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.profile-card.active');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${-50 + scrolled * speed}px)`;
        });
    });
});