# 影音設計作品集網站

一個乾淨、深色系的響應式作品集網站，可以放你的**影片**和**圖片**。

## 📁 檔案結構

```
2026作品集/
├── index.html          ← 網站主頁（改名字、自我介紹、聯絡方式在這裡）
├── css/style.css       ← 樣式（想換顏色改這裡）
├── js/works.js         ← ★ 作品清單（新增作品只需改這個檔）
├── js/main.js          ← 程式邏輯（通常不用動）
└── assets/
    ├── videos/         ← 放你的影片檔（.mp4）
    ├── images/         ← 放你的圖片
    └── thumbnails/     ← 放影片的縮圖
```

## 🚀 怎麼預覽

直接用瀏覽器打開 `index.html` 即可。
（若影片無法播放，建議用本機伺服器：在資料夾開啟終端機，執行
`python -m http.server`，再到瀏覽器開 `http://localhost:8000`）

## ✏️ 怎麼新增 / 修改作品

打開 `js/works.js`，每個作品是一個 `{ ... }` 區塊。複製一個貼上、改內容即可。

**放本機影片：**
1. 把影片放進 `assets/videos/`，例如 `myfilm.mp4`
2. 把縮圖放進 `assets/thumbnails/`，例如 `myfilm.jpg`
3. 在 `works.js` 加上：
   ```js
   { type:"video", src:"assets/videos/myfilm.mp4", thumb:"assets/thumbnails/myfilm.jpg", title:"作品名", desc:"說明" }
   ```

**放 YouTube / Vimeo 影片：** `src` 直接貼網址即可（不用下載）。

**放圖片：**
1. 把圖片放進 `assets/images/`
2. 在 `works.js` 加上：
   ```js
   { type:"image", src:"assets/images/mypic.jpg", title:"作品名", desc:"說明" }
   ```

## 🎨 客製化

| 想改什麼 | 改哪裡 |
|---|---|
| 名字、標題、自我介紹、聯絡方式 | `index.html` |
| 主題顏色 | `css/style.css` 最上面的 `--accent` |
| 個人照片 | 放 `assets/images/profile.jpg`，再到 index.html 的「關於」區塊換上 `<img>` |

## 🌐 上線分享（免費）

做好後可免費部署，取得網址分享給別人：
- **GitHub Pages**：把資料夾上傳到 GitHub repo，設定 Pages
- **Netlify / Vercel**：把整個資料夾拖進去即可

需要我幫你部署，再跟我說 🙂
