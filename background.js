// var bookmarks = function() {


// }
var markMap = {};
var host = "sharmark.com"

// ===================== 获取书签 开始=======================
function tree(treeNodes) {
	for (i in treeNodes) {
		if (treeNodes[i].url) {

      // console.log("title:" + treeNodes[i].title + ";url:" + treeNodes[i].url);
      // TODO escape
      markMap[treeNodes[i].title] = treeNodes[i].url;
    } else {
      // console.log("folder:"+treeNodes[i].title);
    }
    var children = treeNodes[i].children;
    if (children && children.length != 0) {
      tree(children);
    }
  }

} 

chrome.bookmarks.getTree(tree);

// ===================== 获取书签 结束=======================

// chrome.browserAction.setPopup({popup:"popup.html"});
// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });

// ===================== 输入框搜索 开始=======================
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {

    chrome.omnibox.setDefaultSuggestion({ description: "search [" + text + "] in sharmark.com" });
    if (text) {
      var suggests = [];
      console.log('inputChanged: ' + text);
      chrome.bookmarks.search(text, function(results) {
        for (i in results) {
          var item = results[i];
          if (item.url) {
            // TODO needs to be escaped because of xml style format
            suggests.push({
              content:     item.url,
              description: item.url + "-" + item.title.replace(new RegExp("(" + text + ")", "gi"), "<match>$1</match>") //+ " <dim>" + "(URL)" + "</dim>"
            });
          }
        }
        suggest(suggests);
      });
      // if (Object.keys(markMap).length == 0) {
      //   chrome.bookmarks.getTree(tree);
      // }
      // var keywords = text.split(" ");
      // var reg = ".*";
      // for (w in keywords) {
      //   reg = reg + keywords[w];
      // }
      // reg = reg + ".*";
      // reg = new RegExp(reg, "i");
      // for (key in markMap) {
      //   if (reg.test(key)) {
      //     suggests.push({
      //       content:markMap[key],
      //       description: markMap[key] + " - " + key
      //     });
      //   }
      // }
    }
    // suggest(suggests);
  });

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);
    if (text.indexOf("http") < 0 && text.indexOf("https") < 0 )
      text = host;
    chrome.tabs.update({
      url:text
    });
  });
chrome.omnibox.onInputCancelled.addListener(
  function() {
    console.log("cancel input!!")
  });

chrome.omnibox.onInputStarted.addListener(
  function() {
    console.log("start input!!");
  });
// ===================== 输入框搜索 结束=======================