export const shortenFileName = (fileName: string, maxLength = 10) => {
  if (fileName.length <= maxLength) return fileName

  const extension = fileName.split('.').pop()
  const nameWithoutExt = fileName.split('.').slice(0, -1).join('.')

  if (extension) {
    // Оставляем 3 символа с конца имени файла перед расширением
    const endChars = 3
    const availableLength = maxLength - extension.length - endChars - 4 // 4 для "..." и "."

    if (availableLength <= 0) return fileName // Если длина слишком мала, возвращаем оригинал

    const startPart = nameWithoutExt.slice(0, availableLength)
    const endPart = nameWithoutExt.slice(-endChars)
    return `${startPart}...${endPart}.${extension}`
  }

  return `${fileName.slice(0, maxLength)}...`
}
