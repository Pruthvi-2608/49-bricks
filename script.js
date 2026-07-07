const header = document.getElementById('site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const testimonials = [
  {
    quote: '“The house felt like it had been waiting for us all along — warm, tailored, and impossibly calm.”',
    author: 'A. Rao',
    date: '3 nights • July 2025'
  },
  {
    quote: '“Every detail felt considered, from the linen to the late check-in and the lantern-lit terrace.”',
    author: 'N. Singh',
    date: '5 nights • October 2025'
  },
  {
    quote: '“An effortless stay with a sharp eye for design and comfort — exactly the kind of escape we needed.”',
    author: 'L. Chawla',
    date: '2 nights • April 2026'
  }
];

let testimonialIndex = 0;
const quoteEl = document.getElementById('testimonial-quote');
const authorEl = document.getElementById('testimonial-author');
const dateEl = document.getElementById('testimonial-date');

function updateTestimonial(index) {
  const item = testimonials[index];
  quoteEl.textContent = item.quote;
  authorEl.textContent = item.author;
  dateEl.textContent = item.date;
}

document.querySelectorAll('.control').forEach((button) => {
  button.addEventListener('click', () => {
    const direction = button.getAttribute('data-direction');
    testimonialIndex = direction === 'next'
      ? (testimonialIndex + 1) % testimonials.length
      : (testimonialIndex - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(testimonialIndex);
  });
});

updateTestimonial(testimonialIndex);
