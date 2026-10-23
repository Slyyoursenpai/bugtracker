# Mini Bug Tracker

A small browser-based bug tracker built with **TypeScript**, plain HTML, and plain CSS — no frameworks, no bundler, no libraries. It is a learning project for practicing TypeScript properly while building something real.

## Features (goal)

- Create, view, edit, and delete bug reports
- Title, description, severity, and status
- Change a bug's status
- Search, filter, and sort reports
- Persist reports in `localStorage`
- Validate input and handle invalid stored data safely

## Tech stack

- TypeScript (compiled with the official `tsc`)
- Plain HTML + CSS
- Browser `localStorage` (planned)

## Requirements

- Node.js 18+ (developed on v24)
- npm

## Setup

```bash
npm install
```

## Commands

```bash
npx tsc            # compile src/*.ts -> dist/*.js
npx tsc --noEmit   # type-check only, emit nothing
npx tsc --watch    # recompile on every save
```

## Project structure

```
src/     TypeScript source files
dist/    compiled JavaScript (generated; not committed)
```

## Status

Work in progress. The data model and business logic are implemented; the user interface and persistence are next.

## What I'm learning

- Type inference vs. type annotations, and `strict` mode
- Interfaces and literal unions for constrained values
- Immutable array operations (`map`, `filter`, `find`, copy-before-`sort`)
- Upcoming: DOM and events, `localStorage`, runtime validation
