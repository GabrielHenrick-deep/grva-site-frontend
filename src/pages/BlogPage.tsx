import { Search, FileText, ExternalLink, Loader2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';
import { Project, Member } from '../types/project'; // Certifique-se de importar Member

interface ArtigoGeral {
  title: string;
  url: string;
  projectName: string;
  projectId: number;
  members: Member[]; // Alterado para receber o array completo de membros
}

export function BlogPage() {
  const [articles, setArticles] = useState<ArtigoGeral[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchAllArticles() {
      try {
        setLoading(true);
        const response = await api.get<Project[]>('/projects');
        
        const allArticles: ArtigoGeral[] = response.data.flatMap(project => 
          (project.artigo || []).map(art => ({
            ...art,
            projectName: project.title,
            projectId: project.id,
            members: project.member || [] // Mapeia os membros do projeto para o artigo
          }))
        );

        setArticles(allArticles);
      } catch (err) {
        console.error('Erro ao carregar artigos:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllArticles();
  }, []);

  const filteredArticles = articles.filter(art =>
    art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.members.some(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-transparent from-black via-gray-900 to-gray-800 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
            Publicações Científicas
          </h1>
        </div>

        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por título, projeto ou autor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin mb-4 text-blue-500" />
            <p className="text-lg">Carregando publicações...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredArticles.map((art, idx) => (
              <div
                key={`${art.projectId}-${idx}`}
                onClick={() => window.open(art.url, '_blank')}
                className="group cursor-pointer bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-5 hover:bg-gray-800/60 hover:border-blue-500/50 transition-all hover:-translate-y-1 flex items-center justify-between"
              >
                <div className="flex items-start gap-5 overflow-hidden">
                  <div className="bg-blue-600/10 p-3 rounded-xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner mt-1">
                    <FileText className="w-6 h-6" />
                  </div>
                  
                  <div className="overflow-hidden">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    
                    {/* Exibição dos Autores */}
                    <div className="flex items-center gap-2 mt-2 text-gray-400">
                      <User size={14} className="text-blue-500" />
                      <span className="text-sm">
                        {art.members.length > 0 
                          ? art.members.map(m => m.name).join(', ') 
                          : 'Autor não informado'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        {art.projectName}
                      </span>
                      <p className="text-gray-600 text-xs truncate italic max-w-[200px] hidden sm:block">
                        {art.url}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 group-hover:text-white ml-4">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}