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
                printNumbers();
                loadCSS(cssPath);
            }
        }
    } catch (error) {
        console.error('Lỗi:', error);
    }
}

function printNumbers() {
    for (let i = 1; i <= 100; i++) {
        console.log(i);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    loadComponent('header-container', './components/header/header.html', './components/header/header.css');
    loadComponent('sidebar-container', './components/sidebar/sidebar.html', './components/sidebar/sidebar.css');
    loadComponent('body-container', './components/body/body.html', './components/body/body.css');
});