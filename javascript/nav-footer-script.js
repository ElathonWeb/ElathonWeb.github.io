const hamburger = document.querySelector(".hamburger");

//hamburger
const navSlide = () => {
    const navbar = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
       
    navbar.classList.toggle("nav-active");
        
    //Animation links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = "";
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7+1}s`;
            }
        });
        //hamburger animation
        hamburger.classList.toggle("toggle");
    
}

hamburger.addEventListener("click", () => navSlide());
