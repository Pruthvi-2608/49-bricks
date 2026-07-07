import { useEffect, useState } from 'react';

const properties = [
  {
    title: 'Stone & Sky Villa',
    location: 'Jaisalmer • 6 guests • 3 bedrooms',
    price: '₹18,500',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80',
    verified: true,
    even: false,
  },
  {
    title: 'Monsoon House',
    location: 'Lonavala • 4 guests • 2 bedrooms',
    price: '₹12,400',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    verified: false,
    even: true,
  },
  {
    title: 'Canal Court Bungalow',
    location: 'Alleppey • 8 guests • 4 bedrooms',
    price: '₹21,200',
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=900&q=80',
    verified: true,
    even: false,
  },
  {
    title: 'Forest View Retreat',
    location: 'Coorg • 5 guests • 3 bedrooms',
    price: '₹15,900',
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=900&q=80',
    verified: false,
    even: true,
  },
];

const features = [
  {
    title: 'Verified homes',
    body: 'Every stay is checked for comfort, privacy, and ease before it reaches the collection.',
  },
  {
    title: 'Private pools',
    body: 'Choose homes designed for slow mornings, long lunches, and uninterrupted evenings.',
  },
  {
    title: 'On-call hosts',
    body: 'A host answers within 15 minutes, day or night, when plans shift or plans are made.',
  },
  {
    title: 'Curated stays',
    body: 'We favour spaces with character, texture, and a sense of placement over generic luxury.',
  },
];

const experiences = [
  {
    title: 'Monsoon in Lonavala',
    caption: 'Monsoon retreat',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Desert nights in Jaisalmer',
    caption: 'Desert nights',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Cool air in Coorg',
    caption: 'Slow mornings',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80',
  },
];

const testimonials = [
  {
    quote: 'The house felt like it had been waiting for us all along — warm, tailored, and impossibly calm.',
    author: 'A. Rao',
    date: '3 nights • July 2025',
  },
  {
    quote: 'Every detail felt considered, from the linen to the late check-in and the lantern-lit terrace.',
    author: 'N. Singh',
    date: '5 nights • October 2025',
  },
  {
    quote: 'An effortless stay with a sharp eye for design and comfort — exactly the kind of escape we needed.',
    author: 'L. Chawla',
    date: '2 nights • April 2026',
  },
];

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

function BrickDivider() {
  return (
    <div className="my-16 flex items-center gap-2 overflow-hidden" aria-hidden="true">
      <div className="h-[2px] flex-1 bg-brass-500/40" />
      <svg viewBox="0 0 36 12" className="h-3 w-20 shrink-0" fill="none">
        <rect x="2" y="2" width="12" height="8" rx="1" fill="#B8935A" fillOpacity="0.45" />
        <rect x="14" y="2" width="12" height="8" rx="1" fill="#B8935A" fillOpacity="0.2" />
        <rect x="26" y="2" width="8" height="8" rx="1" fill="#B8935A" fillOpacity="0.28" />
      </svg>
      <div className="h-[2px] flex-1 bg-brass-500/40" />
    </div>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL') {
      setFormStatus('missing-url');
      return;
    }

    setFormStatus('submitting');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-limewash-50 font-body text-mortar-950">
      <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-limewash-50/95 text-mortar-950 shadow-[0_4px_24px_rgba(38,34,30,0.08)] backdrop-blur' : 'bg-transparent text-white'}`}>
        <nav className="mx-auto flex w-[min(1180px,calc(100%-2rem))] items-center justify-between py-5">
          <a href="#top" className="inline-flex items-baseline gap-1" aria-label="49 Bricks home">
            <span className="font-mono text-[1.05rem] tracking-[0.16em]">49</span>
            <span className="font-display text-[1.2rem] font-semibold">Bricks</span>
          </a>
          <div className="hidden items-center gap-6 text-sm md:flex">
            <a href="#collections" className="transition hover:text-clay-700">Villas</a>
            <a href="#collections" className="transition hover:text-clay-700">Collections</a>
            <a href="#experiences" className="transition hover:text-clay-700">Experiences</a>
            <a href="#about" className="transition hover:text-clay-700">About</a>
            <a href="#newsletter" className="transition hover:text-clay-700">Contact</a>
          </div>
          <a href="#newsletter" className="rounded-sm bg-clay-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-clay-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-700 focus-visible:ring-offset-2">Enquire</a>
        </nav>
      </header>

      <main id="top">
        <section className="relative flex min-h-screen flex-col justify-center bg-[linear-gradient(90deg,rgba(38,34,30,0.72)_0%,rgba(38,34,30,0.36)_48%,rgba(38,34,30,0.1)_100%),url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center pt-24">
          <div className="mx-auto w-[min(1180px,calc(100%-2rem))] pb-24 pt-8">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-brass-500">Curated villas • Private stays • Slow travel</p>
              <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Script your stay, one brick at a time.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
                Discover handcrafted homes in the world’s most beautiful corners — from desert hideaways to misty hill retreats.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#collections" className="rounded-sm bg-clay-700 px-5 py-3 font-semibold text-white transition hover:bg-clay-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-700 focus-visible:ring-offset-2">
                  Explore stays
                </a>
                <a href="#about" className="rounded-sm border border-brass-500 bg-transparent px-5 py-3 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-700 focus-visible:ring-offset-2">
                  Why 49 Bricks
                </a>
              </div>
            </div>

            <form className="mt-12 grid gap-3 rounded-sm border border-stone-300/70 bg-limewash-100 p-4 shadow-[0_14px_40px_rgba(38,34,30,0.12)] md:grid-cols-5" aria-label="Search stays">
              <label className="flex flex-col gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-stone-400">
                <span>Location</span>
                <input className="rounded-sm border border-stone-300/70 bg-white px-3 py-2 text-sm text-mortar-950 outline-none" defaultValue="Lonavala" />
              </label>
              <label className="flex flex-col gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-stone-400">
                <span>Check in</span>
                <input type="date" className="rounded-sm border border-stone-300/70 bg-white px-3 py-2 text-sm text-mortar-950 outline-none" />
              </label>
              <label className="flex flex-col gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-stone-400">
                <span>Check out</span>
                <input type="date" className="rounded-sm border border-stone-300/70 bg-white px-3 py-2 text-sm text-mortar-950 outline-none" />
              </label>
              <label className="flex flex-col gap-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-stone-400">
                <span>Guests</span>
                <input className="rounded-sm border border-stone-300/70 bg-white px-3 py-2 text-sm text-mortar-950 outline-none" defaultValue="4 Guests" />
              </label>
              <button type="submit" className="rounded-sm bg-clay-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-clay-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-700 focus-visible:ring-offset-2 md:self-end">
                Search
              </button>
            </form>
          </div>
        </section>

        <section className="mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-3 rounded-sm border border-stone-300/70 bg-white px-4 py-4 shadow-[0_14px_40px_rgba(38,34,30,0.08)] md:grid-cols-4 md:py-6 lg:-mt-8 lg:relative lg:z-10" aria-label="Property stats">
          <div className="flex flex-col items-center justify-center border-b border-brass-500/40 py-2 md:border-b-0 md:border-r md:py-0">
            <span className="font-mono text-[1rem] font-semibold text-clay-700">49</span>
            <span className="text-sm text-stone-400">villas</span>
          </div>
          <div className="flex flex-col items-center justify-center border-b border-brass-500/40 py-2 md:border-b-0 md:border-r md:py-0">
            <span className="font-mono text-[1rem] font-semibold text-clay-700">14</span>
            <span className="text-sm text-stone-400">cities</span>
          </div>
          <div className="flex flex-col items-center justify-center border-b border-brass-500/40 py-2 md:border-b-0 md:border-r md:py-0">
            <span className="font-mono text-[1rem] font-semibold text-clay-700">4.8★</span>
            <span className="text-sm text-stone-400">average</span>
          </div>
          <div className="flex flex-col items-center justify-center py-2 md:py-0">
            <span className="font-mono text-[1rem] font-semibold text-clay-700">2019</span>
            <span className="text-sm text-stone-400">established</span>
          </div>
        </section>

        <section id="collections" className="mx-auto w-[min(1180px,calc(100%-2rem))] py-16 md:py-20">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brass-500">Featured collections</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-mortar-950 sm:text-4xl">
                Homes laid like a wall of intention.
              </h2>
            </div>
            <a href="#" className="font-semibold text-clay-700 transition hover:text-clay-900">View all →</a>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {properties.map((property, index) => (
              <article key={property.title} className={`group overflow-hidden border border-stone-300/70 bg-limewash-100 shadow-[0_10px_30px_rgba(38,34,30,0.06)] ${property.even ? 'mt-0 md:mt-10' : 'mt-0'}`}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={property.image} alt={property.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  {property.verified ? <span className="mb-3 inline-block rounded-sm bg-moss-600/12 px-2 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-moss-600">Verified</span> : null}
                  <h3 className="font-display text-xl font-semibold text-mortar-950">{property.title}</h3>
                  <p className="mt-2 text-sm text-stone-400">{property.location}</p>
                  <div className="mt-4 flex items-baseline justify-between font-mono text-sm text-clay-700">
                    <span className="text-base font-semibold">{property.price}</span>
                    <span className="text-stone-400">/night</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <BrickDivider />

        <section id="about" className="mx-auto w-[min(1180px,calc(100%-2rem))] py-6">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brass-500">Why 49 Bricks</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-mortar-950 sm:text-4xl">Quiet confidence, thoughtful hospitality.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <article key={feature.title} className="border border-stone-300/70 bg-white p-5 shadow-[0_10px_30px_rgba(38,34,30,0.04)]">
                <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-400">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="experiences" className="mx-auto w-[min(1180px,calc(100%-2rem))] py-16">
          <div className="mb-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brass-500">Curated experiences</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-mortar-950 sm:text-4xl">Editorial stays with a sense of place.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {experiences.map((experience) => (
              <article key={experience.title} className="overflow-hidden border border-stone-300/70 bg-white shadow-[0_10px_30px_rgba(38,34,30,0.04)]">
                <img src={experience.image} alt={experience.title} className="aspect-[4/3] object-cover" />
                <div className="p-4">
                  <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-stone-400">{experience.caption}</p>
                  <h3 className="font-display text-xl font-semibold">{experience.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-[min(1180px,calc(100%-2rem))] py-8">
          <div className="rounded-sm border border-stone-300/70 bg-[linear-gradient(135deg,#ffffff_0%,#f7efe2_100%)] p-8 shadow-[0_10px_30px_rgba(38,34,30,0.06)]">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-brass-500">What guests say</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-mortar-950 sm:text-4xl">Quiet luxury, felt immediately.</h2>
            <p className="mt-6 max-w-3xl font-display text-xl italic leading-relaxed text-mortar-700">
              “{testimonials[activeTestimonial].quote}”
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm text-stone-400">
              <div className="font-mono">
                <span className="font-semibold text-mortar-950">{testimonials[activeTestimonial].author}</span> • {testimonials[activeTestimonial].date}
              </div>
              <div className="flex gap-2">
                <button type="button" className="h-10 w-10 rounded-sm border border-stone-300/70 bg-white transition hover:bg-limewash-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-700 focus-visible:ring-offset-2" onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))} aria-label="Previous testimonial">←</button>
                <button type="button" className="h-10 w-10 rounded-sm border border-stone-300/70 bg-white transition hover:bg-limewash-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-700 focus-visible:ring-offset-2" onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)} aria-label="Next testimonial">→</button>
              </div>
            </div>
          </div>
        </section>

        <section id="newsletter" className="mt-12 bg-brass-500 py-10">
          <div className="mx-auto flex w-[min(1180px,calc(100%-2rem))] flex-wrap items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-mortar-950/80">The shortlist</p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-mortar-950 sm:text-4xl">Receive first access to new villas and seasonal stays.</h2>
            </div>
            <form className="w-full max-w-xl rounded-sm border border-mortar-950/10 bg-white/90 p-4 shadow-[0_10px_30px_rgba(38,34,30,0.08)]" onSubmit={handleSubmit}>
              <div className="grid gap-3 md:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-medium text-mortar-950">
                  <span>Name</span>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="rounded-sm border border-stone-300/70 bg-white px-3 py-2 text-sm outline-none" />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-mortar-950">
                  <span>Email</span>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="rounded-sm border border-stone-300/70 bg-white px-3 py-2 text-sm outline-none" />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-mortar-950">
                  <span>Phone</span>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="rounded-sm border border-stone-300/70 bg-white px-3 py-2 text-sm outline-none" />
                </label>
                <label className="flex flex-col gap-1 text-sm font-medium text-mortar-950 md:col-span-2">
                  <span>Message</span>
                  <textarea name="message" rows="3" value={formData.message} onChange={handleInputChange} required className="rounded-sm border border-stone-300/70 bg-white px-3 py-2 text-sm outline-none" />
                </label>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <button type="submit" disabled={formStatus === 'submitting'} className="rounded-sm bg-mortar-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-mortar-700 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mortar-950 focus-visible:ring-offset-2">
                  {formStatus === 'submitting' ? 'Sending…' : 'Send request'}
                </button>
                {formStatus === 'success' ? <span className="text-sm font-medium text-mortar-950">Thanks — your request has been sent.</span> : null}
                {formStatus === 'error' ? <span className="text-sm font-medium text-clay-900">Something went wrong. Please try again.</span> : null}
                {formStatus === 'missing-url' ? <span className="text-sm font-medium text-clay-900">Please add your Google Apps Script URL to connect this form.</span> : null}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-mortar-950 py-12 text-white/80">
        <div className="mx-auto grid w-[min(1180px,calc(100%-2rem))] gap-8 md:grid-cols-4">
          <div>
            <a href="#top" className="mb-3 inline-flex items-baseline gap-1">
              <span className="font-mono text-[1.05rem] tracking-[0.16em] text-white">49</span>
              <span className="font-display text-[1.2rem] font-semibold text-white">Bricks</span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-white/70">Handpicked villa stays with calm design and lasting comfort.</p>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-white">Explore</h3>
            <a href="#collections" className="mt-3 block text-sm text-white/70 transition hover:text-white">Collections</a>
            <a href="#experiences" className="mt-2 block text-sm text-white/70 transition hover:text-white">Experiences</a>
            <a href="#about" className="mt-2 block text-sm text-white/70 transition hover:text-white">About</a>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-white">Company</h3>
            <a href="#" className="mt-3 block text-sm text-white/70 transition hover:text-white">Our story</a>
            <a href="#" className="mt-2 block text-sm text-white/70 transition hover:text-white">Careers</a>
            <a href="#" className="mt-2 block text-sm text-white/70 transition hover:text-white">Press</a>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-white">Support</h3>
            <a href="#newsletter" className="mt-3 block text-sm text-white/70 transition hover:text-white">Contact</a>
            <a href="#" className="mt-2 block text-sm text-white/70 transition hover:text-white">FAQs</a>
            <a href="#" className="mt-2 block text-sm text-white/70 transition hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
