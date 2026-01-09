import { FileItem } from '../types'
import { generateSHA } from '../utils/format'

export function getInitialFiles(): FileItem[] {
  return [
    {
      name: 'apps/web/release-notes.md',
      size: 24 * 1024,
      date: '2026-12-24T14:23:45Z',
      sha: generateSHA(),
      content: `Release Notes v0.1.3\n\nFeatures\n- Added new authentication flow\n- Improved user session management\n\nBug Fixes\n- Fixed timeout issues\n- Resolved memory leaks\n\nPerformance\n- Optimized database queries\n- Reduced bundle size by 15%`,
    },
    {
      name: 'packages/ui/src/button.tsx',
      size: 12 * 1024,
      date: '2026-12-23T09:15:32Z',
      sha: generateSHA(),
      content: `import React from 'react'\n\ninterface ButtonProps {\n  variant?: 'primary' | 'secondary'\n  size?: 'sm' | 'md' | 'lg'\n  children: React.ReactNode\n  onClick?: () => void\n}\n\nexport default Button`,
    },
    { name: 'dist/app-bundle.zip', size: 2048 * 1024, date: '2026-12-24T16:45:12Z', sha: generateSHA() },
    {
      name: 'apps/api/routes/auth.ts',
      size: 45 * 1024,
      date: '2026-12-23T11:30:28Z',
      sha: generateSHA(),
      content: `import Router from 'express'\nimport { authenticateUser, createSession } from '../services/auth'\n\nconst router = Router()\n\nexport default router`,
    },
    { name: 'README.md', size: 2 * 1024, date: '2026-12-20T18:22:55Z', sha: generateSHA(), content: 'My Project – modern web application built with React and Node.js.' },
    { name: 'turbo.json', size: 1 * 1024, date: '2026-12-18T08:45:33Z', sha: generateSHA(), content: `{\n  "$schema": "https://turbo.build/schema.json"\n}` },
  ]
}

export function createChecksumFile(files: FileItem[]): FileItem {
  const checksumContent = files.map((f) => `${f.sha}  ${f.name}`).join('\n')
  return {
    name: 'checksum.txt',
    size: checksumContent.length,
    date: new Date().toISOString(),
    sha: generateSHA(),
    content: checksumContent,
    isGenerated: true,
  }
}
