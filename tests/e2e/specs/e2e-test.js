import test from '../../../cypress/fixtures/test.json'
beforeEach(() => {
  cy.intercept(
    'POST',
    'http://localhost:3000/api/v1/search?',
    { 
      body: JSON.stringify(test)
    }).as('post_req');
})

describe("E2E Total Test", () => {
  it('ログイン・ログアウト・リスト追加・削除・レビュー編集ができる', () => {
    // ログイン
    cy.visit('http://localhost:8081/login')
    cy.get('input[type=email]').type('test-user+1@example.com')
    cy.get('input[type=password]').type('password')
    cy.contains('button', 'LogIn').click()
    cy.get('body').contains('ログインしました')
    cy.contains('test-user+1@example.com')
    // search
    cy.visit('http://localhost:8081/search')    
    cy.contains('button', '検索').click()
    // responsenの確認
    cy.wait('@post_req').should(xhr => {
      expect(xhr.response.statusCode).to.eq(200)
      expect(xhr.response.body).to.eq(JSON.stringify(test))
    })
    // contentsが表示される
    cy.get('.list-container').should('be.visible')
    // リスト追加
    cy.contains('button', '+追加+').click()
    cy.get('body').contains('リスト追加に成功')
    // リスト追加失敗の確認
    cy.contains('button', '+追加+').click()
    cy.get('body').contains('追加に失敗しました')
    // リスト追加した物が表示される
    cy.visit('http://localhost:8081')
    cy.get(".home > div").should("have.length", 1)
    // モーダルを開く
    cy.get('.home').find('.modal-title').click()
    // レーティングとコメント入力
    cy.get('.modal-content').find('.vue-star-rating-pointer').click({ multiple: true })
    cy.get('textarea').type('テスト')
    cy.contains('button', '編集').click()
    cy.get('body').contains('編集しました')
    cy.contains('button', '閉じる').click()
    // 編集されているかの確認
    cy.get('.home').find('.modal-title').click()
    cy.get('table').find('.vue-star-rating-rating-text')
      .should('have.text', ' 5 5 5 5 5')
    cy.get('textarea').should('have.value', 'テスト')
    cy.contains('button', '閉じる').click()
    // リストから削除できる
    cy.contains('button', '-削除-').click()
    cy.get('body').contains('リストから削除に成功')
    cy.get(".home > div").should("have.length", 0)
    // ログアウト
    cy.visit('http://localhost:8081/login')
    cy.contains('button', 'LogOut').click()
    cy.get('body').contains('ログアウトしました')
    // ログアウト後homeに遷移する
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:8081/')
    });
  })
});
