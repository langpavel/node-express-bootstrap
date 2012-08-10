NOTE -- Showdown on GitHub
==========================

Please note that I, Corey, am not the author of Showdown. Rather, I found it
some time back at <http://attacklab.net/showdown/>
(website removed, see: <http://wayback.archive.org/web/*/http://attacklab.net/showdown>)
and wanted to see it available on GitHub.

All credit and praise for authoring this library should go to John Fraser.

Oh, and John Gruber of course.

That said, I have recently see some GitHub forking activity and a pull
request. As such, I will endeavor to ordain myself as a maintainer of
Showdown, at least as it exists on GitHub.

Apologies for any confusion or perceived misinformation.

Cheers,<br/>
Corey


Showdown -- A JavaScript port of Markdown
=========================================

Showdown Copyright (c) 2007 John Fraser.
<http://www.attacklab.net/>

Original Markdown Copyright (c) 2004-2005 John Gruber
<http://daringfireball.net/projects/markdown/>

Redistributable under a BSD-style open source license.
See license.txt for more information.


Quick Example
-------------

```
var Showdown = require('showdown');
var converter = new Showdown.converter();

converter.makeHtml('#hello markdown!');

// <h1 id="hellomarkdown">hello, markdown</h1>

```

What's it for?
--------------

Developers can use Showdown to:

 * Add in-browser preview to existing Markdown apps

    Showdown's output is (almost always) identical to
    markdown.pl's, so the server can reproduce exactly
    the output that the user saw.  (See below for
    exceptions.)

 * Add Markdown input to programs that don't support it

    Any app that accepts HTML input can now be made to speak
    Markdown by modifying the input pages's HTML.  If your
    application lets users edit documents again later,
    then they won't have access to the original Markdown
    text.  But this should be good enough for many
    uses -- and you can do it with just a two-line
    `onsubmit` function!

 * Add Markdown input to closed-source web apps

    You can write bookmarklets or userscripts to extend
    any standard textarea on the web so that it accepts
    Markdown instead of HTML.  With a little more hacking,
    the same can probably be done with  many rich edit
    controls.

 * Build new web apps from scratch

    A Showdown front-end can send back text in Markdown,
    HTML or both, so you can trade bandwidth for server
    load to reduce your cost of operation.  If your app
    requires JavaScript, you won't need to do any
    Markdown processing on the server at all.  (For most
    uses, you'll still need to sanitize the HTML before
    showing it to other users -- but you'd need to do
    that anyway if you're allowing raw HTML in your
    Markdown.)


Browser Compatibility
---------------------

Showdown has been tested successfully with:

 - Firefox 1.5 and 2.0
 - Internet Explorer 6 and 7
 - Safari 2.0.4
 - Opera 8.54 and 9.10
 - Netscape 8.1.2
 - Konqueror 3.5.4

In theory, Showdown will work in any browser that supports ECMA 262 3rd Edition (JavaScript 1.5).  The converter itself might even work in things that aren't web browsers, like Acrobat.  No promises.


Known Differences in Output
---------------------------

In most cases, Showdown's output is identical to that of Perl Markdown v1.0.2b7.  What follows is a list of all known deviations.  Please email me if you find more.


 *  This release uses the HTML parser from Markdown 1.0.2b2,
    which means it fails `Inline HTML (Advanced).text` from
    the Markdown test suite:

        <div>
        <div>
        unindented == broken
        </div>
        </div>


 *  Showdown doesn't support the markdown="1" attribute:

        <div markdown="1">
             Markdown does *not* work in here.
        </div>

    This is half laziness on my part and half stubbornness.
    Markdown is smart enough to process the contents of span-
    level tags without screwing things up; shouldn't it be
    able to do the same inside block elements?  Let's find a
    way to make markdown="1" the default.


 *  You can only nest square brackets in link titles to a
    depth of two levels:

        [[fine]](http://www.attacklab.net/)
        [[[broken]]](http://www.attacklab.net/)

    If you need more, you can escape them with backslashes.


 *  When sublists have paragraphs, Showdown produces equivalent
    HTML with a slightly different arrangement of newlines:

        + item

             - subitem

               The HTML has a superfluous newline before this
               paragraph.

             - subitem

               The HTML here is unchanged.

             - subitem

               The HTML is missing a newline after this
               list subitem.



 *  Markdown.pl creates empty title attributes for
    inline-style images:

        Here's an empty title on an inline-style
        ![image](http://w3.org/Icons/valid-xhtml10).

    I tried to replicate this to clean up my diffs during
    testing, but I went too far: now Showdown also makes
    empty titles for reference-style images:

        Showdown  makes an empty title for
        reference-style ![images][] too.

        [images]: http://w3.org/Icons/valid-xhtml10


 *  With crazy input, Markdown will mistakenly put
    `<strong>` or `<em>` tags in URLs:

        <a href="<*Markdown adds em tags in here*>">
           improbable URL
        </a>

    Showdown won't.  But still, don't do that.


Tests
---------------------------
A suite of tests is available which require node.js.  Once node is installed, run the following command from the project root to install the development dependencies:

    npm install --dev

Once installed the tests can be run from the project root using:

    mocha test/run.js

New test cases can easily be added.  Create a markdown file (ending in `.md`) which contains the markdown to test.  Create a `.html` file of the exact same name.  It will automatically be tested when the tests are executed with `mocha`.


Credits
---------------------------

  * Origins
    * [John Fraser](http://attacklab.net/):<br/>
      Author of Showdown
    * [John Gruber](http://daringfireball.net/projects/markdown/):<br/>
      Author of Markdown
  * Maintenance
    * [Corey Innis](http://github.com/coreyti):<br/>
      GitHub project maintainer
    * [Remy Sharp](http://remysharp.com/):<br/>
      CommonJS-compatibility and more
    * [Roger Braun](https://github.com/rogerbraun):<br/>
      Github-style code blocks
    * [Dominic Tarr](https://github.com/dominictarr):<br/>
      Documentation
    * [Cat Chen](https://github.com/CatChen):<br/>
      Export fix
    * [Titus Stone](https://github.com/tstone):<br/>
      Mocha tests + bug fixes


-----------------------------------

#Introduction to GFM

GitHub uses what we're calling "GitHub Flavored Markdown" (GFM) for messages, issues, and comments. It differs from standard Markdown (SM) in a few significant ways and adds some additional functionality.

If you're not already familiar with Markdown, you should spend 15 minutes and go over the excellent [Markdown Syntax Guide](http://daringfireball.net/projects/markdown/syntax) at Daring Fireball.

If you prefer to learn by example, see the following source and result:

* [Source](sample_content.html)
* [Result](http://github.com/mojombo/github-flavored-markdown/issues/#issue/1)

If you're interested in how we render Markdown files, you might want to check out [Redcarpet](https://github.com/vmg/redcarpet), our Ruby interface to the [Sundown](https://www.github.com/vmg/sundown) library.

Differences from traditional Markdown
-------------------------------------

### Newlines

The biggest difference that GFM introduces is in the handling of linebreaks. With SM you can hard wrap paragraphs of text and they will be combined into a single paragraph. We find this to be the cause of a huge number of unintentional formatting errors. GFM treats newlines in paragraph-like content as real line breaks, which is probably what you intended.

The next paragraph contains two phrases separated by a single newline character:

    Roses are red
    Violets are blue

becomes

Roses are red
Violets are blue

### Multiple underscores in words

It is not reasonable to italicize just _part_ of a word, especially when you're dealing with code and names often appear with multiple underscores. Therefore, GFM ignores multiple underscores in words.

    perform_complicated_task
    do_this_and_do_that_and_another_thing

becomes

perform\_complicated\_task
do\_this\_and\_do\_that\_and\_another\_thing

### URL autolinking

GFM will autolink standard URLs, so if you want to link to a URL (instead of setting link text), you can simply enter the URL and it will be turned into a link to that URL.

### Fenced code blocks

Markdown converts text with four spaces at the front of each line to code blocks. GFM supports that, but we also support fenced blocks. Just wrap your code blocks in <code>\`\`\`</code> and you won't need to indent manually to trigger a code block.

### Syntax highlighting

We take code blocks a step further and add syntax highlighting if you request it. In your fenced block, add an optional language identifier and we'll run it through syntax highlighting. For example, to syntax highlight Ruby code:

    ```ruby
    require 'redcarpet'
    markdown = Redcarpet.new("Hello World!")
    puts markdown.to_html
    ```


A bit of the GitHub spice
-------------------------

In addition to the changes in the previous section, certain references are auto-linked:

    * SHA: be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
    * User@SHA ref: mojombo@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
    * User/Project@SHA: mojombo/god@be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2
    * \#Num: #1
    * User/#Num: mojombo#1
    * User/Project#Num: mojombo/god#1

becomes

<ul>
<li>SHA: <a href="http://github.com/mojombo/github-flavored-markdown/commit/be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2">be6a8cc</a></li>
<li>User@SHA ref: <a href="http://github.com/mojombo/github-flavored-markdown/commit/be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2">mojombo@be6a8cc</a></li>
<li>User/Project@SHA: <a href="http://github.com/mojombo/god/commit/be6a8cc1c1ecfe9489fb51e4869af15a13fc2cd2">mojombo/god@be6a8cc</a></li>
<li>#Num: <a href="http://github.com/mojombo/github-flavored-markdown/issues/#issue/1" class="internal">#1</a></li>
<li>User/#Num: <a href="http://github.com/mojombo/github-flavored-markdown/issues/#issue/1">mojombo#1</a></li>
<li>User/Project#Num: <a href="http://github.com/mojombo/god/issues/#issue/1">mojombo/god#1</a></li>
</ul>

Code
----

The newline and underscore modification code can be seen below. If you find a bug in the rendering, we'd love to hear about it.

<script src="http://gist.github.com/118964.js"></script>
