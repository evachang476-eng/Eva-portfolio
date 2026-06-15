/* ============================================================
   主程式 — 渲染個人資料、作品卡片、作品詳情燈箱。
   一般情況下不需要修改這個檔案。
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 小工具 ---------- */
  function esc(s) {
    return String(s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function ytId(src) {
    const m = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
    return m ? m[1] : null;
  }
  function vimeoId(src) {
    const m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    return m ? m[1] : null;
  }
  function isLocalVideo(src) { return src && !ytId(src) && !vimeoId(src); }

  // 把原圖路徑換成輕量縮圖路徑（assets/images/X.png -> assets/thumbnails/X.jpg）
  function thumb(src) {
    if (!src || src.indexOf("assets/images/") !== 0) return src;
    const file = src.slice("assets/images/".length).replace(/\.[^.]+$/, "");
    return "assets/thumbnails/" + file + ".jpg";
  }

  // 取得作品的第一段影片（支援 video 單一 或 videos 陣列）
  function firstVideo(w) { return w.video || (w.videos && w.videos[0]) || null; }

  // 圖片可能是字串，或 { src, cap } 物件；統一取出路徑
  function imgSrc(im) { return typeof im === "string" ? im : (im && im.src) || ""; }
  function imgCap(im) { return typeof im === "string" ? "" : (im && (im.cap || im.caption)) || ""; }

  // 把作品的所有媒體整理成一個清單（影片在前、圖片在後）
  function buildMediaList(w) {
    const list = [];
    // 影片在前（點開先播放影片），圖片接在後面
    if (w.videos && w.videos.length) w.videos.forEach(function (v) { list.push({ type: "video", src: v }); });
    else if (w.video) list.push({ type: "video", src: w.video });
    (w.images || []).forEach(function (im) { list.push({ type: "image", src: imgSrc(im), caption: imgCap(im) }); });
    return list;
  }

  // 取得作品的封面（優先 cover，其次第一張圖，影片用 YouTube 封面）
  function coverOf(w) {
    if (w.cover) return thumb(w.cover);
    if (w.images && w.images.length) return thumb(imgSrc(w.images[0]));
    const v = firstVideo(w);
    if (v) {
      const id = ytId(v);
      if (id) return "https://img.youtube.com/vi/" + id + "/hqdefault.jpg";
    }
    return null;
  }

  /* ---------- 套用個人資料 ---------- */
  function applyProfile() {
    if (typeof PROFILE === "undefined") return;
    document.getElementById("heroSave").textContent = PROFILE.saveTitle;
    document.getElementById("heroName").textContent = PROFILE.name + "作品集";
    document.getElementById("heroLoading").textContent = PROFILE.loading;
    document.getElementById("aboutIntro").textContent = PROFILE.intro;

    const skills = document.getElementById("skills");
    skills.innerHTML = (PROFILE.skills || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("");

    const mail = document.getElementById("contactEmail");
    mail.textContent = PROFILE.email;
    mail.href = "mailto:" + PROFILE.email;

    document.getElementById("social").innerHTML = (PROFILE.social || []).map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + "</a>";
    }).join("");
  }

  /* ---------- 大四實習短影音 ---------- */
  function renderShorts() {
    const section = document.getElementById("shorts");
    const groups = (typeof SHORTS !== "undefined" && SHORTS.groups) ? SHORTS.groups : [];
    const hasItems = groups.some(function (g) { return g.items && g.items.length; });
    if (!hasItems) { if (section) section.style.display = "none"; return; }

    document.getElementById("shortsTitle").textContent = SHORTS.title;
    document.getElementById("shortsDesc").textContent = SHORTS.desc || "";

    const wrap = document.getElementById("shortsGrid");
    wrap.innerHTML = "";

    groups.forEach(function (g) {
      if (!g.items || !g.items.length) return;
      // 品牌標題
      const label = document.createElement("h4");
      label.className = "shorts__brand reveal";
      label.textContent = g.brand;
      wrap.appendChild(label);
      // 該品牌的卡片列
      const row = document.createElement("div");
      row.className = "shorts";
      g.items.forEach(function (it) {
        const card = document.createElement("div");
        card.className = "short reveal";
        const media = it.thumb
          ? '<img src="' + thumb(it.thumb) + '" alt="' + esc(it.title) + '" loading="lazy" />'
          : '<div class="short__ph"><span class="short__brand">' + esc(g.brand) + "</span></div>";
        card.innerHTML =
          '<div class="short__media">' + media +
            '<div class="short__play"></div>' +
          "</div>" +
          '<div class="short__title">' + esc(it.title) + "</div>";
        // 點擊 → 在網站內直接播放（直式播放器）
        card.addEventListener("click", function () {
          openLightbox({
            title: it.title,
            category: g.brand,
            video: it.video,
            poster: it.thumb ? thumb(it.thumb) : "",
            images: [],
            intro: "", tools: "", role: "", reflection: "", award: "",
            shopUrl: it.url,
            portrait: true
          });
        });
        row.appendChild(card);
      });
      wrap.appendChild(row);
    });
  }

  /* ---------- 建立作品卡片 ---------- */
  const grid = document.getElementById("grid");

  function buildCards() {
    grid.innerHTML = "";
    WORKS.forEach(function (w, i) {
      const card = document.createElement("div");
      card.className = "card reveal";

      const cover = coverOf(w);
      const fv = firstVideo(w);
      let media;
      if (cover) {
        media = '<img src="' + cover + '" alt="' + esc(w.title) + '" loading="lazy" />';
      } else if (isLocalVideo(fv)) {
        media = '<video src="' + fv + '" muted preload="metadata"></video>';
      } else {
        media = '<div class="card__placeholder"><span class="big">🐾</span><small>圖片準備中</small></div>';
      }

      const playBtn = fv ? '<div class="card__play"></div>' : "";
      const fitClass = w.coverFit === "contain" ? " card__media--contain" : "";

      card.innerHTML =
        '<div class="card__media' + fitClass + '">' +
          '<span class="card__badge">' + esc(w.category || "") + "</span>" +
          media + playBtn +
        "</div>" +
        '<div class="card__body">' +
          '<div class="card__title">' + esc(w.title) + "</div>" +
          (w.award ? '<div class="card__award">' + esc(w.award) + "</div>" : "") +
        "</div>";

      card.addEventListener("click", function () { openLightbox(w); });
      grid.appendChild(card);
    });
    observeReveal();
  }

  /* ---------- 作品詳情燈箱 ---------- */
  const lb = document.getElementById("lightbox");
  const lbMedia = document.getElementById("lbMedia");
  const lbCaption = document.getElementById("lbCaption");
  const lbThumbs = document.getElementById("lbThumbs");
  const lbInfo = document.getElementById("lbInfo");

  // 把一個媒體項目（影片或圖片）渲染成燈箱主畫面
  function renderMedia(item, poster) {
    if (!item) return '<div class="lb__placeholder"><span class="big">🐾</span><span>此作品圖片準備中</span></div>';
    if (item.type === "video") {
      const id = ytId(item.src);
      if (id) {
        // 直接開檔案（file://）時 YouTube 無法嵌入，改成可點擊封面前往 YouTube
        if (location.protocol === "file:") {
          return '<a class="lb__ytlink" href="https://www.youtube.com/watch?v=' + id +
            '" target="_blank" rel="noopener" style="background-image:url(https://img.youtube.com/vi/' + id +
            '/hqdefault.jpg)"><span class="lb__ytplay"></span><span class="lb__yttext">在 YouTube 觀看 ↗</span></a>';
        }
        return '<iframe src="https://www.youtube-nocookie.com/embed/' + id +
          '?rel=0&playsinline=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
      }
      const vid = vimeoId(item.src);
      if (vid) return '<iframe src="https://player.vimeo.com/video/' + vid + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
      return '<video src="' + item.src + '" ' + (poster ? 'poster="' + poster + '" ' : "") +
        'controls autoplay playsinline preload="auto"></video>';
    }
    return '<img src="' + item.src + '" alt="" class="lb__gallery-img" />';
  }

  function openLightbox(w) {
    const media = buildMediaList(w);

    lbMedia.className = "lb__media" + (w.portrait ? " lb__media--portrait" : "");
    lbMedia.innerHTML = renderMedia(media[0] || null, w.poster);
    lbCaption.textContent = (media[0] && media[0].caption) || "";

    // 縮圖切換列（多於一個媒體時才顯示）
    lbThumbs.innerHTML = "";
    if (media.length > 1) {
      media.forEach(function (item, i) {
        let el;
        if (item.type === "image") {
          el = document.createElement("img");
          el.src = thumb(item.src);
        } else {
          el = document.createElement("span");
          el.className = "lb__vthumb";
          el.textContent = "▶";
          const id = ytId(item.src);
          if (id) el.style.backgroundImage = "url(https://img.youtube.com/vi/" + id + "/mqdefault.jpg)";
        }
        if (i === 0) el.classList.add("active");
        el.addEventListener("click", function () {
          lbMedia.innerHTML = renderMedia(item, w.poster);
          lbCaption.textContent = item.caption || "";
          lbThumbs.querySelectorAll(".active").forEach(function (x) { x.classList.remove("active"); });
          el.classList.add("active");
          lbMedia.scrollIntoView({ block: "nearest" });
        });
        lbThumbs.appendChild(el);
      });
    }

    // 文字資訊
    let html = "";
    if (w.category) html += '<span class="lb__badge">' + esc(w.category) + "</span>";
    html += '<h3 class="lb__title">' + esc(w.title) + "</h3>";
    if (w.award) html += '<div class="lb__award">' + esc(w.award) + "</div>";
    if (w.intro) html += field("📖 作品簡介", w.intro);
    if (w.tools) html += field("🛠 技術運用 / 工具", w.tools);
    if (w.role) html += field("🎬 我的角色 / 分工", w.role);
    if (w.reflection) html += field("💡 成果與反思", w.reflection);
    if (w.shopUrl) html += '<a class="lb__shop" href="' + w.shopUrl + '" target="_blank" rel="noopener">在蝦皮觀看原影片 ↗</a>';
    lbInfo.innerHTML = html;

    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function field(label, text) {
    return '<div class="lb__field"><h4>' + label + "</h4><p>" + esc(text) + "</p></div>";
  }

  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbMedia.innerHTML = "";       // 停止影片
    document.body.style.overflow = "";
  }

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lb.classList.contains("open")) closeLightbox();
  });

  /* ---------- 導覽列 ---------- */
  const nav = document.getElementById("nav");
  window.addEventListener("scroll", function () { nav.classList.toggle("scrolled", window.scrollY > 30); });
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav__links");
  toggle.addEventListener("click", function () { links.classList.toggle("open"); });
  links.addEventListener("click", function (e) { if (e.target.tagName === "A") links.classList.remove("open"); });

  /* ---------- 進場動畫 ---------- */
  let io;
  function observeReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    }
    document.querySelectorAll(".reveal:not(.in)").forEach(function (el) { io.observe(el); });
  }

  /* ---------- 啟動 ---------- */
  applyProfile();
  renderShorts();
  buildCards();
  // 作品大區塊（#work）很高，不套整區動畫，避免在窄螢幕上隱藏全部子元素；
  // 其餘區塊（首頁/關於/聯絡）仍淡入。
  document.querySelectorAll(".section").forEach(function (el) {
    if (el.id !== "work") el.classList.add("reveal");
  });
  observeReveal();

  // 失效保險：載入後若仍有元素卡在隱形（極端情況），一律顯示出來
  window.addEventListener("load", function () {
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.in)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 1.2) el.classList.add("in");
      });
    }, 400);
  });
})();
