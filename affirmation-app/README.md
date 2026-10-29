# Crowned Daily

A daily affirmation web app for Black women in business, with an Apple-style glassmorphic design: frosted panels, soft drifting color fields, and automatic light and dark modes.

## Run it

There's no build step. Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

Then go to http://localhost:8000. On an iPhone, open the page in Safari and choose **Share → Add to Home Screen** to use it like an app.

## Features

- **Affirmation of the day:** the same one all day, with a new one each day
- **Themes:** Confidence, Worth, Leadership, Growth, Legacy, Rest, Community
- **Another:** shows a different affirmation from the selected theme
- **Save:** keeps favorites on your device
- **Share:** uses the phone's share sheet, or copies the text on desktop
- **Daily streak** and a personalized greeting (tap the crown to add your name)

## Files

| File | Purpose |
|---|---|
| `index.html` | Page structure |
| `styles.css` | Glass design, light and dark themes |
| `app.js` | App logic |
| `affirmations.js` | The affirmation library. Add or edit entries here. |
