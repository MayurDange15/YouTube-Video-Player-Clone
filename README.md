# 🎬 YouTube Video Player Clone

This project is a custom-built video player that mimics YouTube's interface and functionality, created using vanilla HTML, CSS, and JavaScript. It includes features like play/pause, volume control, captions toggle, speed adjustment, mini-player mode, theater mode, full-screen support, and an interactive timeline with preview thumbnails.

---

## 📺 Tutorial Source

This project is built by following the tutorial: **[Build YouTube Video Player Clone - JavaScript Tutorial](https://www.youtube.com/watch?v=ZeNyjnneq_w)** by **Web Dev Simplified**.

---

## 🚀 Features

- **Custom Video Controls:**

  - Play/Pause button
  - Volume control with mute/unmute toggle
  - Timeline scrubbing with thumbnail previews
  - Current time and total duration display
  - Captions toggle (supports `.vtt` files)
  - Playback speed adjustment (from 0.25x to 4x)
  - Fullscreen mode toggle
  - Theater mode toggle
  - Mini-player (Picture-in-Picture) mode toggle

- **Keyboard Shortcuts:**

  | Key             | Function                |
  | --------------- | ----------------------- |
  | `Space` / `K`   | Play/Pause              |
  | `M`             | Mute/Unmute             |
  | `F`             | Toggle Fullscreen       |
  | `T`             | Toggle Theater Mode     |
  | `I`             | Toggle Mini-Player Mode |
  | `C`             | Toggle Captions         |
  | `J` / `←` Arrow | Rewind 5 seconds        |
  | `L` / `→` Arrow | Forward 5 seconds       |

- **Right-click disabled** for custom player behavior.

---

## 💻 Installation & Usage

1. **Clone the Repository:**

```bash
git clone https://github.com/MayurDange15/youtube-video-player-clone.git
cd youtube-video-player-clone
```

2. **Add Your Video & Captions:**

- Replace `assets/Video.mp4` with your own video.
- Update `assets/subtitles.vtt` for subtitles (optional).
- Place preview images inside assets/previewImgs/ folder (naming format: preview1.jpg, preview2.jpg, etc.).

3. **Run Locally:**

Simply open `index.html` in any browser.

## 🎨 Customization

- **Theme/Colors:** Customize `styles.css` to change colors, sizes, or styles.
- **Keyboard Shortcuts:** Modify keybindings in `script.js` inside the keydown event listener.
- **Captions:** Add more `<track>` elements to support additional languages.

## 🛠️ Built With

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6)**

## 📃 License

This project is open-source and free to use. Feel free to fork and customize it for your own needs!

## 🙏 Acknowledgements

Special thanks to [Web Dev Simplified](https://www.youtube.com/c/WebDevSimplified) for the original tutorial:
[Build YouTube Video Player Clone - JavaScript Tutorial](https://www.youtube.com/watch?v=ZeNyjnneq_w)
