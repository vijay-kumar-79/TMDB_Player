// --- HELPER FUNCTIONS (URL Parsing) ---
function getTmdbParams() {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);

  if (segments[0] === 'movie') {
    return { type: 'movie', id: segments[1].split('-')[0] };
  } else if (segments[0] === 'tv') {
    const id = segments[1].split('-')[0];
    let season = 1, episode = 1;
    const seasonIndex = segments.indexOf('season');
    const episodeIndex = segments.indexOf('episode');
    if (seasonIndex !== -1 && segments[seasonIndex + 1]) season = segments[seasonIndex + 1];
    if (episodeIndex !== -1 && segments[episodeIndex + 1]) episode = segments[episodeIndex + 1];
    return { type: 'tv', id: id, season: season, episode: episode };
  }
  return null;
}

function getLink(serverNumber, params) {
  let src = '';
  if (params.type === 'movie') {
    switch (serverNumber) {
      case 1: src = `https://vidsrc.cc/v3/embed/movie/${params.id}?autoPlay=false`; break;
      case 2: src = `https://moviesapi.club/movie/${params.id}`; break;
      case 3: src = `https://vidsrc.me/embed/movie?tmdb=${params.id}`; break;
      case 4: src = `https://player.videasy.net/movie/${params.id}`; break;
      case 5: src = `https://vidsrc.su/embed/movie/${params.id}`; break;
      case 6: src = `https://vidlink.pro/movie/${params.id}?title=true&poster=true&autoplay=false`; break;
    }
  } else if (params.type === 'tv') {
    switch (serverNumber) {
      case 1: src = `https://vidsrc.cc/v3/embed/tv/${params.id}/${params.season}/${params.episode}?autoPlay=false`; break;
      case 2: src = `https://moviesapi.club/tv/${params.id}-${params.season}-${params.episode}`; break;
      case 3: src = `https://vidsrc.me/embed/tv?tmdb=${params.id}&season=${params.season}&episode=${params.episode}`; break;
      case 4: src = `https://player.videasy.net/tv/${params.id}/${params.season}/${params.episode}?nextEpisode=true&episodeSelector=true`; break;
      case 5: src = `https://vidsrc.su/embed/tv/${params.id}/${params.season}/${params.episode}`; break;
      case 6: src = `https://vidlink.pro/tv/${params.id}/${params.season}/${params.episode}?title=true&poster=true&autoplay=false&nextbutton=true`; break;
    }
  }
  return src;
}

// --- MAIN INJECTION LOGIC ---
function injectButton() {
  if (document.getElementById('tmdb-stream-widget')) return true;

  const targetContainer = document.querySelector('ul.auto.actions');
  if (!targetContainer) return false;

  const params = getTmdbParams();
  if (!params) return true;

  // 1. Create the List Item Wrapper
  // We strictly use the classes provided in your snippet: "video flex items-center ml-1"
  // Note: We removed 'none' because we want it visible.
  const widgetLi = document.createElement('li');
  widgetLi.id = 'tmdb-stream-widget';
  widgetLi.className = 'video flex items-center ml-1';
  widgetLi.style.position = 'relative'; // Necessary for dropdown positioning

  // 2. Create the Anchor (Button)
  // We reuse "no_click play_trailer" so it looks IDENTICAL to the native button.
  const playBtn = document.createElement('a');
  playBtn.className = 'no_click play_trailer';
  playBtn.href = '#';
  playBtn.style.display = 'flex';       // Ensure flex behavior matches native
  playBtn.style.alignItems = 'center';  // Vertically align icon and text

  // Exact native HTML structure for the icon
  playBtn.innerHTML = `<span class="glyphicons_v2 play inverted"></span> Play`;

  // 3. Create the Dropdown
  const dropdown = document.createElement('div');
  dropdown.className = 'tmdb-server-dropdown hidden';

  const servers = ['Rakan', 'Bard', 'Xayah', 'Ekko', 'Naafiri', 'Ryze'];
  servers.forEach((name, index) => {
    const item = document.createElement('div');
    item.className = 'server-item';
    item.innerText = name;
    item.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const link = getLink(index + 1, params);
      if (link) window.open(link, '_blank');
      dropdown.classList.add('hidden'); // Close after selection
    };
    dropdown.appendChild(item);
  });

  // 4. Handle Click (CRITICAL: Stop Propagation)
  playBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // This is the Magic Line:
    // It tells TMDB's website: "Don't run your own scripts on this click!"
    // This prevents the actual trailer popup from trying to open.
    e.stopImmediatePropagation();

    dropdown.classList.toggle('hidden');
  });

  // Close dropdown when clicking elsewhere
  document.addEventListener('click', (e) => {
    if (!widgetLi.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  // 5. Inject
  widgetLi.appendChild(playBtn);
  widgetLi.appendChild(dropdown);
  targetContainer.appendChild(widgetLi);

  return true;
}

// --- INITIALIZATION ---
let attempts = 0;
const interval = setInterval(() => {
  attempts++;
  if (injectButton() || attempts >= 20) clearInterval(interval);
}, 500);

let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    setTimeout(() => {
      attempts = 0;
      // Re-run the interval logic for SPA navigation
      const retry = setInterval(() => {
        attempts++;
        if (injectButton() || attempts >= 20) clearInterval(retry);
      }, 500);
    }, 1000);
  }
}).observe(document, { subtree: true, childList: true });
