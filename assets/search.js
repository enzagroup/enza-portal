(function(){
  function ready(fn){ if(document.readyState!=='loading'){ fn(); } else { document.addEventListener('DOMContentLoaded', fn); } }

  ready(function(){
    // Avoid duplicating the button
    if (document.querySelector('.floating-search-button')) return;

    const btn = document.createElement('button');
    btn.className = 'floating-search-button';
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg><span>Search</span>';

    btn.addEventListener('click', function(){
      // Try to open Zudoku's built-in search if available
      try {
        const evt = new CustomEvent('zudoku:open-search');
        window.dispatchEvent(evt);
      } catch(e) {
        // fallback: focus header input if exists
        const input = document.querySelector('header input[type="search"], input[placeholder*="Search"]');
        if (input) input.focus();
      }
    });

    document.body.appendChild(btn);
  });
})();
