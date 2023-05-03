// Inject custom js
var s = document.createElement('script');
s.type = 'text/javascript';
s.src = chrome.runtime.getURL("hack.js");
s.async = false;
document.documentElement.appendChild(s);
s.remove();