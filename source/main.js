chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.executeScript({file: 'lib/bant.colorpicker.min.js' });
	chrome.tabs.executeScript({file: 'inserter.js' });
	chrome.tabs.insertCSS({file: 'css/style.css' });
	chrome.tabs.executeScript({code: 'displayInsertColorPicker()'});
});