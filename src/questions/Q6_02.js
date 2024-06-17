import React from 'react'

/**
 * class の付与
 *
 * 背景色がほしい 3個の p タグがありますが、css が当たっていないため背景色の設定がありません
 * styles.css に定義された背景色設定のクラスを 各対象に設定してください
 *
 * 【ヒント】
 * DOM属性は React.createElement の第2引数に指定できます
 */

export default function Q6_02() {

  // 変数定義や関数を記載する
  const red = React.createElement("p", {className: 'background-red'}, "It's RED BACK");
  const green = React.createElement("p", {className: 'background-green'}, "It's GREEN BACK");
  const blue = React.createElement("p", {className: 'background-blue'}, "It's BLUE BACK");

  
  const dred = React.createElement("p", null, "It's RED BACK");
  const dgreen = React.createElement("p", null, "It's GREEN BACK");
  const dblue = React.createElement("p", null, "It's BLUE BACK");

  return (
    <div className='question-wrap'>
      <h1 className='question-title'>Q6_02</h1>
      <div className='question-content'>
      {/* ↓↓↓ 描画する内容を書く ↓↓↓ */}
      <p>default:</p>
      {dred}
      {dgreen}
      {dblue}
      <p>modified:</p>
      {red}
      {green}
      {blue}
      {green}
      {red}
      {/* ↑↑↑ 描画する内容を書く ↑↑↑ */}
      </div>
    </div>
  );
}