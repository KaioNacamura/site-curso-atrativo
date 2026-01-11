// Countdown Timer
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    let timeLeft = 3600; // 1 hour in seconds

    setInterval(() => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        countdownElement.textContent = 
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        timeLeft--;

        if (timeLeft < 0) {
            timeLeft = 3600; // Reset to 1 hour
        }
    }, 1000);
}

// Scroll to Plans
function scrollToPlans() {
    document.getElementById('pricing').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// FAQ Toggle
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked FAQ if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Select Plan and Open Payment Modal
function selectPlan(planName, price) {
    const modal = document.getElementById('paymentModal');
    const planElement = document.getElementById('selectedPlan');
    const priceElement = document.getElementById('totalPrice');
    
    // Capitalize plan name
    const planDisplay = planName.charAt(0).toUpperCase() + planName.slice(1);
    
    planElement.textContent = `Plano ${planDisplay.toUpperCase()}`;
    priceElement.textContent = `$${price}`;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Payment Modal
function closeModal() {
    const modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Process Payment
function processPayment(event) {
    event.preventDefault();
    
    // Close payment modal
    closeModal();
    
    // Show loading animation
    const submitButton = event.target.querySelector('.submit-button');
    submitButton.textContent = '⏳ PROCESSANDO...';
    submitButton.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Show success modal
        const successModal = document.getElementById('successModal');
        successModal.style.display = 'block';
        
        // Reset form
        event.target.reset();
        submitButton.textContent = '🔒 FINALIZAR COMPRA SEGURA';
        submitButton.disabled = false;
        
        // Confetti effect
        createConfetti();
    }, 2000);
}

// Close Success Modal
function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Confetti Effect
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#ffd700', '#28a745', '#ff6b6b'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const rotation = Math.random() * 360;
        
        confetti.animate([
            { 
                transform: `translateY(0) rotate(0deg)`,
                opacity: 1
            },
            { 
                transform: `translateY(${window.innerHeight + 100}px) rotate(${rotation}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// Social Proof Animation (duplicate for infinite scroll)
function setupSocialProof() {
    const ticker = document.querySelector('.proof-ticker');
    const items = ticker.innerHTML;
    ticker.innerHTML = items + items + items;
}

// Close modal when clicking outside
window.onclick = function(event) {
    const paymentModal = document.getElementById('paymentModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === paymentModal) {
        closeModal();
    }
    if (event.target === successModal) {
        closeSuccessModal();
    }
}

// Format card number input
document.addEventListener('DOMContentLoaded', function() {
    startCountdown();
    setupSocialProof();
    
    // Card number formatting
    const cardInputs = document.querySelectorAll('input[placeholder*="1234"]');
    cardInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    });
    
    // Expiry date formatting
    const expiryInputs = document.querySelectorAll('input[placeholder*="MM/AA"]');
    expiryInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    });
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.result-card, .curriculum-item, .pricing-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Add floating animation to CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.animation = 'float 1s ease-in-out infinite';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.animation = 'none';
    });
});

// Add CSS for float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(style);
