/* ── PASSWORD ── */
function checkPassword() {
    const input = document.getElementById('password-input');
    const error = document.getElementById('error-message');
    if (!input) return;
    if (btoa(input.value.toLowerCase().trim()) === 'c2FyYXk=') {
        const screen = document.getElementById('access-screen');
        screen.classList.add('hidden');
        setTimeout(() => {
            screen.remove();
            const main = document.getElementById('main-content');
            main.style.display = 'block';
            setTimeout(() => {
                main.style.opacity = '1';
                initApp();
            }, 60);
        }, 1000);
    } else {
        if (error) error.style.display = 'block';
        input.value = '';
        input.focus();
        input.style.animation = 'shake 0.5s';
        setTimeout(() => { input.style.animation = ''; }, 500);
    }
}

/* ── ENTER KEY ── */
document.addEventListener('DOMContentLoaded', () => {
    const inp = document.getElementById('password-input');
    if (inp) {
        inp.focus();
        inp.addEventListener('keypress', e => {
            if (e.key === 'Enter') { e.preventDefault(); checkPassword(); }
        });
    }
});

/* ── APP INIT ── */
function initApp() {
    initReveal();
    initNavScroll();
    initDailyQuote();
    setInterval(updateTimer, 1000);
    initMusic();
    loadEntries();
    startPetals();
}

/* ── SCROLL REVEAL ── */
function initReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('visible'), i * 75);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ── NAVBAR SCROLL ── */
function initNavScroll() {
    window.addEventListener('scroll', () => {
        document.getElementById('mainNav')?.classList.toggle('scrolled', window.scrollY > 70);
    });
}

/* ── SMOOTH SCROLL ── */
function enterSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ── SEALED LETTERS DATA ── */
const letters = [
    {
        num: 'Carta I', title: 'Sobre la Distancia',
        date: 'Desde aquí, cerca de tu corazón',
        body: `<p>Querida Saray,</p>
        <p>Hay noches en que la distancia pesa como el silencio de Longbourn cuando Elizabeth esperaba noticias de Darcy. Son esas horas en que el espacio entre nosotros parece infinito, y sin embargo —como descubriría cualquier lector de Austen— la distancia nunca pudo separar lo que el corazón verdaderamente une.</p>
        <p>Pienso en ti con la constancia con que Darcy pensó en Elizabeth incluso cuando creía que debía resistirse. Pero a diferencia de él, yo nunca quise resistirme: desde el primer momento supe que quererte era la decisión más sensata que jamás tomaría.</p>
        <p>La distancia no nos separa, Saray. Nos da el privilegio de añorarnos, de valorar cada palabra, cada mensaje, cada momento compartido. Y cuando ese espacio se cierre, habrá sido la espera más hermosa de mi vida.</p>
        <p>Hasta ese día, te llevo conmigo en cada paso.</p>`
    },
    {
        num: 'Carta II', title: 'Lo que Guardo de Ti',
        date: 'Escrita en los márgenes de mis pensamientos',
        body: `<p>Mi querida Saray,</p>
        <p>Hay un inventario secreto que llevo en el corazón. No son grandes gestos ni momentos memorables —aunque también los guardo— sino las cosas pequeñas que hacen que seas tú.</p>
        <p>La forma en que piensas antes de hablar, con esa hondura que me recuerda a Elizabeth meditando en los jardines de Longbourn. Tu honestidad sin crueldad, esa rara combinación que muy pocos poseen. La calidez con que tratas a quienes amas.</p>
        <p>Guardo también tu risa —especialmente tu risa— porque es involuntaria y por eso genuina. Y guardo la manera en que a veces miras las cosas como si pudieras ver en ellas algo que los demás pasamos por alto.</p>
        <p>Todo eso lo llevo conmigo como se lleva una carta doblada en el bolsillo: cerca, siempre.</p>`
    },
    {
        num: 'Carta III', title: 'Mi Promesa',
        date: 'Sellada con sinceridad',
        body: `<p>Saray,</p>
        <p>Darcy le prometió a Elizabeth con su segunda propuesta algo más valioso que palabras: le prometió que había cambiado. Que el amor la había transformado en una mejor versión de sí mismo. Yo quiero hacerte una promesa parecida.</p>
        <p>Te prometo que no fingiré ser lo que no soy. Que cuando no tenga las palabras adecuadas lo diré, y cuando las tenga no me callaré por cobardía. Te prometo que tu felicidad me importa con la seriedad con que me importan pocas cosas en este mundo.</p>
        <p>Te prometo seguir eligiéndote, no por costumbre, sino porque elegirte es siempre la mejor decisión que puedo tomar. Y te prometo que este jardín —y todo lo que representa— no es un gesto de un día: es una declaración que renuevo cada mañana.</p>`
    },
    {
        num: 'Carta IV', title: 'Lo que me Enseñaste',
        date: 'Gratitud que no cabe en una sola carta',
        body: `<p>Querida Saray,</p>
        <p>Antes de conocerte, creo que entendía el amor en teoría, como se entiende un idioma que nunca has hablado. Sabía sus reglas, sus formas, su gramática. Pero tú me enseñaste a hablarlo de verdad.</p>
        <p>Me enseñaste que el amor no es una conquista sino una elección diaria. Que la vulnerabilidad no es debilidad sino la única forma honesta de conectar con alguien. Que escuchar —realmente escuchar— es uno de los actos más generosos que existen.</p>
        <p>Me enseñaste también que merezco ser querido, algo que no siempre supe. Y que dos personas pueden estar lejos en el mapa y cerca en lo que más importa.</p>
        <p>No sé si soy mejor por todo lo que aprendí. Pero soy más honesto. Y eso, Saray, te lo debo a ti.</p>`
    },
    {
        num: 'Carta V', title: 'El Reencuentro',
        date: 'La carta que más espero poder leer juntos',
        body: `<p>Mi Elizabeth,</p>
        <p>Hay una escena en Orgullo y Prejuicio que siempre me conmueve: cuando Darcy y Elizabeth se ven después de todo lo que ha pasado, y en ese instante saben —sin necesidad de decirlo— que algo entre ellos ha cambiado para siempre, y que ese cambio es lo mejor que les ha ocurrido.</p>
        <p>Pienso en nuestro reencuentro con esa misma emoción. No sé cuándo será, pero sé cómo lo imagino: el momento en que el espacio que nos ha separado finalmente se cierre, y lo que hemos construido con paciencia, con palabras y con cuidado, se vuelva algo que podamos tocar.</p>
        <p>Hasta ese día, este jardín estará aquí. Y yo también.</p>
        <p>Con todo el amor que puede caber en una sola carta,</p>`
    }
];

function openLetter(i) {
    const l = letters[i];
    document.getElementById('modalNum').textContent   = l.num;
    document.getElementById('modalTitle').textContent = l.title;
    document.getElementById('modalDate').textContent  = l.date;
    document.getElementById('modalBody').innerHTML    = l.body;
    document.getElementById('letterModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeLetter() {
    document.getElementById('letterModal').classList.remove('open');
    document.body.style.overflow = '';
}
function closeOnOverlay(e) {
    if (e.target === document.getElementById('letterModal')) closeLetter();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLetter(); });

/* ── HEARTS ── */
function createHearts() {
    const colors = ['#D4A5D4','#E8B4E8','#8B4789','#FF69B4','#D4AF37'];
    const container = document.getElementById('floatingHearts');
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const h = document.createElement('i');
            h.className = 'fas fa-heart floating-heart';
            h.style.left   = Math.random() * window.innerWidth + 'px';
            h.style.bottom = '0px';
            h.style.fontSize = (Math.random() * 22 + 14) + 'px';
            h.style.color = colors[Math.floor(Math.random() * colors.length)];
            h.style.animationDuration = (Math.random() * 2 + 3) + 's';
            container.appendChild(h);
            setTimeout(() => h.remove(), 5500);
        }, i * 90);
    }
}

/* ── PETALS ── */
function startPetals() {
    const petals = ['🌸','🌺','🌷','🌼'];
    setInterval(() => {
        const p = document.createElement('span');
        p.className = 'petal';
        p.textContent = petals[Math.floor(Math.random() * petals.length)];
        p.style.left = Math.random() * 100 + 'vw';
        p.style.fontSize = (Math.random() * 10 + 10) + 'px';
        const dur = Math.random() * 6 + 9;
        p.style.animationDuration = dur + 's';
        p.style.opacity = (Math.random() * 0.35 + 0.3).toString();
        document.body.appendChild(p);
        setTimeout(() => p.remove(), dur * 1000);
    }, 2800);
}

/* ── SPARKLE ON MOUSE ── */
document.addEventListener('mousemove', e => {
    if (Math.random() > 0.965) {
        const s = document.createElement('span');
        s.textContent = '✦';
        s.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;
            color:var(--accent);font-size:13px;pointer-events:none;
            z-index:9999;animation:sparkleOut 0.8s ease forwards;`;
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 800);
    }
});

/* ── SCROLL HEARTS ── */
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const cur = window.pageYOffset;
    if (Math.abs(cur - lastScroll) > 280 && Math.random() > 0.7) {
        const container = document.getElementById('floatingHearts');
        if (!container) { lastScroll = cur; return; }
        const h = document.createElement('i');
        h.className = 'fas fa-heart floating-heart';
        h.style.left   = Math.random() * window.innerWidth + 'px';
        h.style.bottom = '0px';
        h.style.fontSize = '20px';
        h.style.color = '#E8B4E8';
        h.style.animationDuration = '4s';
        container.appendChild(h);
        setTimeout(() => h.remove(), 4500);
    }
    lastScroll = cur;
});

/* ── GUESTBOOK ── */
function saveEntry() {
    const inp = document.getElementById('guestbookInput');
    const text = inp?.value.trim();
    if (!text) return;
    const entries = JSON.parse(localStorage.getItem('gardenNotes') || '[]');
    entries.unshift({
        text,
        date: new Date().toLocaleDateString('es-ES', {
            year:'numeric', month:'long', day:'numeric',
            hour:'2-digit', minute:'2-digit'
        })
    });
    if (entries.length > 10) entries.pop();
    localStorage.setItem('gardenNotes', JSON.stringify(entries));
    inp.value = '';
    renderEntries(entries);
}

function loadEntries() {
    renderEntries(JSON.parse(localStorage.getItem('gardenNotes') || '[]'));
}

function renderEntries(entries) {
    const box = document.getElementById('guestbookEntries');
    if (!box) return;
    if (!entries.length) { box.innerHTML = ''; return; }
    box.innerHTML = `<h6 style="color:var(--accent);margin-bottom:18px;font-family:'Playfair Display',serif;font-size:1.05rem;">Tus palabras en este jardín:</h6>` +
        entries.map(e => `
            <div class="guestbook-entry">
                <div class="entry-text">${esc(e.text)}</div>
                <div class="entry-meta">✦ ${e.date}</div>
            </div>`).join('');
}

function esc(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ── DAILY LITERARY QUOTE ── */
const quotes = [
    { text: "La soledad es hermosa cuando tienes con quién no hablar.", author: "Gabriel García Márquez" },
    { text: "Tú eres el más bonito de todos los mares, el más puro de los ríos.", author: "Mario Benedetti" },
    { text: "El tiempo es una invención del hombre para medir la distancia entre momentos que no pueden tocarse.", author: "Pablo Neruda" },
    { text: "Puedo escribir los versos más tristes esta noche. La noche está estrellada.", author: "Pablo Neruda" },
    { text: "La verdadera generosidad hacia el futuro reside en dar todo al presente.", author: "Albert Camus" },
    { text: "La belleza salvará al mundo.", author: "Fiódor Dostoievski" },
    { text: "Es un hecho universalmente reconocido que un hombre soltero, poseedor de una buena fortuna, necesita una esposa.", author: "Jane Austen — Orgullo y Prejuicio" },
    { text: "Todas las familias felices se parecen; cada familia infeliz es infeliz a su manera.", author: "Leo Tolstói — Anna Karenina" },
    { text: "El amor no es mirarse el uno al otro, sino mirar juntos en la misma dirección.", author: "Antoine de Saint-Exupéry" },
    { text: "Nunca amaré a nadie como te amo a ti.", author: "Audrey Niffenegger" },
    { text: "Amar es encontrar en la felicidad de otro tu propia felicidad.", author: "Gottfried Leibniz" },
    { text: "Por mucho que un hombre haya viajado, nunca está fuera del lugar. El alma viaja siempre con él.", author: "Víctor Hugo — Los Miserables" },
    { text: "En vano he luchado. No sirve de nada. No puedo reprimir mis sentimientos.", author: "Jane Austen — Orgullo y Prejuicio" },
    { text: "Era inevitable: el olor de las almendras amargas le recordaba siempre el destino de los amores contrariados.", author: "Gabriel García Márquez — El amor en los tiempos del cólera" },
    { text: "No hay un personaje en la literatura que no sea reflejo de la vida real.", author: "Julio Cortázar" },
    { text: "En la vida hay momentos felices. Su existencia consolida la creencia de que la vida merece la pena.", author: "Fiódor Dostoievski — Crimen y Castigo" },
    { text: "Yo no busco un hombre que tenga todo; busco el hombre para quien yo sea todo.", author: "Jane Austen" },
    { text: "Una cosa sin la otra es incompleta. El hombre sin la mujer, y la mujer sin el hombre.", author: "Gustave Flaubert — Madame Bovary" },
    { text: "El amor infinito es aquel que no tiene medida ni límite, aquel que todo lo abarca.", author: "Dante Alighieri — La Divina Comedia" },
    { text: "La prosa es arquitectura, no decoración, y la buena prosa es como un buen edificio.", author: "Ernest Hemingway" }
];

function initDailyQuote() {
    const today = new Date().toDateString();
    let idx = parseInt(localStorage.getItem('litIdx') || '-1');
    if (localStorage.getItem('litDate') !== today || idx < 0) {
        idx = Math.floor(Math.random() * quotes.length);
        localStorage.setItem('litDate', today);
        localStorage.setItem('litIdx', idx);
    }
    const q = quotes[idx];
    const qEl = document.getElementById('daily-quote');
    const aEl = document.getElementById('daily-author');
    if (qEl) qEl.textContent = `"${q.text}"`;
    if (aEl) aEl.textContent = `— ${q.author}`;
    updateTimer();
}

function updateTimer() {
    const el = document.getElementById('daily-timer');
    if (!el) return;
    const now = new Date();
    const tmw = new Date(now); tmw.setHours(24,0,0,0);
    const d = tmw - now;
    const h = String(Math.floor(d/3600000)).padStart(2,'0');
    const m = String(Math.floor((d%3600000)/60000)).padStart(2,'0');
    const s = String(Math.floor((d%60000)/1000)).padStart(2,'0');
    el.textContent = `${h}:${m}:${s}`;
}

/* ── MUSIC ── */
function initMusic() {
    const music = document.getElementById('bg-music');
    const btn   = document.getElementById('music-btn');
    let playing = false;

    function play() {
        if (!music || playing) return;
        music.volume = 0.15;
        music.play().then(() => { playing = true; btn?.classList.add('playing'); }).catch(() => {});
    }
    function pause() {
        if (!music || !playing) return;
        music.pause(); playing = false; btn?.classList.remove('playing');
    }

    btn?.addEventListener('click', e => { e.stopPropagation(); playing ? pause() : play(); });
    document.addEventListener('visibilitychange', () => document.hidden ? pause() : play());
    play();
}
