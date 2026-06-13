// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA Button functionality
const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-large');
ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
        showMembershipModal();
    });
});

// Contact Form Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactForm(this);
    });
}

// Show Membership Modal
function showMembershipModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Join Kenya Police SACCO</h2>
            <p>Start your membership journey with us today!</p>
            <form id="membership-form">
                <input type="text" placeholder="Full Name" required>
                <input type="email" placeholder="Email Address" required>
                <input type="tel" placeholder="Phone Number" required>
                <input type="text" placeholder="Police ID Number" required>
                <select required>
                    <option value="">Select Rank</option>
                    <option value="constable">Constable</option>
                    <option value="corporal">Corporal</option>
                    <option value="sergeant">Sergeant</option>
                    <option value="inspector">Inspector</option>
                    <option value="other">Other</option>
                </select>
                <button type="submit" class="submit-button">Submit Application</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        modal.remove();
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            modal.remove();
        }
    }
    
    // Handle membership form submission
    const membershipForm = document.getElementById('membership-form');
    membershipForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your interest! We will contact you soon with more information about membership.');
        modal.style.display = 'none';
        modal.remove();
    });
}

// Handle Contact Form Submission
function handleContactForm(form) {
    const formData = new FormData(form);
    
    // Get form values
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Simulate form submission
    console.log('Form submitted:', {
        name: name,
        email: email,
        message: message
    });
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <strong>Success!</strong> Thank you for reaching out. We'll get back to you soon.
    `;
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(successMsg);
    form.reset();
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMsg.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => successMsg.remove(), 300);
    }, 5000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .modal {
        display: block;
        position: fixed;
        z-index: 500;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
        animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .modal-content {
        background-color: #fefefe;
        margin: 10% auto;
        padding: 30px;
        border: 1px solid #888;
        border-radius: 8px;
        width: 90%;
        max-width: 500px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        animation: slideUp 0.3s ease;
    }
    
    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
    }
    
    .close:hover,
    .close:focus {
        color: #000;
    }
    
    .modal-content h2 {
        color: #1a3a52;
        margin-bottom: 1rem;
    }
    
    .modal-content form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .modal-content input,
    .modal-content select {
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-family: inherit;
        font-size: 1rem;
    }
    
    .modal-content input:focus,
    .modal-content select:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
    }
`;

document.head.appendChild(style);

// Navbar active link highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-links a.active {
        color: #e74c3c !important;
        border-bottom: 2px solid #e74c3c;
    }
`;
document.head.appendChild(activeStyle);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Kenya Police SACCO Website Loaded Successfully');
});