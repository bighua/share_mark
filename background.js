// var bookmarks = function() {


// }

// ===================== 获取书签 开始=======================
function tree(treeNodes) {
	for (i in treeNodes) {
		if (treeNodes[i].url)
			console.log("title:" + treeNodes[i].title + ";url:" + treeNodes[i].url);
		else
			console.log("folder:"+treeNodes[i].title);
		var children = treeNodes[i].children;
		if (children && children.length != 0) {
			tree(children);
		}
	}
} 

chrome.bookmarks.getTree(tree);

// ===================== 获取书签 结束=======================

// chrome.browserAction.setPopup({popup:"popup.html"});
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});

// ===================== 输入框搜索 开始=======================
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    suggest([
      {content: text + " one", description: "the first one"},
      {content: text + " number two", description: "the second entry"}
    ]);
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);
    alert('You just typed "' + text + '"');
  });

// ===================== 输入框搜索 结束=======================