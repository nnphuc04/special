// Confetti Animation Library
// Simple confetti effect for birthday celebration

class ConfettiManager {
    constructor() {
        this.canvas = document.getElementById('confetti-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.confetti = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.createConfetti();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createConfetti() {
        const colors = ['#ff69b4', '#87ceeb', '#ffd700', '#98fb98', '#ffa07a', '#dda0dd'];
        const shapes = ['circle', 'square', 'triangle'];
        
        for (let i = 0; i < 50; i++) {
            this.confetti.push({
                x: Math.random() * this.canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.confetti.length - 1; i >= 0; i--) {
            const particle = this.confetti[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;
            
            // Add gravity
            particle.vy += 0.05;
            
            // Remove particles that are off screen
            if (particle.y > this.canvas.height + 10) {
                this.confetti.splice(i, 1);
                continue;
            }
            
            // Draw particle
            this.drawParticle(particle);
        }
        
        // Add new confetti occasionally
        if (Math.random() < 0.02 && this.confetti.length < 100) {
            const colors = ['#ff69b4', '#87ceeb', '#ffd700', '#98fb98', '#ffa07a', '#dda0dd'];
            const shapes = ['circle', 'square', 'triangle'];
            
            this.confetti.push({
                x: Math.random() * this.canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawParticle(particle) {
        this.ctx.save();
        this.ctx.translate(particle.x, particle.y);
        this.ctx.rotate(particle.rotation * Math.PI / 180);
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fillStyle = particle.color;
        
        switch (particle.shape) {
            case 'circle':
                this.ctx.beginPath();
                this.ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                break;
                
            case 'square':
                this.ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                break;
                
            case 'triangle':
                this.ctx.beginPath();
                this.ctx.moveTo(0, -particle.size / 2);
                this.ctx.lineTo(-particle.size / 2, particle.size / 2);
                this.ctx.lineTo(particle.size / 2, particle.size / 2);
                this.ctx.closePath();
                this.ctx.fill();
                break;
        }
        
        this.ctx.restore();
    }
    
    burst(x, y, count = 20) {
        const colors = ['#ff69b4', '#87ceeb', '#ffd700', '#98fb98', '#ffa07a', '#dda0dd'];
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const velocity = Math.random() * 5 + 3;
            
            this.confetti.push({
                x: x || this.canvas.width / 2,
                y: y || this.canvas.height / 2,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity,
                color: colors[Math.floor(Math.random() * colors.length)],
                shape: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 20,
                opacity: 1
            });
        }
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.confetti = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Global confetti function for easy access
window.confetti = function(options = {}) {
    if (!window.confettiManager) {
        window.confettiManager = new ConfettiManager();
    }
    
    const { x, y, particleCount = 50 } = options;
    window.confettiManager.burst(x, y, particleCount);
};

// Initialize confetti when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (!window.confettiManager) {
        window.confettiManager = new ConfettiManager();
    }
});