// Navbar scroll active
document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav-link");
    let current = "";
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if(rect.top <= 180 && rect.bottom > 140) {
            current = section.id;
        }
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === current) {
            link.classList.add("active");
        }
    });
});

// Animasi smooth fade saat muncul di viewport
function handleFadeIn() {
    document.querySelectorAll(".fade").forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight - 50) {
            el.classList.add("visible");
        }
    });
}
window.addEventListener("scroll", handleFadeIn);
window.addEventListener("load", handleFadeIn);

// Smooth scroll navigation
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetEl = document.getElementById(targetId);
        if(targetEl){
            window.scrollTo({
                top: targetEl.offsetTop - 60,
                behavior: "smooth"
            });
        }
    });
});

// Navbar mobile toggle
const navToggle = document.getElementById("navToggle");
const navMenu = document.querySelector(".nav-menu");
navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// Simple contact form alert
document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Terima kasih, pesan Anda telah terkirim!");
    this.reset();
});