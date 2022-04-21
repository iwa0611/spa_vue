# **🔹Watched Anime List**
<div align="center">
<img src="https://user-images.githubusercontent.com/89628153/159217591-303d39ec-4e78-4cc6-a3b9-db95f12a8e0c.jpg" width="400px">
</div>
<br>

## **🌍App URL**

[APP URL](https://murmuring-sea-35771.herokuapp.com/)

[API側のGit](https://github.com/iwa0611/spa_api)
> #### herokuにデプロイした物が開かれます。<br>うまく表示されない場合はリロードしてください。
<br>


# **🔹導入**
- #### 昨今アニメは様々な作品が放送されています。一般的に３ヶ月で12話前後で構成されている事が多く、四半期毎に作品が入れ替わります。<br>ドラマと同じ様なイメージです。

- #### 作品を色々見ていると<br>あの作品はいつ頃やっていたっけ？<br>この時期は何を見ていたっけ？<br>など覚えていなかったり振り返りたくなる時があります。そこで視聴したアニメをリスト化して振り返る事ができるアプリを作ろうと思いました。

<br>

# **🔹説明**
- #### このアプリはAnnict様のAPIを利用して作品リストを取得しています。<br>https://annict.com/<br>https://developers.annict.com/docs<br>それをシーズン毎にDBに保存してリスト化しています。

- #### Annict自身にも同じ様な機能はありますが、APIを利用してVue + RailsのSPAで構成し自分好みにカスタマイズして簡易的なレビューとコメントを残せるようにしました。
<br>

# **🔹使い方**
<br>

> #### 機能は管理者モード限定です。ゲストはHome表示とモーダル表示のみになります。
<br>
<div align="center">
<img src="https://user-images.githubusercontent.com/89628153/159384713-e282af11-0e7e-4d70-8810-a87924c5a65c.gif" width="400px">
</div>
<br>

- #### searchページから作品を検索し、追加ボタンをクリックするとリストに追加されます。Home画面に戻ると追加されているのがわかります。削除ボタンをクリックするとリストから削除されます👍
<br>
<hr />
<br>
<div align="center">
<img src="https://user-images.githubusercontent.com/89628153/159386452-b347233e-0c05-4e96-8977-58be11ef1b1f.gif" width="400px">
</div>
<br>

- #### リストに追加されたタイトルをクリックするとモーダルが開き詳細を見る事ができます。コメントや🌟による簡易レビューが可能です。<br>編集をクリックすると保存されます🎉
<br>
<hr />
<br>
<div align="center">
<img src="https://user-images.githubusercontent.com/89628153/159389953-58d5360c-c0c7-48bc-819c-65269a72d9d1.gif" width="400px">
</div>
<br>

- #### 過去視聴作品は季節毎にリスト化されているので年と季節を選択して表示をクリックするとリストが表示されます📋
<br>

# **🔹構成**
<br>
<div align="center">
<img src="https://user-images.githubusercontent.com/89628153/159390883-9085b345-186d-453c-b62a-72c258ca5cd9.png" width="400px">
</div>
<br>

# **🔹使用技術**
<br>
<div align="center">
<img src="https://user-images.githubusercontent.com/89628153/159391373-576c986c-ed8f-43a6-88d3-cd43cd887e1b.png" width="400px">
</div>
<br>

- #### フロントサイドはVueで構成し、サーバーサイドはRailsで構成してあります。<br>DBはMysql、デプロイはherokuに行いました。<br>テスト関係はVue側をcypressでE2Eテスト、Rails側をRspecで行いました。
<br>

# **🔹機能一覧**

- #### ログイン・ログアウト機能（管理者用。deviseで実装）
- #### リスト追加・削除機能
- #### 検索機能
- #### モーダルウィンドウ
- #### ページネーション（検索時に表示される）
- #### トースト表示（ログイン・ログアウト・編集・追加・削除時に表示される）
- #### ローディングマーク（検索読み込み時に表示）
- #### レビュー機能（コメント、🌟による評価）
- #### 季節毎のリスト表示機能
- #### お気に入りリスト機能追加(4/21)✨✨
