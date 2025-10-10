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
    
    // Event cards - redirect to individual event galleries
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const eventId = this.getAttribute('data-event');
            const galleryPageId = `${eventId}-gallery`;
            
            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            
            // Show the specific event gallery page
            document.getElementById(galleryPageId).classList.add('active');
            
            // Update navigation button states
            navButtons.forEach(btn => btn.classList.remove('active'));
        });
    });
    
    // Back to events function
    window.goBackToEvents = function() {
        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Show events page
        document.getElementById('events').classList.add('active');
        
        // Update navigation button states
        navButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.nav-btn[data-page="events"]').classList.add('active');
    };
    
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
    
    // Image Modal Functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    // Add click event to all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item, .event-gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.querySelector('img').src;
        });
    });
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Image Upload Functionality
    const galleries = ['mainGallery', 'engagement', 'sanchak', 'haldi', 'shadi', 'walima'];
    
    // Initialize upload functionality for each gallery
    galleries.forEach(gallery => {
        const uploadArea = document.getElementById(`${gallery}UploadArea`);
        const fileInput = document.getElementById(`${gallery}Upload`);
        const previewContainer = document.getElementById(`${gallery}Preview`);
        const uploadBtn = document.getElementById(`${gallery}UploadBtn`);
        const statusDiv = document.getElementById(`${gallery}Status`);
        
        // Store selected files for each gallery
        let selectedFiles = [];
        
        // Click on upload area triggers file input
        if (uploadArea) {
            uploadArea.addEventListener('click', function() {
                fileInput.click();
            });
            
            // Drag and drop functionality
            uploadArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                uploadArea.style.borderColor = 'var(--gold)';
                uploadArea.style.background = '#f0f8f0';
            });
            
            uploadArea.addEventListener('dragleave', function() {
                uploadArea.style.borderColor = 'var(--light-gold)';
                uploadArea.style.background = 'var(--light-green)';
            });
            
            uploadArea.addEventListener('drop', function(e) {
                e.preventDefault();
                uploadArea.style.borderColor = 'var(--light-gold)';
                uploadArea.style.background = 'var(--light-green)';
                
                if (e.dataTransfer.files.length) {
                    handleFiles(e.dataTransfer.files, gallery);
                }
            });
        }
        
        // File input change
        if (fileInput) {
            fileInput.addEventListener('change', function() {
                if (this.files.length) {
                    handleFiles(this.files, gallery);
                }
            });
        }
        
        // Handle selected files
        function handleFiles(files, galleryType) {
            selectedFiles = Array.from(files);
            
            // Clear previous preview
            if (previewContainer) {
                previewContainer.innerHTML = '';
            }
            
            // Create preview for each file
            selectedFiles.forEach((file, index) => {
                if (!file.type.match('image.*')) {
                    showStatus('Please select only image files.', 'error', galleryType);
                    return;
                }
                
                if (file.size > 5 * 1024 * 1024) {
                    showStatus('File size should be less than 5MB.', 'error', galleryType);
                    return;
                }
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    if (previewContainer) {
                        const previewItem = document.createElement('div');
                        previewItem.className = 'preview-item';
                        
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        
                        const removeBtn = document.createElement('button');
                        removeBtn.className = 'preview-remove';
                        removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                        removeBtn.onclick = function() {
                            previewItem.remove();
                            selectedFiles.splice(index, 1);
                        };
                        
                        previewItem.appendChild(img);
                        previewItem.appendChild(removeBtn);
                        previewContainer.appendChild(previewItem);
                    }
                };
                
                reader.readAsDataURL(file);
            });
            
            // Enable upload button if files are selected
            if (uploadBtn && selectedFiles.length > 0) {
                uploadBtn.disabled = false;
                showStatus(`Ready to upload ${selectedFiles.length} image(s)`, 'success', galleryType);
            } else if (uploadBtn) {
                uploadBtn.disabled = true;
                showStatus('', '', galleryType);
            }
        }
    });
    
    // Upload images function
    window.uploadImages = function(galleryType) {
        const uploadBtn = document.getElementById(`${galleryType}UploadBtn`);
        const statusDiv = document.getElementById(`${galleryType}Status`);
        const gallery = document.getElementById(`${galleryType}Gallery`);
        
        // Get files for this gallery
        const fileInput = document.getElementById(`${galleryType}Upload`);
        const files = Array.from(fileInput.files);
        
        if (files.length === 0) {
            showStatus('Please select images to upload.', 'error', galleryType);
            return;
        }
        
        // Disable upload button during upload
        if (uploadBtn) {
            uploadBtn.disabled = true;
            uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
        }
        
        // Simulate upload process (in a real app, you would send to a server)
        showStatus('Uploading images...', 'success', galleryType);
        
        setTimeout(() => {
            // Add uploaded images to gallery
            files.forEach(file => {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    let galleryItem, img;
                    
                    if (galleryType === 'mainGallery') {
                        // For main gallery
                        galleryItem = document.createElement('div');
                        galleryItem.className = 'gallery-item';
                        
                        img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = 'Gallery Photo';
                        
                        galleryItem.appendChild(img);
                        gallery.appendChild(galleryItem);
                    } else {
                        // For event galleries
                        galleryItem = document.createElement('div');
                        galleryItem.className = 'event-gallery-item';
                        
                        img = document.createElement('img');
                        img.src = e.target.result;
                        img.alt = `${galleryType} Photo`;
                        
                        galleryItem.appendChild(img);
                        gallery.appendChild(galleryItem);
                    }
                    
                    // Add click event to new gallery item
                    galleryItem.addEventListener('click', function() {
                        modal.style.display = 'block';
                        modalImg.src = this.querySelector('img').src;
                    });
                };
                
                reader.readAsDataURL(file);
            });
            
            // Reset upload area
            const previewContainer = document.getElementById(`${galleryType}Preview`);
            if (previewContainer) {
                previewContainer.innerHTML = '';
            }
            fileInput.value = '';
            
            // Re-enable upload button
            if (uploadBtn) {
                uploadBtn.disabled = false;
                uploadBtn.innerHTML = '<i class="fas fa-upload"></i> Upload Images';
            }
            
            // Show success message
            showStatus(`Successfully uploaded ${files.length} image(s)!`, 'success', galleryType);
        }, 2000); // Simulate 2 second upload delay
    };
    
    
    // Show status message
    function showStatus(message, type, galleryType) {
        const statusDiv = document.getElementById(`${galleryType}Status`);
        if (statusDiv) {
            statusDiv.textContent = message;
            statusDiv.className = 'upload-status';
            
            if (type) {
                statusDiv.classList.add(type);
            }
        }
    }
});
