document.addEventListener('click', function(e) {
    
    const toggleBtn = e.target.closest('.collapse-btn');

    if (toggleBtn) {
    
        const sidebar = document.getElementById('sidebar-container');
        
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
        }
    }
});

export function setupSidebarToggle() {
  const sidebarItems = document.querySelectorAll(".sidebar-content-list-item");
  sidebarItems.forEach((item) => {
    item.addEventListener("click", function () {
      sidebarItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });
  });
}
