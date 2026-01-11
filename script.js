// year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

const chatBody = document.getElementById("chatBody");
const input = document.getElementById("userInput");
const suggestions = document.getElementById("suggestions");

function toggleChat() {
  const chatbot = document.getElementById("chatbot");
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
}

function sendSuggestion(text) {
  input.value = text;
  sendMessage();
}

function hideSuggestions() {
  if (suggestions) suggestions.style.display = "none";
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  hideSuggestions();

  chatBody.innerHTML += `<div class="user">${text}</div>`;
  input.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    let reply = "Thanks for reaching out! 😊";
    const msg = text.toLowerCase();

    if (msg.includes("project")) {
      reply = "You can explore my work above in the Projects section 👆";
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" });
    } else if (
      msg.includes("hire me") ||
      msg.includes("pricing") ||
      msg.includes("work") ||
      msg.includes("hire")
    ) {
      reply = `
    Great! Let’s bring your ideas to life 👇<br><br>
    <a href="#" onclick="openWhatsApp(
      'Hi Purnendu, I’d like to discuss a project with you. I found your portfolio website.'
    ); return false;">
      Chat on WhatsApp
    </a>
  `;
    } else if (
      msg.includes("recruiter") ||
      msg.includes("resume") ||
      msg.includes("job")
    ) {
      reply = `
        You can find my full experience and background on LinkedIn 👇<br><br>
        <a href="https://www.linkedin.com/in/purnendu-kumar-sinha-09903b165/" target="_blank">
          View LinkedIn Profile
        </a>
      `;
    } else if (msg.includes("whatsapp") || msg.includes("contact")) {
      reply = `
    Jumping straight to WhatsApp 💬<br><br>
    <a href="#" onclick="openWhatsApp(
      'Hi Purnendu, I found you through your portfolio website.'
    ); return false;">
      Message me on WhatsApp
    </a>
  `;
    }

    chatBody.innerHTML += `<div class="bot">${reply}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 500);
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function resetChat() {
  chatBody.innerHTML = `
    <div class="bot">
      Hi 👋 What would you like to do?
    </div>

    <div class="suggestions" id="suggestions">
      <button onclick="sendSuggestion('projects')">View Projects</button>
      <button onclick="sendSuggestion('hire')">Hire Me</button>
      <button onclick="sendSuggestion('recruiter')">Recruiter</button>
      <button class="whatsapp" onclick="sendSuggestion('whatsapp')">
        WhatsApp
      </button>
    </div>
  `;
}

function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "917992326834"; // your WhatsApp number
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(url, "_blank");
}

const counters = document.querySelectorAll(".stat-number");

const animateCounters = () => {
  counters.forEach((counter) => {
    const target = +counter.dataset.target;
    const speed = 120; // smaller = faster

    const updateCount = () => {
      const current = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 30);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect(); // run only once
    }
  },
  { threshold: 0.5 }
);

observer.observe(document.querySelector(".experience-stats"));
