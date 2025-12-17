import { renderCandidateTable } from '../body/body.js'; 

let isEdit = false;

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

    isEdit = true;

    const saveBtn = document.querySelector('.popup-footer .btn-primary');
    if (saveBtn) {
        saveBtn.setAttribute('data-id', id);      
    }

    showPopup();    
}

const STORAGE_KEY = 'candidate_data';

function saveCandidate() {

    const fullNameInput = document.getElementById('name');
    
    if (!fullNameInput || !fullNameInput.value.trim()) {
        alert("Vui lòng nhập Họ và tên ứng viên");
        fullNameInput?.focus();
        return;
    }

    const formData = {
        fullName: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dateOfBirth: document.getElementById('birthDate').value,
        gender: document.getElementById('gender').value,
        area: document.getElementById('area').value,
        address: document.getElementById('address').value,
        educationLevel: document.getElementById('educationLevel').value,
        recentWorkplace: document.getElementById('recentWorkplace').value,
        jobPost: document.getElementById('jobPost').value,
        recruitmentRound: document.getElementById('recruitmentRound').value,
        recruitmentDate: document.getElementById('recruitmentDate').value || new Date().toISOString().split('T')[0],
        recruitmentCampaign: null,
        candidateSource: "Misa tuyển dụng",
    };

    let existingData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const saveBtn = document.querySelector('.popup-footer .btn-primary');
    const editId = saveBtn ? saveBtn.getAttribute('data-id') : null;

    if (editId) {
        const index = existingData.findIndex(c => c.id == editId);
        
        if (index !== -1) {
            existingData[index] = { 
                ...existingData[index], 
                ...formData 
            };
        }
    } else {
        const newCandidate = {
            id: existingData.length > 0 ? Math.max(...existingData.map(c => c.id)) + 1 : 1,
            ...formData,
            recruitmentStatus: "Đang đào tạo",
            evaluation: 0,
        };
        existingData.unshift(newCandidate);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingData));
    renderCandidateTable();

    if (isEdit) {
        isEdit = false;
        alert("Cập nhật thông tin ứng viên thành công");
    } else {
        alert("Thêm ứng viên thành công");
    }

    renderCandidateTable(); 
    hidePopup(); 
    resetForm(); 
}

function resetForm() {
    const inputs = document.querySelectorAll('.popup-body input, .popup-body textarea');
    inputs.forEach(input => input.value = '');
}
