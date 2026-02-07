/**
 * Retorna o número de dias entre hoje e a data alvo.
 * Valor <= 0 indica que a data já passou ou é hoje.
 */
export function getDaysRemaining(targetDate: string | Date): number {
  const target = typeof targetDate === 'string' ? new Date(targetDate) : targetDate;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diffMs = target.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
