import test from '../../../cypress/fixtures/test.json'
beforeEach(() => {
  cy.intercept(
    'POST',
    'http://localhost:3000/api/v1/search?',
    { 
      body: JSON.stringify(test)
    }).as('post_req');
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
  // リスト追加
  cy.contains('button', '+追加+').click()
  cy.get('body').contains('リスト追加に成功')
  // ログアウト
  cy.visit('http://localhost:8081/login')
  cy.contains('button', 'LogOut').click()
  cy.get('body').contains('ログアウトしました')
  // ログアウト後homeに遷移する
  cy.location().should((loc) => {
    expect(loc.href).to.eq('http://localhost:8081/')
  });
})

describe("E2E Guest Test", () => {
  it('GUEST時はサーチが開けない・削除・編集が表示されない', () => {
    // 未ログインではsearchが開けない
    cy.visit('http://localhost:8081/search')
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:8081/')
    })
    // 削除が表示されない
    cy.get('.add-remove').should('not.exist')
    // 編集が表示されない
    cy.get('.home').find('.modal-title').click()
    cy.get('footer').contains('編集').should('not.exist')
  })
});
