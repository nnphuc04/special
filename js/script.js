// Birthday Website JavaScript
// Author: nnphuc04
// Description: Interactive birthday website for Phạm Diễm Quỳnh

class BirthdayWebsite {
    constructor() {
        this.wishes = [
            "Tuổi mới hạnh phúc nhé! 🌟",
            "Mãi xinh đẹp như hôm nay! 💖",
            "Kỳ hè full A vào năm full B trở lênnnn! 📚✨",
            "Chúc bạn luôn tràn đầy năng lượng và niềm vui! 🌈",
            "Hy vọng tất cả những ước mơ của bạn sẽ thành hiện thực! 🌠",
            "Sinh nhật vui vẻ và may mắn cả năm! 🍀",
            "Chúc bạn có một năm mới thật tuyệt vời! 🎊",
            "Mong bạn luôn được bao quanh bởi tình yêu thương! 💕"
        ];
        
        this.gameScore = 0;
        this.gameActive = false;
        this.musicPlaying = false;
        this.candlesBlown = false;
        this.countdownInterval = null;
        
        this.init();
    }
    
    init() {

        this.setupWelcomeModal();
        // Kiểm tra và load theme trước
        this.loadTheme();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start countdown ngay lập tức
        this.startCountdown();
        
        // Load wishes
        this.loadStoredWishes();
        
        // Start effects
        setTimeout(() => {
            this.startConfetti();
            this.animateElements();
        }, 1000);
    }

    setupWelcomeModal() {
        const welcomeModal = document.getElementById('welcomeModal');
        const playMusicBtn = document.getElementById('playMusicBtn');
        const skipMusicBtn = document.getElementById('skipMusicBtn');
        
        if (!welcomeModal) return;
        
        // Auto-show modal sau 1 giây
        setTimeout(() => {
            welcomeModal.style.display = 'flex';
        }, 1000);
        
        // Nút phát nhạc
        if (playMusicBtn) {
            playMusicBtn.addEventListener('click', () => {
                this.startMusicAndParty();
                this.hideWelcomeModal();
            });
        }
        
        // Nút bỏ qua nhạc
        if (skipMusicBtn) {
            skipMusicBtn.addEventListener('click', () => {
                this.startPartyWithoutMusic();
                this.hideWelcomeModal();
            });
        }
    }

    startMusicAndParty() {
        const music = document.getElementById('birthdayMusic');
        const musicBtn = document.getElementById('musicBtn');
        
        if (music) {
            music.play().then(() => {
                this.musicPlaying = true;
                if (musicBtn) {
                    const icon = musicBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-pause';
                }
                this.showToast('🎵 Nhạc sinh nhật đang phát! Chúc mừng sinh nhật! 🎉');
            }).catch(() => {
                this.showToast('❌ Không thể phát nhạc tự động');
            });
        }
        
        // Trigger confetti celebration
        setTimeout(() => {
            if (window.confetti) {
                window.confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }, 500);
    }

    startPartyWithoutMusic() {
        this.showToast('🎉 Chào mừng đến bữa tiệc sinh nhật Phạm Diễm Quỳnh!');
        
        // Still trigger confetti
        setTimeout(() => {
            if (window.confetti) {
                window.confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }, 500);
    }

    hideWelcomeModal() {
        const welcomeModal = document.getElementById('welcomeModal');
        if (welcomeModal) {
            welcomeModal.classList.add('hidden');
            setTimeout(() => {
                welcomeModal.style.display = 'none';
            }, 500);
        }
    }
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const darkModeBtn = document.getElementById('darkModeBtn');
        if (darkModeBtn) {
            const icon = darkModeBtn.querySelector('i');
            if (icon) {
                icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }
    
    setupEventListeners() {
        // Dark mode toggle
        const darkModeBtn = document.getElementById('darkModeBtn');
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }
        
        // Music control
        const musicBtn = document.getElementById('musicBtn');
        if (musicBtn) {
            musicBtn.addEventListener('click', () => {
                this.toggleMusic();
            });
        }
        
        // Get random wish
        const getWishBtn = document.getElementById('getWish');
        if (getWishBtn) {
            getWishBtn.addEventListener('click', () => {
                this.displayRandomWish();
            });
        }
        
        // Blow candles
        const blowCandlesBtn = document.getElementById('blowCandles');
        if (blowCandlesBtn) {
            blowCandlesBtn.addEventListener('click', () => {
                this.blowCandles();
            });
        }
        
        // Game controls
        const startGameBtn = document.getElementById('startGame');
        if (startGameBtn) {
            startGameBtn.addEventListener('click', () => {
                this.startGame();
            });
        }
        
        // Guest wish form
        const wishForm = document.getElementById('wishForm');
        if (wishForm) {
            wishForm.addEventListener('submit', (e) => {
                this.handleWishSubmission(e);
            });
        }
        
        // Share buttons
        const shareFacebookBtn = document.getElementById('shareFacebook');
        if (shareFacebookBtn) {
            shareFacebookBtn.addEventListener('click', () => {
                this.shareOnFacebook();
            });
        }
        
        const shareWhatsAppBtn = document.getElementById('shareWhatsApp');
        if (shareWhatsAppBtn) {
            shareWhatsAppBtn.addEventListener('click', () => {
                this.shareOnWhatsApp();
            });
        }
        
        // Auto-play music khi user tương tác lần đầu
        this.setupAutoPlay();
    }
    
    setupAutoPlay() {
        const tryAutoPlay = () => {
            const music = document.getElementById('birthdayMusic');
            if (music && !this.musicPlaying) {
                music.play().then(() => {
                    this.musicPlaying = true;
                    const musicBtn = document.getElementById('musicBtn');
                    if (musicBtn) {
                        const icon = musicBtn.querySelector('i');
                        if (icon) icon.className = 'fas fa-pause';
                    }
                    
                    // Remove event listeners sau khi thành công
                    document.removeEventListener('click', tryAutoPlay);
                    document.removeEventListener('keydown', tryAutoPlay);
                    document.removeEventListener('touchstart', tryAutoPlay);
                    
                    this.showToast('🎵 Nhạc sinh nhật đang phát!');
                }).catch(() => {
                    console.log('Auto-play failed, user needs to interact first');
                });
            }
        };
        
        // Lắng nghe tương tác đầu tiên
        document.addEventListener('click', tryAutoPlay);
        document.addEventListener('keydown', tryAutoPlay);
        document.addEventListener('touchstart', tryAutoPlay);
    }
    
    // Dark Mode Toggle
    toggleDarkMode() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        
        const darkModeBtn = document.getElementById('darkModeBtn');
        if (darkModeBtn) {
            const icon = darkModeBtn.querySelector('i');
            if (icon) {
                icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
        
        localStorage.setItem('theme', newTheme);
        this.showToast(newTheme === 'dark' ? '🌙 Chế độ tối' : '☀️ Chế độ sáng');
    }
    
    // Music Control
    toggleMusic() {
        const music = document.getElementById('birthdayMusic');
        const musicBtn = document.getElementById('musicBtn');
        
        if (!music || !musicBtn) {
            this.showToast('❌ Không tìm thấy audio element');
            return;
        }
        
        const icon = musicBtn.querySelector('i');
        
        if (this.musicPlaying) {
            music.pause();
            if (icon) icon.className = 'fas fa-play';
            this.musicPlaying = false;
            this.showToast('🔇 Đã tắt nhạc');
        } else {
            // Create audio context for better browser support
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            
            music.play().then(() => {
                if (icon) icon.className = 'fas fa-pause';
                this.musicPlaying = true;
                this.showToast('🎵 Đang phát nhạc');
            }).catch(e => {
                console.log('Music playback failed:', e);
                this.showToast('❌ Không thể phát nhạc. Hãy thử lại!');
            });
        }
    }
    
    // Countdown Timer - SỬA LẠI HOÀN TOÀN
    startCountdown() {
        console.log('Starting countdown...'); // Debug log
        
        // Set birthday date - NGÀY 24 THÁNG 7 NĂM 2025 (hôm nay là 23/7)
        const birthday = new Date(2025, 6, 24, 0, 0, 0); // Tháng 7 = index 6
        
        console.log('Birthday date:', birthday); // Debug log
        console.log('Current date:', new Date()); // Debug log
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = birthday.getTime() - now;
            
            console.log('Distance:', distance); // Debug log
            
            // Get elements
            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');
            const countdownElement = document.getElementById('countdown');
            const birthdayMessageElement = document.getElementById('birthdayMessage');
            
            if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
                console.error('Countdown elements not found!');
                return;
            }
            
            if (distance < 0) {
                // Birthday has passed or is today
                if (countdownElement) {
                    countdownElement.style.display = 'none';
                }
                if (birthdayMessageElement) {
                    birthdayMessageElement.classList.remove('d-none');
                    birthdayMessageElement.style.display = 'block';
                }
                
                // Clear interval
                if (this.countdownInterval) {
                    clearInterval(this.countdownInterval);
                }
                
                // Trigger birthday celebration
                this.startBirthdayCelebration();
                return;
            }
            
            // Calculate time units
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update display
            daysElement.textContent = days.toString().padStart(2, '0');
            hoursElement.textContent = hours.toString().padStart(2, '0');
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            console.log(`Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`); // Debug log
        };
        
        // Update immediately
        updateCountdown();
        
        // Set interval to update every second
        this.countdownInterval = setInterval(updateCountdown, 1000);
    }
    
    startBirthdayCelebration() {
        console.log('🎉 Birthday celebration started!');
        
        // Trigger confetti
        if (window.confetti) {
            window.confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
        
        // Auto-play music if not playing
        if (!this.musicPlaying) {
            const music = document.getElementById('birthdayMusic');
            if (music) {
                music.play().catch(() => {
                    console.log('Could not auto-play music for celebration');
                });
            }
        }
        
        this.showToast('🎉 Chúc mừng sinh nhật Phạm Diễm Quỳnh! 🎂');
    }
    
    // Random Wish Display
    displayRandomWish() {
        const randomIndex = Math.floor(Math.random() * this.wishes.length);
        const wish = this.wishes[randomIndex];
        const wishDisplay = document.getElementById('randomWish');
        
        if (!wishDisplay) return;
        
        // Animate wish change
        wishDisplay.style.opacity = '0';
        wishDisplay.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            wishDisplay.textContent = wish;
            wishDisplay.style.opacity = '1';
            wishDisplay.style.transform = 'translateY(0)';
        }, 300);
        
        // Add some sparkle effect
        const wishesCard = document.querySelector('.wishes-card');
        if (wishesCard) {
            this.createSparkles(wishesCard);
        }
    }
    
    // Candle Blowing Animation
    blowCandles() {
        if (this.candlesBlown) {
            this.relightCandles();
            return;
        }
        
        const flames = document.querySelectorAll('.flame');
        const blowBtn = document.getElementById('blowCandles');
        
        flames.forEach((flame, index) => {
            setTimeout(() => {
                flame.classList.add('blown-out');
            }, index * 200);
        });
        
        // Play applause sound effect
        this.playApplause();
        
        // Change button text
        setTimeout(() => {
            if (blowBtn) {
                blowBtn.innerHTML = '🔥 Thắp lại nến';
                this.candlesBlown = true;
                
                const cakeContainer = document.querySelector('.cake-container');
                if (cakeContainer) {
                    this.createSparkles(cakeContainer);
                }
                
                // Trigger confetti
                if (window.confetti) {
                    window.confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
                
                this.showToast('🎉 Chúc ước mơ thành hiện thực!');
            }
        }, 1000);
    }
    
    relightCandles() {
        const flames = document.querySelectorAll('.flame');
        const blowBtn = document.getElementById('blowCandles');
        
        flames.forEach((flame) => {
            flame.classList.remove('blown-out');
        });
        
        if (blowBtn) {
            blowBtn.innerHTML = '💨 Thổi nến';
            this.candlesBlown = false;
            this.showToast('🕯️ Đã thắp lại nến');
        }
    }
    
    // Balloon Pop Game
    startGame() {
        if (this.gameActive) return;
        
        this.gameActive = true;
        this.gameScore = 0;
        
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = this.gameScore;
        }
        
        const gameArea = document.getElementById('gameArea');
        const startBtn = document.getElementById('startGame');
        
        if (startBtn) {
            startBtn.style.display = 'none';
        }
        
        if (!gameArea) return;
        
        const gameInterval = setInterval(() => {
            if (!this.gameActive) {
                clearInterval(gameInterval);
                return;
            }
            
            this.createGameBalloon(gameArea);
        }, 1500);
        
        // End game after 30 seconds
        setTimeout(() => {
            this.endGame(gameInterval);
        }, 30000);
        
        this.showToast('🎮 Game bắt đầu! Hãy bấm vào bóng bay!');
    }
    
    createGameBalloon(container) {
        const balloon = document.createElement('div');
        balloon.className = 'game-balloon';
        balloon.innerHTML = '🎈';
        balloon.style.left = Math.random() * (container.clientWidth - 50) + 'px';
        balloon.style.color = this.getRandomColor();
        
        balloon.addEventListener('click', () => {
            this.gameScore += 10;
            const scoreElement = document.getElementById('score');
            if (scoreElement) {
                scoreElement.textContent = this.gameScore;
            }
            balloon.remove();
            this.createPopEffect(balloon.style.left, balloon.style.bottom);
        });
        
        container.appendChild(balloon);
        
        // Remove balloon after animation
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.remove();
            }
        }, 3000);
    }
    
    endGame(interval) {
        clearInterval(interval);
        this.gameActive = false;
        
        const gameArea = document.getElementById('gameArea');
        if (!gameArea) return;
        
        // Clear remaining balloons
        const balloons = gameArea.querySelectorAll('.game-balloon');
        balloons.forEach(balloon => balloon.remove());
        
        // Show final score
        gameArea.innerHTML = `
            <div class="game-over">
                <h4>🎉 Trò chơi kết thúc!</h4>
                <p>Điểm số của bạn: <strong>${this.gameScore}</strong></p>
                <button id="startGame" class="btn btn-primary mt-3">Chơi lại</button>
            </div>
        `;
        
        // Re-attach event listener
        const newStartBtn = document.getElementById('startGame');
        if (newStartBtn) {
            newStartBtn.addEventListener('click', () => {
                gameArea.innerHTML = '<button id="startGame" class="btn btn-primary">Bắt đầu chơi</button>';
                const restartBtn = document.getElementById('startGame');
                if (restartBtn) {
                    restartBtn.addEventListener('click', () => this.startGame());
                }
            });
        }
        
        this.showToast(`🎯 Game kết thúc! Điểm: ${this.gameScore}`);
    }
    
    // Guest Wishes Management
    handleWishSubmission(e) {
        e.preventDefault();
        
        const nameElement = document.getElementById('guestName');
        const wishElement = document.getElementById('guestWish');
        
        if (!nameElement || !wishElement) {
            this.showToast('❌ Không tìm thấy form elements');
            return;
        }
        
        const name = nameElement.value.trim();
        const wish = wishElement.value.trim();
        
        if (!name || !wish) {
            this.showToast('❌ Vui lòng điền đầy đủ thông tin!');
            return;
        }
        
        const wishData = {
            name: name,
            wish: wish,
            timestamp: new Date().toISOString()
        };
        
        this.saveWish(wishData);
        this.displayWish(wishData);
        
        // Reset form
        nameElement.value = '';
        wishElement.value = '';
        
        this.showToast('💕 Cảm ơn lời chúc của bạn!');
    }
    
    saveWish(wishData) {
        let wishes = JSON.parse(localStorage.getItem('birthdayWishes') || '[]');
        wishes.push(wishData);
        localStorage.setItem('birthdayWishes', JSON.stringify(wishes));
    }
    
    loadStoredWishes() {
        const wishes = JSON.parse(localStorage.getItem('birthdayWishes') || '[]');
        wishes.forEach(wish => this.displayWish(wish));
    }
    
    displayWish(wishData) {
        const wishList = document.getElementById('wishList');
        if (!wishList) return;
        
        const wishElement = document.createElement('div');
        wishElement.className = 'wish-item';
        
        const date = new Date(wishData.timestamp).toLocaleDateString('vi-VN');
        
        wishElement.innerHTML = `
            <div class="wish-author">${this.escapeHtml(wishData.name)}</div>
            <div class="wish-content">${this.escapeHtml(wishData.wish)}</div>
            <small class="text-muted">${date}</small>
        `;
        
        wishList.insertBefore(wishElement, wishList.firstChild);
        
        // Animate new wish
        wishElement.style.opacity = '0';
        wishElement.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            wishElement.style.opacity = '1';
            wishElement.style.transform = 'translateX(0)';
        }, 100);
    }
    
    // Social Media Sharing
    shareOnFacebook() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('🎉 Hãy cùng chúc mừng sinh nhật Phạm Diễm Quỳnh! 🎂');
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    }
    
    shareOnWhatsApp() {
        const text = encodeURIComponent('🎉 Hãy cùng chúc mừng sinh nhật Phạm Diễm Quỳnh! 🎂 ' + window.location.href);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }
    
    // Utility Functions
    getRandomColor() {
        const colors = ['#ff69b4', '#87ceeb', '#ffd700', '#98fb98', '#ffa07a', '#dda0dd'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    createSparkles(container) {
        if (!container) return;
        
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * container.offsetWidth + 'px';
            sparkle.style.top = Math.random() * container.offsetHeight + 'px';
            sparkle.style.fontSize = '1rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = 'sparkle 1s ease-out forwards';
            sparkle.style.zIndex = '1000';
            
            container.style.position = 'relative';
            container.appendChild(sparkle);
            
            setTimeout(() => {
                sparkle.remove();
            }, 1000);
        }
    }
    
    createPopEffect(x, y) {
        const pop = document.createElement('div');
        pop.innerHTML = '💥';
        pop.style.position = 'absolute';
        pop.style.left = x;
        pop.style.bottom = y;
        pop.style.fontSize = '2rem';
        pop.style.pointerEvents = 'none';
        pop.style.animation = 'pop 0.5s ease-out forwards';
        pop.style.zIndex = '1000';
        
        const gameArea = document.getElementById('gameArea');
        if (gameArea) {
            gameArea.appendChild(pop);
            
            setTimeout(() => {
                pop.remove();
            }, 500);
        }
    }
    
    playApplause() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio context not supported');
        }
    }
    
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 1001;
            animation: slideInRight 0.3s ease-out;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    startConfetti() {
        setTimeout(() => {
            if (window.confetti) {
                window.confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }, 1000);
    }
    
    animateElements() {
        if (window.anime) {
            anime({
                targets: '.card',
                translateY: [50, 0],
                opacity: [0, 1],
                delay: anime.stagger(200),
                duration: 800,
                easing: 'easeOutExpo'
            });
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Additional CSS animations
const additionalStyles = `
@keyframes sparkle {
    0% { opacity: 1; transform: scale(0) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(180deg); }
    100% { opacity: 0; transform: scale(0) rotate(360deg); }
}

@keyframes pop {
    0% { opacity: 1; transform: scale(0); }
    50% { opacity: 1; transform: scale(1.2); }
    100% { opacity: 0; transform: scale(0); }
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the birthday website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing birthday website...');
    
    // Initialize the website
    const birthdayWebsite = new BirthdayWebsite();
    
    // Make it globally accessible for debugging
    window.birthdayWebsite = birthdayWebsite;
});