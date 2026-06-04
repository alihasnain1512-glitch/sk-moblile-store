const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector("#contactForm");
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
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const product = formData.get("product");
    const message = formData.get("message") || "Please share details and availability.";

    const whatsappMessage = [
      "Hello SK-MOBILE-STORE,",
      `My name is ${name}.`,
      `Phone: ${phone}`,
      `Product Interest: ${product}`,
      `Message: ${message}`,
    ].join("\n");

    window.open(`https://wa.me/923014727740?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    contactForm.reset();
  });
}
