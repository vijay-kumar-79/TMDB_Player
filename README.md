# TMDB Streamer

**TMDB Streamer** is a browser extension that seamlessly integrates a "Play" button into [The Movie Database (TMDB)](https://www.themoviedb.org/) website. It allows you to select from multiple streaming servers directly from the movie or TV show page, enhancing your browsing experience.

## Features

* **Native Integration:** Adds a "Play" button that matches TMDB's native design (located in the actions bar).
* **Server Selection:** Includes a dropdown menu with multiple server options.
* **Smart Detection:** Automatically detects whether you are viewing a Movie or a TV Show.
* **Clean UI:** Features a dark mode-compatible dropdown that blends perfectly with TMDB's interface.

---

## Installation

### Manual Installation

#### For Chromium-based Browsers (Chrome, Edge, Brave, Opera, etc.)

1.  Download the `chrome.crx` file from the **Releases** page.
    * *Note: You might see a warning saying, "We can't add apps, extensions, or user scripts from this website." However, the .crx file will still be downloaded.*
2.  Open your browser and navigate to the extensions page:
    * **Chrome:** Type `chrome://extensions/` in the address bar.
    * **Edge:** Type `edge://extensions/` in the address bar.
    * **Brave/Opera:** Go to your browser menu > Extensions.
3.  Enable **Developer mode** (usually a toggle in the top-right corner).
4.  Drag and drop the downloaded `tmdb_player-chromium-x.x.x.crx` file onto the extensions page.
5.  The TMDB Player extension will be added to your browser. Once installed, you can disable Developer mode if you desire.

> **Note:** When using this method, the extension will not update automatically when a new version is released. To ensure you have the latest version of the TMDB Player extension, repeat the steps above whenever a new release is available.

#### For Firefox

1.  Download the `firefox.xpi` file from the **Releases** page.
2.  Open Firefox and navigate to `about:addons`.
3.  Click on the gear icon (⚙️) and select **Install Add-on From File...**.
4.  Choose the downloaded `.xpi` file to install the extension.

---

## Usage

1.  Navigate to any movie or TV show page on [TheMovieDB.org](https://www.themoviedb.org/).
2.  Look for the **"Play"** button in the actions bar (next to "Play Trailer" or the "Heart/Favorite" icons).
3.  Click **Play** to open the server dropdown.
4.  Select a server (e.g., *Ekko*, *Ryze*) to open the stream in a new tab.

## Disclaimer

This extension is a client-side tool that modifies the DOM of TMDB pages to provide external links. It does not host any content. The user is responsible for the content they access.
