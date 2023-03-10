# Turborepo starter with Expo and tRPC

This is a minimal boilerplate to get started with Expo and tRPC in Turborepo.

## What's inside?

This turborepo uses [Yarn](https://yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages
- `apps/mobile`: a [`react-native`](https://reactnative.dev/) app using [`expo`](https://expo.dev/)
- `services/backend`: an express backend service which sets up the [`trpc`](https://trpc.io/) server instance
- `config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

## Setup

The Expo app depends on a few things just like any other native app. Please make sure you have all the prerequisits for running an Expo app: https://docs.expo.dev/

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
yarn run build
```

### Develop
I recommend starting Expo and other backend services in separate terminal window.

Start the backend server by running the `dev` script in the root folder

```
yarn dev
```

In the other window, navigate to the `mobile` folder and start Expo there.
```
cd apps/mobile

# pick one
yarn start
yarn ios
yarn android
```

If you explicitly want Expo to be started in the same window as the rest of your servers, just add a `dev` script into `apps/mobile/package.json`.
You'll lose some convenient things like the scannable QR code doing it this way.
### Remote Caching

Turborepo can use a technique known as [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching (Beta) you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
cd my-turborepo
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turborepo.org/docs/features/pipelines)
- [Caching](https://turborepo.org/docs/features/caching)
- [Remote Caching (Beta)](https://turborepo.org/docs/features/remote-caching)
- [Scoped Tasks](https://turborepo.org/docs/features/scopes)
- [Configuration Options](https://turborepo.org/docs/reference/configuration)
- [CLI Usage](https://turborepo.org/docs/reference/command-line-reference)
