// 出品フォーム用JavaScript
let selectedFiles = [];

document.addEventListener('DOMContentLoaded', function() {
  console.log('Listing.js loaded successfully');
  
  // 価格入力時の手数料計算
  const priceInput = document.querySelector('input[name="product[price]"]');
  const feeElement = document.getElementById('fee-amount');
  const profitElement = document.getElementById('profit-amount');
  
  if (priceInput && feeElement && profitElement) {
    priceInput.addEventListener('input', function(e) {
      const price = parseInt(e.target.value) || 0;
      const fee = Math.floor(price * 0.1);
      const profit = price - fee;
      
      feeElement.textContent = fee > 0 ? `¥ ${fee.toLocaleString()}` : '¥ -';
      profitElement.textContent = profit > 0 ? `¥ ${profit.toLocaleString()}` : '¥ -';
    });
  }

  initializeImageUpload();
  initializeFormFeatures();
});

function initializeImageUpload() {
  const fileInput = document.getElementById('product_images');
  const uploadArea = document.getElementById('upload-area');
  
  if (!fileInput || !uploadArea) {
    console.error('Required elements not found');
    return;
  }

  fileInput.addEventListener('change', handleFileSelection);
  
  document.addEventListener('click', function(e) {
    const clickedArea = document.getElementById('upload-area');
    if (clickedArea && clickedArea.contains(e.target)) {
      e.preventDefault();
      fileInput.click();
    }
  });

  uploadArea.addEventListener('dragover', handleDragOver);
  uploadArea.addEventListener('dragleave', handleDragLeave);
  uploadArea.addEventListener('drop', handleFileDrop);
}

function handleFileSelection(e) {
  const files = Array.from(e.target.files);
  processFiles(files);
}

function handleDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('border-mercari-500', 'bg-mercari-50');
}

function handleDragLeave(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('border-mercari-500', 'bg-mercari-50');
}

function handleFileDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove('border-mercari-500', 'bg-mercari-50');
  
  const files = Array.from(e.dataTransfer.files);
  processFiles(files);
}

function processFiles(files) {
  const validFiles = files.filter(file => file.type.startsWith('image/'));
  
  if (validFiles.length === 0) {
    showErrorMessage('画像ファイル（JPEG、PNG）のみアップロードできます');
    return;
  }
  
  if (selectedFiles.length + validFiles.length > 10) {
    const remainingSlots = 10 - selectedFiles.length;
    showErrorMessage(`画像は最大10枚までです。あと${remainingSlots}枚追加できます`);
    return;
  }
  
  validFiles.forEach(file => selectedFiles.push(file));
  
  updateFileInput();
  updateImagePreviews();
  updateUploadArea();
  
  showSuccessMessage(`${validFiles.length}枚の画像が追加されました（合計${selectedFiles.length}枚）`);
}

function updateImagePreviews() {
  const previewContainer = document.getElementById('image-previews');
  const previewContainerParent = document.getElementById('image-preview-container');
  
  if (!previewContainer) return;
  
  previewContainer.innerHTML = '';
  
  if (selectedFiles.length === 0) {
    if (previewContainerParent) {
      previewContainerParent.classList.add('hidden');
    }
    return;
  }
  
  if (previewContainerParent) {
    previewContainerParent.classList.remove('hidden');
  }
  
  selectedFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'relative group animate-fade-in';
      imageDiv.innerHTML = `
        <img src="${e.target.result}" 
             alt="プレビュー${index + 1}" 
             class="w-full h-32 object-cover rounded-xl shadow-lg border-2 border-gray-200 group-hover:border-mercari-300 transition-all duration-300">
        <div class="delete-btn" onclick="removeImage(${index})">×</div>
        <div class="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-lg font-semibold">
          ${index + 1}
        </div>
      `;
      previewContainer.appendChild(imageDiv);
    };
    reader.readAsDataURL(file);
  });
}

function updateUploadArea() {
  const uploadArea = document.getElementById('upload-area');
  if (!uploadArea) return;
  
  const remainingSlots = 10 - selectedFiles.length;
  
  if (selectedFiles.length >= 10) {
    uploadArea.style.display = 'none';
  } else {
    uploadArea.style.display = 'block';
    uploadArea.innerHTML = `
      <div class="animate-float">
        <div class="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">📷</div>
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-2">写真をアップロード (残り${remainingSlots}枚)</h3>
      <p class="text-gray-600 mb-4">ドラッグ&ドロップ または クリックして選択</p>
      <div class="inline-flex items-center px-6 py-3 bg-white rounded-xl shadow-md text-sm font-semibold text-gray-700 border border-gray-200">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        ${selectedFiles.length > 0 ? '画像を追加' : 'ファイルを選択'}
      </div>
      <p class="text-xs text-gray-500 mt-4">JPEG, PNG形式、最大10枚まで</p>
    `;
  }
}

function removeImage(index) {
  selectedFiles.splice(index, 1);
  updateFileInput();
  updateImagePreviews();
  updateUploadArea();
  
  if (selectedFiles.length === 0) {
    showSuccessMessage('すべての画像が削除されました');
  } else {
    showSuccessMessage('画像が削除されました');
  }
}

function updateFileInput() {
  const fileInput = document.getElementById('product_images');
  if (!fileInput) return;
  
  if (selectedFiles.length > 0) {
    const dt = new DataTransfer();
    selectedFiles.forEach(file => dt.items.add(file));
    fileInput.files = dt.files;
  } else {
    fileInput.value = '';
  }
}

function initializeFormFeatures() {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      if (!validateForm()) {
        e.preventDefault();
        scrollToFirstError();
      }
    });
  }

  const draftButton = document.querySelector('button[type="button"]');
  if (draftButton) {
    draftButton.addEventListener('click', saveDraftData);
  }
}

function validateForm() {
  let isValid = true;
  
  if (selectedFiles.length === 0) {
    isValid = false;
    showErrorMessage('最低1枚の画像を選択してください');
  }
  
  return isValid;
}

function scrollToFirstError() {
  const firstError = document.querySelector('.border-red-500');
  if (firstError) {
    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstError.focus();
  }
}

function showMessage(message, type) {
  const messageDiv = document.createElement('div');
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  
  messageDiv.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center transform translate-x-full transition-transform duration-300`;
  messageDiv.innerHTML = `
    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
      ${type === 'success' 
        ? '<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>'
        : '<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>'
      }
    </svg>
    ${message}
  `;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => messageDiv.classList.remove('translate-x-full'), 100);
  setTimeout(() => {
    messageDiv.classList.add('translate-x-full');
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}

function showSuccessMessage(message) {
  showMessage(message, 'success');
}

function showErrorMessage(message) {
  showMessage(message, 'error');
}

function saveDraftData() {
  showSuccessMessage('下書きが保存されました');
}

// グローバル関数として設定
window.removeImage = removeImage;