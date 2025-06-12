# Drag Papers ❤️

An interactive web application featuring draggable paper notes with love-themed content. Users can drag, rotate, and interact with floating paper elements that display sweet messages and images.

## ✨ Features

- **Interactive Dragging**: Drag papers around the screen with smooth animations
- **Rotation Control**: 
  - Desktop: Right-click and drag to rotate
  - Mobile: Two-finger gesture to rotate
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Lazy Loading**: Optimized image loading for better performance
- **Touch Support**: Full touch gesture support for mobile devices
- **Smooth Animations**: CSS transitions and transforms for fluid interactions
- **Z-Index Management**: Papers automatically stack when selected

## 🚀 Demo

Open `index.html` in any modern web browser to see the interactive paper dragging experience.

## 📱 Device Support

- **Desktop**: Mouse drag + right-click rotation
- **Mobile**: Touch drag + two-finger rotation
- **Tablet**: Full touch gesture support

## 🛠️ Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Animations, transforms, and responsive design
- **JavaScript (ES6+)**: Interactive functionality and device detection
- **Web APIs**: Intersection Observer for lazy loading

## 📁 Project Structure

```
Drag-Papers/
├── index.html          # Main HTML file
├── style.css           # Styles and animations
├── script.js           # Interactive functionality
├── images/             # Image assets
│   ├── 1.jpeg
│   ├── 2.jpeg
│   └── 3.jpeg
└── README.md           # This file
```

## 🎮 How to Use

1. **Open the application** in a web browser
2. **Click and drag** any paper to move it around
3. **Rotate papers**:
   - Desktop: Right-click and drag
   - Mobile: Use two fingers to rotate
4. **Stack papers** by clicking on them (they'll come to the front)

## 🎨 Customization

### Adding New Papers

Add new paper elements to `index.html`:

```html
<div class="paper">
  <p>Your custom message here</p>
</div>
```

### Styling Papers

Modify `style.css` to change:
- Paper appearance
- Colors and fonts
- Animation timing
- Background textures

### Content Updates

Edit the text content in `index.html` to personalize the messages and images.

## 🔧 Technical Details

### Lazy Loading Implementation

- Background images load progressively
- Regular images use Intersection Observer API
- Fallback support for older browsers
- Smooth fade-in transitions

### Device Detection

```javascript
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
```

### Event Handling

- **Mouse Events**: `mousedown`, `mousemove`, `mouseup`, `contextmenu`
- **Touch Events**: `touchstart`, `touchmove`, `touchend`
- **Gesture Events**: Two-finger rotation detection

## 🌟 Performance Features

- **Optimized Images**: Lazy loading reduces initial load time
- **Efficient Rendering**: CSS transforms for smooth animations
- **Memory Management**: Proper event listener cleanup
- **Responsive Design**: Adapts to different screen sizes

## 📱 Mobile Optimization

- Touch-friendly interactions
- Prevented default touch behaviors
- Optimized for mobile browsers
- Responsive layout adjustments

## 🎯 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Getting Started

1. Clone or download the project
2. Open `index.html` in a web browser
3. Start dragging and interacting with the papers!

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues, feature requests, or pull requests to improve this project.

---

**Made with ❤️ for interactive web experiences**
