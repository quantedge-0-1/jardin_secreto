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

/* ── 365 FRASES: UNA POR DÍA DEL AÑO ── */
const quotes = [
    /* ENERO — Filosofía antigua y griega */
    { text: "El conocimiento de uno mismo es el principio de toda sabiduría.", author: "Aristóteles" },
    { text: "El asombro es el principio de la filosofía.", author: "Platón — Teeteto" },
    { text: "Una vida sin examen no merece ser vivida.", author: "Sócrates — Apología" },
    { text: "Solo sé que no sé nada.", author: "Sócrates" },
    { text: "Todo fluye; nada permanece.", author: "Heráclito" },
    { text: "No puedes bañarte dos veces en el mismo río, porque nuevas aguas corren siempre.", author: "Heráclito" },
    { text: "Somos lo que repetidamente hacemos. La excelencia, entonces, no es un acto sino un hábito.", author: "Aristóteles" },
    { text: "El amor es la búsqueda de nuestra mitad perdida.", author: "Platón — El Banquete" },
    { text: "La filosofía es el más alto de los bienes humanos.", author: "Platón — Fedón" },
    { text: "La naturaleza no hace nada sin razón.", author: "Aristóteles — Política" },
    { text: "La duda es el principio de la sabiduría.", author: "Aristóteles" },
    { text: "En la oscuridad hay más claridad que en la luz del mediodía.", author: "Heráclito" },
    { text: "El tiempo es la imagen móvil de la eternidad.", author: "Platón — Timeo" },
    { text: "La música da alas a la mente, vuelo a la imaginación, y vida a todas las cosas.", author: "Platón" },
    { text: "El fin de la existencia humana es la felicidad.", author: "Aristóteles — Ética a Nicómaco" },
    /* ENERO tardío — Estoicismo */
    { text: "No hay viento favorable para el que no sabe a qué puerto se dirige.", author: "Séneca" },
    { text: "El impedimento a la acción promueve la acción. Lo que está en el camino se convierte en el camino.", author: "Marco Aurelio — Meditaciones" },
    { text: "No busques que lo que acontece acontezca como quieres; desea lo que acontece y encontrarás paz.", author: "Epicteto — Enquiridión" },
    { text: "La adversidad nos revela quiénes somos en realidad.", author: "Séneca — Cartas a Lucilio" },
    { text: "Mientras diferimos, la vida transcurre.", author: "Séneca — Sobre la brevedad de la vida" },
    { text: "El universo es transformación; la vida es opinión.", author: "Marco Aurelio — Meditaciones" },
    { text: "La libertad no es tener lo que se desea; es desear lo que se tiene.", author: "Epicteto" },
    { text: "Enseña a los labios a decir: gracias. El agradecimiento es la memoria del corazón.", author: "Cicerón" },
    { text: "Acepta las cosas a las cuales el destino te encadena, y ama a las personas con las que el destino te junta.", author: "Marco Aurelio" },
    { text: "Carpe diem: aprovecha el día presente; confía lo menos posible en el siguiente.", author: "Horacio — Odas" },
    { text: "El que aprende y no piensa está perdido; el que piensa y no aprende está en peligro.", author: "Confucio" },
    { text: "Un viaje de mil millas comienza con un solo paso.", author: "Lao-Tsé — Tao Te Ching" },
    { text: "El que conoce a los demás es sabio; el que se conoce a sí mismo es iluminado.", author: "Lao-Tsé — Tao Te Ching" },
    { text: "La naturaleza hace pocas cosas en vano.", author: "Marco Aurelio" },
    { text: "No temas la muerte; donde ella está tú no estás, y donde tú estás ella no está.", author: "Epicuro — Carta a Meneceo" },
    /* FEBRERO — Filosofía medieval y renacentista */
    { text: "Nuestro corazón está inquieto hasta que descansa en Ti.", author: "San Agustín — Confesiones" },
    { text: "El mundo es como un libro; quienes no viajan sólo han leído una página.", author: "San Agustín" },
    { text: "En el medio del camino de nuestra vida me encontré en una selva oscura.", author: "Dante Alighieri — La Divina Comedia" },
    { text: "El amor que mueve el sol y las demás estrellas.", author: "Dante Alighieri — Paraíso" },
    { text: "Me estudio a mí mismo más que a cualquier otro objeto; es mi metafísica, es mi física.", author: "Michel de Montaigne — Ensayos" },
    { text: "La libertad es uno de los más preciosos dones que a los hombres dieron los cielos.", author: "Miguel de Cervantes — Don Quijote" },
    { text: "Los hombres olvidan más fácilmente la muerte del padre que la pérdida de la herencia.", author: "Niccolò Machiavelli — El Príncipe" },
    { text: "Ser o no ser: he ahí la cuestión.", author: "William Shakespeare — Hamlet" },
    { text: "El pasado es un prólogo.", author: "William Shakespeare — La Tempestad" },
    { text: "El infierno está vacío; todos los demonios están aquí.", author: "William Shakespeare — La Tempestad" },
    { text: "En la felicidad de los demás yace nuestra propia felicidad.", author: "William Shakespeare" },
    /* FEBRERO tardío — Ilustración y Modernidad temprana */
    { text: "Cogito, ergo sum: pienso, luego existo.", author: "René Descartes — Meditaciones metafísicas" },
    { text: "Todo lo excelente es tan difícil como raro.", author: "Baruch Spinoza — Ética" },
    { text: "Desear ser diferente a lo que eres es desperdiciar lo que ya eres.", author: "Baruch Spinoza" },
    { text: "El corazón tiene razones que la razón no conoce.", author: "Blaise Pascal — Pensamientos" },
    { text: "El silencio de los espacios infinitos me aterra.", author: "Blaise Pascal — Pensamientos" },
    { text: "La razón es y no puede sino ser esclava de las pasiones.", author: "David Hume — Tratado de la naturaleza humana" },
    { text: "El hombre nace libre, pero en todas partes se encuentra encadenado.", author: "Jean-Jacques Rousseau — El contrato social" },
    { text: "El mejor es el mayor enemigo del bueno.", author: "Voltaire" },
    { text: "La costumbre es la tiranía del tiempo.", author: "Alexis de Tocqueville" },
    { text: "La naturaleza no da saltos.", author: "Gottfried Wilhelm Leibniz" },
    /* MARZO — Filosofía alemana del siglo XIX */
    { text: "El cielo estrellado sobre mí, la ley moral dentro de mí.", author: "Immanuel Kant — Crítica de la razón práctica" },
    { text: "Actúa sólo según la máxima que puedas querer que se convierta en ley universal.", author: "Immanuel Kant — Fundamentación de la metafísica de las costumbres" },
    { text: "Lo que es racional es real; lo que es real es racional.", author: "G.W.F. Hegel — Filosofía del derecho" },
    { text: "La filosofía es su propio tiempo captado en pensamientos.", author: "G.W.F. Hegel" },
    { text: "El talento golpea un blanco que nadie más puede alcanzar; el genio, uno que nadie más puede ver.", author: "Arthur Schopenhauer" },
    { text: "La riqueza es como el agua del mar: cuanto más se bebe, más sed da.", author: "Arthur Schopenhauer" },
    { text: "Cada hombre toma los límites de su propio campo de visión como los límites del mundo.", author: "Arthur Schopenhauer" },
    { text: "La compasión es el fundamento de toda moral.", author: "Arthur Schopenhauer — Sobre el fundamento de la moral" },
    { text: "La vida sólo puede comprenderse mirando hacia atrás; pero ha de vivirse mirando hacia adelante.", author: "Søren Kierkegaard" },
    { text: "La angustia es el vértigo de la libertad.", author: "Søren Kierkegaard — El concepto de la angustia" },
    { text: "Los filósofos no han hecho más que interpretar el mundo; de lo que se trata es de transformarlo.", author: "Karl Marx — Tesis sobre Feuerbach" },
    { text: "No es la conciencia del hombre la que determina su ser, sino al contrario.", author: "Karl Marx — Prólogo a la Contribución a la crítica de la economía política" },
    /* MARZO tardío — Nietzsche */
    { text: "Lo que no me destruye me hace más fuerte.", author: "Friedrich Nietzsche — El ocaso de los ídolos" },
    { text: "Sin música, la vida sería un error.", author: "Friedrich Nietzsche — El ocaso de los ídolos" },
    { text: "Si miras al abismo el tiempo suficiente, el abismo también te mira a ti.", author: "Friedrich Nietzsche — Más allá del bien y del mal" },
    { text: "El hombre es el único animal que sabe que ha de morir y el único que duda de ello.", author: "Friedrich Nietzsche" },
    { text: "Dios ha muerto, y nosotros lo hemos matado.", author: "Friedrich Nietzsche — La gaya ciencia" },
    { text: "Hay que tener caos en uno mismo para dar a luz una estrella danzante.", author: "Friedrich Nietzsche — Así habló Zaratustra" },
    { text: "El hombre es el único animal que puede prometer.", author: "Friedrich Nietzsche — La genealogía de la moral" },
    { text: "Las convicciones son prisiones más peligrosas que las mentiras.", author: "Friedrich Nietzsche" },
    { text: "El eterno retorno de lo mismo: ¿querrías revivir todo exactamente igual, una y otra vez?", author: "Friedrich Nietzsche — La gaya ciencia" },
    { text: "Quien tiene un porqué para vivir puede soportar casi cualquier cómo.", author: "Friedrich Nietzsche" },
    /* ABRIL — Existencialismo y Fenomenología */
    { text: "El hombre está condenado a ser libre.", author: "Jean-Paul Sartre — El existencialismo es un humanismo" },
    { text: "El infierno son los otros.", author: "Jean-Paul Sartre — Sin salida" },
    { text: "La existencia precede a la esencia.", author: "Jean-Paul Sartre" },
    { text: "Hay que imaginar a Sísifo dichoso.", author: "Albert Camus — El mito de Sísifo" },
    { text: "La verdadera generosidad hacia el futuro consiste en darlo todo al presente.", author: "Albert Camus — El hombre rebelde" },
    { text: "El rebelde es el hombre que dice no, pero que también dice sí desde su primera protesta.", author: "Albert Camus — El hombre rebelde" },
    { text: "No se nace mujer: se llega a serlo.", author: "Simone de Beauvoir — El segundo sexo" },
    { text: "La banalidad del mal: la maldad ordinaria no requiere monstruos, sino falta de pensamiento.", author: "Hannah Arendt — Eichmann en Jerusalén" },
    { text: "El lenguaje es la casa del ser.", author: "Martin Heidegger" },
    { text: "Los límites de mi lenguaje son los límites de mi mundo.", author: "Ludwig Wittgenstein — Tractatus logico-philosophicus" },
    { text: "De lo que no se puede hablar, hay que callar.", author: "Ludwig Wittgenstein — Tractatus logico-philosophicus" },
    { text: "El mundo es la totalidad de los hechos, no de las cosas.", author: "Ludwig Wittgenstein — Tractatus" },
    /* ABRIL tardío — Filosofía contemporánea y pensamiento crítico */
    { text: "El todo es la no-verdad.", author: "Theodor W. Adorno — Minima Moralia" },
    { text: "Todo documento de civilización es al mismo tiempo un documento de barbarie.", author: "Walter Benjamin — Sobre el concepto de historia" },
    { text: "El azar favorece sólo a la mente preparada.", author: "Louis Pasteur" },
    { text: "La memoria no reproduce el pasado; lo reconstruye.", author: "Henri Bergson — Materia y memoria" },
    { text: "El tiempo real es duración pura, no una sucesión de instantes.", author: "Henri Bergson" },
    { text: "La verdad es lo que funciona.", author: "William James — Pragmatismo" },
    { text: "El gran descubrimiento de mi generación es que el ser humano puede alterar su vida al alterar sus actitudes mentales.", author: "William James" },
    { text: "La educación no es preparación para la vida; la educación es la vida misma.", author: "John Dewey" },
    /* MAYO — Psicología y mente humana */
    { text: "Amor y trabajo son los pilares de nuestra humanidad.", author: "Sigmund Freud" },
    { text: "Donde estaba el Ello, debo llegar a estar el Yo.", author: "Sigmund Freud" },
    { text: "La primera condición de la salud mental es reconocer la propia sombra.", author: "Carl Gustav Jung" },
    { text: "Hasta que el inconsciente no se haga consciente, dirigirá tu vida y tú lo llamarás destino.", author: "Carl Gustav Jung" },
    { text: "El encuentro de dos personalidades es como el contacto de dos sustancias químicas: si hay reacción, ambas se transforman.", author: "Carl Gustav Jung" },
    { text: "Lo que niegas te somete; lo que aceptas te transforma.", author: "Carl Gustav Jung" },
    { text: "El ojo que mira hacia dentro cura; el que mira hacia afuera, sueña.", author: "Carl Gustav Jung" },
    { text: "El amor maduro dice: te necesito porque te amo. El amor inmaduro dice: te amo porque te necesito.", author: "Erich Fromm — El arte de amar" },
    { text: "Amar es la única actividad en que coinciden el medio y el fin.", author: "Erich Fromm — El arte de amar" },
    { text: "El amor no es primariamente una relación con una persona específica; es una actitud, una orientación del carácter.", author: "Erich Fromm — El arte de amar" },
    { text: "Al hombre puede arrebatársele todo salvo una cosa: la última de las libertades humanas, la elección de la propia actitud.", author: "Viktor Frankl — El hombre en busca de sentido" },
    { text: "Cuando ya no podemos cambiar una situación, nos encontramos ante el desafío de cambiarnos a nosotros mismos.", author: "Viktor Frankl" },
    { text: "La vida nos interroga constantemente; nosotros somos los que debemos responder.", author: "Viktor Frankl" },
    { text: "Si tu única herramienta es un martillo, tenderás a tratar todos los problemas como clavos.", author: "Abraham Maslow" },
    { text: "La neurosis es siempre un sustituto del sufrimiento legítimo.", author: "Carl Gustav Jung" },
    /* MAYO tardío — Ciencia y cosmos */
    { text: "La imaginación es más importante que el conocimiento. El conocimiento es limitado; la imaginación rodea el mundo.", author: "Albert Einstein" },
    { text: "Dos cosas son infinitas: el universo y la estupidez humana. Del universo no estoy seguro.", author: "Albert Einstein" },
    { text: "La lógica te llevará de A a B; la imaginación te llevará a cualquier parte.", author: "Albert Einstein" },
    { text: "La ciencia sin la religión es coja; la religión sin la ciencia es ciega.", author: "Albert Einstein" },
    { text: "Dios no juega a los dados con el universo.", author: "Albert Einstein" },
    { text: "Los límites de lo posible sólo pueden determinarse yendo más allá de ellos hacia lo imposible.", author: "Arthur C. Clarke" },
    { text: "Somos polvo de estrellas que se contempla a sí mismo.", author: "Carl Sagan — Cosmos" },
    { text: "El cosmos es todo lo que es, todo lo que fue y todo lo que será.", author: "Carl Sagan — Cosmos" },
    { text: "La astronomía nos hace humildes y construye el carácter.", author: "Carl Sagan" },
    { text: "La física es como el sexo: a veces produce algo útil, pero no es por eso que lo hacemos.", author: "Richard Feynman" },
    { text: "La primera sorpresa ante el mundo es la mejor educación.", author: "Richard Feynman" },
    { text: "Si he visto más lejos es porque estaba de pie sobre hombros de gigantes.", author: "Isaac Newton" },
    { text: "Nada en la vida debe ser temido; sólo comprendido.", author: "Marie Curie" },
    { text: "La curiosidad es la esencia de la existencia humana.", author: "Marie Curie" },
    /* JUNIO — Literatura rusa */
    { text: "La belleza salvará al mundo.", author: "Fiódor Dostoievski — El idiota" },
    { text: "Si Dios no existe, todo está permitido.", author: "Fiódor Dostoievski — Los hermanos Karamázov" },
    { text: "El amor salva al hombre del orgullo.", author: "Fiódor Dostoievski" },
    { text: "El sufrimiento es el origen de la conciencia.", author: "Fiódor Dostoievski — Memorias del subsuelo" },
    { text: "Todo lo sé, pero nada entiendo.", author: "Fiódor Dostoievski — El idiota" },
    { text: "Todas las familias felices se parecen; cada familia infeliz lo es a su manera.", author: "León Tolstói — Ana Karenina" },
    { text: "La única forma de ser feliz es amar sin reservas y sin miedo al sufrimiento.", author: "León Tolstói — Ana Karenina" },
    { text: "Un hombre feliz no tiene historia.", author: "León Tolstói" },
    { text: "Para amar lo que hay que hacer es dejar de amar lo que no hay que amar.", author: "León Tolstói" },
    { text: "Nadie puede vivir sin querer ser amado.", author: "Antón Chéjov" },
    { text: "Si tienes miedo de la soledad, no te cases.", author: "Antón Chéjov" },
    { text: "Si no sabes cómo actuar, no actúes.", author: "Antón Chéjov" },
    { text: "Lo que parece complicado suele ser simple cuando se mira de cerca.", author: "Iván Turguénev — Padres e hijos" },
    { text: "Las palabras son como luz; penetran la oscuridad y revelan lo oculto.", author: "Iván Goncharov" },
    { text: "La vida es breve, el arte es largo, la ocasión fugaz, la experiencia engañosa.", author: "Hipócrates" },
    /* JUNIO tardío — Literatura francesa */
    { text: "El verdadero viaje de descubrimiento no consiste en buscar nuevos territorios, sino en tener nuevos ojos.", author: "Marcel Proust — En busca del tiempo perdido" },
    { text: "Los verdaderos paraísos son los paraísos que hemos perdido.", author: "Marcel Proust — En busca del tiempo perdido" },
    { text: "El tiempo perdido es el único bien que el hombre puede recobrar.", author: "Marcel Proust" },
    { text: "La costumbre embota la percepción; sólo el arte despierta los sentidos.", author: "Marcel Proust" },
    { text: "La felicidad es una flor que no debe olerse de frente.", author: "Gustave Flaubert — Madame Bovary" },
    { text: "El arte de escribir es el arte de descubrir lo que uno cree.", author: "Gustave Flaubert" },
    { text: "Una novela es un espejo que se pasea por el camino.", author: "Stendhal — Rojo y negro" },
    { text: "La belleza es una promesa de felicidad.", author: "Stendhal — Del amor" },
    { text: "La música expresa lo que no puede decirse con palabras y lo que no puede callarse.", author: "Víctor Hugo" },
    { text: "El intelecto humano tiene pocos enemigos más mortales que el fanatismo.", author: "Víctor Hugo" },
    { text: "La vida es la flor de la que el amor es la miel.", author: "Víctor Hugo" },
    { text: "Hay que ser absolutamente moderno.", author: "Arthur Rimbaud — Una temporada en el infierno" },
    { text: "La belleza es siempre extraña.", author: "Charles Baudelaire — Salones" },
    { text: "La poesía es la única aventura verdadera.", author: "André Breton" },
    { text: "La locura es una forma de inteligencia que el mundo no está preparado para entender.", author: "Albert Camus — El extranjero" },
    /* JULIO — Literatura anglosajona */
    { text: "Un libro debe ser el hacha que rompa el mar helado dentro de nosotros.", author: "Franz Kafka — Carta a Oskar Pollak" },
    { text: "El mundo rompe a todos, y después algunos se hacen más fuertes en los lugares rotos.", author: "Ernest Hemingway — Adiós a las armas" },
    { text: "El pasado nunca está muerto. Ni siquiera es pasado.", author: "William Faulkner — Réquiem por una monja" },
    { text: "Una mujer debe tener dinero y una habitación propia si va a escribir.", author: "Virginia Woolf — Una habitación propia" },
    { text: "El futuro es oscuro, y eso es lo mejor que puede ser.", author: "Virginia Woolf — Diario" },
    { text: "No pienso que haya un libro mejor que los libros que uno mismo escribe.", author: "Virginia Woolf" },
    { text: "La belleza es verdad, la verdad belleza. Eso es todo lo que sabéis y todo lo que necesitáis saber.", author: "John Keats — Oda a una urna griega" },
    { text: "Las cosas se desintegran; el centro no puede sostenerse.", author: "William Butler Yeats — La segunda venida" },
    { text: "La educación es encender un fuego, no llenar un cubo.", author: "William Butler Yeats" },
    { text: "Preferiría no hacerlo.", author: "Herman Melville — Bartleby, el escribiente" },
    { text: "Me celebro y me canto a mí mismo, y lo que yo asumo tú lo asumirás.", author: "Walt Whitman — Canto de mí mismo" },
    { text: "La esperanza es esa cosa con plumas que se posa en el alma.", author: "Emily Dickinson" },
    { text: "He ido a los bosques porque quería vivir deliberadamente.", author: "Henry David Thoreau — Walden" },
    { text: "No lo que miramos, sino lo que vemos, importa.", author: "Henry David Thoreau" },
    { text: "Vivir es la cosa más rara del mundo; la mayoría de la gente sólo existe.", author: "Oscar Wilde" },
    /* JULIO tardío — Oscar Wilde y literatura inglesa */
    { text: "Sólo los superficiales no juzgan por las apariencias.", author: "Oscar Wilde — El retrato de Dorian Gray" },
    { text: "La experiencia es el nombre que le damos a nuestros propios errores.", author: "Oscar Wilde — Lady Windermere's Fan" },
    { text: "Puedo resistirlo todo excepto la tentación.", author: "Oscar Wilde" },
    { text: "Hay dos tragedias en la vida: una es no conseguir lo que el corazón desea, la otra es conseguirlo.", author: "Oscar Wilde" },
    { text: "La imaginación no es un estado: es la existencia humana misma.", author: "William Blake" },
    { text: "Abril es el mes más cruel, engendra lilas de la tierra muerta.", author: "T.S. Eliot — La tierra baldía" },
    { text: "No terminaremos de explorar y el fin de toda exploración será llegar a donde empezamos.", author: "T.S. Eliot — Cuatro cuartetos" },
    { text: "Las marcas del tiempo en la cara son la huella de una vida vivida con intensidad.", author: "George Eliot — Middlemarch" },
    /* AGOSTO — Literatura alemana y centroeuropea */
    { text: "En el principio existía el Verbo.", author: "Johann Wolfgang von Goethe — Fausto" },
    { text: "Amo a los que sueñan con lo imposible.", author: "Johann Wolfgang von Goethe" },
    { text: "Es de los fuertes conocer sus propias limitaciones.", author: "Johann Wolfgang von Goethe" },
    { text: "El tiempo existe sólo en razón de lo que en él transcurre.", author: "Thomas Mann — La montaña mágica" },
    { text: "Si odias a alguien, odias en él algo que está dentro de ti mismo.", author: "Hermann Hesse — Demian" },
    { text: "Cada hombre lleva dentro su propia melodía.", author: "Hermann Hesse — El lobo estepario" },
    { text: "Nunca he encontrado una puerta cerrada que no pudiera abrirse con el conocimiento.", author: "Stefan Zweig" },
    { text: "El que huye de la realidad corre hacia el sueño; el que huye del sueño corre hacia la locura.", author: "Hugo von Hofmannsthal" },
    { text: "No soy nada. Nunca seré nada. No puedo querer ser nada. Aparte de eso, tengo en mí todos los sueños del mundo.", author: "Fernando Pessoa — Tabaquería" },
    { text: "El fingir es conocer a medias.", author: "Fernando Pessoa" },
    { text: "Soy el intervalo entre lo que quiero y lo que la vida ha hecho de mí.", author: "Fernando Pessoa — Libro del desasosiego" },
    { text: "Lo que somos es lo que hemos tenido el coraje de no haber sido.", author: "Fernando Pessoa" },
    { text: "Hay en la vida momentos en que el silencio es la única respuesta inteligente.", author: "Robert Musil — El hombre sin atributos" },
    { text: "En el laberinto del espejo hay un ser que no puede ser otro que el Minotauro.", author: "Jorge Luis Borges" },
    { text: "Siempre imaginé que el paraíso sería algún tipo de biblioteca.", author: "Jorge Luis Borges" },
    /* AGOSTO tardío — Borges y literatura latinoamericana */
    { text: "El tiempo se bifurca perpetuamente hacia futuros innumerables.", author: "Jorge Luis Borges — El jardín de los senderos que se bifurcan" },
    { text: "Cada libro que leemos nos convierte en alguien diferente.", author: "Jorge Luis Borges" },
    { text: "Era inevitable: el olor de las almendras amargas le recordaba siempre el destino de los amores contrariados.", author: "Gabriel García Márquez — El amor en los tiempos del cólera" },
    { text: "No llores porque algo terminó, sonríe porque sucedió.", author: "Gabriel García Márquez" },
    { text: "El secreto de una buena vejez no es otra cosa que un pacto honesto con la soledad.", author: "Gabriel García Márquez — El amor en los tiempos del cólera" },
    { text: "Las palabras son lo único que queda para siempre.", author: "Gabriel García Márquez" },
    { text: "El arte de la escritura consiste en contar todo con una sola historia.", author: "Mario Vargas Llosa" },
    { text: "La literatura es una forma de insatisfacción permanente con la vida tal como es.", author: "Mario Vargas Llosa" },
    { text: "La vida no es la que uno vivió, sino la que uno recuerda y cómo la recuerda para contarla.", author: "Gabriel García Márquez — Vivir para contarla" },
    { text: "La realidad no es suficientemente real para quienes tienen demasiada imaginación.", author: "Julio Cortázar" },
    { text: "El que sabe leer tiene la eternidad en sus manos.", author: "Julio Cortázar" },
    { text: "La razón duerme con los ojos abiertos.", author: "Julio Cortázar — Rayuela" },
    /* SEPTIEMBRE — Poesía en español */
    { text: "Quiero hacer contigo lo que la primavera hace con los cerezos.", author: "Pablo Neruda — Tentativa del hombre infinito" },
    { text: "Es tan corto el amor, y es tan largo el olvido.", author: "Pablo Neruda — Veinte poemas de amor" },
    { text: "Puedo escribir los versos más tristes esta noche. Escribir, por ejemplo: la noche está estrellada.", author: "Pablo Neruda — Veinte poemas de amor" },
    { text: "Amo el amor de los marineros que besan y se van. Dejan una promesa, no vuelven nunca más.", author: "Pablo Neruda — Veinte poemas de amor" },
    { text: "Caminante, son tus huellas el camino y nada más; caminante, no hay camino, se hace camino al andar.", author: "Antonio Machado — Proverbios y cantares" },
    { text: "Despacito y con buena letra: el hacer las cosas bien importa más que el hacerlas.", author: "Antonio Machado" },
    { text: "Verde que te quiero verde. Verde viento. Verdes ramas.", author: "Federico García Lorca — Romance sonámbulo" },
    { text: "La poesía no busca adeptos; busca amantes.", author: "Federico García Lorca" },
    { text: "El olvido no existe. La muerte no existe. Todo lo que soy queda en la persona amada.", author: "Federico García Lorca" },
    { text: "La palabra que cae en el corazón no puede ser ni vista ni tocada.", author: "Octavio Paz" },
    { text: "El amor es una mirada que no necesita ojos.", author: "Octavio Paz" },
    { text: "La soledad es la plenitud de la presencia.", author: "Octavio Paz" },
    { text: "Dos cuerpos frente a frente son a veces dos olas y la noche océano.", author: "Octavio Paz — Dos cuerpos" },
    { text: "No te rindas, que la vida es eso, continuar el viaje.", author: "Mario Benedetti" },
    { text: "Amo las palabras que brillan en la oscuridad de la página.", author: "Mario Benedetti" },
    /* SEPTIEMBRE tardío — Rilke y poesía alemana */
    { text: "Lo que llamamos destino emana de las personas, no llega desde fuera de ellas.", author: "Rainer Maria Rilke — Las elegías de Duino" },
    { text: "Ama las preguntas mismas como libros escritos en un lenguaje extranjero.", author: "Rainer Maria Rilke — Cartas a un joven poeta" },
    { text: "Vive las preguntas ahora. Quizás entonces, gradualmente, sin siquiera darte cuenta, llegarás a vivir dentro de las respuestas.", author: "Rainer Maria Rilke — Cartas a un joven poeta" },
    { text: "La única patria del artista es la infancia.", author: "Rainer Maria Rilke" },
    { text: "La belleza no es sino el comienzo de lo terrible que todavía podemos soportar.", author: "Rainer Maria Rilke — Las elegías de Duino" },
    { text: "¿Quién, si yo gritara, me oiría desde los órdenes de los ángeles?", author: "Rainer Maria Rilke — Las elegías de Duino" },
    /* OCTUBRE — Arte y creación */
    { text: "El arte es la mentira que nos permite comprender la verdad.", author: "Pablo Picasso" },
    { text: "Todo niño es un artista. El problema es cómo seguir siendo artista una vez que creces.", author: "Pablo Picasso" },
    { text: "Yo no busco, encuentro.", author: "Pablo Picasso" },
    { text: "La simplicidad es la máxima sofisticación.", author: "Leonardo da Vinci" },
    { text: "Aprender a ver es el principio de toda verdad artística.", author: "Leonardo da Vinci" },
    { text: "Cada bloque de piedra tiene una estatua dentro; es tarea del escultor descubrirla.", author: "Miguel Ángel" },
    { text: "Todavía aprendo.", author: "Miguel Ángel — inscripción a sus 87 años" },
    { text: "El arte no reproduce lo visible; hace visible lo que no lo es.", author: "Paul Klee" },
    { text: "El color es la escritura del alma.", author: "Paul Klee" },
    { text: "Si escuchas la voz dentro de ti que dice que no puedes pintar, entonces con toda certeza no podrás.", author: "Vincent van Gogh" },
    { text: "No hay nada más auténticamente artístico que amar a las personas.", author: "Vincent van Gogh — Carta a Théo" },
    { text: "La música es la aritmética de los sonidos como la óptica es la geometría de la luz.", author: "Claude Debussy" },
    { text: "La música comienza donde las posibilidades del lenguaje terminan.", author: "Robert Schumann" },
    { text: "La arquitectura es música congelada.", author: "Arthur Schopenhauer" },
    { text: "La forma sigue a la función.", author: "Louis Sullivan" },
    /* OCTUBRE tardío — Ciencia cognitiva y neurociencia */
    { text: "El cerebro es el órgano más extraordinario de todos, porque es el único que puede estudiarse a sí mismo.", author: "David Eagleman" },
    { text: "Somos máquinas de supervivencia, vehículos automáticos programados para preservar las moléculas egoístas.", author: "Richard Dawkins — El gen egoísta" },
    { text: "El universo no tiene la obligación de tener sentido para ti.", author: "Neil deGrasse Tyson" },
    { text: "La ciencia es una forma de pensar más que un conjunto de conocimientos.", author: "Carl Sagan" },
    { text: "La ignorancia no es la ausencia de conocimiento, sino el rechazo del mismo.", author: "Karl Popper" },
    { text: "Una teoría que no puede ser refutada por ningún acontecimiento concebible no es científica.", author: "Karl Popper — La lógica de la investigación científica" },
    { text: "El conocimiento científico es el mejor conocimiento que tenemos, pero no es el único.", author: "Karl Popper" },
    { text: "Aquello que no puede medirse no puede mejorarse.", author: "Peter Drucker" },
    { text: "El mayor peligro en tiempos de turbulencia no es la turbulencia; es actuar con la lógica de ayer.", author: "Peter Drucker" },
    /* NOVIEMBRE — Literatura y pensamiento iberoamericano */
    { text: "Los libros son espejos: sólo ves en ellos lo que ya llevas dentro.", author: "Carlos Ruiz Zafón — La sombra del viento" },
    { text: "Los muertos que vos matáis gozan de buena salud.", author: "José Zorrilla — Don Juan Tenorio" },
    { text: "Hay golpes en la vida tan fuertes que yo no sé.", author: "César Vallejo — Los heraldos negros" },
    { text: "Quiero escribir pero me sale espuma.", author: "César Vallejo — Intensidad y altura" },
    { text: "La geografía del amor es el único lugar donde siempre quiero perderme.", author: "Anaïs Nin" },
    { text: "No hay amor sin vulnerabilidad, y sin vulnerabilidad no hay amor.", author: "Anaïs Nin" },
    { text: "La vida se contrae o se expande en proporción al propio coraje.", author: "Anaïs Nin" },
    { text: "El coraje de ser imperfecto es el mayor de todos los corajes.", author: "Brené Brown" },
    { text: "La vulnerabilidad no es debilidad; es la medida más precisa de nuestra valentía.", author: "Brené Brown" },
    { text: "La conexión es lo que da propósito y sentido a nuestras vidas.", author: "Brené Brown" },
    { text: "La vergüenza prospera en el secreto, el silencio y el juicio.", author: "Brené Brown" },
    { text: "El amor romántico no es un sentimiento; es una elección diaria.", author: "M. Scott Peck — El camino menos transitado" },
    /* NOVIEMBRE tardío — Filosofía oriental y sabiduría universal */
    { text: "La mente lo es todo. En lo que piensas, en eso te conviertes.", author: "Buda" },
    { text: "Tres cosas no pueden ocultarse por mucho tiempo: el sol, la luna y la verdad.", author: "Buda" },
    { text: "El dolor es inevitable; el sufrimiento es opcional.", author: "Buda" },
    { text: "Ayer era inteligente, así que quería cambiar el mundo. Hoy soy sabio, así que me cambio a mí mismo.", author: "Rumi — Masnavi" },
    { text: "Lo que buscas también te está buscando.", author: "Rumi" },
    { text: "Baila aunque te quemen los pies.", author: "Rumi" },
    { text: "Vive donde temas vivir. Destruye tu reputación. Sé notorio.", author: "Rumi" },
    { text: "El corazón no puede llenarse de amor si está lleno de miedo.", author: "Rumi" },
    { text: "Si quieres que los demás sean felices, practica la compasión. Si quieres ser feliz tú mismo, practica la compasión.", author: "Dalai Lama XIV" },
    { text: "La compasión y el amor no son lujos; son necesidades.", author: "Dalai Lama XIV" },
    { text: "Sé el cambio que deseas ver en el mundo.", author: "Mahatma Gandhi" },
    { text: "La fuerza no proviene de la capacidad física, sino de la voluntad indomable.", author: "Mahatma Gandhi" },
    { text: "No hay camino para la paz; la paz es el camino.", author: "Mahatma Gandhi" },
    /* DICIEMBRE — Reflexiones sobre el tiempo, el amor y la vida */
    { text: "La oscuridad no puede expulsar a la oscuridad; sólo la luz puede hacerlo.", author: "Martin Luther King Jr." },
    { text: "La injusticia en cualquier parte es una amenaza a la justicia en todas partes.", author: "Martin Luther King Jr." },
    { text: "Sólo se ve bien con el corazón; lo esencial es invisible a los ojos.", author: "Antoine de Saint-Exupéry — El principito" },
    { text: "Eres responsable para siempre de lo que has domesticado.", author: "Antoine de Saint-Exupéry — El principito" },
    { text: "Lo que hace tan bello al desierto es que en algún lugar esconde un pozo.", author: "Antoine de Saint-Exupéry — El principito" },
    { text: "El tiempo que perdiste por tu rosa es lo que hace a tu rosa tan importante.", author: "Antoine de Saint-Exupéry — El principito" },
    { text: "La mejor prueba de amor es la confianza.", author: "Joyce Brothers" },
    { text: "El amor no mira con los ojos, sino con la mente.", author: "William Shakespeare — Sueño de una noche de verano" },
    { text: "Saber que alguien te está esperando te hace estar de un humor diferente todo el día.", author: "Wendell Berry" },
    { text: "El amor no es lo que sentimos por alguien; es lo que somos cuando estamos con alguien.", author: "Erich Fromm" },
    { text: "La distancia no es para los miedosos; es para los valientes que saben que algo vale la pena.", author: "anónimo" },
    { text: "Donde quiera que vayas, ve con todo tu corazón.", author: "Confucio" },
    { text: "La mayor felicidad es amar y ser amado.", author: "George Sand" },
    { text: "No desperdicio un solo día de mi vida pensando en lo que podría haber sido.", author: "Paul Auster" },
    { text: "Hay cosas que sólo el tiempo y el silencio pueden decir.", author: "Marguerite Yourcenar — Memorias de Adriano" },
    /* Jane Austen */
    { text: "En vano he luchado. No sirve de nada. No puedo reprimir mis sentimientos: debo decirle cuán ardientemente la admiro y la amo.", author: "Jane Austen — Orgullo y Prejuicio (Mr. Darcy)" },
    { text: "Es un hecho universalmente reconocido que un hombre soltero en posesión de una buena fortuna debe estar necesitado de esposa.", author: "Jane Austen — Orgullo y Prejuicio" },
    { text: "No puedo determinar la hora, ni el lugar, ni la mirada, ni las palabras que sentaron los cimientos. Estaba ya en medio antes de saber que había comenzado.", author: "Jane Austen — Orgullo y Prejuicio (Mr. Darcy)" },
    { text: "Me desgarras el alma. Estoy a medias entre la agonía y la esperanza. Dime que no he llegado demasiado tarde.", author: "Jane Austen — Persuasión (Carta del Capitán Wentworth)" },
    { text: "Piensa en el pasado sólo en la medida en que su recuerdo te dé placer.", author: "Jane Austen — Orgullo y Prejuicio (Elizabeth Bennet)" },
    { text: "La persona que no encuentra placer en una buena novela debe ser intolerablemente estúpida.", author: "Jane Austen — La Abadía de Northanger" },
    { text: "Hay pocas personas a quienes quiero de verdad, y aún menos de quienes pienso bien.", author: "Jane Austen — Orgullo y Prejuicio (Elizabeth Bennet)" },
    { text: "Conócete a ti misma. Lo único que te hace falta es paciencia... o dale un nombre más fascinante: llámala esperanza.", author: "Jane Austen — Sentido y Sensibilidad" },
    { text: "Una mujer inteligente tiene en sus manos la felicidad de todos los que la rodean.", author: "Jane Austen — Emma" }
];

/* ── FRASE DIARIA POR DÍA DEL AÑO ── */
function initDailyQuote() {
    const now   = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((now - start) / 86400000); // 1 – 365
    const q = quotes[(dayOfYear - 1) % quotes.length];

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
