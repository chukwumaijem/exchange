const form = document.getElementById('exchange');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = document.getElementById('submit');
  button.disabled = true;

  const select = document.getElementById('currencies');
  const currency = select.options[select.selectedIndex].value;
  let value;
  try {
    const resp = await fetch('/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currency }),
    });
    const data = await resp.json();
    value = `Result amount in EUR: ${Number(data).toFixed(2)}`;
  } catch (e) {
    value = `Error: ${e.message}`;
  }

  const rate = document.getElementById('rate');
  rate.innerText = value;
  button.disabled = false;
});
