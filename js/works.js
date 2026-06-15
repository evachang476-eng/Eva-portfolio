/* ============================================================
   作品集資料 — 「存檔點 / Meow Village」張芷瑄作品集
   ------------------------------------------------------------
   ★ 個人資料、作品內容，全部在這個檔案編輯。
   ★ 每件作品的欄位：
       title      : 作品名稱
       category   : 分類標籤（顯示在卡片角落）
       cover      : 卡片封面圖（通常用第一張圖）
       images     : 作品圖片陣列（可放多張，點開後會全部顯示）
       video      : 單一影片（YouTube 網址 或 本機檔路徑），沒有就 null
       videos     : 多段影片時改用這個陣列（例：山嗨驚），詳情頁會出現切換縮圖
       intro      : 【作品簡介】
       tools      : 【技術運用 / 工具】
       role       : 【我的角色 / 分工】（沒有就留空字串 ""）
       reflection : 【成果與反思】（沒有就留空字串 ""）
       award      : 參賽 / 得獎經歷（沒有就留空字串 ""）

   ★ 有些作品還缺圖片（images 是空的），把圖片放進 assets/images/
     後，照其他作品的寫法把檔名加進 images 陣列即可。
   ============================================================ */

const PROFILE = {
  saveTitle: "存檔點",
  name: "張芷瑄",
  loading: "Loading... Meow Village",
  intro: "嗨，我是張芷瑄，德明財經科技大學多媒體設計系。作品橫跨影片剪輯、插畫、平面與文創設計、到遊戲企劃。喜歡把腦中的想法一步步「具象化」，就像遊戲裡的存檔點，記錄每一段成長。",
  email: "evachang476@gmail.com",
  social: [],
  skills: ["Premiere Pro", "Illustrator", "Photoshop", "Procreate", "InDesign", "Unity", "Canva"]
};

/* ============================================================
   大四實習 · 短影音（顯示在作品集最前面）
   蝦皮頁面無法直接嵌入播放，所以做成「點擊跳轉蝦皮」的卡片。
   想加封面：把截圖放進 assets/images/，再填 thumb 欄位即可。
   ============================================================ */
const SHORTS = {
  title: "大四實習 · 短影音",
  desc: "蝦皮實習短影音｜點擊卡片前往蝦皮觀看 ↗",
  // 依品牌分組顯示；要新增品牌就再加一個 { brand, items } 區塊
  groups: [
    {
      brand: "樂扣樂扣 Lock&Lock",
      items: [
        { title: "樂扣樂扣 掀蓋款 Fun 飲杯", video: "assets/videos/shopee-1.mp4", url: "https://tw.shp.ee/1tnprjvv?smtt=0.0.9", thumb: "assets/images/shopee-1.jpg" },
        { title: "微波玩美 Match 不鏽鋼保鮮盒", video: "assets/videos/shopee-2.mp4", url: "https://tw.shp.ee/pbfky9ef?smtt=0.0.9", thumb: "assets/images/shopee-2.jpg" },
        { title: "清新手提 耐熱玻璃隨行杯", video: "assets/videos/shopee-3.mp4", url: "https://tw.shp.ee/bpm23ppb?smtt=0.0.9", thumb: "assets/images/shopee-3.jpg" },
        { title: "搖搖杯比較", video: "assets/videos/shopee-4.mp4", url: "https://tw.shp.ee/lvnkco74?smtt=0.0.9", thumb: "assets/images/shopee-4.jpg" },
        { title: "ECO BLUE 鍛造陶瓷不沾 IH 鍋", video: "assets/videos/shopee-5.mp4", url: "https://tw.shp.ee/1xx400cw?smtt=0.0.9", thumb: "assets/images/shopee-5.jpg" },
        { title: "樂扣樂扣 冰封極鮮保鮮盒", video: "assets/videos/shopee-6.mp4", url: "https://tw.shp.ee/p6zntzo6?smtt=0.0.9", thumb: "assets/images/shopee-6.jpg" },
        { title: "PET 大容量豪飲冷水壺 1.5L / 2L", video: "assets/videos/shopee-7.mp4", url: "https://tw.shp.ee/b2ji2wkn?smtt=0.0.9", thumb: "assets/images/shopee-7.jpg" }
      ]
    },
    {
      brand: "Nespresso",
      items: [
        { title: "Vertuo POP", video: "assets/videos/nespresso-2.mp4", url: "https://tw.shp.ee/bdph714u?smtt=0.0.9", thumb: "assets/images/nespresso-2.jpg" },
        { title: "Inissia", video: "assets/videos/nespresso-3.mp4", url: "https://tw.shp.ee/6ai0tfp2?smtt=0.0.9", thumb: "assets/images/nespresso-3.jpg" },
        { title: "Inissia vs POP", video: "assets/videos/nespresso-4.mp4", url: "https://tw.shp.ee/epnfhuxu?smtt=0.0.9", thumb: "assets/images/nespresso-4.jpg" },
        { title: "奶泡機教學", video: "assets/videos/nespresso-5.mp4", url: "https://tw.shp.ee/1x7yn21b?smtt=0.0.9", thumb: "assets/images/nespresso-5.jpg" },
        { title: "Essenza Mini", video: "assets/videos/nespresso-6.mp4", url: "https://tw.shp.ee/bgxg2uct?smtt=0.0.9", thumb: "assets/images/nespresso-6.jpg" },
        { title: "Creatista Plus", video: "assets/videos/nespresso-7.mp4", url: "https://tw.shp.ee/3y19oeww?smtt=0.0.9", thumb: "assets/images/nespresso-7.jpg" },
        { title: "CitiZ", video: "assets/videos/nespresso-8.mp4", url: "https://tw.shp.ee/9ne96xm1?smtt=0.0.9", thumb: "assets/images/nespresso-8.jpg" }
      ]
    }
  ]
};

const WORKS = [
  /* ───────── 山嗨驚（畢業專題，置頂） ───────── */
  {
    title: "山嗨驚",
    category: "遊戲 · 畢業專題",
    cover: "assets/images/遊戲玩法畫面.jpg",
    video: "assets/videos/第五組錄製內容PART1.mp4",  // 遊戲實錄影片（點開先播放）
    // 圖片可用 { src, cap } 附上每張說明（cap 會顯示在圖片下方）
    images: [
      { src: "assets/images/遊戲玩法畫面.jpg", cap: "遊戲玩法畫面：玩家可選逃脫方（五隻命定神獸），或抓捕方馬戲團角色（男・月珀／女・夏瑛）；遊玩前先了解玩法。" },
      { src: "assets/images/messageImage_1781532230432.jpg", cap: "遊戲場景：使用 Unity 的 Edgar for Unity 隨機地圖插件，每次開始都會生成不同地圖，增加可玩性。" },
      { src: "assets/images/劇情模式畫面.jpg", cap: "劇情模式：先介紹故事大綱，再以角色對話形式帶出劇情。我負責劇情切換的實現。" },
      { src: "assets/images/劇情模式畫面-1.jpg", cap: "劇情模式對話畫面。" },
      { src: "assets/images/角色切換實現.jpg", cap: "角色切換（換皮模式）：保留角色邏輯本體，只切換外觀與對應資料，成功實現角色切換。" },
      { src: "assets/images/技能畫面.jpg", cap: "技能畫面：以天狗為例，技能是「尋找出口」，發動後協助逃脫方找到出口方向。" },
      { src: "assets/images/AI 音樂.jpg", cap: "配樂：使用 AI 生成的遊戲音樂（The Crimson Ringmaster）。" }
    ],
    intro: "畢業專題遊戲作品《山嗨驚》。一款「逃脫 vs 抓捕」的對戰遊戲，分為馬戲團（抓捕方）與神獸（逃脫方）。遊戲選單有四個選項：劇情模式、遊戲玩法、快速遊玩、離開遊戲。",
    tools: "Unity、C++、Word",
    role: "負責遊戲主企劃、功能邏輯設計、技能系統統整與企畫書撰寫；使用 Unity 製作角色選單、技能觸發、畫面切換等互動。",
    reflection: "角色切換實現過程屢屢碰壁，後來改用較單純的「換皮模式」成功實現切換效果。這過程訓練了我的問題解決能力，也讓我學會遇到困難時尋找簡潔穩定的方案。",
    award: ""
  },

  /* ───────── 微笑貸朲 ───────── */
  {
    title: "微笑貸朲",
    category: "AI 生成 · 攝影比賽",
    cover: "assets/images/01微笑貸朲 (1).jpg",
    images: [
      "assets/images/01微笑貸朲 (1).jpg",
      "assets/images/02微笑貸朲 (1).jpg",
      "assets/images/03微笑貸朲 (1).jpg",
      "assets/images/04微笑貸朲 (1).jpg",
      "assets/images/微笑貸款_參賽證明-1.jpg",
      "assets/images/微笑貸朲_佳作-1.jpg"
    ],
    video: null,
    intro: "作品有四張，描述一顆櫻花樹生平的起承轉合。花語：山櫻的花語是「對你微笑」。人們土地開發、工廠建造、廢棄物汙染排放，讓原本完好的大自然從生機蓬勃逐漸走向乾枯。大自然借給人們它身上最美好的東西，也希望人們給予回報，卻遭到不愛惜的人們踐踏。一分微笑，一分代價——自然以千山萬水投桃之際，換以世界回歸乾淨和平。",
    tools: "海藝（AI 生成圖片工具）",
    role: "",
    reflection: "這是大學第一次自己參與比賽，花了很久時間構思、也換過主題。我學到了如何給 AI 下指令、與 AI 共處，更學到如何將腦內的抽象想法具象化。",
    award: "2024 全國學生攝影比賽 — AI 組佳作"
  },

  /* 2 ───────── 喝永和，萬事和 ───────── */
  {
    title: "喝永和，萬事和",
    category: "影片 · 時報金犢獎",
    cover: "",
    images: [],
    video: "assets/videos/final A.mp4",
    intro: "兩個女生因為工作關係鬧得不愉快，中午能量即將耗盡之時，豆寶及時跳出來解救飢餓之軀，緩和了即將引爆的氣氛，最後大家愉快地一起喝永和豆漿。",
    tools: "Adobe Premiere Pro",
    role: "影片畫面 — 我負責腳本、剪輯及部分拍攝。",
    reflection: "",
    award: "2024 時報金犢獎 — 入圍兩項"
  },

  /* 3 ───────── 德明宿舍宣傳影片 ───────── */
  {
    title: "德明宿舍宣傳影片",
    category: "影片 · 學校宣傳",
    cover: "",
    images: [],
    video: "https://www.youtube.com/watch?v=j4tCeqcfA0E",
    intro: "幫學校拍攝的宿舍宣傳影片，內容包含住宿好處、可使用設施以及周邊環境。",
    tools: "Adobe Premiere Pro",
    role: "影片畫面 — 我負責演員、主要剪輯及部分拍攝項目。",
    reflection: "",
    award: ""
  },

  /* 4 ───────── Seamount 金面山 ───────── */
  {
    title: "Seamount 金面山",
    category: "文創 · 吉祥物設計",
    cover: "assets/images/D11122131_張芷瑄_seamount.JPG",
    images: [
      "assets/images/D11122131_張芷瑄_seamount.JPG"
    ],
    video: null,
    intro: "金面山文創比賽作品。概念是宇宙中的水母——金面山有三條路線可上山，行走路線圍繞起來像水母外型，於是發想此概念。設計出三隻吉祥物：溫暖善解人意的水母、害羞內向的蛤蜊、以及擁有強壯手臂的螃蟹，並以牠們為主角設計多項周邊商品（貼紙、鑰匙圈、杯墊、帆布袋）。",
    tools: "Adobe Illustrator、Procreate",
    role: "",
    reflection: "",
    award: ""
  },

  /* 5 ───────── 寵物&公園 商品包裝 ───────── */
  {
    title: "寵物&公園 商品包裝",
    category: "包裝設計",
    cover: "assets/images/D11122131張芷瑄森活隨行文創比賽.jpg",
    images: ["assets/images/D11122131張芷瑄森活隨行文創比賽.jpg"],
    video: null,
    intro: "虛構品牌「寵物&公園」的商品包裝提案。設計理念是把在寵物公園開心玩耍的狗狗模樣保存下來，設計了三個圖樣印在杯子上，並延伸出整體包裝。圖像風格結合童趣與簡潔排版，強調包裝的延伸性與商業應用。",
    tools: "Procreate、Photoshop",
    role: "",
    reflection: "",
    award: ""
  },

  /* 5 ───────── 學校宣傳 banner ───────── */
  {
    title: "德明科大 招生宣傳 Banner",
    category: "平面設計 · 學校宣傳",
    coverFit: "contain",   // 寬幅 banner：卡片完整顯示、不裁切
    cover: "assets/images/1001交叉查榜-1RGB_工作區域 1 (1).jpg",
    images: [
      "assets/images/1001交叉查榜-1RGB_工作區域 1 (1).jpg",
      "assets/images/1001交叉查榜-2RGB_工作區域 1 (1).jpg",
      "assets/images/1001交叉查榜-3RGB_工作區域 1 (1).jpg"
    ],
    video: null,
    intro: "為德明財經科技大學設計的招生宣傳 Banner，主打「大四全年實習、薪資最高」「科技引領未來」「財經成就夢想」等亮點，並實際運用於校外實體看板。",
    tools: "平面設計",
    role: "",
    reflection: "",
    award: ""
  },

  /* 6 ───────── 怕冷的企鵝 ───────── */
  {
    title: "怕冷的企鵝",
    category: "插畫 · 繪本",
    cover: "assets/images/D11122131張芷瑄_怕冷的企鵝 (1).jpg",
    images: [
      "assets/images/D11122131張芷瑄_怕冷的企鵝 (1).jpg"
    ],
    video: null,
    intro: "以市面上的繪本參考其文字內容，繪畫出新的風格圖樣。故事主角是一隻怕冷的企鵝，小鳥們邀請企鵝到熱帶雨林，齊心協力跨越阻礙……",
    tools: "Procreate",
    role: "",
    reflection: "這是第一次畫繪本類型的創作，只透過文字想像實際畫面非常好玩。我學到各種東西有不同的材質畫法，需要依照物種做上色的調整。",
    award: ""
  },

  /* 7 ───────── 手繪企鵝 ───────── */
  {
    title: "手繪企鵝",
    category: "插畫 · 手繪",
    cover: "assets/images/企鵝.png",
    images: ["assets/images/企鵝.png"],
    video: null,
    intro: "",
    tools: "Procreate",
    role: "",
    reflection: "",
    award: ""
  },

  /* 7 ───────── 旗袍少女 ───────── */
  {
    title: "旗袍少女",
    category: "插畫",
    cover: "assets/images/未命名的作品 3.jpg",
    images: ["assets/images/未命名的作品 3.jpg"],
    video: null,
    intro: "本作品以都市住宅為背景，一位身穿旗袍的少女向觀眾伸出手，面帶微笑。",
    tools: "Procreate",
    role: "",
    reflection: "",
    award: ""
  },

  /* 8 ───────── 媒rry christmas ───────── */
  {
    title: "媒rry christmas",
    category: "活動海報",
    cover: "assets/images/媒arry christmas.png",
    images: ["assets/images/媒arry christmas.png"],
    video: null,
    intro: "媒計系 18 屆聖誕節活動時程表海報。",
    tools: "Canva 排版",
    role: "",
    reflection: "",
    award: ""
  },

  /* 9 ───────── 媒玩媒了 ───────── */
  {
    title: "媒玩媒了",
    category: "活動海報",
    cover: "assets/images/媒玩媒了_媒計系迎新行程表海報.jpg",
    images: ["assets/images/媒玩媒了_媒計系迎新行程表海報.jpg"],
    video: null,
    intro: "媒計系 18 屆迎新活動時程表海報（漆彈主題樂園）。",
    tools: "Procreate（繪製肉片、吉祥物的裝備）、Canva（排版）",
    role: "",
    reflection: "",
    award: ""
  }
];
