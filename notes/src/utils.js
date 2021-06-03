function formatDate(timestamp) {
  /**
   * @param {number} timestamp - timestamp
   * @return {string} - возвращает локализованную дату с временем
   */
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

async function imageUrlToBase64(url) {
  /**
   * @param {string} url - url изображения
   * @return {Promise<string>} - изображение в формате base64
   */
  const response = await fetch(url);
  const blob = await response.blob();

  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise(((resolve, reject) => {
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject('Ошибка при загрузке изображения'));
  }));
}

export {formatDate, imageUrlToBase64}