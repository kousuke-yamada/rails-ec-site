// app/javascript/profile.js
(function () {
  "use strict";


  let currentEditField = null;

  function editField(fieldName) {
    currentEditField = fieldName;
    const modal = document.getElementById("editModal");
    const title = document.getElementById("editModalTitle");
    const content = document.getElementById("editModalContent");

    // モーダル要素の存在確認
    if (!modal || !title || !content) {
      console.error("Modal elements not found");
      alert(
        "モーダル要素が見つかりません。HTMLテンプレートを確認してください。"
      );
      return;
    }

    // フィールドに応じてモーダルの内容を変更
    const fieldConfig = {
      name: {
        title: "名前を編集",
        content: `
                    <label class="block text-sm font-medium text-gray-700 mb-2">名前</label>
                    <input type="text" id="editInput" value="" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                `,
      },
      password: {
        title: "パスワードを変更",
        content: `
                    <label class="block text-sm font-medium text-gray-700 mb-2">現在のパスワード</label>
                    <input type="password" id="currentPassword" placeholder="現在のパスワード" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3">
                    <label class="block text-sm font-medium text-gray-700 mb-2">新しいパスワード</label>
                    <input type="password" id="editInput" placeholder="新しいパスワード" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3">
                    <label class="block text-sm font-medium text-gray-700 mb-2">パスワード確認</label>
                    <input type="password" id="confirmPassword" placeholder="パスワードを再入力" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                `,
      },
      gender: {
        title: "性別を編集",
        content: `
                    <label class="block text-sm font-medium text-gray-700 mb-2">性別</label>
                    <select id="editInput" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">選択してください</option>
                        <option value="male">男性</option>
                        <option value="female">女性</option>
                        <option value="other">その他</option>
                        <option value="prefer_not_to_say">回答しない</option>
                    </select>
                `,
      },
      email: {
        title: "メールアドレスを編集",
        content: `
                    <label class="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                    <input type="email" id="editInput" value="" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                `,
      },
      phone: {
        title: "電話番号を編集",
        content: `
                    <label class="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
                    <input type="tel" id="editInput" value="" placeholder="090-1234-5678" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                `,
      },
      home_address: {
        title: "自宅住所を編集",
        content: `
                    <label class="block text-sm font-medium text-gray-700 mb-2">郵便番号</label>
                    <input type="text" id="zipCode" placeholder="100-0001" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3">
                    <label class="block text-sm font-medium text-gray-700 mb-2">住所</label>
                    <textarea id="editInput" placeholder="東京都千代田区..." rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea>
                `,
      },
      work_address: {
        title: "勤務先住所を編集",
        content: `
                    <label class="block text-sm font-medium text-gray-700 mb-2">郵便番号</label>
                    <input type="text" id="zipCode" placeholder="100-0001" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3">
                    <label class="block text-sm font-medium text-gray-700 mb-2">住所</label>
                    <textarea id="editInput" placeholder="東京都千代田区..." rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea>
                `,
      },
    };

    if (fieldConfig[fieldName]) {
      title.textContent = fieldConfig[fieldName].title;
      content.innerHTML = fieldConfig[fieldName].content;
    } else {
      title.textContent = "情報を編集";
      content.innerHTML = `
                <p class="text-gray-600">この項目の編集機能は準備中です。</p>
            `;
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }

  function closeEditModal() {
    const modal = document.getElementById("editModal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
    currentEditField = null;
  }

  function saveEdit() {
    const input = document.getElementById("editInput");
    if (input && input.value.trim()) {
      alert(`${currentEditField}を「${input.value}」に更新しました！`);
      closeEditModal();
      // 実際のアプリでは、ここでサーバーにデータを送信
    } else {
      alert("有効な値を入力してください。");
    }
  }

  // モーダル外をクリックで閉じる機能
  function setupModalEvents() {
    document.addEventListener("click", function (event) {
      const modal = document.getElementById("editModal");
      if (event.target === modal) {
        closeEditModal();
      }
    });
  }

  // イベントリスナーでクリックを処理
  function setupFieldEditEvents() {
    // data-field属性を持つ要素にイベントリスナーを追加
    document.querySelectorAll("[data-field]").forEach((element) => {
      element.addEventListener("click", function (e) {
        e.preventDefault();
        const fieldName = this.getAttribute("data-field");
        editField(fieldName);
      });
    });

    // モーダルのボタンイベント
    document
      .querySelectorAll('[data-action="close-modal"]')
      .forEach((element) => {
        element.addEventListener("click", function (e) {
          e.preventDefault();
          closeEditModal();
        });
      });

    document
      .querySelectorAll('[data-action="save-edit"]')
      .forEach((element) => {
        element.addEventListener("click", function (e) {
          e.preventDefault();
          saveEdit();
        });
      });
  }

  // 初期化関数
  function initializeProfilePage() {
    setupModalEvents();
    setupFieldEditEvents();

    // デバッグ情報
    const modal = document.getElementById("editModal");
    const title = document.getElementById("editModalTitle");
    const content = document.getElementById("editModalContent");
  }

  // グローバルに関数を公開（onclickで使用する場合のため）
  window.editField = editField;
  window.closeEditModal = closeEditModal;
  window.saveEdit = saveEdit;


  // 複数のタイミングで初期化を試行
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initializeProfilePage();
    });
  } else {
    initializeProfilePage();
  }

  // Turbo対応
  document.addEventListener("turbo:load", function () {
    initializeProfilePage();
  });

  // 追加のフォールバック
  setTimeout(function () {
    if (typeof window.editField !== "function") {
      console.error(
        "editField still not available after timeout, re-exposing..."
      );
      window.editField = editField;
      window.closeEditModal = closeEditModal;
      window.saveEdit = saveEdit;
    }
  }, 1000);
  
})();
