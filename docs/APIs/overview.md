## Authentication

The APIs implement an **Email-Code-Token** mechanism for authentication using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).

1. Prompt the user for their **Email Address** and call POST /user/code. The endpoint will send a **Code** to the email address and respond with status=201.

1. Prompt the user for their **Code** and send it to GET /user/token. The endpoint will respond with a **Token** and status=200.

The **Token** must be used to authenticate all other endpoints.

Try the **Email-Code-Token** mechanism using Insomnia. See the [Insomnia](/#Insomnia) section of this guide for more information.

## Accept Header

Your requests can ask for data returned as **JSON or XML**. The APIs will return JSON by default if the **Accept** header is not sent.

<!-- tabs:start -->

#### **JSON**

```bash
# Here no Accept header is sent.
# The server will send application/json by default.
curl -d "email=me@domain.com" \
-H "Content-Type: application/x-www-form-urlencoded" \
-X POST https://docs-as-code.herokuapp.com/user/code
```

#### **XML**

```bash
curl -d "email=me@domain.com" \
-H "Content-Type: application/x-www-form-urlencoded" \
-H "Accept:application/xml" \
-X POST https://docs-as-code.herokuapp.com/user/code 
```

<!-- tabs:end -->
