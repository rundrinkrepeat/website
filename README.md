# [MRC Berlin Website](https://rundrinkrepeat.berlin)

## Developing

```bash
npm ci
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

The project is integrated with Github CI to create tags from branches, requiring that
branches start with one of `major/`, `minor/`, `patch/` or `dependabot/`.

Vercel deploys any merge to `main` branch to the website. PRs are deployed to preview
domains, see the comments left on PRs by the Vercel bot.
