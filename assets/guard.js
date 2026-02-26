(function () {

  function isDisposable(email) {
    const blocked = ["tempmail", "10minutemail", "guerrillamail"];
    return blocked.some(domain => email.includes(domain));
  }

  document.addEventListener("submit", function (e) {
    const form = e.target;
    const input = form.querySelector('input[type="email"]');
    if (!input) return;

    const email = input.value.toLowerCase();

    if (isDisposable(email)) {
      e.preventDefault();
      alert("🚫 TrialGuard blocked this signup.");
    }
  });

})();
