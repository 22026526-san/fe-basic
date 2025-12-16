document.addEventListener('click', function(e) {
    
    const toggleBtn = e.target.closest('.collapse-btn');

    if (toggleBtn) {
    
        const sidebar = document.getElementById('sidebar-container');
        
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
        }
    }
});