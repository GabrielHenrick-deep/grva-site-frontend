import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-transparent py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="flex items-center text-gray-400 hover:text-gray-200 mb-8"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Voltar
        </Link>

        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50">
          <h1 className="text-3xl font-bold text-white mb-2">Política de Privacidade</h1>
          <p className="text-sm text-gray-400 mb-8">Última atualização: Junho de 2026</p>

          <div className="space-y-6 text-gray-300">
            <section>
              <p>
                O Grupo de Pesquisa em Realidade Virtual e Aumentada (GRVA) valoriza a privacidade 
                dos seus visitantes e membros. Esta Política de Privacidade descreve como coletamos, 
                usamos, armazenamos e protegemos seus dados pessoais em conformidade com a 
                Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">1. Dados que Coletamos</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Membros:</strong> nome, e-mail, telefone, foto, currículo Lattes, LinkedIn, ORCID, categoria acadêmica e área de pesquisa.</li>
                <li><strong>Formulário de Contato:</strong> nome, e-mail e mensagem enviada voluntariamente.</li>
                <li><strong>Administradores:</strong> nome e e-mail para autenticação no painel administrativo.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">2. Finalidade do Tratamento</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Divulgação acadêmica e científica dos membros do grupo;</li>
                <li>Gerenciamento do site e painel administrativo;</li>
                <li>Responder a mensagens enviadas pelo formulário de contato;</li>
                <li>Manutenção da segurança e integridade do sistema.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">3. Base Legal</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Legítimo interesse (Art. 7º, IX, LGPD) para divulgação acadêmica;</li>
                <li>Consentimento (Art. 7º, I, LGPD) para dados fornecidos voluntariamente;</li>
                <li>Execução de contrato (Art. 7º, V, LGPD) para membros do grupo.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">4. Compartilhamento de Dados</h2>
              <p>Não compartilhamos seus dados pessoais com terceiros, exceto quando exigido por lei ou com seu consentimento explícito.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">5. Armazenamento e Segurança</h2>
              <p>Seus dados são armazenados em servidores seguros com acesso restrito. Utilizamos criptografia TLS para transmissão de dados e tokens de autenticação para controle de acesso ao painel administrativo.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">6. Seus Direitos (LGPD)</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Confirmar a existência de tratamento de seus dados;</li>
                <li>Acessar seus dados pessoais;</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
                <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                <li>Solicitar a portabilidade dos dados;</li>
                <li>Eliminar dados tratados com seu consentimento;</li>
                <li>Revogar o consentimento a qualquer momento.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">7. Cookies e Armazenamento Local</h2>
              <p>Este site utiliza cookies essenciais para autenticação (token JWT) e armazenamento local para preferências de consentimento. Nenhum dado de navegação é coletado para fins de rastreamento ou publicidade.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">8. Contato</h2>
              <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>E-mail:</strong> grvaufu@gmail.com</li>
                <li><strong>Telefone:</strong> (34) 3239-4787</li>
                <li><strong>Endereço:</strong> Av. João Naves de Ávila, 212 - Uberlândia/MG</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-3">9. Alterações nesta Política</h2>
              <p>Esta política pode ser atualizada periodicamente. Recomendamos a revisão regular desta página para se manter informado sobre como protegemos seus dados.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
