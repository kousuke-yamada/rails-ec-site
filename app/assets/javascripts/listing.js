// 出品フォーム用JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // デバッグ用：重要な要素が存在するかチェック
  console.log('DOM読み込み完了');
  console.log('ファイルインプット:', document.getElementById('product_images'));
  console.log('アップロードエリア:', document.getElementById('upload-area'));
  console.log('プレビューコンテナ:', document.getElementById('image-preview-container'));
  console.log('プレビューエリア:', document.getElementById('image-previews'));
  
  // 画像プレビュー用の変数
  let selectedFiles = [];
  console.log('selectedFiles初期化完了');
  
  // 価格入力時の手数料計算
  const priceInput = document.querySelector('input[name="product[price]"]');
  const feeElement = document.querySelector('.text-xl.font-bold.text-gray-900');
  const profitElement = document.querySelector('.text-3xl.font-black.text-mercari-500');
  
  if (priceInput && feeElement && profitElement) {
    priceInput.addEventListener('input', function(e) {
      const price = parseInt(e.target.value) || 0;
      const fee = Math.floor(price * 0.1);
      const profit = price - fee;
      
      feeElement.textContent = fee > 0 ? `¥ ${fee.toLocaleString()}` : '¥ -';
      profitElement.textContent = profit > 0 ? `¥ ${profit.toLocaleString()}` : '¥ -';
    });
  }

  // ファイル選択時のプレビュー表示
  const fileInput = document.getElementById('product_images');
  const uploadOverlay = document.querySelector('.upload-overlay');
  
  if (fileInput && uploadOverlay) {
    // ファイル選択時の処理
    fileInput.addEventListener('change', function(e) {
      console.log('ファイル選択イベントが発生しました');
      const files = Array.from(e.target.files);
      console.log('選択されたファイル数:', files.length);
      
      // 画像ファイルのみをフィルタ
      const validNewFiles = files.filter(file => file.type.startsWith('image/'));
      console.log('有効な画像ファイル数:', validNewFiles.length);
      
      if (validNewFiles.length === 0) {
        showErrorMessage('画像ファイル（JPEG、PNG）のみアップロードできます');
        return;
      }
      
      // 最大10枚まで制限
      if (selectedFiles.length + validNewFiles.length > 10) {
        const remainingSlots = 10 - selectedFiles.length;
        showErrorMessage(`画像は最大10枚までです。あと${remainingSlots}枚追加できます`);
        return;
      }
      
      // 既存のファイルに新しいファイルを追加
      validNewFiles.forEach(file => {
        selectedFiles.push(file);
        console.log('ファイル追加:', file.name);
      });
      
      console.log('現在のselectedFiles:', selectedFiles.length);
      
      // プレビューを即座に更新
      updateImagePreviews();
      updateUploadArea();
      
      if (validNewFiles.length > 0) {
        showSuccessMessage(`${validNewFiles.length}枚の画像が追加されました（合計${selectedFiles.length}枚）`);
      }
    });
  }

  // ドラッグ&ドロップ機能
  if (uploadOverlay && fileInput) {
    // ドラッグオーバー時のスタイル変更
    uploadOverlay.addEventListener('dragover', function(e) {
      e.preventDefault();
      uploadOverlay.classList.add('border-mercari-500', 'bg-mercari-50');
    });

    uploadOverlay.addEventListener('dragleave', function(e) {
      e.preventDefault();
      uploadOverlay.classList.remove('border-mercari-500', 'bg-mercari-50');
    });

    // ファイルドロップ時の処理
    uploadOverlay.addEventListener('drop', function(e) {
      e.preventDefault();
      uploadOverlay.classList.remove('border-mercari-500', 'bg-mercari-50');
      
      const files = Array.from(e.dataTransfer.files);
      
      // 画像ファイルのみフィルタ
      const validFiles = files.filter(file => file.type.startsWith('image/'));
      
      if (validFiles.length === 0) {
        showErrorMessage('画像ファイル（JPEG、PNG）のみアップロードできます');
        return;
      }
      
      // 最大10枚までの制限
      if (selectedFiles.length + validFiles.length > 10) {
        showErrorMessage('画像は最大10枚までアップロードできます');
        return;
      }
      
      // ファイルを追加
      validFiles.forEach(file => {
        selectedFiles.push(file);
      });
      
      updateImagePreviews();
      updateUploadArea();
      
      showSuccessMessage(`${validFiles.length}枚の画像が追加されました（合計${selectedFiles.length}枚）`);
    });
  }

  // 初期アップロードエリア設定
  initializeUploadArea();

  // 下書き機能
  setupDraftFunctionality();

  // ページ読み込み時に下書きデータを復元
  loadDraftData();

  // フォーム送信前のバリデーション
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function(e) {
      if (!validateForm()) {
        e.preventDefault();
        scrollToFirstError();
      } else {
        // 送信ボタンを無効化して二重送信を防ぐ
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.innerHTML = `
            <div class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              出品中...
            </div>
          `;
        }
      }
    });
  }

  // リアルタイムバリデーション
  const requiredFields = document.querySelectorAll('[required]');
  requiredFields.forEach(field => {
    field.addEventListener('blur', function() {
      validateField(field);
    });
    
    field.addEventListener('input', function() {
      clearFieldError(field);
    });
  });

  // 文字数カウンター
  setupCharacterCounters();

  // 下書き機能の設定
  function setupDraftFunctionality() {
    const draftButton = document.querySelector('button[type="button"]');
    if (draftButton) {
      draftButton.addEventListener('click', function() {
        saveDraftData();
      });
    }
  }

  // 下書きデータの保存
  function saveDraftData() {
    const draftData = {
      name: document.querySelector('input[name="product[name]"]').value || '',
      description: document.querySelector('textarea[name="product[description]"]').value || '',
      price: document.querySelector('input[name="product[price]"]').value || '',
      category_id: document.querySelector('select[name="product[category_id]"]').value || '',
      condition_id: document.querySelector('select[name="product[condition_id]"]').value || '',
      shipping_fee_payer_id: document.querySelector('select[name="product[shipping_fee_payer_id]"]').value || '',
      shipping_day_id: document.querySelector('select[name="product[shipping_day_id]"]').value || '',
      prefecture_id: document.querySelector('select[name="product[prefecture_id]"]').value || '',
      timestamp: new Date().toISOString()
    };

    // ローカルストレージに保存
    localStorage.setItem('mercari_product_draft', JSON.stringify(draftData));
    
    showSuccessMessage('下書きが保存されました');
    console.log('下書きデータを保存しました:', draftData);
  }

  // 下書きデータの読み込み
  function loadDraftData() {
    try {
      const savedDraft = localStorage.getItem('mercari_product_draft');
      if (savedDraft) {
        const draftData = JSON.parse(savedDraft);
        
        // フォームフィールドに値を復元
        const nameField = document.querySelector('input[name="product[name]"]');
        const descriptionField = document.querySelector('textarea[name="product[description]"]');
        const priceField = document.querySelector('input[name="product[price]"]');
        const categoryField = document.querySelector('select[name="product[category_id]"]');
        const conditionField = document.querySelector('select[name="product[condition_id]"]');
        const shippingFeeField = document.querySelector('select[name="product[shipping_fee_payer_id]"]');
        const shippingDayField = document.querySelector('select[name="product[shipping_day_id]"]');
        const prefectureField = document.querySelector('select[name="product[prefecture_id]"]');

        if (nameField && draftData.name) nameField.value = draftData.name;
        if (descriptionField && draftData.description) descriptionField.value = draftData.description;
        if (priceField && draftData.price) {
          priceField.value = draftData.price;
          // 価格計算をトリガー
          priceField.dispatchEvent(new Event('input'));
        }
        if (categoryField && draftData.category_id) categoryField.value = draftData.category_id;
        if (conditionField && draftData.condition_id) conditionField.value = draftData.condition_id;
        if (shippingFeeField && draftData.shipping_fee_payer_id) shippingFeeField.value = draftData.shipping_fee_payer_id;
        if (shippingDayField && draftData.shipping_day_id) shippingDayField.value = draftData.shipping_day_id;
        if (prefectureField && draftData.prefecture_id) prefectureField.value = draftData.prefecture_id;

        const savedDate = new Date(draftData.timestamp).toLocaleString('ja-JP');
        showSuccessMessage(`下書きデータを復元しました（保存日時: ${savedDate}）`);
        console.log('下書きデータを復元しました:', draftData);
      }
    } catch (error) {
      console.error('下書きデータの読み込み中にエラーが発生しました:', error);
    }
  }

  // プレビュー更新
  function updateImagePreviews() {
    console.log('updateImagePreviews関数が呼ばれました');
    
    const previewContainer = document.getElementById('image-previews');
    const previewContainerParent = document.getElementById('image-preview-container');
    
    console.log('プレビューコンテナ:', previewContainer);
    console.log('プレビューコンテナ親:', previewContainerParent);
    
    if (!previewContainer) {
      console.error('プレビューコンテナが見つかりません');
      return;
    }
    
    // 既存のプレビューをクリア
    previewContainer.innerHTML = '';
    console.log('既存プレビューをクリアしました');
    
    if (selectedFiles.length === 0) {
      console.log('選択されたファイルがありません');
      if (previewContainerParent) {
        previewContainerParent.classList.add('hidden');
      }
      return;
    }
    
    console.log('プレビュー作成開始:', selectedFiles.length, '枚');
    
    // プレビューコンテナを表示
    if (previewContainerParent) {
      previewContainerParent.classList.remove('hidden');
      console.log('プレビューコンテナを表示しました');
    }
    
    // 各ファイルのプレビューを表示
    selectedFiles.forEach((file, index) => {
      console.log(`プレビュー作成中: ${index + 1}/${selectedFiles.length} - ${file.name}`);
      
      const reader = new FileReader();
      reader.onload = function(e) {
        console.log(`FileReader完了: ${file.name}`);
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'relative group animate-fade-in';
        imageDiv.setAttribute('data-index', index);
        imageDiv.innerHTML = `
          <img src="${e.target.result}" 
               alt="プレビュー${index + 1}" 
               class="w-full h-32 object-cover rounded-xl shadow-lg border-2 border-gray-200 group-hover:border-mercari-300 transition-all duration-300"
               onload="console.log('画像ロード完了: プレビュー${index + 1}')"
               onerror="console.error('画像ロードエラー: プレビュー${index + 1}')">
          <div class="delete-btn" onclick="removeImage(${index})">×</div>
          <div class="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-lg font-semibold">
            ${index + 1}
          </div>
        `;
        previewContainer.appendChild(imageDiv);
        console.log(`プレビュー${index + 1}をDOMに追加しました`);
      };
      
      reader.onerror = function(e) {
        console.error(`FileReader エラー: ${file.name}`, e);
      };
      
      reader.readAsDataURL(file);
      console.log(`FileReader開始: ${file.name}`);
    });
  }

  function updateUploadArea() {
    const uploadArea = document.getElementById('upload-area');
    const remainingSlots = 10 - selectedFiles.length;
    
    if (selectedFiles.length >= 10) {
      uploadArea.style.display = 'none';
    } else {
      uploadArea.style.display = 'block';
      
      // アップロードエリアの内容を更新
      uploadArea.innerHTML = `
        <div class="animate-float">
          <div class="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">📸</div>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">写真をアップロード (残り${remainingSlots}枚)</h3>
        <p class="text-gray-600 mb-4">ドラッグ&ドロップ または クリックして選択</p>
        <div class="inline-flex items-center px-6 py-3 bg-white rounded-xl shadow-md text-sm font-semibold text-gray-700 border border-gray-200">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          ${selectedFiles.length > 0 ? '画像を追加' : 'ファイルを選択'}
        </div>
        <p class="text-xs text-gray-500 mt-4">JPEG, PNG形式　最大10枚まで</p>
      `;
    }
  }

  // グローバル関数として定義
  window.removeImage = function(index) {
    selectedFiles.splice(index, 1);
    updateImagePreviews();
    updateUploadArea();
    
    if (selectedFiles.length === 0) {
      showSuccessMessage('すべての画像が削除されました');
    } else {
      showSuccessMessage('画像が削除されました');
    }
  }
});

// 初期アップロードエリア設定
function initializeUploadArea() {
  const uploadArea = document.getElementById('upload-area');
  if (uploadArea) {
    uploadArea.innerHTML = `
      <div class="animate-float">
        <div class="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">📸</div>
      </div>
      <h3 class="text-2xl font-bold text-gray-900 mb-2">写真をアップロード</h3>
      <p class="text-gray-600 mb-4">ドラッグ&ドロップ または クリックして選択</p>
      <div class="inline-flex items-center px-6 py-3 bg-white rounded-xl shadow-md text-sm font-semibold text-gray-700 border border-gray-200">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
        </svg>
        ファイルを選択
      </div>
      <p class="text-xs text-gray-500 mt-4">JPEG, PNG形式　最大10枚まで</p>
    `;
  }
}

// フォームバリデーション関数
function validateForm() {
  let isValid = true;
  const requiredFields = document.querySelectorAll('[required]');
  
  // 画像のバリデーション
  const selectedFiles = window.selectedFiles || [];
  if (selectedFiles.length === 0) {
    isValid = false;
    showErrorMessage('商品画像を選択してください');
  }
  
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  return isValid;
}

// 個別フィールドバリデーション
function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  let isValid = true;
  let errorMessage = '';

  // 必須チェック
  if (!value) {
    isValid = false;
    errorMessage = 'この項目は必須です';
  } else {
    // 各フィールド固有のバリデーション
    switch (fieldName) {
      case 'product[name]':
        if (value.length > 40) {
          isValid = false;
          errorMessage = '商品名は40文字以内で入力してください';
        }
        break;
      case 'product[description]':
        if (value.length > 1000) {
          isValid = false;
          errorMessage = '説明は1000文字以内で入力してください';
        }
        break;
      case 'product[price]':
        const price = parseInt(value);
        if (price < 300 || price > 9999999) {
          isValid = false;
          errorMessage = '価格は300円〜9,999,999円の範囲で設定してください';
        }
        break;
    }
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  } else {
    clearFieldError(field);
  }

  return isValid;
}

// フィールドエラー表示
function showFieldError(field, message) {
  clearFieldError(field);
  
  field.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-100');
  field.classList.remove('border-gray-200', 'focus:border-mercari-500', 'focus:ring-mercari-100');
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message text-red-500 text-sm mt-2 flex items-center';
  errorDiv.innerHTML = `
    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
    </svg>
    ${message}
  `;
  
  field.parentNode.appendChild(errorDiv);
}

// フィールドエラークリア
function clearFieldError(field) {
  field.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-100');
  field.classList.add('border-gray-200', 'focus:border-mercari-500', 'focus:ring-mercari-100');
  
  const errorMessage = field.parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

// 最初のエラーフィールドにスクロール
function scrollToFirstError() {
  const firstError = document.querySelector('.border-red-500');
  if (firstError) {
    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    firstError.focus();
  }
}

// 成功メッセージ表示
function showSuccessMessage(message) {
  showMessage(message, 'success');
}

// エラーメッセージ表示
function showErrorMessage(message) {
  showMessage(message, 'error');
}

// メッセージ表示（汎用）
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
  
  // アニメーション
  setTimeout(() => {
    messageDiv.classList.remove('translate-x-full');
  }, 100);
  
  // 3秒後に自動削除
  setTimeout(() => {
    messageDiv.classList.add('translate-x-full');
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.parentNode.removeChild(messageDiv);
      }
    }, 300);
  }, 3000);
}

// 文字数カウンター設定
function setupCharacterCounters() {
  const nameInput = document.querySelector('input[name="product[name]"]');
  const descriptionInput = document.querySelector('textarea[name="product[description]"]');
  
  if (nameInput) {
    addCharacterCounter(nameInput, 40);
  }
  
  if (descriptionInput) {
    addCharacterCounter(descriptionInput, 1000);
  }
}

// 文字数カウンター追加
function addCharacterCounter(element, maxLength) {
  const counter = document.createElement('div');
  counter.className = 'text-sm text-gray-500 mt-2 text-right';
  counter.textContent = `0/${maxLength}`;
  
  element.parentNode.appendChild(counter);
  
  element.addEventListener('input', function() {
    const currentLength = element.value.length;
    counter.textContent = `${currentLength}/${maxLength}`;
    
    if (currentLength > maxLength * 0.8) {
      counter.classList.add('text-orange-500');
      counter.classList.remove('text-gray-500');
    } else {
      counter.classList.add('text-gray-500');
      counter.classList.remove('text-orange-500');
    }
    
    if (currentLength > maxLength) {
      counter.classList.add('text-red-500');
      counter.classList.remove('text-orange-500', 'text-gray-500');
    }
  });
}

// FileListを作成するヘルパー関数
function createFileList(files) {
  const dt = new DataTransfer();
  files.forEach(file => dt.items.add(file));
  return dt.files;
}