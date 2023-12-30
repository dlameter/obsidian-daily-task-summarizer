# Requirements
All you should need to run the program is Deno installed locally on your machine. Other than that you'll need daily notes in your Obsidian vault

# How to run
Once you have Deno installed, at the root of this repository run the following command:

```
deno run --allow-read src/main.ts <path to obsidian daily notes> <optional number of days prior to look, default 7>
```

Ensure that you put whatever directory delimiter your operating system uses at the end of the path.

An example would be:
```
deno run --allow-read src/main.ts ../Obsidian/Vault/Daily/
```

Or to look at the last month (31 days):
```
deno run --allow-read src/main.ts ../Obsidian/Vault/Daily/ 31
```