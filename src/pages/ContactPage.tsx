import { Mail } from 'lucide-react';
import { useState } from 'react';
import { api } from '../lib/api';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/contact', { name, email, message });
      setStatus('Mensagem enviada com sucesso!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('Erro ao enviar. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-semibold text-white mb-12 text-center">
          Entre em Contato
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder-gray-500"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder-gray-500"
                />
              </div>

              <div>
                <textarea
                  placeholder="Mensagem"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none placeholder-gray-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Enviar
              </button>

              {status && (
                <p className="text-sm text-center text-green-400 mt-4">
                  {status}
                </p>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-10">
            <div className="flex items-center  md:flex md:items-start space-x-4">
              <Mail className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <a 
                  href="mailto:grvaufu@gmail.com" 
                  className="text-white hover:text-blue-600 transition-colors"
                >
                  grvaufu@gmail.com
                </a>
              </div>
            </div>
            {/* Logo */}
            <div className="flex justify-start mt-8">
              <img
              src={`${import.meta.env.VITE_BACKEND_URL}/storage/logo/LogoGRVA_secundaria_fundo_escuro.svg`}
              alt="Logo GRVA"
              className="w-40 h-20 object-contain"
              />
            </div>
              <p className="text-sm text-gray-400 mt-2">
              Grupo de Robótica e Visão Artificial
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
