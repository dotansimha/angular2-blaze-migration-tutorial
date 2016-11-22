So let's start with the actual code migration.

What do we have so far?

- Blaze application
- Angular 2 HTML compilers + TypeScript support
- Ability to load Blaze Template inside Angular 2 Component

So let's start!

TypeScript is the recommended language for writing Angular 2 application.

The TypeScript compiler works for `.ts` files - so let's start by changing the main file (`client/main.js`) into TypeScript file.

**`client/main.js` -> `client/main.ts`**


> Don't worry! TypeScript is just an extension for ES2016 - so all of your current code should work just fine!
