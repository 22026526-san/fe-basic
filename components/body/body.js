import { getCandidatesFromLocalStorage } from '../../utils/localStorage.js';
import { openEditPopup } from '../../components/popup/popup.js';

let currentPage = 1;   
let pageSize = 25;    
let totalRecords = 0;

let searchTerm = "";

function checkNull(value) {
    return value ? value : "--";
}

function renderStars(rate) {
    let starsHtml = "";
    const safeRate = Math.max(0, Math.min(5, Number(rate) || 0)); 
    
    for (let i = 1; i <= 5; i++) {
        if (i <= safeRate) {
            starsHtml += `<span style="color: #ffc107; font-size: 18px; margin-right: 2px;">★</span>`;
        } else {
            starsHtml += `<span style="color: #e5e7eb; font-size: 18px; margin-right: 2px;">★</span>`;
        }
    }
    return starsHtml;
}

export function updateFooterUI() {
    const totalLabel = document.querySelector('.footer-left strong');
    if (totalLabel) {
        totalLabel.innerText = totalRecords;
    }
    const startRecord = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    let endRecord = currentPage * pageSize;
    
    if (endRecord > totalRecords) {
        endRecord = totalRecords;
    }

    const paginationInfo = document.querySelector('.pagination span');
    if (paginationInfo) {
        paginationInfo.innerText = `${startRecord} - ${endRecord} bản ghi`;
    }

    const prevBtn = document.querySelector('.icon-prev');
    const nextBtn = document.querySelector('.icon-next');
    const totalPages = Math.ceil(totalRecords / pageSize);

    if (prevBtn) {
        if (currentPage === 1) {
            prevBtn.classList.add('disabled'); 
        } else {
            prevBtn.classList.remove('disabled'); 
        }
    }

    if (nextBtn) {
        if (currentPage >= totalPages || totalRecords === 0) {
            nextBtn.classList.add('disabled'); 
        } else {
            nextBtn.classList.remove('disabled'); 
        }
    }
    
}

export function initPaginationEvents() {
    const prevBtn = document.querySelector('.icon-prev');
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--; 
                renderCandidateTable(); 
            }
        });
       
        prevBtn.style.cursor = 'pointer'; 
    }

    const nextBtn = document.querySelector('.icon-next');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(totalRecords / pageSize);
            
            if (currentPage < totalPages) {
                currentPage++; 
                renderCandidateTable(); 
            }
        });
        nextBtn.style.cursor = 'pointer';
    }
}

export function initSearchEvents() {
    const searchInput = document.querySelector('.search-box input');
    const searchClick = document.querySelector('.search-icon-table');

    if (searchClick) {
        console.log('here')
        searchClick.addEventListener('click', () => {
            const value = searchInput.value;
            searchTerm = value.trim(); 
            currentPage = 1;
            renderCandidateTable();
        });
    }
}

export function renderCandidateTable() {
    const allData = getCandidatesFromLocalStorage() || [];
    
    let finalData = [];

    if (searchTerm.trim() === "") {
        finalData = allData;
    } else {
        const keyword = searchTerm.toLowerCase();
        finalData = allData.filter(candidate => {
            const name = (candidate.fullName || "").toLowerCase();
            const email = (candidate.email || "").toLowerCase();
            const phone = String(candidate.phone || ""); 

            return name.includes(keyword) || email.includes(keyword) || phone.includes(keyword);
        });
        if (finalData.length === 0) {
            alert("Thông tin của ứng viên không tồn tại");
            return;
        }
    }

    totalRecords = finalData.length;

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const pageData = finalData.slice(startIndex, endIndex);

    const tableBody = document.querySelector('.candidate-table tbody');
    
    tableBody.innerHTML = '';

    pageData.forEach(candidate => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><input type="checkbox" value="${candidate.id}"></td>
            <td>
                <div class="name-cell">
                    <div class="avatar" style="background: #8a5cf680">NM</div>
                    <div class="name-info">
                        <span class="name-main">${checkNull(candidate.fullName)}</span>
                    </div>
                </div>
            </td>
            </td>
            <td>${checkNull(candidate.email)}</td>
            <td>${checkNull(candidate.phone)}</td>
            <td>${checkNull(candidate.recruitmentCampaign)}</td>
            <td><span class="status-badge">${checkNull(candidate.recruitmentStatus)}</span></td>
            <td>${checkNull(candidate.jobPost)}</td>
            <td>${checkNull(candidate.recruitmentRound)}</td>
            <td>
                <div class="stars">
                    ${renderStars(candidate.evaluation)}
                </div>
            </td>
            <td>${checkNull(candidate.recruitmentDate)}</td>
            <td>${checkNull(candidate.candidateSource)}</td>
            <td>${checkNull(candidate.educationLevel)}</td>
            <td>${checkNull(candidate.recentWorkplace)}</td>
            <td>${checkNull(candidate.area)}</td>
            <td>${checkNull(candidate.dateOfBirth)}</td>
            <td>${checkNull(candidate.address)}</td>
            <td>${checkNull(candidate.gender)}</td>
            <td>
                <div class="icon-update-user" data-id="${candidate.id}"></div>
            </td>
        `;
    
        tableBody.appendChild(row);
    });
    const editButtons = document.querySelectorAll('.icon-update-user');

    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            const idString = this.getAttribute('data-id');
            const id = Number(idString); 

            openEditPopup(id);
        });
    });

    updateFooterUI();
}