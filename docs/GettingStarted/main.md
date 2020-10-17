## About

Welcome to **Notes**, a demonstration project created by Warren Anderson to implement [Docsify](https://docsify.js.org) and  using the **docs-as-code** philosophy, sometimes referred to as docs-like-code. Other products like [GitBook](https://www.gitbook.com) and [MkDocs](https://www.mkdocs.org) are also a great choices.

<!--------------------------------------
DOCS-LIKE-CODE
--------------------------------------->

## Treat Docs-Like-Code

**Documentation Like Code** (a.k.a. docs-as-code or docs-like-code) suggests that we write documentation with the same tools as code:

- Issue Trackers
- Version Control (Git)
- Plain Text Markup (Markdown, reStructuredText, Asciidoc)
- Code Reviews
- Automated Tests

This means following the same workflows as development teams, and being integrated in the product team. It enables a culture where writers and developers both feel ownership of documentation, and work together to make it as good as possible. The **Notes** project follows this philosophy.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ftnVllssoI8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**Docsify** generates documentation on the fly. It smartly loads and parses Markdown files and displays them as a website. Needless-to-say, this guide is a Docsify website. The **API Reference Guide** for Notes is a set of markdown files rendered by Docisfy and some of its many plugins. This guide is hosted by the GitHub Pages site attached to the [Notes GitHub Repo](https://github.com/wkande/notes).

**GitBook** has an online editor but will also pull markdown files from a GitHub repo. GitBook then hosts the documentation set for you.

**MkDocs** a simple to use markdown renderer that focuses on a single but small YAML definitions file.

**Git** is a major player for docs-like-code. Documentations is often stored right along side the code. The most common practice is to store the docs in a separate repo from the code, while both repos exist within the same organization.

> Store docs in the same repo as the code.
> <br>Usually when the Developer is also the Tech Writer.
> <br>Smaller projects.

> Store docs and code in separate repos but in the same orgainzation.
> <br>Usually when the Developer and the Tech Writer are two different people.
> <br>Larger projects.

The **Notes** project stores its docs in the same repo as the code on GitHub. There are other great players such as BitBucket and GitLabs to name a few.

<!--------------------------------------
HEROKU
--------------------------------------->

## Heroku

There is a **Heroku Dyno** running **Notes**. Call it using CURL, with your App or with [Insomnia](/#Insomnia). The dyno uses a free tier plan and may be idle. Calling an idle dyno may take a moment to come alive. Subsequent calls will be fast.

Change the **email=me@domain.com** below to your email address. A code will be sent to your email address from support@lelandcreek.com.

```bash
curl -d "email=me@domain.com" \
-H "Content-Type: application/x-www-form-urlencoded" \
-X POST https://docs-as-code.herokuapp.com/user/code | json_pp
```

<!--------------------------------------
INSOMNIA
--------------------------------------->

## Insomnia

You can execute all the APIs using [Insomnia](https://insomnia.rest) by downloading, unzipping and importing the <a id="raw-url" href="../GettingStarted/Insomnia.json.zip">Notes API Definitions</a> file into Insomnia. Everything is set up and ready to go.  While the APIs can return either JSON or XML, all Insomnia requests are setup to return JSON.

![insomnia](../assets/insomnia.png)

##### Try Authenticating

Be sure you are using the **prod** environment.

1. Select the **Create a Code** endpoint > select the **Send** button > enter your **Email Address**.

1. Get the code from your email.

1. Select the **Get a Token** endpoint > select the **Send** button > enter your **Code** .

1. A **JWT Token** has now been added to the Insomnia ENV and you can now make other API calls.

##### Get your Notes

When you authenticated for the first time a welcome note was created for you.

1. Select the **Get user Notes** endpoint > select the **Send** button.

<!--------------------------------------
LICENSE
--------------------------------------->

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
