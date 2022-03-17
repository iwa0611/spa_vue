describe('E2E  Login Test', () => {
  it('ログインができる・未ログインではメニューがHOMEのみになる', () => {
    // ログインに失敗する
    cy.visit('http://localhost:8081/login')
    cy.contains('button', 'LogIn').click()
    cy.get('body').contains('Invalid login credentials. Please try again.')
    // ログインできる
    cy.get('input[type=email]').type('test-user+1@example.com')
    cy.get('input[type=password]').type('password')
    cy.contains('button', 'LogIn').click()
    cy.wait(1000)
    // ログイン後メールアドレスが表示される
    cy.contains('test-user+1@example.com')
    cy.contains('button', 'LogOut').click()
    cy.wait(1000)
    // ログアウト後homeに遷移する
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:8081/')
    })
    cy.get('#nav').should('have.text', 'Home')
    // 未ログインではsearchが開けない
    cy.visit('http://localhost:8081/search')
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:8081/')
    })
    // 削除が表示されない
    cy.get('.add-remove').should('not.exist')
    // 編集が表示されない
    cy.get('.home').find('.modal-title').click()
    cy.get('footer').contains('編集').should('not.be.visible')
  })
})
