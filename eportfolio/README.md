# Ebrahiem Slamang — Engineering ePortfolio

A single-page eportfolio built with plain HTML, CSS and JavaScript (no
frameworks, no build step) — ready to push straight to GitHub and deploy
on Vercel.

**Design concept:** a dark lab/oscilloscope aesthetic — a "signal trace"
runs down the page as a vertical rail, lighting up section by section as
you scroll, and a live waveform animates in the hero. It's built around
the engineering identity on the CV: control systems, RF/electromagnetics,
and machine learning for medical imaging.

## Folder structure

```
eportfolio/
├── index.html              ← all page content lives here
├── css/
│   └── styles.css          ← design system + all styling/animations
├── js/
│   └── script.js           ← nav, scroll effects, reveals, count-up stats
├── images/
│   └── headshot.jpg         ← your photo (pulled from your CV)
├── Ebrahiem_Slamang_CV.pdf  ← linked from the "Download CV" button
└── README.md
```

## 1. Preview it locally

You can just double-click `index.html` to open it in a browser. For the
smoothest experience (and so relative paths behave exactly like they will
online), serve it locally instead:

```bash
cd eportfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

## 2. Customise it

- **Photos:** everything except `images/headshot.jpg` is a placeholder
  from picsum.photos (random stock-style images), used exactly so you can
  swap them for real photos later. Search `picsum.photos` in
  `index.html` to find every placeholder `<img>` tag — replace the `src`
  with your own image path (e.g. `images/uct-campus.jpg`) once you have
  real photos of campus, the golf club, marimba band, certificates, etc.
- **Text:** all copy lives directly in `index.html`, organised into
  clearly commented `<section>` blocks (Hero, About, Journey, Skills,
  Artefacts, Achievements, Involvement, Contact).
- **Colours/fonts:** every colour and font is a CSS variable at the top
  of `css/styles.css` (`:root { ... }`) — change `--trace-cyan` or
  `--trace-amber` there and it updates the whole site.
- **Contact links:** email, phone and LinkedIn are already wired up in
  the Contact section (`mailto:`, `tel:`, and your LinkedIn URL).

## 3. Push to GitHub

```bash
cd eportfolio
git init
git add .
git commit -m "Initial eportfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(Create the empty repo on GitHub first via "New repository" — don't
initialise it with a README so there's no merge conflict.)

## 4. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New → Project**, then select your repository.
3. Framework preset: choose **Other** (this is a static site — no build
   command or output directory needed; leave those fields blank/default).
4. Click **Deploy**. Vercel will give you a live URL
   (e.g. `your-repo.vercel.app`) — that's the single link to hand in.

Every time you `git push` to `main` afterwards, Vercel redeploys
automatically.

## Notes on the assessment criteria

- **Navigation:** sticky top nav with smooth-scroll anchor links, a
  scroll-progress bar, and a mobile hamburger menu.
- **Layout/design:** consistent "signal trace" motif (rail + nodes,
  oscilloscope waveform, control-panel modules) ties every section back
  to the engineering subject matter rather than a generic template.
- **Artefacts:** a dedicated section with evidence cards (tutoring role,
  Olympiad certificates, leadership camp) — swap placeholder images for
  scans/photos of the real certificates when you have them.
- **Accessibility/polish:** keyboard focus states, `prefers-reduced-motion`
  support, alt text on every image, and a skip-to-content link.
