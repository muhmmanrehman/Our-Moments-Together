// 🔒 Password Overlay Logic
const overlay = document.getElementById('passwordOverlay');
const passwordInput = document.getElementById('passwordInput');
const errorMsg = document.getElementById('errorMsg');

// Change this to your desired password
const correctPassword = "Shadi@123";

function checkPassword() {
  if(passwordInput.value === correctPassword){
    overlay.style.display = 'none';
    // Add unlocked class to body to show all content
    document.body.classList.add('unlocked');
    document.getElementById('nasheed').play();
  } else {
    errorMsg.textContent = "Incorrect password! Please try again.";
    passwordInput.value = '';
    passwordInput.focus();
  }
}

// Allow pressing Enter to submit password
passwordInput.addEventListener('keypress', function(e) {
  if(e.key === 'Enter') {
    checkPassword();
  }
});

// Focus on password input when page loads
window.addEventListener('load', function() {
  passwordInput.focus();
});

// Navigation
document.addEventListener('DOMContentLoaded', function() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const navCards = document.querySelectorAll('.nav-card');
  const pages = document.querySelectorAll('.page');
  const menuToggle = document.querySelector('.menu-toggle');
  const navButtonsContainer = document.querySelector('.nav-buttons');
  
  // Navigation button click handler
  function handleNavClick(button) {
    // Remove active class from all buttons and pages
    navButtons.forEach(btn => btn.classList.remove('active'));
    pages.forEach(page => page.classList.remove('active'));
    
    // Add active class to clicked button and corresponding page
    button.classList.add('active');
    const pageId = button.getAttribute('data-page');
    document.getElementById(pageId).classList.add('active');
    
    // Close mobile menu if open
    if (window.innerWidth <= 768) {
      navButtonsContainer.classList.remove('active');
    }
  }
  
  // Navigation buttons
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      handleNavClick(this);
    });
  });
  
  // Navigation cards
  navCards.forEach(card => {
    card.addEventListener('click', function() {
      const pageId = this.getAttribute('data-page');
      const correspondingButton = document.querySelector(`.nav-btn[data-page="${pageId}"]`);
      handleNavClick(correspondingButton);
    });
  });
  
  // Mobile menu toggle
  menuToggle.addEventListener('click', function() {
    navButtonsContainer.classList.toggle('active');
  });
  
  // Timer functionality
  function updateCountdown() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Set target date to 17th of current month
    let targetDate = new Date(currentYear, currentMonth, 17);
    
    // If today is after the 17th, set target to 17th of next month
    if (now.getDate() > 17) {
      targetDate = new Date(currentYear, currentMonth + 1, 17);
    }
    
    const distance = targetDate - now;
    
    // If the target date has passed, set to next month
    if (distance < 0) {
      targetDate = new Date(currentYear, currentMonth + 1, 17);
    }
    
    const finalDistance = targetDate - now;
    
    // Calculate days, hours, minutes, seconds
    const days = Math.floor(finalDistance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((finalDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((finalDistance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((finalDistance % (1000 * 60)) / 1000);
    
    // Update display
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Update message based on time remaining
    const timerMessage = document.getElementById('timerMessage');
    if (days === 0 && hours < 24) {
      timerMessage.textContent = "Our wedding celebrations begin today!";
      timerMessage.style.animation = "pulse 1s infinite";
    } else if (days === 1) {
      timerMessage.textContent = "Our wedding celebrations begin tomorrow!";
    } else {
      const monthNames = ["January", "February", "March", "April", "May", "June",
                         "July", "August", "September", "October", "November", "December"];
      timerMessage.textContent = `Our wedding celebrations begin on 17th ${monthNames[targetDate.getMonth()]}`;
    }
  }
  
  // Update countdown every second
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial call
  
  // Audio controls
  const audioToggle = document.getElementById('audioToggle');
  const nasheed = document.getElementById('nasheed');
  let isPlaying = false;
  
  audioToggle.addEventListener('click', function() {
    if(isPlaying) {
      nasheed.pause();
      audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      nasheed.play().catch(e => {
        console.log("Audio play failed:", e);
        // If autoplay is blocked, we'll just change the icon and not play
        audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        isPlaying = true;
        return;
      });
      audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
    isPlaying = !isPlaying;
  });
  
  // Family Tree Zoom Controls
  const tree = document.getElementById('familyTree');
  const zoomInBtn = document.getElementById('zoomIn');
  const zoomOutBtn = document.getElementById('zoomOut');
  const resetBtn = document.getElementById('resetView');
  
  let scale = 1;
  
  if (zoomInBtn && zoomOutBtn && resetBtn) {
    zoomInBtn.addEventListener('click', function() {
      if (scale < 1.5) {
        scale += 0.1;
        tree.style.transform = `scale(${scale})`;
      }
    });
    
    zoomOutBtn.addEventListener('click', function() {
      if (scale > 0.7) {
        scale -= 0.1;
        tree.style.transform = `scale(${scale})`;
      }
    });
    
    resetBtn.addEventListener('click', function() {
      scale = 1;
      tree.style.transform = `scale(${scale})`;
    });
  }
});