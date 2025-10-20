

// ページ読み込み完了時に実行
document.addEventListener('DOMContentLoaded', function() {
  
  /**
   * アニメーション効果の初期化
   * スクロール時に要素が画面に入ったときアニメーションを開始
   */
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        }
      });
    }, observerOptions);
    
    // .section-enterクラスの要素を監視
    document.querySelectorAll('.section-enter').forEach(section => {
      observer.observe(section);
    });
  }
  
  /**
   * カードのホバー効果を初期化
   * マウスオーバー時に浮き上がり効果を追加
   */
  function initHoverEffects() {
    document.querySelectorAll('.interactive-hover').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });
  }
  
  /**
   * 商品削除機能を初期化
   * 削除ボタンクリック時の確認ダイアログと削除処理
   */
  function initDeleteButtons() {
    document.querySelectorAll('.delete-product-btn').forEach(button => {
      button.addEventListener('click', function(event) {
        event.stopPropagation(); // イベントの伝播を停止
        
        const productId = this.dataset.productId;
        const productName = this.dataset.productName;
        
        // 削除確認ダイアログ
        if (confirm(`「${productName}」を削除しますか？\nこの操作は取り消せません。`)) {
          deleteProduct(productId);
        }
      });
    });
  }
  
  /**
   * 商品を削除する処理
   * Rails用のCSRFトークンを含むフォームを動的に作成して送信
   */
  function deleteProduct(productId) {
    // CSRFトークンを取得
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    // フォームを動的に作成
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `/products/${productId}`;
    form.style.display = 'none';
    
    // CSRFトークンを追加
    if (csrfToken) {
      const csrfInput = document.createElement('input');
      csrfInput.type = 'hidden';
      csrfInput.name = 'authenticity_token';
      csrfInput.value = csrfToken;
      form.appendChild(csrfInput);
    }
    
    // DELETEメソッドを指定
    const methodInput = document.createElement('input');
    methodInput.type = 'hidden';
    methodInput.name = '_method';
    methodInput.value = 'delete';
    form.appendChild(methodInput);
    
    // フォームを送信
    document.body.appendChild(form);
    form.submit();
  }
  
  /**
   * 全ての機能を初期化
   */
  function initialize() {
    initScrollAnimations();
    initHoverEffects();
    initDeleteButtons();
  }
  
  // 初期化実行
  initialize();
  
  // デバッグ用ログ
  console.log('Mercari商品一覧ページのJavaScriptが読み込まれました');
});