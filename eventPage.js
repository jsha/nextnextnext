chrome.commands.onCommand.addListener(function(command) {
  console.log('Command:', command);

  if (command === 'webcomic-pager-next') {
    go('next');
  } else if (command === 'webcomic-pager-prev') {
    go('prev');
  }
});

function go(direction) {
  chrome.tabs.getSelected(null, function(tab){
    chrome.tabs.executeScript(tab.id, {
      file: "jquery-2.1.1.min.js"
    }, function(response) {
      chrome.tabs.executeScript(tab.id, {
        file: direction + ".js"
      });
    });
  });
}
