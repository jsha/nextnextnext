# Nextnextnext

The best way to read webcomic archives: with keyboard shortcuts and preloading.

This extension adds two keyboard shortcuts to your browser: Ctrl-Comma and
Ctrl-Period (on Mac, Alt-Comma and Alt-Period). Ctrl-Comma tries to take
you to the previous page in a series, and Ctrl-Period tries to take you to the
next page in a series.

The extension does this by searching the current page for links that have 'prev'
or 'next' in them. Since the extension searches the HTML, it can often find 'prev' or
'next' links even if they don't visibly have those words. For instance, if the
link to a previous page is actually an image, but it has hover text that says
'Previous', that will work. Still, this is an approximate method. On some pages
the extension may be unable to find an appropriate link, or it may pick the
wrong link.

Additionally, once you start using the keyboard shortcuts, the extension will
try to preload pages for you for faster reading. This preloading only occurs
when you use the shortcuts, not when clicking on links.

This extension is especially useful for reading webcomic archives, where you
want to hit 'next' repeatedly and with short delay. But it works for any set of
pages that have Previous and Next links.

I hope you enjoy this extension. If you do, please let my know. I'm @j4cob on
Twitter.

Code is licensed GPLv3.

Icon is by [Julien Miclo](https://thenounproject.com/JulienMiclo/), via [The Noun
Project](https://thenounproject.com/)
