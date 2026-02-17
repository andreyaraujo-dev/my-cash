export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) {
    return 'agora mesmo';
  }

  if (diffMinutes < 60) {
    return `há ${diffMinutes}min`;
  }

  if (diffHours < 24) {
    return `há ${diffHours}h`;
  }

  if (diffDays < 30) {
    return `há ${diffDays}d`;
  }

  return Intl.DateTimeFormat('pt-BR').format(date);
}
