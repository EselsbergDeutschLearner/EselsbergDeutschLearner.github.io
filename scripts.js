document.addEventListener('DOMContentLoaded', () => {
    let metaCSP = document.createElement('meta');
    metaCSP.httpEquiv = "Content-Security-Policy";
    metaCSP.content = "default-src 'self'; script-src 'self';";
    document.head.appendChild(metaCSP);

    let metaXCTO = document.createElement('meta');
    metaXCTO.httpEquiv = "X-Content-Type-Options";
    metaXCTO.content = "nosniff";
    document.head.appendChild(metaXCTO);
});

// Example function to add static content
function loadStaticContent() {
    const sections = ['vocabulary', 'grammar', 'exercises', 'resources', 'blog', 'deutsch'];
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        section.innerHTML = `<h2>${sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}</h2><p>This is static content for ${sectionId}.</p>`;
    });
}

// Load static content on page load
loadStaticContent();
