---
name: vercel-build-fixes
description: Fixes for common Vercel build failures including ENOENT errors with symlinked dotfiles, gitignore issues, and hydration errors. Use when Vercel build fails with "ENOENT: no such file or directory" errors.
---

# Vercel Build Fixes

This skill helps diagnose and fix common Vercel deployment failures.

## Common Issues and Solutions

### ENOENT: no such file or directory

**Error:** `ENOENT: no such file or directory, stat '/vercel/path0/.agents'`

**Cause:** Symlinks to dotfiles that don't exist on Vercel's build server.

**Solution:**

1. Check what dotfiles are tracked in git:
   ```bash
   git ls-files | grep -E "^\.[a-z]"
   ```

2. Remove symlinked dotfiles from git index:
   ```bash
   git rm --cached .claude .agents .kilocode .kiro .kode .pi .qoder .qwen
   ```

3. Delete the symlinks locally:
   ```bash
   unlink .claude .agents  # etc.
   ```

4. Commit and push:
   ```bash
   git add -A
   git commit -m "fix: remove dotfile symlinks from git"
   git push
   ```

### Hydration Errors

**Error:** "Hydration failed because the server rendered HTML didn't match the client"

**Common Causes:**
- `useState` or `useEffect` with `undefined`/different initial values
- Browser-only APIs accessed during SSR
- Date/time formatting differences

**Solutions:**

1. **useSyncExternalStore** for SSR-compatible hooks:
   ```typescript
   export function useIsMobile() {
     return React.useSyncExternalStore(
       () => {}, // empty subscribe
       () => typeof window !== "undefined" && window.innerWidth < 768,
       () => false // server snapshot
     )
   }
   ```

2. **Default context values** instead of null:
   ```typescript
   const defaultContext = { state: "expanded", open: true, ... }
   const Context = React.createContext(defaultContext)
   ```

3. **suppressHydrationWarning** for known mismatches:
   ```tsx
   <p suppressHydrationWarning>{date}</p>
   ```

### ESLint Peer Dependency Warnings

**Warning:** "npm warn ERESOLVE overriding peer dependency"

**Cause:** Conflicting eslint versions in dependencies.

**Solution:** These are warnings only - the build should still succeed. If it fails, check your package.json devDependencies.

## Gitignore Best Practices for Vercel

**Don't ignore:**
- `node_modules/` (use `node_modules` without trailing slash)
- `.next/` (use `.next` without slash)

**Avoid patterns that cause issues:**
- Directory patterns with trailing slash that may not exist on build server
- Very broad patterns like `.*` which Vercel tries to validate

**Example working .gitignore:**
```
node_modules
.next
.env*
*.log
*.tsbuildinfo
costrad-*.json
.mcp.json
*.sqlite
*.db
```