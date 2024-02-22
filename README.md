This is a Next.js 14 example that demonstrates using Reflow's Subscriptions plan parameters.

# Getting Started

To run the example, follow these steps

1. `npm install` the dependencies in this folder
2. Duplicate the `.env.local.example` file and rename it to `.env.local`.Enter your Reflow store ID, OpenAI API key and add a secret 32 char string. One way to generate a random string on unix-like systems is with this command:
   `tr -dc A-Za-z0-9 </dev/urandom | head -c 32`
3. Run `npx prisma migrate dev` to run the database migrations
4. Start the development server with `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the app running.
