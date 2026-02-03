import { Download } from 'lucide-react';

interface ButtonExportReportProps {
  isExporting: boolean;
  progress: number;
  handleExport: () => void;
}

export function ButtonExportReport({
  isExporting,
  progress,
  handleExport,
}: ButtonExportReportProps) {
  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={isExporting}
      className="relative h-12 px-4 rounded-md border border-border bg-background overflow-hidden disabled:cursor-not-allowed transition-all"
    >
      {/* Líquido verde se enchendo gradualmente */}
      <div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 transition-all duration-100"
        style={{
          width: `${progress}%`,
          boxShadow: 'inset -10px 0 20px -10px rgba(16, 185, 129, 0.6)',
        }}
      >
        {/* Efeito de onda no topo do líquido */}
        <div
          className="absolute top-0 left-0 right-0 h-full"
          style={{
            background: `repeating-linear-gradient(
                    90deg,
                    rgba(255, 255, 255, 0.1) 0px,
                    transparent 2px,
                    transparent 8px,
                    rgba(255, 255, 255, 0.1) 10px
                  )`,
            animation: isExporting ? 'wave 1.5s linear infinite' : 'none',
          }}
        />

        {/* Brilho do líquido */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
          }}
        />
      </div>

      {/* Conteúdo do botão */}
      <span
        className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${
          progress > 50 ? 'text-white' : 'text-foreground'
        }`}
      >
        <Download className="w-4 h-4" />
        {isExporting ? 'Exportando...' : 'Exportar'}
      </span>

      {/* CSS para animação de onda */}
      <style>{`
              @keyframes wave {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(10px);
                }
              }
            `}</style>
    </button>
  );
}
