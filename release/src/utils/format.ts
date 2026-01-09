export function generateSHA(): string {
  return Array.from({ length: 7 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}

export function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}b`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}kb`
  return `${(bytes / 1024 / 1024).toFixed(1)}mb`
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

export function getFileName(path: string): string {
  const parts = path.split('/')
  return parts[parts.length - 1]
}

export function isTextFile(name: string): boolean {
  const textExtensions = ['.md', '.txt', '.json', '.js', '.ts', '.tsx', '.jsx', '.css', '.html', '.xml', '.yml', '.yaml', '.toml', '.ini', '.conf', '.sh', '.bat']
  return textExtensions.some((ext) => name.toLowerCase().endsWith(ext))
}

export function randomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
