import NavBar from "~/components/NavBar";

export default function update() {
  return (
    <>
      <div>
        <NavBar thispage="Update" />
      </div>
      <div className="p-4">
      <div class="card w-96 bg-base-100 shadow-xl dropdown-content mb-4 pt-1 w-full">
          <div class="card-body">
            <h2 class="card-title">Ver. 0.5.1</h2>
            <ul>
              <li>ファイルをアップロードできるようになりました。(仮)</li>
              <li>
                オンラインインジケーターのコードを調節/修正しました。
              </li>
              <li>
                送信ボタンを追加しました。
              </li>
              <li>
                react-markdownの設定を変更し、装飾のバリエーションが増え、URLは新規タブで開くようになりました。
              </li>
            </ul>
          </div>
        </div>
        <div class="card w-96 bg-base-100 shadow-xl dropdown-content mb-4 pt-1">
          <div class="card-body">
            <h2 class="card-title">Ver. 0.4.1</h2>
            <ul>
              <li>オンライン/オフラインのインジケーターを作成しました。</li>
              <li>
                チャット画面のアバターを押した際に表示されるカードのDividerに余白を追加しました。
              </li>
              <li>
                不必要にチャットが強制的にスクロールされてしまう問題を修正しました。
              </li>
            </ul>
          </div>
        </div>
        <div
          class="card w-96 bg-base-100 shadow-xl mb-4
      "
        >
          <div class="card-body">
            <h2 class="card-title">Ver. 0.3.3</h2>
            <ul>
              <li>画像が一時的に保存されるようになりました。</li>
              <li>メンションボタンが追加されました。(未実装)</li>
              <li>テーマが追加されました。(一部バグあり)</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
