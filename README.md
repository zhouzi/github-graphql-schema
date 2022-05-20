# github-graphql-schema

> GitHub’s GraphQL Schema with validation. Automatically updated.

![Test](https://github.com/zhouzi/github-graphql-schema/workflows/Test/badge.svg)

> ⚠️ This is a fork of [octokit/graphql-schema](https://github.com/octokit/graphql-schema) with automatic update enabled and fixes integrated. [Compare the fork with the origin to browse the differences.](https://github.com/octokit/graphql-schema/compare/master...zhouzi:master)

## Usage

### Validation

```js
const { validate } = require("github-graphql-schema");
const errors = validate(`
{
  viewer {
    login
  }
}
`);

// errors is array. Contains errors if any
```

You can also load the current Schema directly as JSON or [IDL](https://en.wikipedia.org/wiki/Interface_description_language).

```js
const { schema } = require("github-graphql-schema");
schema.json; // JSON version
schema.idl; // IDL version
```

### Schema as Types

```ts
import { graphql } from "@octokit/graphql";
import { Repository } from "github-graphql-schema";

const { repository } = await graphql<{ repository: Repository }>(
  `
    {
      repository(owner: "octokit", name: "graphql.js") {
        issues(last: 3) {
          edges {
            node {
              title
            }
          }
        }
      }
    }
  `,
  {
    headers: {
      authorization: `token secret123`,
    },
  }
);
```

## Local setup

```
git clone https://github.com/zhouzi/github-graphql-schema.git
cd github-graphql-schema
npm install
npm test
```

Update schema files (`GITHUB_TOKEN` requires no scope)

```
GITHUB_TOKEN=... npm run update
```

## See also

- [octokit/openapi](https://github.com/octokit/openapi) – GitHub's OpenAPI specification with `x-octokit` extension
- [octokit/webhooks](https://github.com/octokit/webhooks) – GitHub Webhooks specifications
- [octokit/app-permissions](https://github.com/octokit/app-permissions) – GitHub App permission specifications

## LICENSE

[MIT](LICENSE.md)
