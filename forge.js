// The Forge: pick a goal, see its consultation, toggle add-ons, and send the plan.

const EMAIL = 'information.fitness.forge@gmail.com';
const PROMO = 25;

// Wording is Adam's own, from his content doc.
const ADDONS = {
  equipment: {
    name: 'Equipment Access',
    price: '+$5 / hour',
    text: 'Simple one-hour access to exercise equipment at Perform Centre at Concordia University, Loyola Campus; full access limited unless purchasing Perform Centre membership.',
  },
  training: {
    name: 'Personal Training',
    price: '+$15 / session',
    text: 'Exercise consultation being done in-person at the Perform Centre at Concordia University, Loyola Campus with guided exercise and technique demonstrations to complement the personalized exercise routine.',
  },
  accountability: {
    name: 'Weekly Accountability',
    price: '+$5 / week',
    text: 'Weekly phone calls to track progress on goals, address problems, increase motivation, or just a friendly chat about life updates.',
  },
  month: {
    name: 'One-Month Deal',
    price: '$375 total',
    text: '4 x one-hour sessions, once a week within one month to allow for close progress tracking and weekly adjustments to current plans at a reduced price.',
  },
  oncall: {
    name: 'On-Call',
    price: '+$250 / month',
    text: 'One-month instant messaging abilities intended for quick advice, support, or feedback on current plans to support serious fitness goals; guaranteed responses within 1-2 business hours.',
  },
};

const EXERCISE_CONSULT = { name: 'Exercise Consultation', length: 'One hour', price: 100,
  text: 'One-hour session expanding exercise basics, uncovering health benefits, and designing tailored routine.' };

const GOALS = [
  {
    id: 'weight',
    name: 'Weight Management',
    blurb: 'Increase lifespan, reverse aging, and feel comfortable in your body through learning how to lose weight, reduce fat, and drastically improve quality of life.',
    img: 'assets/goal-weight.jpg',
    alt: 'Hands writing a meal plan beside a bowl of fresh fruit and a salad',
    consult: { name: 'Nutrition Consultation', length: 'One hour', price: 100,
      text: 'One-hour session covering nutrition knowledge, exploring weight-loss strategies, and creating personalized plans.' },
    addons: ['accountability', 'month'],
  },
  {
    id: 'cardio',
    name: 'Improve Cardiovascular Health',
    blurb: 'Train the most important muscle in the body, the heart, in order to extend lifespan, reduce disease risk, and become as fit as possible.',
    img: 'assets/goal-cardio.jpg',
    alt: 'Silhouettes of people riding bikes in a spin class',
    consult: EXERCISE_CONSULT,
    addons: ['equipment', 'training', 'accountability', 'month'],
  },
  {
    id: 'strength',
    name: 'Build Strength and Muscle',
    blurb: 'Craft a powerful physique capable of resisting age-related muscle loss, improving body composition, and being the strongest it can.',
    img: 'assets/goal-strength.jpg',
    alt: 'A rack of heavy dumbbells in a gym',
    consult: EXERCISE_CONSULT,
    addons: ['equipment', 'training', 'accountability', 'month'],
  },
  {
    id: 'multi',
    name: 'Multiple Goals',
    blurb: 'Develop an integrated approach to optimizing both nutrition and exercise simultaneously in order to increase lifespan, reduce disease, improve fitness, and build your best physique.',
    img: 'assets/goal-multi.jpg',
    alt: 'A man pressing a kettlebell overhead in a gym',
    consult: { name: 'Integrated Health Consultation', length: '90 minutes', price: 150,
      text: '90-minute session combining knowledge from both nutrition and exercise, exploring multiple strategies, and developing an integrated lifestyle plan.' },
    addons: ['equipment', 'training', 'accountability', 'month', 'oncall'],
  },
  {
    id: 'other',
    name: 'Other',
    blurb: 'Designing methods of optimizing routes to other specific health and fitness goals not explicitly listed previously to aid in achieving ideal health status.',
    img: 'assets/goal-other.jpg',
    alt: "Coal glowing white-hot in a blacksmith's forge",
    consult: { name: 'Specialized Goal Consultation', length: '60 minutes', price: 100,
      text: '60-minute session addressing a specific health goal and programming means to achieve it.' },
    addons: ['equipment', 'accountability', 'oncall'],
  },
];

const $ = (sel) => document.querySelector(sel);
const goalsEl = $('#goals');
const anvil = $('#anvil');
const steps = document.querySelectorAll('.steps li');

let current = null;
const chosen = new Set();

function renderGoals() {
  goalsEl.innerHTML = GOALS.map((g) => `
    <button class="goal" role="radio" aria-checked="false" data-id="${g.id}">
      <img src="${g.img}" alt="${g.alt}" loading="lazy">
      <span class="goal-body">
        <span class="goal-name">${g.name}</span>
        <span class="goal-blurb">${g.blurb}</span>
      </span>
    </button>`).join('');
  goalsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.goal');
    if (btn) selectGoal(btn.dataset.id);
  });
}

function selectGoal(id) {
  current = GOALS.find((g) => g.id === id);
  chosen.clear();
  goalsEl.querySelectorAll('.goal').forEach((b) => {
    const on = b.dataset.id === id;
    b.classList.toggle('on', on);
    b.setAttribute('aria-checked', on);
  });

  const c = current.consult;
  $('#consult').innerHTML = `
    <p class="eyebrow">${current.name}</p>
    <div class="consult-head">
      <h3>${c.name}</h3>
      <span class="price">$${c.price}</span>
    </div>
    <p class="consult-len">${c.length}</p>
    <p>${c.text}</p>`;

  $('#addons').innerHTML = current.addons.map((key, i) => {
    const a = ADDONS[key];
    return `
      <button class="addon" aria-pressed="false" data-key="${key}" style="--i:${i}">
        <span class="addon-top"><span class="addon-name">${a.name}</span><span class="addon-price">${a.price}</span></span>
        <span class="addon-text">${a.text}</span>
      </button>`;
  }).join('');

  anvil.hidden = false;
  // Restart the reveal animation each time a new goal is chosen.
  anvil.classList.remove('lit');
  void anvil.offsetWidth;
  anvil.classList.add('lit');
  steps.forEach((s, i) => s.classList.toggle('on', i <= 1));
  renderSummary();

  if (anvil.getBoundingClientRect().top > window.innerHeight * 0.6) {
    anvil.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function renderSummary() {
  const c = current.consult;
  const items = [`<li><span>${c.name}</span><span>$${c.price}</span></li>`];
  chosen.forEach((key) => {
    items.push(`<li><span>${ADDONS[key].name}</span><span>${ADDONS[key].price}</span></li>`);
  });
  $('#summary-list').innerHTML = items.join('');
  $('#summary-first').innerHTML = `First consultation: <s>$${c.price}</s> <strong>$${c.price - PROMO}</strong>`;
  steps[2].classList.toggle('on', chosen.size > 0);
}

$('#addons').addEventListener('click', (e) => {
  const btn = e.target.closest('.addon');
  if (!btn) return;
  const key = btn.dataset.key;
  if (chosen.has(key)) chosen.delete(key); else chosen.add(key);
  btn.classList.toggle('on', chosen.has(key));
  btn.setAttribute('aria-pressed', chosen.has(key));
  renderSummary();
});

// "Request this plan" pre-fills the contact form with the chosen plan.
$('#request').addEventListener('click', () => {
  const lines = [`Hi! I'd like to book: ${current.name}`, `- ${current.consult.name} ($${current.consult.price})`];
  chosen.forEach((key) => lines.push(`- ${ADDONS[key].name} (${ADDONS[key].price})`));
  lines.push('', 'A bit about me and my goals:', '');
  const msg = $('#message');
  msg.value = lines.join('\n');
  setTimeout(() => { msg.focus(); msg.setSelectionRange(msg.value.length, msg.value.length); }, 400);
});

$('#contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const subject = `Fitness Forge enquiry from ${f.get('name')}`;
  const body = `${f.get('message')}\n\n${f.get('name')}\n${f.get('email')}`;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

$('#year').textContent = new Date().getFullYear();
renderGoals();
