const navLinks = document.querySelector(".nav-links");
const linls = document.querySelectorAll(".nav-links li");

window.onload = function(){
  if(document.location == "index.html") {
    document.querySelector('.covid-container').addEventListener('mousemove', function(event) {eyeball(event)});
  }
}

function eyeball(e) {
  var eye = document.querySelectorAll(".eye");
  eye.forEach(function(eye) {
    let x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
    let y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
    let radian = Math.atan2(e.clientX - x, e.clientY - y);
    let rot = (radian * (180 / Math.PI) * -1) + 270;
    eye.style.transform = "rotate(" + rot + "deg)";
  })
}

// Presentation Parallax Script

const bg = document.getElementById("bg");
const moon = document.getElementById("moon");
const mountain = document.getElementById("mountain");
const road = document.getElementById("road");
const title = document.getElementById("title");

window.addEventListener('scroll', () => {
  var value = window.scrollY;

  bg.style.top = value * 0.5 + "px";
  moon.style.left = -value * 0.5 + "px";
  mountain.style.top = -value * 0.15 + "px";
  road.style.top = value * 0.15 + "px";
  title.style.top = value * 0.6 + "px";
})

