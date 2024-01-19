# Mini-Twitter-Backend

## Getting Started

clone the repository by using

```bash
git clone https://github.com/devadeboye/mini-twitter-backend.git
```

After cloning the repository, install all dependencies using

```bash
yarn install
```

Then you can start the server using

```bash
yarn start
```

Start it in development mode using

```bash
yarn start:dev
```

and in debug mode using

```bash
yarn start:debug
```

The application connects to a postgresql databasse.

## Graphql playground

See the graphql playground UI by visiting
`http://localhost:YOUR_PORT/graphql`

## Development

### Authentication

To make a route require authentication, use the `@useToken` decorator.

To get the data in a logged in user token, use the `@UserTokenData` decorator. e.g

```typescript
@Query()
@UseToken()
async getUser(
  @Args('id') id: string,
  @UserTokenData() tokenData: TokenData
) {
  // then you can do whatever you want with token data
  Logger.log(tokenData.sub);
  return this.userService.findOneBy({ id });
}
```

## Migrations

### Create migrations

To create migrations, run the code below on your terminal

```bash
yarn run migration:create THE_MIGRATION_FILENAME
```

Where THE_MIGRATION_FILENAME is the name to give to the migration file. e.g

```bash
yarn run migration:create this-is-a-test
```

### Run migrations

To run migrations run the code below on your teminal:

```bash
yarn run migration:run
```

### Rollbacks

```bash
yarn run migration:revert
```
