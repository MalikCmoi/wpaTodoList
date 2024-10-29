console.log('Hello, Progressive Web App!');

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js') // Remplacez par le chemin de votre fichier service worker
        .then(registration => {
          console.log('Service Worker enregistré avec succès:', registration);
        })
        .catch(error => {
          console.error('Échec de l\'enregistrement du Service Worker:', error);
        });
    });
  }