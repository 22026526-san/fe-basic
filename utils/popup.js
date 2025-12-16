import { renderCandidateTable } from '../components/body/body.js'; 

 export function showPopup() {
    const popup = document.getElementById('popup-container');
    if (popup) {
        popup.style.display = 'flex';
        popup.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

export function hidePopup() {
    const popup = document.getElementById('popup-container');
    if (popup) {
        popup.style.display = 'none';
        popup.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

export function initPopupEvents() {
    const saveBtn = document.querySelector('.popup-footer .btn-primary');
    
    if (saveBtn) {
        const newSaveBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);
        
        newSaveBtn.addEventListener('click', saveCandidate);
    } else {
        console.warn("Không tìm thấy nút Lưu (.btn-primary) trong popup");
    }
    const addCandidateBtn = document.querySelector('.body-title-btn');
    if (addCandidateBtn) {
        addCandidateBtn.addEventListener('click', showPopup);
    }

    const cancelBtn = document.querySelector('.btn-cancel');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hidePopup);
    }

    const closeBtn = document.querySelector('.icon-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', hidePopup);
    }

    const popupOverlay = document.getElementById('popup-container');
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                hidePopup();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hidePopup();
        }
    });
}

export function openEditPopup(id) {

    const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    
    const candidate = storageData.find(c => c.id == id);

    const popupTitle = document.querySelector('.popup-header h2');
    if (popupTitle) popupTitle.innerText = "Chỉnh sửa thông tin ứng viên";


    document.getElementById('name').value = candidate.fullName || '';
    document.getElementById('email').value = candidate.email || '';
    document.getElementById('phone').value = candidate.phone || '';
    document.getElementById('birthDate').value = candidate.dateOfBirth || ''; 
    document.getElementById('gender').value = candidate.gender || '';
    document.getElementById('area').value = candidate.area || '';
    document.getElementById('address').value = candidate.address || '';
    
    document.getElementById('educationLevel').value = candidate.educationLevel || '';
    document.getElementById('recentWorkplace').value = candidate.recentWorkplace || '';
    document.getElementById('jobPost').value = candidate.jobPost || '';
    document.getElementById('recruitmentRound').value = candidate.recruitmentRound || ''; 
    document.getElementById('recruitmentDate').value = candidate.recruitmentDate || '';

    showPopup();    
}

const STORAGE_KEY = 'candidate_data';

function saveCandidate() {

    const fullNameInput = document.getElementById('name');
    
    if (!fullNameInput || !fullNameInput.value.trim()) {
        alert("Vui lòng nhập Họ và tên ứng viên!");
        fullNameInput?.focus();
        return;
    }

    const existingDataJson = localStorage.getItem(STORAGE_KEY);
    const existingData = existingDataJson ? JSON.parse(existingDataJson) : [];

    const newCandidate = {
        id: existingData.length + 1, 
        fullName: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        recruitmentCampaign: null,
        recruitmentStatus: "Đang đào tạo",
        evaluation: 0,
        candidateSource: "Misa tuyển dụng",
        jobPost: document.getElementById('jobPost').value,
        recruitmentRound: document.getElementById('recruitmentRound').value, 
        educationLevel: document.getElementById('educationLevel').value,
        recentWorkplace: document.getElementById('recentWorkplace').value,
        area: document.getElementById('area').value,
        dateOfBirth: document.getElementById('birthDate').value,
        address: document.getElementById('address').value,
        gender: document.getElementById('gender').value,
        recruitmentDate: document.getElementById('recruitmentDate').value || new Date().toISOString().split('T')[0]
    };

    existingData.unshift(newCandidate);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));

    console.log("Đã thêm mới ứng viên:", newCandidate);

    renderCandidateTable(); 
    hidePopup(); 
    resetForm(); 
}

function resetForm() {
    const inputs = document.querySelectorAll('.popup-body input, .popup-body textarea');
    inputs.forEach(input => input.value = '');
}
