// Global variable definitions

const menuList = document.querySelector('nav ul');
const menuToggle = document.querySelector('.toggle');

// Test whether viewport width is less than 650px,
// i.e. we are in the mobile view

function checkViewport() {
  let mql = window.matchMedia('(max-width: 650px)');
  return mql.matches;
}

if(checkViewport()) {
  menuList.style.height = '0px';
}

window.addEventListener('resize', function() {
  if(checkViewport()) {
    menuList.style.height = '0px';
  } else {
    menuList.style.height = 'auto';
  }
})

menuToggle.addEventListener('click', function() {
  if(menuList.style.height === '0px') {
    menuList.style.height = 'auto';
  } else {
    menuList.style.height = '0px';
  }
})
