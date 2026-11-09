# fitnessforge.online

Static site for Fitness Forge, hosted on GitHub Pages from `main` (repo `informationfitnessforge/informationfitnessforge.github.io`).

- `index.html`: home page
- `forge/`, `about/`, `contact/`: the other pages (each repeats the shared header and footer)
- `testimonials/`: client testimonials; one featured quote for now (`.quote-feature`), switch to the `.quotes` grid once there are several
- `forge.js`: the goals, consultations, add-ons and prices (edit `GOALS` / `ADDONS` to change offerings), and the "Send Word to the Forge" form, which sends through Web3Forms (free; key in `FORM_KEY`, set up under information.fitness.forge@gmail.com)
- `site.js`: footer year and current-page highlight in the menu
- `styles.css`: styles

When you change `styles.css`, `site.js` or `forge.js`, bump the `?v=` number on their links in every page. GitHub Pages lets browsers cache files for 10 minutes, so without it a visitor can get a new page with an old script.
- `CNAME`: custom domain for GitHub Pages

## Photos

All openly licensed via Wikimedia Commons (credited in the site footer):

| File | Source | License |
|---|---|---|
| `hero-fire.jpg` | [Closeup of raging flames in a large bonfire](https://commons.wikimedia.org/wiki/File:Closeup_of_raging_flames_in_a_large_bonfire._-_Flickr_-_shixart1985.jpg), Nenad Stojkovic | CC BY 2.0 |
| `goal-weight.jpg` | [Healthy meal planning with fresh fruits and vegetables](https://commons.wikimedia.org/wiki/File:Healthy_meal_planning_with_fresh_fruits_and_vegetables_in_a_bright_kitchen_setting.jpg), Nenad Stojkovic | CC BY 2.0 |
| `goal-cardio.jpg` | [Ederle Gym Spin Cycle Class Photo 1](https://commons.wikimedia.org/wiki/File:Ederle_Gym_Spin_Cycle_Class_Photo_1_(6382546).jpg), Pfc. Trinity Carter, U.S. Army | Public domain |
| `goal-strength.jpg` | [Marines' voices echo, prompt new gym hours](https://commons.wikimedia.org/wiki/File:Marines%27_voices_echo,_prompt_new_gym_hours_150927-M-AI083-067.jpg), Lance Cpl. Jason Jimenez, USMC | Public domain |
| `goal-mixed.jpg` | [Healthy lifestyle focus with weights and fresh fruits on a kitchen countertop](https://commons.wikimedia.org/wiki/File:Healthy_lifestyle_focus_with_weights_and_fresh_fruits_on_a_kitchen_countertop.jpg), Nenad Stojkovic | CC BY 2.0 |
| `goal-other.jpg` | [Blacksmith's fire](https://commons.wikimedia.org/wiki/File:Blacksmith%27s_fire_(30148481152).jpg), David Whelan | CC0 |
