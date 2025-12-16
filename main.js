import { renderCandidateTable } from './components/body/body.js';

function loadCSS(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
}

async function loadComponent(id, htmlPath, cssPath = null) {
    try {
        
        const response = await fetch(htmlPath);
        if (response.ok) {
            const htmlContent = await response.text();
            document.getElementById(id).innerHTML = htmlContent;
            
        
            if (cssPath) {
                loadCSS(cssPath);
            }
        }
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    loadComponent('header-container', './components/header/header.html', './components/header/header.css');
    loadComponent('sidebar-container', './components/sidebar/sidebar.html', './components/sidebar/sidebar.css');
    await loadComponent('body-container', './components/body/body.html', './components/body/body.css');
    renderCandidateTable();
});