let highestZ = 1;

// Detect if device supports touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Lazy loading functionality
class LazyLoader {
  constructor() {
    this.imagesToLoad = [
      {
        type: 'paper',
        url: 'https://i0.wp.com/textures.world/wp-content/uploads/2018/10/2-Millimeter-Paper-Background-copy.jpg?ssl=1',
        elements: document.querySelectorAll('.paper')
      },
      {
        type: 'heart',
        url: 'https://cdn.pixabay.com/photo/2016/03/31/19/25/cartoon-1294994__340.png',
        elements: document.querySelectorAll('.paper.heart')
      }
    ];
    
    this.regularImages = document.querySelectorAll('img');
    this.init();
  }

  init() {
    this.loadBackgroundImages();
    this.loadRegularImages();
  }

  loadBackgroundImages() {
    this.imagesToLoad.forEach(imageData => {
      const img = new Image();
      img.onload = () => {
        if (imageData.type === 'paper') {
          imageData.elements.forEach(element => {
            element.classList.add('loaded');
          });
        } else if (imageData.type === 'heart') {
          imageData.elements.forEach(element => {
            element.classList.add('loaded');
          });
        }
      };
      img.src = imageData.url;
    });
  }

  loadRegularImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      this.regularImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      this.regularImages.forEach(img => {
        img.classList.add('loaded');
      });
    }
  }
}

// Initialize lazy loading
new LazyLoader();

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    if (isTouchDevice) {
      this.initTouchEvents(paper);
    } else {
      this.initMouseEvents(paper);
    }
  }

  initMouseEvents(paper) {
    document.addEventListener('mousemove', (e) => {
      if(!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
        
      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if(this.rotating) {
        this.rotation = degrees;
      }

      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('mousedown', (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      if(e.button === 0) {
        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
      if(e.button === 2) {
        this.rotating = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Prevent context menu on right click for rotation
    paper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  initTouchEvents(paper) {
    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if(!this.rotating) {
        this.mouseX = e.touches[0].clientX;
        this.mouseY = e.touches[0].clientY;
        
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
        
      const dirX = e.touches[0].clientX - this.mouseTouchX;
      const dirY = e.touches[0].clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if(this.rotating) {
        this.rotation = degrees;
      }

      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('touchstart', (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      this.mouseTouchX = e.touches[0].clientX;
      this.mouseTouchY = e.touches[0].clientY;
      this.prevMouseX = this.mouseTouchX;
      this.prevMouseY = this.mouseTouchY;
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    // Handle two-finger rotation on touch screens
    let initialRotation = 0;
    let initialDistance = 0;

    paper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        this.rotating = true;
        initialRotation = this.rotation;
        
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) + 
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
      }
    });

    paper.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && this.rotating) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        const currentDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) + 
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        const centerX = (touch1.clientX + touch2.clientX) / 2;
        const centerY = (touch1.clientY + touch2.clientY) / 2;
        
        const angle = Math.atan2(touch2.clientY - touch1.clientY, touch2.clientX - touch1.clientX);
        let degrees = 180 * angle / Math.PI;
        degrees = (360 + Math.round(degrees)) % 360;
        
        this.rotation = degrees;
        
        // Update paper position based on center of two fingers
        if (!this.holdingPaper) {
          this.currentPaperX = centerX - this.mouseTouchX;
          this.currentPaperY = centerY - this.mouseTouchY;
        }
        
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('touchend', (e) => {
      if (e.touches.length < 2) {
        this.rotating = false;
      }
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});