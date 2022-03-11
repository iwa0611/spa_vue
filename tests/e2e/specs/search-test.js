//import { flushPromises } from 'flush-promises';
//import { AnimeInfo } from '@/components/AnimeInfo.vue';
const flushPromise = require('flush-promises')
const jest = require('@vue/cli-plugin-unit-jest')


    jest.mock("axios", () => ({
      get: jest.fn(() => Promise.resolve({ works: [
        { id: 1, title: "test"}
      ]
      }))
    }))

  describe('Search', () => {
  test('E2E  Search Test', async function(browser) {
    const wrapper = mount(AnimeInfo);
    browser
      // ページを開き処理を待つ
      .url('http://localhost:8081/login')
      .waitForElementVisible('body', 1000)
      // ログイン
      .setValue('input[type=email]', 'test-user+1@example.com')
      .setValue('input[type=password]', 'password')
      .click('button')
      .click('a[href="/search"]')
      .pause(3000)
      .click('button')
      await flushPromises()
      console.log(wrapper.html())
    browser.end();
  })
})

//{
  //"works": [
  //  {
  //    "id": 4168,
  //    "title": "SHIROBAKO",
  //    "title_kana": "しろばこ",
  //    "media": "tv",
  //    "media_text": "TV",
  //    "season_name": "2014-autumn",
  //    "season_name_text": "2014年秋",
  //    "released_on": "2014-10-09",
  //    "released_on_about": "",
  //    "official_site_url": "http://shirobako-anime.com",
  //    "wikipedia_url": "http://ja.wikipedia.org/wiki/SHIROBAKO",
  //    "twitter_username": "shirobako_anime",
  //    "twitter_hashtag": "musani",
  //    "syobocal_tid": "3524",
  //    "mal_anime_id": "25835",
  //    "images": {
  //      "recommended_url": "http://shirobako-anime.com/images/ogp.jpg",
  //      "facebook": {
  //        "og_image_url": "http://shirobako-anime.com/images/ogp.jpg"
  //      },
  //      "twitter": {
  //        "mini_avatar_url": "https://twitter.com/shirobako_anime/profile_image?size=mini",
  //        "normal_avatar_url": "https://twitter.com/shirobako_anime/profile_image?size=normal",
  //        "bigger_avatar_url": "https://twitter.com/shirobako_anime/profile_image?size=bigger",
  //        "original_avatar_url": "https://twitter.com/shirobako_anime/profile_image?size=original",
  //        "image_url": ""
  //      }
  //    },
  //    "episodes_count": 24,
  //    "watchers_count": 1254
  //  },
  //]
