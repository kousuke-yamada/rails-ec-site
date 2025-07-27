// app/javascript/controllers/devise_modal_controller.js

document.addEventListener('DOMContentLoaded', () => {
    const signupModal = document.getElementById('signupModal');
    const openSignupModalBtn = document.getElementById('openSignupModal');
    const closeSignupModalBtn = document.getElementById('closeSignupModal');
    const signupForm = document.getElementById('signupForm');
    const signupErrorsDiv = document.getElementById('signupErrors');

    // これらの要素がHTMLに存在するかどうかを確認
    if (!signupModal || !openSignupModalBtn || !closeSignupModalBtn || !signupForm || !signupErrorsDiv) {
        console.warn("One or more modal elements not found. Skipping modal initialization.");
        return;
    }

    // モーダルを開く
    openSignupModalBtn.addEventListener('click', () => {
        signupModal.classList.remove('hidden');
        signupModal.classList.add('flex'); // flexboxで中央揃え
        document.body.classList.add('overflow-hidden'); // 背景スクロールを無効化（モーダル表示中）
    });

    // モーダルを閉じる
    closeSignupModalBtn.addEventListener('click', () => {
        signupModal.classList.add('hidden');
        signupModal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden'); // 背景スクロールを有効化
        signupErrorsDiv.innerHTML = ''; // エラーメッセージをクリア
        signupForm.reset(); // フォームをリセット
    });

    // モーダルの外側をクリックで閉じる
    signupModal.addEventListener('click', (event) => {
        if (event.target === signupModal) {
            signupModal.classList.add('hidden');
            signupModal.classList.remove('flex');
            document.body.classList.remove('overflow-hidden'); // 背景スクロールを有効化
            signupErrorsDiv.innerHTML = ''; // エラーメッセージをクリア
            signupForm.reset(); // フォームをリセット
        }
    });

    // フォームの送信をAjaxで処理
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // デフォルトのフォーム送信をキャンセル

        const formData = new FormData(signupForm);

        const response = await fetch(signupForm.action, {
            method: signupForm.method,
            headers: {
                'Accept': 'application/json', // JSON形式のレスポンスを要求
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content // CSRFトークンをヘッダーに追加
            },
            body: formData
        });

        const data = await response.json(); // レスポンスをJSONとしてパース

        if (response.ok) {
            // 成功した場合
            alert('登録が完了しました！'); // ユーザーへの簡単な通知
            closeSignupModalBtn.click(); // モーダルを閉じる
            window.location.href = data.redirect_path; // Railsから受け取ったリダイレクトパスへ移動
        } else {
            // 失敗した場合
            signupErrorsDiv.innerHTML = ''; // 古いエラーメッセージをクリア
            if (data.errors) {
                // フィールドごとのエラーがある場合
                for (const field in data.errors) {
                    data.errors[field].forEach(error => {
                        const p = document.createElement('p');
                        p.textContent = `${field} ${error}`; // 例: "Name can't be blank"
                        signupErrorsDiv.appendChild(p);
                    });
                }
            } else if (data.error) { // 全体エラーメッセージがある場合
                const p = document.createElement('p');
                p.textContent = data.error;
                signupErrorsDiv.appendChild(p);
            }
        }
    });
});