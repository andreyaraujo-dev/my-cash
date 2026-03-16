/**
 * Dispara o download de um arquivo a partir de um Blob.
 * @param blob - O conteúdo do arquivo
 * @param filename - Nome do arquivo para download
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
