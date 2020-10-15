## What are Users?

In **Notes** a user is synonymous with an email address. Nothing more is known about the user. Users must authenticate with their email address using the [Email-Code-Token](APIs/overview.md) mechanism.

<!------------------------------------->

---

[create-a-code](../APIs/create-a-code.md ':include')

<!------------------------------------->

---

## Get a Token

Send the code received from [POST /user/code](APIs/users.md#CreateACode) to **GET /user/token**. The JWT token returned by GET /user/token is used to access other endpoints.

<span class="method get">POST</span> /user/token

---

**Parameters**

| Name         | Type    | In     | Description |
| :---         | :---    | :---   | :--- |
| Accept       | string  | header | application/json or application/xml |
| email        | string  | query  | ^ user's email address |
| code         | string  | query  | ^ code sent to the user's email address |

> ^ required, Accept defaults application/json

---

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -X GET "https://docs-as-code.herokuapp.com/user/token?email=me@domain.com&code=123456" | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Accept": "application/json"}
};

const resp = await axios.get("https://docs-as-code.herokuapp.com/user/token", {"email":"me@domain.com"}, options)
console.log(resp.data);
```

<!-- tabs:end -->

### Response

<!-- tabs:start -->
##### **Status**

```text
- 200 OK
- 400 Bad Request
- 429 To Many Requests
- 431 Request Header Fields Too Large
- 500 Internal server error
```

##### **JSON**

```json
{
  "user": {
    "email": "warren@wyosoft.com",
    "code": "A code was sent to the email address."
  }
}
```

##### **XML**

```xml
<?xml version='1.0'?>
<user>
  <email>warren@wyosoft.com</email>
  <code>A code was sent to the email address.</code>
</user>
```

<!-- tabs:end -->

---

<!------------------------------------->
## Get current User