// Test button functionality
const testButton = document.getElementById('testButton');
const result = document.getElementById('result');
const timestamp = document.getElementById('timestamp');

let clickCount = 0;

// Update timestamp on load
timestamp.textContent = `Deployed at: ${new Date().toLocaleString()}`;

// Button click handler
testButton.addEventListener('click', () => {
    clickCount++;
    
    const messages = [
        '🎉 JavaScript is working!',
        '✨ Great! Clicked again!',
        '🚀 Still working perfectly!',
        '💫 You\'re on a roll!',
        '🌟 Amazing! Keep going!'
    ];
    
    const message = clickCount <= messages.length 
        ? messages[clickCount - 1] 
        : `Clicked ${clickCount} times! 🎊`;
    
    result.textContent = message;
    result.style.animation = 'none';
    
    // Trigger animation
    setTimeout(() => {
        result.style.animation = 'fadeIn 0.3s ease';
    }, 10);
    
    // Add visual feedback
    testButton.style.transform = 'scale(0.95)';
    setTimeout(() => {
        testButton.style.transform = 'scale(1.05)';
    }, 100);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Check if page loaded successfully
console.log('✅ b4idid test site loaded successfully!');
console.log('✅ JavaScript is working!');
console.log('✅ Ready for Vercel deployment!');

