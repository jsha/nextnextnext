'use strict';
chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);

  if (command === 'pager-next') {
    go('next');
  } else if (command === 'pager-prev') {
    go('prev');
  }
});

/**
 * A map of tabIds on which there was a recent navigation event. This is used so
 * that we can inject a preloading script that will try to load the next page in
 * the same direction. The values of the map are 'next' or 'prev', equal to the
 * direction of the last navigation.
 */
let injectable = {};

/**
 * For a given direction (next or prev), load the necessary content script to
 * find and click the appropriate link. Also, store an entry in the injectable
 * map for this tab, so when the new page loads we can inject the preloading
 * script into it.
 */
function go(direction) {
  chrome.tabs.getSelected(null, function(tab){
    injectable[tab.id] = direction;
    console.log('Injectable', tab.id);
    inject(tab.id, direction + '.js');
  });
}

/**
 * Inject a given content script into the target tabId, along with the
 * content-helpers script.
 */
function inject(tabId, script) {
  chrome.tabs.executeScript(tabId, {
    file: "content-helpers.js"
  }, function(response) {
    chrome.tabs.executeScript(tabId, {
      file: script
    });
  });
}

/**
 * For tabs on which we had a recent navigation, inject the preload script.
 * Note that there are two cases: For a non-preloaded navigation event, we get
 * an onUpdated with status = 'complete'. If the navigation event went to a
 * preloaded page, we get an onReplaced.
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status != 'complete') {
    return;
  }
  console.log('tab onUpdated', tabId, changeInfo, tab);
  injectPreload(tabId);
});

chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId) {
  injectable[addedTabId] = injectable[removedTabId];
  delete injectable[removedTabId];
  injectPreload(addedTabId);
});

/**
 * Inject the preloading script into a tab, if that tab recently had a
 * navigation event triggered by this extension. Also remove that tab
 * from the injectable map so it doesn't continue to get the preload script,
 * unless the next navigation event is also triggered by this extension.
 */
function injectPreload(tabId) {
  if (injectable[tabId]) {
    let direction = injectable[tabId];
    let script = 'preload-' + direction + '.js';
    delete injectable[tabId];
    console.log('injecting', script);
    inject(tabId, script);
  }
}
