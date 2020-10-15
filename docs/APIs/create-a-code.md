## Create a Code

Collect the user's email address and send it to the **POST /user/code** endpoint. A six digit code will be sent to the user's email account.  The code should then be sent to GET /token to receive a JWT token to use with other endpoints.

Most email gateways will accept an email address and enter it into a queue to be delivered in the future. This does not guarantee delivery. This endpoint will return a status=201 once the gateway "accepts" the email address for delivery, though it might fail in the future.

---

<span class="method get">POST</span> /user/code

---

**Parameters**

| Name         | Type    | In     | Description |
| :---         | :---    | :---   | :--- |
| Content-Type | strint  | header | ^ application/x-www-form-urlencoded |
| Accept       | string  | header | application/json or application/xml |
| email        | string  | body   | ^ user's email address |

> ^ required, Accept defaults application/json

---

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -d "email=me@domain.com" \
-H "Content-Type: application/x-www-form-urlencoded" \
-H "Accept:application/json" \
-X POST https://docs-as-code.herokuapp.com/user/code | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded"}
};

const resp = await axios.post("https://docs-as-code.herokuapp.com/user/code", {"email":"me@domain.com"}, options)
console.log(resp.data);
```
<!-- tabs:end -->

---

### Response

<!-- tabs:start -->

##### **Status**

```text
- 201 OK
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