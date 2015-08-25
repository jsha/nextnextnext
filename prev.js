var currentElement = document.activeElement;
if (!$(currentElement).prop('contenteditable') &&
    currentElement.tag.toUpperCase() != 'INPUT') {
  var links = $('a:contains(Prev)');
  if (links && links.length > 0) {
    console.log('LINKS ', links);
    links[0].click();
  } else {
    console.log('No links found matching "Next".');
  }
}
