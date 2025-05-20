// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navUl) {
        mobileMenuBtn.addEventListener('click', function() {
            navUl.classList.toggle('show');
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonials.length > 0 && dots.length > 0) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach(testimonial => testimonial.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
            currentTestimonial = index;
        }
        
        dots.forEach(dot => {
            dot.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                showTestimonial(slideIndex);
            });
        });
        
        // Auto slide testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navUl) navUl.classList.remove('show');
            }
        });
    });
    
    // Form Validation (only on contact page)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.style.display = 'none';
                msg.textContent = '';
            });
            
            let isValid = true;
            
            // Validate name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Name is required');
                isValid = false;
            }
            
            // Validate email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate phone (if provided)
            const phoneInput = document.getElementById('phone');
            if (phoneInput.value.trim() !== '') {
                const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
                if (!phoneRegex.test(phoneInput.value)) {
                    showError(phoneInput, 'Please enter a valid phone number');
                    isValid = false;
                }
            }
            
            // Validate subject
            const subjectInput = document.getElementById('subject');
            if (subjectInput.value === '') {
                showError(subjectInput, 'Please select a subject');
                isValid = false;
            }
            
            // Validate message
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid - in a real application, you would send the data to a server here
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
        
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            const errorMessage = formGroup.querySelector('.error-message');
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            input.style.borderColor = '#f44336'; // Error color
        }
    }
});