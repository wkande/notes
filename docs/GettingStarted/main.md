## About

Welcome to **Notes**, a demonstration project created by Warren Anderson to implement [Docsify](https://docsify.js.org) and [GitBook](https://www.gitbook.com) using the **docs-as-code** philosophy. Sometimes referred to as docs-like-code.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ftnVllssoI8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Overview

**Notes** is a functional (but not used) project utilizing a Node.js backend for the purpose of illustrating the use of [Docsify](https://docsify.js.org) and [GitBook](https://www.gitbook.com) to create API Reference Guides. Each has a different approach to documentation creation but are tightly integrated with developer tools.

**Docsify** generates documentation on the fly. It smartly loads and parses Markdown files and displays them as a website. Needless-to-say, this guide is a Docsify website. The **API Reference Guide** for Notes is a set of markdown files rendered by Docisfy and some of its many plugins. This guide is hosted by the GitHub Pages site attached to the [Notes GitHub Repo](https://github.com/wkande/notes).

**GitBook** has an online editor but will also pull markdown files from a GitHub repo. GitBook then hosts the documentation set for you.

**Documentation as Code** (a.k.a. docs-as-code or docs-like-code) refers to a philosophy that you should be writing documentation with the same tools as code:

- Issue Trackers
- Version Control (Git)
- Plain Text Markup (Markdown, reStructuredText, Asciidoc)
- Code Reviews
- Automated Tests

This means following the same workflows as development teams, and being integrated in the product team. It enables a culture where writers and developers both feel ownership of documentation, and work together to make it as good as possible. The **Notes** project follows this philosophy.

## Heroku

There is a **Heroku Dyno** running **Notes**. Call it using CURL, with your App or with [Insomnia](/#Insomnia). The dyno uses a free tier plan and may be idle. Calling an idle dyno will take a minute to come alive. Subsequent calls will be fast.

Change the **email=me@domain.com** to your email address. A code will be sent to your email address from support@lelandcreek.com.

```bash
curl -d "email=me@domain.com" \
-H "Content-Type: application/x-www-form-urlencoded" \
-X POST https://notes-docsify.herokuapp.com/user/code | json_pp
```

[filename](GettingStarted/insomnia.md ':include')

## MIT License

Copyright (c) 2020-Present Warren K. Anderson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
