function formatDate(timestamp) {
  if (!timestamp) return;
  const formatter = new Intl.DateTimeFormat("ru", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });

  return formatter.format(timestamp);
}

export {formatDate}