# Ebrahiem Slamang — eportfolio

Responsive static portfolio for a final-year Electrical and Computer Engineering student at UCT.

## Preview

Open `index.html` in a browser, or serve the folder:

```sh
python -m http.server 8000
```

Then visit http://localhost:8000. No build step or package installation is required. Google Fonts are optional network requests; local fallback fonts are defined.

## Files

- `index.html`: profile, projects, experience, skills and contact links
- `css/styles.css`: responsive design tokens and layouts
- `js/script.js`: navigation, reading progress and current-section indicators
- `images/`: original portfolio assets
- `Ebrahiem_Slamang_CV.pdf`: original supplied portfolio CV
- `DESIGN.md`: design direction for future edits

## Using the design repositories

These references do not need to run in the website.

Taste Skill's documented local agent installation command is:

```sh
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

Run it from your local development project and select your supported coding agent when prompted. This installs agent guidance, not a ChatGPT Work plugin. Alternatively attach the desired `SKILL.md` in a conversation.

Awesome DESIGN.md is a collection of design specifications, not an executable plugin. Copy a chosen `DESIGN.md` into a project and ask your agent to follow it. This portfolio includes its own tailored `DESIGN.md`; do not overwrite it unless you intend to change the visual direction.

## Accessibility

Semantic sections, skip link, focus indicators, keyboard-friendly native project disclosures, Escape-to-close navigation, reduced motion and responsive single-column mobile layouts. The site remains readable without JavaScript. External links opened in a new tab use `rel="noopener"`.

## Content notes

Project descriptions are based on the supplied portfolio, user-provided project context and the project READMEs. The radar project is complete and links to its GitHub repository; the Project Icicle card links to the buoy dashboard repository. No accuracy or performance claims have been added. The original illustration for the radar project is retained and should not be mistaken for new experimental results. Replace it with your own measurement figure when ready.
