module.exports = {
  'E2E  Login Test': (browser) => {
    browser
      // ページを開き処理を待つ
      .url('http://localhost:8081/login')
      .waitForElementVisible('body', 1000)
      // ログインの検証
      .setValue('input[type=email]', 'test-user+1@example.com')
      .setValue('input[type=password]', 'password')
      .pause(3000)
      .assert.visible('input[type=email]')
      .assert.visible('input[type=password]')
      .click('button')
      .pause(3000)
      // ログイン後メールアドレスが表示される
      browser.expect.element('.login').text
        .to.contain('test-user+1@example.com')
      browser
        .click('button')
        .pause(3000)
        // ログアウト後homeに遷移する
        .assert.urlEquals('http://localhost:8081/')
    browser.end();
  },
};
