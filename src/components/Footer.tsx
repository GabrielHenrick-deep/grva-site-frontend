import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950/60 backdrop-blur-md border-t border-white/10 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Flex container para alinhar os itens em telas maiores */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Direitos Autorais */}
          <p className="text-center md:text-left text-xs md:text-sm text-gray-400">
            © {currentYear} Grupo de Realidade Virtual e Aumentada (GRVA). Todos os direitos reservados.
          </p>

          {/* Crédito do Desenvolvedor */}
          <p className="text-center md:text-right text-xs md:text-sm text-gray-500">
            Desenvolvido por{' '}
            <a 
              href="https://github.com/GabrielHenrick-deep" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium"
            >
              Gabriel Henrick 
            </a>
          </p>

        </div>
      </div>
    </footer>
  );
}