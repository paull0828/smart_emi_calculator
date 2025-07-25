document.addEventListener("DOMContentLoaded", () => {
  //select the elements
  const calculateBtn = document.getElementById("calculateBtn");
  const amountInput = document.getElementById("amount");
  const interestInput = document.getElementById("interest");
  const yearsInput = document.getElementById("years");
  //summary

  const monthlyPayment = document.getElementById("monthly");
  const totalPayment = document.getElementById("total");
  const totalInterest = document.getElementById("totalInterest");

  // Function to calculate EMI
  function calculateLoan() {
    const principal = parseFloat(amountInput.value);
    const Interest = parseFloat(interestInput.value) / 100 / 12;
    const payments = parseFloat(yearsInput.value) * 12;
    if (isNaN(principal) || isNaN(Interest) || isNaN(payments)) {
      alert("Please enter valid numbers for all fields.");
      return;
    }
    // Calculate monthnly payment
    const x = Math.pow(1 + Interest, payments);
    const monthly = (principal * Interest * x) / (x - 1);
    if (isFinite(monthly)) {
      const total = monthly * payments;
      const totalInt = total - principal;
      // Show the results
      monthlyPayment.textContent = `₹${monthly.toFixed(2)}`;
      totalPayment.textContent = `₹${total.toFixed(2)}`;
      totalInterest.textContent = `₹${totalInt.toFixed(2)}`;
      animateValue(monthlyPayment, 0, monthly, 1000);
      animateValue(totalPayment, 0, total, 1000);
      animateValue(totalInterest, 0, totalInt, 1000);
    }
  }

  //animation
  function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (end - start) * progress;
      element.textContent = current.toFixed(2);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }
  }
  //bind event to calculate loan
  calculateBtn.addEventListener("click", calculateLoan);
});
