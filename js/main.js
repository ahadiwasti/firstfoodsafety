/* ─────────────────────────────────────────
   First Food Safety — main.js
   Fetches .md content files, parses them,
   and renders each section dynamically.
───────────────────────────────────────── */

// ─── ICONS (inline SVG strings) ─────────
const ICONS = {
  shield:  `<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>`,
  check:   `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
  chart:   `<svg viewBox="0 0 24 24"><path d="M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z"/></svg>`,
  people:  `<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
  award:   `<svg viewBox="0 0 24 24"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>`,
  doc:     `<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`,
  phone:   `<svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`,
  mail:    `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
  search:  `<svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>`,
  gear:    `<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
  location:`<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
  send:    `<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>`,
};

const SERVICE_ICONS = ['shield', 'doc', 'chart'];
const PROCESS_ICONS = ['search', 'gear', 'people', 'chart'];
const VALUE_ICONS   = ['check', 'people', 'chart'];
const CONTACT_ICONS = { phone: 'phone', person: 'people', location: 'location' };

// ─── MD PARSER ───────────────────────────
// Parses a simple YAML-like frontmatter + body structure
function parseMD(text) {
  const lines = text.split('\n');
  const data = {};

  let i = 0;
  // Parse frontmatter between --- markers
  if (lines[0].trim() === '---') {
    i = 1;
    while (i < lines.length && lines[i].trim() !== '---') {
      const line = lines[i];
      const colonIdx = line.indexOf(':');
      if (colonIdx > -1) {
        const key = line.slice(0, colonIdx).trim();
        const val = line.slice(colonIdx + 1).trim();
        data[key] = val;
      }
      i++;
    }
    i++; // skip closing ---
  }

  // Parse body as structured blocks
  const body = lines.slice(i).join('\n');
  parseBody(body, data);
  return data;
}

function parseBody(body, data) {
  const lines = body.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) { i++; continue; }

    // Top-level key: value (not indented, not a list)
    if (!line.startsWith('-') && line.includes(':') && !line.startsWith(' ')) {
      const colonIdx = line.indexOf(':');
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim();

      // Check if next non-empty lines are a list (indented -)
      let j = i + 1;
      const listItems = [];
      while (j < lines.length) {
        const next = lines[j];
        if (next.trim() === '') { j++; continue; }
        if (next.match(/^- /)) {
          listItems.push(next.slice(2).trim());
          j++;
        } else if (next.match(/^  - /)) {
          listItems.push(next.slice(4).trim());
          j++;
        } else { break; }
      }

      if (listItems.length > 0) {
        data[key] = listItems;
        i = j;
      } else {
        if (val) data[key] = val;
        i++;
      }
      continue;
    }

    // Top-level list of objects (e.g. stats:, services:, steps:)
    // Already handled above via the key parsing with list detection
    i++;
  }

  // Parse complex object arrays (stats, services, steps, cases, packages, values, contact_details)
  parseObjectArrays(body, data);
}

function parseObjectArrays(body, data) {
  // Match patterns like "key:\n- prop: val\n  prop2: val2\n- prop: val"
  const arrayKeys = ['stats', 'services', 'steps', 'cases', 'packages', 'values', 'contact_details', 'form_services', 'badges'];
  
  for (const key of arrayKeys) {
    const regex = new RegExp(`^${key}:\\s*\\n((?:[ \\t]*-[\\s\\S]*?)(?=\\n\\S|$))`, 'm');
    const match = body.match(regex);
    if (!match) continue;

    const block = match[1];
    const items = [];
    const itemBlocks = block.split(/\n(?=[ \t]*- )/);

    for (const itemBlock of itemBlocks) {
      const itemLines = itemBlock.split('\n');
      const obj = {};
      let currentKey = null;
      const subList = [];

      for (const line of itemLines) {
        const stripped = line.replace(/^[ \t]*-? ?/, '');
        if (line.match(/^[ \t]*- \w+:/)) {
          // top-level item property
          const colonIdx = stripped.indexOf(':');
          if (colonIdx > -1) {
            currentKey = stripped.slice(0, colonIdx).trim();
            const val = stripped.slice(colonIdx + 1).trim();
            obj[currentKey] = val || [];
          }
        } else if (line.match(/^[ \t]{4,}- /)) {
          // sub-list item
          const val = line.replace(/^[ \t]+-[ \t]/, '').trim();
          if (currentKey && Array.isArray(obj[currentKey])) {
            obj[currentKey].push(val);
          } else if (currentKey) {
            obj[currentKey] = [obj[currentKey], val].filter(Boolean);
          }
        } else if (line.match(/^[ \t]{2,}\w+:/)) {
          const colonIdx = stripped.indexOf(':');
          if (colonIdx > -1) {
            currentKey = stripped.slice(0, colonIdx).trim();
            const val = stripped.slice(colonIdx + 1).trim();
            obj[currentKey] = val || [];
          }
        }
      }
      if (Object.keys(obj).length > 0) items.push(obj);
    }

    if (items.length > 0) data[key] = items;
  }
}

// ─── FETCH HELPER ────────────────────────
async function loadMD(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    const text = await res.text();
    return parseMD(text);
  } catch (e) {
    console.error(e);
    return null;
  }
}

// ─── RENDERERS ───────────────────────────

function renderHero(data) {
  const stats = Array.isArray(data.stats) ? data.stats : [];
  document.getElementById('hero-content').innerHTML = `
    <div class="hero-tag">${data.tag || ''}</div>
    <h1 class="hero-h1">
      ${data.headline || ''}
      <em>${data.headline_accent || ''}</em>
    </h1>
    <p class="hero-sub">${data.subtext || ''}</p>
    <div class="hero-btns">
      <a href="${data.btn_primary_href || '#services'}" class="btn-primary">
        ${ICONS.check} ${data.btn_primary || 'Our Services'}
      </a>
      <a href="${data.btn_secondary_href || '#contact'}" class="btn-outline">
        ${data.btn_secondary || 'Contact Us'}
      </a>
    </div>
  `;

  const statsEl = document.getElementById('hero-stats');
  if (stats.length) {
    statsEl.innerHTML = stats.map(s => `
      <div class="stat-card">
        <span class="stat-num">${s.number || s.n || ''}</span>
        <div class="stat-lbl">${s.label || s.l || ''}</div>
      </div>
    `).join('');
  }
}

function renderAbout(data) {
  const values = Array.isArray(data.values) ? data.values : [];
  const badges = Array.isArray(data.badges) ? data.badges : [];

  document.getElementById('about-card').innerHTML = `
    <div class="about-shield">${ICONS.shield}</div>
    <h3>${data.card_title || 'First Food Safety'}</h3>
    <p>${data.card_body || ''}</p>
    <div class="about-badges">
      ${badges.map(b => `<div class="badge">${ICONS.check}<span>${b}</span></div>`).join('')}
    </div>
  `;

  document.getElementById('about-header').innerHTML = `
    <span class="section-tag">${data.tag || ''}</span>
    <h2 class="section-h2">${data.headline || ''}<br><span>${data.headline_accent || ''}</span></h2>
    <p class="section-lead">${data.subtext || ''}</p>
  `;

  document.getElementById('about-values').innerHTML = values.map((v, i) => `
    <div class="value-item reveal" style="transition-delay:${i * 100}ms">
      <div class="value-icon">${ICONS[VALUE_ICONS[i % VALUE_ICONS.length]]}</div>
      <div>
        <h4>${v.title || ''}</h4>
        <p>${v.body || ''}</p>
      </div>
    </div>
  `).join('');
}

function renderServices(data) {
  const services = Array.isArray(data.services) ? data.services : [];

  document.getElementById('services-header').innerHTML = `
    <span class="section-tag centered">${data.tag || ''}</span>
    <h2 class="section-h2">${data.headline || ''}<br><span>${data.headline_accent || ''}</span></h2>
    <p class="section-lead centered">${data.subtext || ''}</p>
  `;

  document.getElementById('services-grid').innerHTML = services.map((svc, i) => {
    const features = Array.isArray(svc.features) ? svc.features : [];
    return `
    <div class="service-card reveal" style="transition-delay:${i * 100}ms">
      <div class="service-card-top">
        <div class="service-num">${svc.number || `0${i+1}`}</div>
        <div class="service-icon-wrap">${ICONS[SERVICE_ICONS[i % SERVICE_ICONS.length]]}</div>
        <h3>${svc.title || ''}</h3>
        <div class="service-type">${svc.type || ''}</div>
      </div>
      <div class="service-card-body">
        <p>${svc.description || ''}</p>
        <ul class="service-features">
          ${features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <div class="service-price-tag">
          <div>
            <div class="service-price">${svc.price || ''}</div>
            <div class="service-price-note">${svc.price_note || ''}</div>
          </div>
          <a href="#contact" class="service-cta">Get Started →</a>
        </div>
      </div>
    </div>
  `}).join('');
}

function renderProcess(data) {
  const steps = Array.isArray(data.steps) ? data.steps : [];

  document.getElementById('process-header').innerHTML = `
    <span class="section-tag">${data.tag || ''}</span>
    <h2 class="section-h2 light">${data.headline || ''}<br><span>${data.headline_accent || ''}</span></h2>
    <p class="section-lead light">${data.subtext || ''}</p>
  `;

  document.getElementById('process-steps').innerHTML = steps.map((step, i) => `
    <div class="process-step reveal" style="transition-delay:${i * 100}ms">
      <div class="step-num">${step.number || `0${i+1}`}</div>
      <div class="step-icon">${ICONS[PROCESS_ICONS[i % PROCESS_ICONS.length]]}</div>
      <h4>${step.title || ''}</h4>
      <p>${step.body || ''}</p>
    </div>
  `).join('');
}

function renderCases(data) {
  const cases = Array.isArray(data.cases) ? data.cases : [];

  document.getElementById('cases-header').innerHTML = `
    <span class="section-tag">${data.tag || ''}</span>
    <h2 class="section-h2">${data.headline || ''}<br><span>${data.headline_accent || ''}</span></h2>
    <p class="section-lead">${data.subtext || ''}</p>
  `;

  document.getElementById('cases-grid').innerHTML = cases.map((c, i) => {
    const tags = Array.isArray(c.tags) ? c.tags : [];
    const badgeStyle = c.badge_style === 'accent' ? 'accent' : 'teal';
    return `
    <div class="case-card reveal" style="transition-delay:${i * 150}ms">
      <div class="case-card-header">
        <div class="case-client">
          <div class="case-label">${c.label || ''}</div>
          <h3>${c.client || ''}</h3>
          <div class="case-location">${c.location || ''}</div>
        </div>
        <div class="case-service-badge ${badgeStyle}">${c.service_badge || ''}</div>
      </div>
      <div class="case-body">
        <div class="case-sections">
          <div class="case-section">
            <div class="case-section-icon">${ICONS.search}</div>
            <div class="case-section-content"><h5>Challenge</h5><p>${c.challenge || ''}</p></div>
          </div>
          <div class="case-section">
            <div class="case-section-icon">${ICONS.gear}</div>
            <div class="case-section-content"><h5>What We Did</h5><p>${c.approach || ''}</p></div>
          </div>
          <div class="case-section">
            <div class="case-section-icon">${ICONS.award}</div>
            <div class="case-section-content"><h5>Outcome</h5><p>${c.outcome || ''}</p></div>
          </div>
        </div>
        <div class="case-outlets">
          ${tags.map(t => `<div class="outlet-tag">${t}</div>`).join('')}
        </div>
      </div>
    </div>
  `}).join('');
}

function renderPricing(data) {
  const packages = Array.isArray(data.packages) ? data.packages : [];

  document.getElementById('pricing-header').innerHTML = `
    <span class="section-tag centered">${data.tag || ''}</span>
    <h2 class="section-h2">${data.headline || ''} <span>${data.headline_accent || ''}</span></h2>
    <p class="section-lead centered">${data.subtext || ''}</p>
  `;

  document.getElementById('pricing-grid').innerHTML = packages.map((pkg, i) => {
    const features = Array.isArray(pkg.features) ? pkg.features : [];
    const isFeatured = pkg.featured === 'true' || pkg.featured === true;
    return `
    <div class="pricing-card ${isFeatured ? 'featured' : ''} reveal" style="transition-delay:${i * 100}ms">
      ${isFeatured ? `<div class="featured-tag">${pkg.featured_label || 'Most Popular'}</div>` : ''}
      <div class="pricing-card-top">
        <div class="pricing-icon">${ICONS[SERVICE_ICONS[i % SERVICE_ICONS.length]]}</div>
        <h3>${pkg.title || ''}</h3>
        <p>${pkg.subtitle || ''}</p>
      </div>
      <div class="pricing-card-price">
        <div class="price-amount">${pkg.price || ''}</div>
        <div class="price-period">${pkg.period || ''}</div>
      </div>
      <ul class="pricing-features">
        ${features.map(f => `<li>${ICONS.check}<span>${f}</span></li>`).join('')}
      </ul>
      <div class="pricing-cta"><a href="#contact">Get Started</a></div>
    </div>
  `}).join('');
}

function renderContact(data) {
  const contacts = Array.isArray(data.contact_details) ? data.contact_details : [];
  const formServices = Array.isArray(data.form_services) ? data.form_services : [];

  document.getElementById('contact-header').innerHTML = `
    <span class="section-tag" style="color:var(--accent)">${data.tag || ''}</span>
    <h2 class="section-h2 light">${data.headline || ''}<br><span>${data.headline_accent || ''}</span></h2>
    <p style="font-size:15px;line-height:1.75;color:rgba(255,255,255,0.55);margin-bottom:36px">${data.subtext || ''}</p>
  `;

  document.getElementById('contact-cards').innerHTML = contacts.map(c => {
    const iconKey = CONTACT_ICONS[c.type] || 'check';
    const isLink = c.href;
    const tag = isLink ? `a href="${c.href}"` : 'div';
    const closeTag = isLink ? 'a' : 'div';
    return `
    <${tag} class="contact-card">
      <div class="contact-card-icon">${ICONS[iconKey]}</div>
      <div>
        <div class="contact-card-label">${c.label || ''}</div>
        <div class="contact-card-value">${c.value || ''}</div>
      </div>
    </${closeTag}>
  `}).join('');

  document.getElementById('contact-form-services').innerHTML =
    `<option value="">Select a service...</option>` +
    formServices.map(s => `<option>${s}</option>`).join('');
}

// ─── SCROLL REVEAL ───────────────────────
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── NAV ─────────────────────────────────
function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightNav();
  });

  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });

  function highlightNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
}

// ─── FORM ────────────────────────────────
function initForm() {
  const btn = document.getElementById('form-submit');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.textContent = '✓ Message Sent!';
    btn.classList.add('sent');
    setTimeout(() => {
      btn.innerHTML = `${ICONS.send} Send Message`;
      btn.classList.remove('sent');
    }, 3000);
  });
}

// ─── INIT ────────────────────────────────
async function init() {
  initNav();

  // Load all sections in parallel
  const [hero, about, services, process, cases, pricing, contact] = await Promise.all([
    loadMD('content/hero.md'),
    loadMD('content/about.md'),
    loadMD('content/services.md'),
    loadMD('content/process.md'),
    loadMD('content/cases.md'),
    loadMD('content/pricing.md'),
    loadMD('content/contact.md'),
  ]);

  if (hero)    renderHero(hero);
  if (about)   renderAbout(about);
  if (services) renderServices(services);
  if (process) renderProcess(process);
  if (cases)   renderCases(cases);
  if (pricing) renderPricing(pricing);
  if (contact) renderContact(contact);

  // Init reveal after all content is rendered
  setTimeout(initReveal, 50);
  initForm();
}

document.addEventListener('DOMContentLoaded', init);
