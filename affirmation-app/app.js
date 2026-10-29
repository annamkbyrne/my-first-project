// Crowned Daily — app logic. No build step, no dependencies.

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable (private mode) — app still works for this visit */
    }
  },
};

const $ = (id) => document.getElementById(id);

const state = {
  theme: "All",
  current: null,
  favorites: store.get("favorites", []),
  name: store.get("name", ""),
};

// ---------- Daily pick ----------

function dayKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

// Same affirmation for everyone on a given day, so "today's" stays stable on reload.
function dailyIndex(length) {
  let hash = 0;
  for (const ch of dayKey()) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return hash % length;
}

function pool() {
  return state.theme === "All"
    ? AFFIRMATIONS
    : AFFIRMATIONS.filter((a) => a.theme === state.theme);
}

function pickDaily() {
  const list = pool();
  return list[dailyIndex(list.length)];
}

function pickRandom() {
  const list = pool();
  if (list.length < 2) return list[0];
  let next;
  do next = list[Math.floor(Math.random() * list.length)];
  while (next === state.current);
  return next;
}

// ---------- Rendering ----------

function show(affirmation) {
  const el = $("affirmation");
  el.classList.add("fading");
  setTimeout(() => {
    state.current = affirmation;
    el.textContent = affirmation.text;
    $("theme-chip").textContent = affirmation.theme;
    updateFavButton();
    el.classList.remove("fading");
  }, 250);
}

function updateFavButton() {
  const saved = isFavorite(state.current);
  $("fav-btn").setAttribute("aria-pressed", String(saved));
  $("fav-btn").querySelector("span").textContent = saved ? "Saved" : "Save";
}

function renderGreeting() {
  const hour = new Date().getHours();
  const part = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  $("greeting").textContent = `${part}, ${state.name || "Queen"}`;
  $("avatar-initial").textContent = state.name ? state.name[0].toUpperCase() : "♛";
  $("today-date").textContent = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function renderThemes() {
  const nav = $("themes");
  nav.innerHTML = "";
  for (const theme of THEMES) {
    const btn = document.createElement("button");
    btn.className = "segment";
    btn.textContent = theme;
    btn.setAttribute("aria-pressed", String(theme === state.theme));
    btn.addEventListener("click", () => {
      state.theme = theme;
      renderThemes();
      show(theme === "All" ? pickDaily() : pickRandom());
    });
    nav.appendChild(btn);
  }
}

function renderFavorites() {
  const list = $("fav-list");
  list.innerHTML = "";
  for (const fav of state.favorites) {
    const li = document.createElement("li");
    const text = document.createElement("div");
    text.className = "fav-text";
    text.textContent = fav.text;
    const theme = document.createElement("span");
    theme.className = "fav-theme";
    theme.textContent = fav.theme;
    text.appendChild(theme);

    const remove = document.createElement("button");
    remove.className = "remove-btn";
    remove.setAttribute("aria-label", "Remove from favorites");
    remove.textContent = "×";
    remove.addEventListener("click", () => toggleFavorite(fav));

    li.append(text, remove);
    list.appendChild(li);
  }
  $("fav-count").textContent = state.favorites.length;
  $("fav-empty").hidden = state.favorites.length > 0;
}

// ---------- Streak ----------

function updateStreak() {
  const today = dayKey();
  const yesterday = dayKey(new Date(Date.now() - 86400000));
  const streak = store.get("streak", { last: null, count: 0 });

  if (streak.last !== today) {
    streak.count = streak.last === yesterday ? streak.count + 1 : 1;
    streak.last = today;
    store.set("streak", streak);
  }
  $("streak").textContent = `🔥 ${streak.count} day${streak.count === 1 ? "" : "s"}`;
}

// ---------- Favorites ----------

function isFavorite(a) {
  return !!a && state.favorites.some((f) => f.text === a.text);
}

function toggleFavorite(a) {
  if (isFavorite(a)) {
    state.favorites = state.favorites.filter((f) => f.text !== a.text);
    toast("Removed from saved");
  } else {
    state.favorites = [a, ...state.favorites];
    toast("Saved ♥");
  }
  store.set("favorites", state.favorites);
  renderFavorites();
  updateFavButton();
}

// ---------- Share ----------

async function share() {
  const text = `“${state.current.text}” — Crowned Daily`;
  if (navigator.share) {
    try {
      await navigator.share({ text });
    } catch {
      /* user cancelled */
    }
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  } catch {
    toast("Couldn't copy — try long-pressing the text");
  }
}

// ---------- Toast ----------

let toastTimer;
function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2000);
}

// ---------- Name dialog ----------

function setupNameDialog() {
  const dialog = $("name-dialog");
  const input = $("name-input");
  $("name-btn").addEventListener("click", () => {
    input.value = state.name;
    dialog.showModal();
    input.focus();
  });
  dialog.addEventListener("close", () => {
    if (dialog.returnValue !== "save") return;
    state.name = input.value.trim();
    store.set("name", state.name);
    renderGreeting();
  });
}

// ---------- Init ----------

$("fav-btn").addEventListener("click", () => toggleFavorite(state.current));
$("share-btn").addEventListener("click", share);
$("next-btn").addEventListener("click", () => show(pickRandom()));

renderGreeting();
renderThemes();
renderFavorites();
updateStreak();
setupNameDialog();

state.current = pickDaily();
$("affirmation").textContent = state.current.text;
$("theme-chip").textContent = state.current.theme;
updateFavButton();
