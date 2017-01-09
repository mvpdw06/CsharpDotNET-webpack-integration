# 在 C#.NET 中使用(~~踩地雷~~) Webpack

你也可以在我的 [SpeakerDesk - Webpack Integration with ASP.NET](https://speakerdeck.com/mvpdw06/webpack-integration-with-asp-dot-net)  中看倒這篇文章！

## 目標

1. 在現有的 C#.NET 專案中導入 Webpack 使用新的前端技術，例如：React, ES6+, JSX...等等。
2. 打包需要的 jsx 檔案。
3. 轉譯 ES6+ 語法。

## 需求

1. Node.js npm or Yarn
2. Visual Studio 2015+
3. JavaScript 模組化
4. Webpack 基礎設定

## Step.1 新增 package.json 檔案

在 VisualStudio 2015 的 Web 專案跟目錄新增 npm 檔案 package.json，並修改 package.json 檔案，在 devDependencies 中新增需要安裝的 npm 套件。

1. babel-cli
2. babel-loader
3. babel-preset-es2015
4. babel-preset-react
5. babel-preset-stage-0
6. webpack

> 你也可以使用 command 在專案根目錄下使用 $ npm init 指令產生 package.json，並使用 npm install babel-cli babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 webpack --save -d 來新增所有需要的套件！

## Step.2 新增 webpack 設定檔

新增 Webpack 設定檔 webpack.config.js，並修改 Webpack 設定檔。（範例檔案請看檔案 webpack.config.babel.js）

> webpack.config.js 與 webpack.config.babel.js 差別在於這隻 webpack 設定檔是否要以 ES6+ 來寫！例如：使用 ES6+ 則須以 webpack.cconfig.babel.js 來命名！Node.js 版本對於語法的支援度則需到 [node.green](node.green) 去查看！

## Step.3 新增 babel 設定檔

新增 babel 設定檔 .babelrc。

```
{
  "presets": ["es2015", "stage-0", "react"],
  "plugins": []
}
```

## Step.4 修改 JavaScript 檔案模組化

可使用 CommandJs 的語法 require，或是 ES6 的 import 都是可以的，這是為了讓 webpack 了解你檔案的相依性，再幫你照著順序做打包！

```
const AModule = require('./aModule'); // CommandJs
import { AModule } from './aModule'; // ES6

// your code here.
const BModule = [];

module.exports = BModule;
```

## Step.5 利用 Webpack Task Runner 跑 webpack 設定檔

如果你的 VisualStudio 2015 開啟 Task Runner 沒看到 webpack 偵測到你的 webpack 設定檔，你就必須到 nuget 安裝 [Webpack Task Runner](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebPackTaskRunner)！（最新版本的 VisualStudio 2015 已經內建這個功能！）

可以手動跑，或是綁定 before build 或是 after build！

## Step.6 修改 HTML 檔案

Index.html / .aspx / .cshtml 修改為引用打包過輸出的檔案！

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>CsharpDotNET-webpack-integration</title>
</head>
<body>
	<div id="app"></div>
	<script src="/assets/bundle.js"></script>
</body>
</html>
```

## Finish! 完成，開始用新的前端框架開發 C#.NET 的網頁應用程式吧！

You should try it by yourself and you will know how easy it it!

# 你可能會遇到的問題

1. 為什麼我的 VisualStudio 2015 跑 webpack.config.babel.js 會出錯？明明我的語法都沒寫錯呀！？倒底～～～？

> Ans：因為你的 VisualStudio 可能使用了錯誤的 Node.js 版本跑指令，請檢查你的 VS 設定 Tools > Options > Projects and Solutions > External Web Tool 新增一個你電腦安裝 Node.js 的路徑，並且排到第一個優先順位！
> ![image](https://cdn.rawgit.com/mvpdw06/CsharpDotNET-webpack-integration/master/visual-studio-2015-nodejs-options-2.jpg)

# 進階用法

1. CI Server 用法

> 如果你們公司在各個環境都架設 CI Server（EX: Jenkins），那麼在 CI Server 上安裝 Node.js 正確的版本，並且設定在 Build 環境的 Code 之前，先運行 npm install 在跑 cmd /c SET NODE_ENV=production && webpack -p --color 就可以不需要手動產生檔案，讓 CI Server 幫你處理掉這件事情！

# 參考資料

* [Visual Studio 2015 – How to update NodeJS and/or NPM to their latest version](http://www.ryadel.com/en/visual-studio-2015-update-nodejs-andor-npm-latest-version/)
