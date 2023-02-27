import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // liタグ作成
  const li = document.createElement("li");

  // pタグ作成
  const p = document.createElement("p");
  p.innerText = text;
  p.className = "list-p";

  // button(完了)タグ作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの親タグを未完了リストから削除
    deleteDFromIncompleteList(completeButton.parentNode.parentNode);

    // 完了リストに追加する要素
    const addDiv = completeButton.parentNode;
    const addTarget = addDiv.parentNode;

    // TODO内容テキストを取得
    const text = addDiv.firstElementChild.innerText;

    // div以下を初期化
    addDiv.textContent = null;

    // pタグ作成
    const p = document.createElement("p");
    p.innerText = text;
    p.className = "list-p";

    // button(戻す)タグ作成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの親タグ完了リストから削除
      const deleteTarget = backButton.parentNode.parentNode;
      document.getElementById("complete-list").removeChild(deleteTarget);

      // テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;

      // 未完了リストに追加
      createIncompleteList(text);
    });

    // divタグの子要素に各要素を設定
    addDiv.appendChild(p);
    addDiv.appendChild(backButton);

    // liタグの子要素にdivタグを設定
    addTarget.appendChild(addDiv);

    // 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button(削除)タグ作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ(li)を未完了リストから削除
    deleteDFromIncompleteList(deleteButton.parentNode.parentNode);
  });

  // divタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // liタグの子要素にdivタグを設定
  li.appendChild(div);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

// 未完了リストから指定の要素を削除
const deleteDFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
