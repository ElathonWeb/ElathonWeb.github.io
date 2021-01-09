const boxNumbers = document.getElementById("r-numbers");
const boxChoice = document.getElementById("r-choice");
const infoNumbers = document.getElementById("info-random-numbers");
const infoChoice = document.getElementById("info-random-choice");

boxNumbers.addEventListener("mouseenter", (e) => {
    infoNumbers.style.opacity = "100%";
    boxChoice.style.boxShadow = "none";
    infoChoice.style.display = "none";
})

boxNumbers.addEventListener("mouseleave", (e) => {
    boxChoice.style.boxShadow = "0 0vw 0.8rem darkturquoise"
    infoNumbers.style.opacity = "0";
    infoChoice.style.display = "block";
})

boxChoice.addEventListener("mouseenter", (e) => {
    infoChoice.style.opacity = "100%";
    boxNumbers.style.boxShadow = "none";
    infoNumbers.style.display = "none";
})

boxChoice.addEventListener("mouseleave", (e) => {
    boxNumbers.style.boxShadow = "0 0vw 0.8rem darkturquoise"
    infoChoice.style.opacity = "0";
    infoNumbers.style.display = "block";
})