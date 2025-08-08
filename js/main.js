(() => {
  const COMMISSION = 0.3;
  
  const btnBundles = document.getElementById('btnBundles');
  const btnItems = document.getElementById('btnItems');
  const btnGamepass = document.getElementById('btnGamepass');
  const inputId = document.getElementById('inputId');
  const btnOpen = document.getElementById('btnOpen');
  const btnCopy = document.getElementById('btnCopy');
  const btnReset = document.getElementById('btnReset');
  const linkPreview = document.getElementById('linkPreview');
  const inputGross = document.getElementById('inputGross');
  const inputDesiredNet = document.getElementById('inputDesiredNet');
  const netReceived = document.getElementById('netReceived');
  const requiredGross = document.getElementById('requiredGross');
  const previewId = document.getElementById('previewId');
  const previewType = document.getElementById('previewType');
  const openRobloxLink = document.getElementById('openRobloxLink');

  let mode = 'items';

  function updateModeButtons() {
    btnBundles.classList.toggle('active', mode === 'bundles');
    btnItems.classList.toggle('active', mode === 'items');
    btnGamepass.classList.toggle('active', mode === 'gamepass');
  }

  function buildUrl(mode, id) {
    if (!id) return null;
    if (!/^\d+$/.test(id)) return null;
    switch(mode) {
      case 'bundles': return `https://www.roblox.com/bundles/${id}/bundle`;
      case 'items': return `https://www.roblox.com/catalog/${id}/`;
      case 'gamepass': return `https://www.roblox.com/game-pass/${id}`;
      default: return null;
    }
  }

  function updatePreview() {
    const id = inputId.value.trim();
    const url = buildUrl(mode, id);
    linkPreview.textContent = url ? `Preview link: ${url}` : 'Preview link: —';
    previewId.textContent = `ID: ${id || '—'}`;
    previewType.textContent = `Type: ${mode}`;
    openRobloxLink.href = url || '#';
  }

  function updateCommission() {
    const gross = parseFloat(inputGross.value);
    if (isNaN(gross) || gross < 0) {
      netReceived.textContent = '—';
    } else {
      const net = gross * (1 - COMMISSION);
      netReceived.textContent = `${Math.round(net)} Robux`;
    }


    const desiredNetVal = parseFloat(inputDesiredNet.value);
    if (isNaN(desiredNetVal) || desiredNetVal < 0) {
      requiredGross.textContent = '—';
    } else {
      const grossNeeded = desiredNetVal / (1 - COMMISSION);
      requiredGross.textContent = `${Math.round(grossNeeded)} Robux`;
    }
  }

  btnBundles.addEventListener('click', () => {
    mode = 'bundles';
    updateModeButtons();
    updatePreview();
  });

  btnItems.addEventListener('click', () => {
    mode = 'items';
    updateModeButtons();
    updatePreview();
  });

  btnGamepass.addEventListener('click', () => {
    mode = 'gamepass';
    updateModeButtons();
    updatePreview();
  });

  inputId.addEventListener('input', updatePreview);

  btnOpen.addEventListener('click', () => {
    const url = buildUrl(mode, inputId.value.trim());
    if (url) window.open(url, '_blank', 'noopener');
    else alert('Please enter a valid numeric ID.');
  });

  btnCopy.addEventListener('click', () => {
    const url = buildUrl(mode, inputId.value.trim());
    if (!url) return alert('Please enter a valid numeric ID.');
    navigator.clipboard.writeText(url)
      .then(() => alert('Link copied to clipboard!'))
      .catch(() => alert('Failed to copy.'));
  });

  btnReset.addEventListener('click', () => {
    inputId.value = '';
    updatePreview();
  });

  inputGross.addEventListener('input', updateCommission);
  inputDesiredNet.addEventListener('input', updateCommission);

  document.addEventListener('contextmenu', e => e.preventDefault());
  document.addEventListener('dragstart', e => e.preventDefault());

  updateModeButtons();
  updatePreview();
  updateCommission();
})();

