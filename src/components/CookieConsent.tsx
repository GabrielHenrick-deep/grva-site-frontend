import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('lgpd-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('lgpd-consent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-900/95 backdrop-blur-md border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300">
          Este site utiliza cookies e armazenamento local para fins de autenticação e funcionamento do site. 
          Ao continuar navegando, você concorda com nossa{' '}
          <a href="/privacidade" className="text-blue-400 underline hover:text-blue-300">
            Política de Privacidade
          </a>.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={accept}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Aceitar
          </button>
          <button
            onClick={accept}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
