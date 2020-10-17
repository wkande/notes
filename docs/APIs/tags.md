## What are Tags?

**Tags** are attached to notes to aid in searching. A note can have one or many tags. Tags are stored in the note as a string of words.

```json
{
  "id": "-UB_Ja5Qq",
  "email": "me@mydomain",
  "content": "Saturday go to the bank and get some cash.",
  "tags": "cash Saturday",
  "ddtm": "2020-10-17T13:52:22.027Z"
}
```

<!--------------------------------------
GET USER'S TAGS
--------------------------------------->

---

## Get user's Tags

Gets a list of unique tags used by all the user's notes. The JWT token sent in the header is used to idenitfy the user by their email address.

---

<span class="method get">GET</span> /tags

---

**Parameters**

| Name           | Type    | In     | Description |
| :---           | :---    | :---   | :--- |
| Accept         | string  | header | application/json or application/xml |
| Authorization  | string  | header | ^ Bearer JWT-token |

^ required

---

### Examples

<!-- tabs:start -->

##### **CURL**

```bash
curl -H "Accept:application/json" \
-H "Authorization: Bearer 1234FRTG67" \
-X GET https://docs-as-code.herokuapp.com/tags | json_pp
```

##### **Javascript**

```javascript
const axios = require('axios');
const options = {
  "headers": {"Authorization": "Bearer 1234FRTG67",
              "Accept":"application/json"}
};

const resp = await axios.get("https://docs-as-code.herokuapp.com/tags", options)
console.log(resp.data);
```
<!-- tabs:end -->

---

### Response

<!-- tabs:start -->

##### **Status**

```text
- 200 OK
- 400 Bad Request
- 401 Unauthorized
- 429 To Many Requests
- 431 Request Header Fields Too Large
- 500 Internal server error
```

##### **JSON**

```json
{
  "tags": [
      "Monday",
      "Cash",
      "Node.js",
      "Doc",
      "Triumph"
  ]
}
```

##### **XML**

```xml
<?xml version='1.0'?>
<tags>
    <value>Monday</value>
    <value>Cash</value>
    <value>Triumph</value>
    <value>Doc</value>
    <value>Triumph</value>
</tags>
```

<!-- tabs:end -->

<!--------------------------------------
GET A NOTE
--------------------------------------->

---
