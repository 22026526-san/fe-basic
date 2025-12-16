import { getCandidatesFromLocalStorage } from '../../utils/localStorage.js';
import { openEditPopup } from '../../utils/popup.js';
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

export function renderCandidateTable() {
    const storageData = getCandidatesFromLocalStorage();
    
    if (!storageData) {
        console.log("Chưa có dữ liệu trong LocalStorage");
        return;
    }

    const tableBody = document.querySelector('.candidate-table tbody');
    
    tableBody.innerHTML = '';

    storageData.forEach(candidate => {
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

        const editButtons = document.querySelectorAll('.icon-update-user');

        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                
                const idString = this.getAttribute('data-id');
                const id = Number(idString); 

                openEditPopup(id);
            });
        });

    
        tableBody.appendChild(row);
    });
}