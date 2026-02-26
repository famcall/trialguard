(function () {

  async function checkEmail(email) {
    const res = await fetch("https://trialguard.org/.netlify/functions/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    return res.json();
  }

  document.addEventListener("submit", async function (e) {
    const form = e.target;
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput) return;

    e.preventDefault();

    const email = emailInput.value.toLowerCase();

    try {
      const result = await checkEmail(email);

      if (!result.allow) {
        alert("🚫 TrialGuard blocked this signup.");
        return;
      }

      form.submit();

    } catch (err) {
      alert("Guard check failed.");
    }
  });

})();
