'use strict';
// Check attributes in a certain order so, e.g. rel=prev can take priority over
// a link that has an id including 'prev' inside it, which can take priority
// over a link that has 'prev' in its innerHTML. Fixes a bug where 'prev' on
// Schlock Mercenary would take you to previous blog posts rather than previous
// comic.
let attributes = ['rel', 'title', 'id', 'innerHTML'];

function pickLink(direction) {
  for (let i = 0; i < attributes.length; i++) {
    let attributeName = attributes[i];
    let allLinks = [].slice.call(document.getElementsByTagName('a'));
    let links = allLinks.filter(function(a) {
      return a.href && a[attributeName].match(direction);
    });
    if (links.length > 0) {
      console.log('webcomic-pager: matched links', links);
      return links[0];
    }
  }
  return null;
}

function clickLink(direction) {
  let link = pickLink(direction);
  if (link) {
    link.click();
  } else {
    console.log('webcomic-pager: looked for', direction, 'but found no links.');
  }
}

function preloadUrl(url) {
  var link = document.createElement('link');
  link.setAttribute('rel', 'prerender');
  link.setAttribute('href', url);
  var h = document.head;
  h.insertBefore(link, h.firstChild);
}

function preload(direction) {
  let link = pickLink(direction);
  if (link) {
    console.log('webcomic-pager: preloading', link.href);
    preloadUrl(link.href);
  } else {
    console.log('webcomic-pager: looked for', direction, 'but found no links to preload');
  }
}
