const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contactForm");
const filterButtons = document.querySelectorAll(".tab-button");
const productCards = document.querySelectorAll(".product-card");
const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    productCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const product = formData.get("product");
    const message = formData.get("message") || "Please share product details and availability.";

    const text = [
      "Hello SK-MOBILE-STORE,",
      `My name is ${name}.`,
      `Phone: ${phone}`,
      `Product Category: ${product}`,
      `Message: ${message}`,
    ].join("\n");

    window.open(`https://wa.me/923014727740?text=${encodeURIComponent(text)}`, "_blank");
    contactForm.reset();
  });
}
