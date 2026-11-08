// The Forge: pick a goal, choose a consultation, add extras, then write an email with the plan.

const EMAIL = 'information.fitness.forge@gmail.com';

// Wording is Adam's own, from FitnessForge v2.
const ADDONS = {
  none: {
    name: 'None',
    price: '+$0',
    cost: { min: 0, max: 0 },
    lore: 'The metal is ready as it is; let the consultation alone shape it.',
    text: 'No add-ons. Just the consultation.',
  },
  flame: {
    name: 'Constant Flame',
    price: '+$10 / week',
    cost: { min: 10, max: 10, every: 'week' },
    lore: 'Continual heat to persuade any metal to be shaped according to its intended purpose.',
    text: 'Weekly accountability, progress tracking or updates: weekly email check-ins of quick phone calls (under 15 minutes).',
  },
  training: {
    name: 'Personal Forge Training',
    price: '+$20 / session',
    cost: { min: 20, max: 20 },
    lore: 'Experience guided demonstrations for crafting your goals by the hands of an expert craftsman.',
    text: 'Additional personal training session for exercise demonstration and technique critique to complement your consult; 15-30 minute extended consult, virtual or in person at limited locations.',
  },
  testing: {
    name: 'Testing the Fire',
    price: '+$50-150 / assessment',
    cost: { min: 50, max: 150 },
    lore: 'Assessment of skills in the forge and judgement by the wisest of masters.',
    text: 'Additional performance testing session to complement your consult; 15-30 minute extended consult, virtual or in person at limited locations.',
  },
  access: {
    name: 'Forgemaster Access',
    price: '+$250 / month',
    cost: { min: 250, max: 250, every: 'month' },
    lore: 'Gain access to the foremost sculpting and crafting knowledge in all the lands, directly in the palm of your hands.',
    text: 'Instant messaging for quick advice, support or feedback on your current plan to support serious goals; guaranteed responses within 1-2 hours, 8am to 8pm.',
  },
};

// Shown lowest to highest cost, whatever order a goal lists them in.
const ADDON_ORDER = Object.keys(ADDONS);
const DISCOUNT = 25;

const LORE = {
  quick: 'Appeal to the Forgemaster for advice from afar, learning the tips and tricks of the craft.',
  learner: 'Work face-to-face with the Forgemaster to learn how to craft your ideal tool from the hands of an expert.',
  apprentice: 'Long-term commitment to crafting under the Forgemaster involving extensive learning, close tracking, and evolution of student into master.',
};

const consult = (id, name, length, price, from, text) => ({ id, name, length, price, from, lore: LORE[id], text });

const STANDARD = [
  consult('quick', 'Quick Advice', '30 minutes', 45, true,
    'Thirty-minute session covering basic knowledge and planning for achieving your goal!'),
  consult('learner', 'Learner Consult', 'One hour', 100, true,
    'One-hour session covering knowledge, exploring modes of action, and creating personalized designs for achieving your goal!'),
  consult('apprentice', 'Extended Apprenticeship', 'One month: four weekly one-hour sessions', 375, true,
    'Four weekly one-hour sessions for knowledge endowment, actionable plans, tailored strategies, and regular readjustments to achieving your goal!'),
];

const GOALS = [
  {
    id: 'sculpt',
    name: 'Sculpt a New Physique',
    lore: 'Every good sculpture begins with a block of stone where only delicate and precise skill can uncover the work within.',
    blurb: 'Learn proper skills for weight management in order to lose weight, reduce fat, improve quality of life, and feel comfortable in your new body!',
    img: '/assets/goal-weight.jpg',
    alt: 'Hands writing a meal plan beside a bowl of fresh fruit and a salad',
    consults: STANDARD,
    addons: ['flame', 'access', 'testing'],
  },
  {
    id: 'foundations',
    name: 'Lay Strong Foundations',
    lore: 'The tallest towers require a firm and stable foundation, one laid with the best iron and architected with the most skillful hands.',
    blurb: 'Utilize the very best techniques to increase muscle mass and strength, allowing you to look and feel stronger than ever before!',
    img: '/assets/goal-strength.jpg',
    alt: 'A rack of heavy dumbbells in a gym',
    consults: STANDARD,
    addons: ['flame', 'training', 'access', 'testing'],
  },
  {
    id: 'furnace',
    name: 'Upgrade the Furnace that Fuels',
    lore: 'Only the strongest of flames can forge the sharpest of blades within the heart of the furnace.',
    blurb: 'Use the best tools to improve cardiovascular health by training the most important muscle of the body, the heart, keeping the body’s furnace burning strong and ensuring you feel as fit as possible!',
    img: '/assets/goal-cardio.jpg',
    alt: 'Silhouettes of people riding bikes in a spin class',
    consults: STANDARD,
    addons: ['flame', 'training', 'access', 'testing'],
  },
  {
    id: 'masterwork',
    name: 'Forge the Ultimate Work of Art',
    lore: 'The best tool is one that is pieced together in the hottest flames, crafted of the strongest materials, and carved with expert precision.',
    blurb: 'Combine skills from cardiovascular training, building muscle, and managing weight for an integrated approach to achieving the best version of you!',
    img: '/assets/goal-mixed.jpg',
    alt: 'A hand lifting a dumbbell over a spread of fresh fruit',
    consults: [
      consult('quick', 'Quick Advice', '45 minutes', 75, true,
        'Forty-five-minute session covering basic knowledge and planning for achieving your goal!'),
      consult('learner', 'Learner Consult', '90 minutes', 150, true,
        'Ninety-minute session covering knowledge, exploring modes of action, and creating personalized designs for achieving your goal!'),
      consult('apprentice', 'Extended Apprenticeship', 'One month: one 90-minute and three one-hour sessions', 500, true,
        'Weekly sessions for knowledge endowment, actionable plans, tailored strategies, and regular readjustments to achieving your goal!'),
    ],
    addons: ['flame', 'training', 'access', 'testing'],
  },
  {
    id: 'designs',
    name: 'Craft New Designs',
    lore: 'All quests are different, and individual journeys may call for an expansion of services or unique crafts.',
    blurb: 'Accomplish personal health goals not on display, working closely with expert hands to craft all the designs needed for your specific task!',
    img: '/assets/goal-other.jpg',
    alt: "Coal glowing white-hot in a blacksmith's forge",
    consults: [
      consult('quick', 'Quick Advice', '30 minutes', 60, false,
        'Thirty-minute session covering basic knowledge and planning for achieving your goal!'),
      consult('learner', 'Learner Consult', '45 minutes', 75, false,
        'Forty-five-minute session covering knowledge, exploring modes of action, and creating personalized designs for achieving your goal!'),
    ],
    addons: ['flame', 'access'],
  },
];

const $ = (sel) => document.querySelector(sel);
const goalsEl = $('#goals');
const anvil = $('#anvil');
const addonsBlock = $('#addons-block');
const steps = document.querySelectorAll('.steps li');

let goal = null;
let chosenConsult = null;
const chosen = new Set();

const priceLabel = (c) => (c.from ? `starting at $${c.price}` : `$${c.price}`);
const money = (min, max) => (min === max ? `$${min}` : `$${min}-${max}`);

function renderGoals() {
  goalsEl.innerHTML = GOALS.map((g) => `
    <button class="goal" role="radio" aria-checked="false" data-id="${g.id}">
      <img src="${g.img}" alt="${g.alt}" loading="lazy">
      <span class="goal-body">
        <span class="goal-name">${g.name}</span>
        <span class="goal-blurb">${g.lore}</span>
      </span>
    </button>`).join('');
  goalsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.goal');
    if (btn) selectGoal(btn.dataset.id);
  });
}

function selectGoal(id) {
  goal = GOALS.find((g) => g.id === id);
  chosenConsult = null;
  chosen.clear();
  goalsEl.querySelectorAll('.goal').forEach((b) => {
    const on = b.dataset.id === id;
    b.classList.toggle('on', on);
    b.setAttribute('aria-checked', on);
  });

  $('#goal-intro').innerHTML = `
    <p class="eyebrow">${goal.name}</p>
    <p class="lore">${goal.lore}</p>
    <p>${goal.blurb}</p>`;

  $('#consults').innerHTML = goal.consults.map((c, i) => `
    <button class="option" role="radio" aria-checked="false" data-id="${c.id}" style="--i:${i}">
      <span class="option-top"><span class="option-name">${c.name}</span><span class="option-price">${priceLabel(c)}</span></span>
      <span class="option-len">${c.length}</span>
      <span class="option-lore">${c.lore}</span>
      <span class="option-text">${c.text}</span>
    </button>`).join('');

  const keys = ADDON_ORDER.filter((key) => key === 'none' || goal.addons.includes(key));
  $('#addons').innerHTML = keys.map((key, i) => {
    const a = ADDONS[key];
    return `
      <button class="addon" aria-pressed="false" data-key="${key}" style="--i:${i}">
        <span class="addon-top"><span class="addon-name">${a.name}</span><span class="addon-price">${a.price}</span></span>
        <span class="option-lore">${a.lore}</span>
        <span class="addon-text">${a.text}</span>
      </button>`;
  }).join('');
  // Add-ons only appear once a consultation is chosen.
  addonsBlock.hidden = true;

  anvil.hidden = false;
  // Restart the reveal animation each time a new goal is chosen.
  anvil.classList.remove('lit');
  void anvil.offsetWidth;
  anvil.classList.add('lit');
  renderSummary();

  if (anvil.getBoundingClientRect().top > window.innerHeight * 0.6) {
    anvil.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// One-time costs add up to the total; weekly and monthly add-ons are listed under it.
function totals() {
  let min = chosenConsult.price;
  let max = chosenConsult.price;
  let estimate = chosenConsult.from;
  const ongoing = [];
  chosen.forEach((key) => {
    const { name, cost } = ADDONS[key];
    if (cost.every) ongoing.push(`$${cost.min} / ${cost.every} (${name})`);
    else { min += cost.min; max += cost.max; }
    if (cost.min !== cost.max) estimate = true;
  });
  return {
    estimate,
    subtotal: money(min, max),
    total: money(Math.max(min - DISCOUNT, 0), Math.max(max - DISCOUNT, 0)),
    ongoing,
  };
}

function renderSummary() {
  const items = [];
  if (chosenConsult) items.push(`<li><span>${chosenConsult.name}</span><span>${priceLabel(chosenConsult)}</span></li>`);
  else items.push('<li class="empty"><span>Choose a consultation</span><span></span></li>');
  chosen.forEach((key) => items.push(`<li><span>${ADDONS[key].name}</span><span>${ADDONS[key].price}</span></li>`));
  $('#summary-list').innerHTML = items.join('');

  const tally = $('#tally');
  if (chosenConsult) {
    const t = totals();
    tally.innerHTML = `
      <div><span>Subtotal</span><span>${t.subtotal}</span></div>
      <div class="tally-discount"><span>New client discount</span><span>-$${DISCOUNT}</span></div>
      <div class="tally-total"><span>${t.estimate ? 'Estimated total' : 'Total'}</span><span>${t.total}</span></div>
      ${t.ongoing.length ? `<p class="tally-note">Plus ${t.ongoing.join(' and ')}</p>` : ''}
      ${t.estimate ? '<p class="tally-note">Prices marked "starting at" can change once your plan is set.</p>' : ''}`;
    tally.hidden = false;
  } else {
    tally.hidden = true;
  }

  // A changed plan means the written email is out of date; hide it until they write it again.
  $('#draft').hidden = true;
  $('#request').classList.toggle('disabled', !chosenConsult);
  $('#request').setAttribute('aria-disabled', !chosenConsult);
  steps.forEach((s, i) => s.classList.toggle('on', i === 0 || (i === 1 && !!goal) || (i === 2 && !!chosenConsult)));
}

$('#consults').addEventListener('click', (e) => {
  const btn = e.target.closest('.option');
  if (!btn) return;
  chosenConsult = goal.consults.find((c) => c.id === btn.dataset.id);
  $('#consults').querySelectorAll('.option').forEach((b) => {
    const on = b === btn;
    b.classList.toggle('on', on);
    b.setAttribute('aria-checked', on);
  });
  if (addonsBlock.hidden) {
    addonsBlock.hidden = false;
    addonsBlock.classList.remove('lit');
    void addonsBlock.offsetWidth;
    addonsBlock.classList.add('lit');
  }
  renderSummary();
});

$('#addons').addEventListener('click', (e) => {
  const btn = e.target.closest('.addon');
  if (!btn) return;
  const key = btn.dataset.key;
  if (chosen.has(key)) chosen.delete(key);
  else {
    // "None" and the paid add-ons rule each other out.
    if (key === 'none') chosen.clear(); else chosen.delete('none');
    chosen.add(key);
  }
  $('#addons').querySelectorAll('.addon').forEach((b) => {
    const on = chosen.has(b.dataset.key);
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on);
  });
  renderSummary();
});

// "Send Word to the Forge" shows a ready-to-copy email on the page instead of opening an email app.
function writeDraft() {
  const lines = [`Hi Forgemaster! I'd like to book: ${goal.name}`, `- ${chosenConsult.name} (${priceLabel(chosenConsult)})`];
  chosen.forEach((key) => lines.push(key === 'none' ? '- No add-ons' : `- ${ADDONS[key].name} (${ADDONS[key].price})`));
  const t = totals();
  lines.push(`${t.estimate ? 'Estimated total' : 'Total'} with the new client discount: ${t.total}`);
  if (t.ongoing.length) lines.push(`Plus ${t.ongoing.join(' and ')}`);
  lines.push('', 'A bit about me and my goals:', '');
  $('#draft-to').textContent = EMAIL;
  $('#draft-subject').textContent = 'Forge Interest';
  $('#draft-body').value = lines.join('\n');
}

$('#request').addEventListener('click', () => {
  if (!chosenConsult) return;
  writeDraft();
  $('#draft').hidden = false;
  const body = $('#draft-body');
  body.focus();
  body.setSelectionRange(body.value.length, body.value.length);
});

$('#draft').addEventListener('click', async (e) => {
  const btn = e.target.closest('.copy');
  if (!btn) return;
  const el = document.getElementById(btn.dataset.copy);
  const text = el.value !== undefined ? el.value : el.textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Older browsers: select the text so it can be copied by hand.
    const range = document.createRange();
    range.selectNodeContents(el);
    getSelection().removeAllRanges();
    getSelection().addRange(range);
    if (el.select) el.select();
    document.execCommand('copy');
  }
  const label = btn.textContent;
  btn.textContent = 'Copied!';
  btn.classList.add('done');
  setTimeout(() => { btn.textContent = label; btn.classList.remove('done'); }, 1500);
});

renderGoals();
