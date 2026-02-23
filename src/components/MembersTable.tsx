import React, { useEffect, useState } from 'react';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { Modal } from './Modal';
import { api } from '../lib/api';
import axios from '../api/axios';
import { Member, Project } from '../types/members';

export const MembersTable: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [availableProjects, setAvailableProjects] = useState<Project[]>([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    foto: '' as string | File,
    category: '',
    email: '',
    cell: '',
    pesquisa: '',
    lattes: '',
    linkedin: '',
    orcid: '',
    link: '',
    project_id: '' as string | number,
  });

  // 🔥 Carregar membros
  const fetchMembers = async () => {
    try {
      const response = await api.get('/members');
      setMembers(response.data);
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setAvailableProjects(response.data);
    } catch (error) {
      console.error('Erro ao buscar projetos:', error);
    }
  };
  

  useEffect(() => {
    fetchMembers();
    fetchProjects();
  }, []);
const buildFormData = () => {
  const data = new FormData();
  
  Object.keys(formData).forEach((key) => {
    // Pegamos o valor atual
    const value = formData[key as keyof typeof formData];

    // Só adicionamos se não for o array de projetos e se o valor existir
    if (key !== 'projects' && value !== null && value !== undefined) {
      // Forçamos o TypeScript a entender que é uma string/Blob
      data.append(key, value as string | Blob);
    }
  });

  return data;
};


  // ➕ Criar membro
const createMember = async () => {
  try {
    const data = buildFormData();
    const response = await api.post(`/members`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });
    setMembers([...members, response.data]);
    handleCloseModal();
  } catch (error) {
    console.error('Erro ao criar membro:', error);
  }
};


const updateMember = async () => {
  try {
    const data = buildFormData();
    const response = await api.post(`/members/${editingMember?.id}?_method=PUT`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setMembers(
      members.map((m) => (m.id === response.data.id ? response.data : m))
    );
    handleCloseModal();
  } catch (error) {
    console.error('Erro ao atualizar membro:', error);
  }
};


  // 🗑️ Deletar membro
  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este membro?')) {
      try {
        await api.delete(`/members/${id}`);
        setMembers(members.filter(member => member.id !== id));
      } catch (error) {
        console.error('Erro ao deletar membro:', error);
      }
    }
  };

  // 🔄 Abrir modal (criar ou editar)
  const handleOpenModal = (member?: Member) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        foto: member.foto,
        cell: member.cell,
        email: member.email,
        category: member.category,
        pesquisa: member.pesquisa,
        lattes: member.lattes,
        linkedin: member.linkedin,
        orcid: member.orcid,
        link: member.link,
        project_id: member.project ? member.project.id: '',
      });
    } else {
      setEditingMember(null);
      setFormData({
        foto: '',
        name: '',
        category: '',
        email: '',
        cell: '',
        pesquisa: '',
        lattes: '',
        linkedin: '',
        orcid: '',
        link: '',
        project_id: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateMember();
    } else {
      createMember();
    }
  };

  const [csvFile, setCsvFile] = useState<File | null>(null);

  const handleCsvInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleCsvUpload = async () => {
    if (!csvFile) {
      alert('Selecione um arquivo CSV primeiro.');
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      await api.post('/import-members', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('CSV importado com sucesso!');
      fetchMembers(); // Atualiza a tabela
      setCsvFile(null); // Limpa o estado
    } catch (err) {
      console.error('Erro ao importar CSV:', err);
      alert('Erro ao importar CSV');
    }
  };


const filteredMembers = members
  .filter(member =>
    (member.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.category || '').toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => (a.name || '').localeCompare(b.name || ''));

  const maskPhoneBR = (value: string): string => {
    return value
      .replace(/\D/g, '')               // só números
      .replace(/^(\d{2})(\d)/g, '($1) $2') // (11) 9
      .replace(/(\d{5})(\d)/, '$1-$2')   // 98765-4321
      .replace(/(-\d{4})\d+?$/, '$1');   // limita
  };
  return (
    <div className="space-y-6">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar membros..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
      </div>
    <div className="flex items-center space-x-4">
      <button
      onClick={() => handleOpenModal()}
      className='flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'>
        <Plus size={20} />
        <span>{editingMember ? 'Editar Membro' : 'Adicionar Membro'}</span>
      </button>
    </div>
    </div>

      {loading ? (
      <div className="text-center text-gray-400">Carregando membros...</div>
      ) : (
      <div className="bg-gray-900 rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-800">
          <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Imagem
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Nome
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            CPF/CNPJ
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Categoria
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Bio
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-100 uppercase tracking-wider">
            Ações
          </th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 divide-y divide-gray-800">
          {filteredMembers.map((member) => (
          <tr key={member.id} className="hover:bg-gray-800">
            <td className="px-6 py-4">
            <img src={member.foto} alt={member.name} className="w-10 h-10 rounded object-cover" />
            </td>
            <td className="px-6 py-4">
            <div className="text-sm font-medium text-gray-100">{member.name}</div>
            </td>
            <td className="px-6 py-4 text-sm text-gray-200">{member.category}</td>
            <td className="px-6 py-4 text-sm text-gray-200">{member.email}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div className="flex items-center justify-end space-x-2">
              <button
              onClick={() => handleOpenModal(member)}
              className="text-blue-400 hover:text-blue-200 transition-colors"
              >
              <Edit size={16} />
              </button>
              <button
              onClick={() => handleDelete(member.id)}
              className="text-red-400 hover:text-red-200 transition-colors"
              >
              <Trash2 size={16} />
              </button>
            </div>
            </td>
          </tr>
          ))}
        </tbody>
        </table>
      </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingMember ? 'Editar Membro' : 'Adicionar Membro'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* CAMPO DE UPLOAD DE IMAGEM */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Foto do Pesquisador
            </label>
            <input
              type="file"
              accept="image/*" // Aceita apenas imagens (png, jpg, etc)
              onChange={(e) => {
                // Se o usuário selecionou um arquivo, salvamos no state
                if (e.target.files && e.target.files.length > 0) {
                  setFormData({ ...formData, foto: e.target.files[0] });
                }
              }}
              // Estilizando o botão de escolher arquivo com Tailwind
              className="w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700 cursor-pointer"
            />
            {/* MINIATURA DA IMAGEM (Preview) */}
            {formData.foto && (
              <div className="mt-3">
                <p className="text-xs text-gray-400 mb-1">Pré-visualização:</p>
                <img
                  // Se for string, é a URL que veio do banco. Se for File, criamos uma URL temporária do arquivo novo!
                  src={typeof formData.foto === 'string' ? formData.foto : URL.createObjectURL(formData.foto)}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-full border-2 border-blue-500"
                />
              </div>
            )}
          </div>
          <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Nome</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
          </div>
{/* CAMPO DE CATEGORIA (Agora é um Dropdown) */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Categoria</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400 cursor-pointer"
            >
              {/* Opção padrão vazia que força o usuário a escolher uma */}
              <option value="" disabled>Selecione uma categoria</option>
              {/* As suas categorias fixas */}
              <option value="Mestrando(a)">Mestrando(a)</option>
              <option value="Doutorando(a)">Doutorando(a)</option>
              <option value="Pós-Doutorando(a)">Pós-Doutorando(a)</option>
              <option value="Iniciação Científica">Iniciação Científica</option>
              {/* Você pode adicionar mais opções aqui no futuro, se precisar */}
              <option value="Pesquisador(a) Colaborador(a)">Pesquisador(a) Colaborador(a)</option>
              <option value="Professor(a)">Professor(a)</option>
            </select>
          </div>
          {/* NOVO CAMPO: DROPDOWN DE PROJETOS */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Projeto Vinculado</label>
            <select
              value={formData.project_id}
              onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
            >
              <option value="">Selecione um projeto (Opcional)</option>
              {availableProjects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.title} {/* Assumindo que o nome do projeto no seu model seja 'title' */}
                </option>
              ))}
            </select>
          </div>
          <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
          </div>
          <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Celular</label>
            <input
              type="text"
              value={formData.cell}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cell: maskPhoneBR(e.target.value),
                })
              }
              placeholder="(99) 9 9999-9999"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100"
            />
          </div>
          <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Pesquisa</label>
        <input
          type="text"
          value={formData.pesquisa}
          onChange={(e) => setFormData({ ...formData, pesquisa: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
          </div>
          <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Lattes</label>
        <input
          type="text"
          value={formData.lattes}
          onChange={(e) => setFormData({ ...formData, lattes: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
          </div>
          <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">LinkedIn</label>
        <input
          type="text"
          value={formData.linkedin}
          onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
          </div>
          <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">ORCID</label>
        <input
          type="text"
          value={formData.orcid}
          onChange={(e) => setFormData({ ...formData, orcid: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
          </div>
          <div>
        <label className="block text-sm font-medium text-gray-200 mb-1">Link</label>
        <input
          type="text"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-gray-100 placeholder-gray-400"
        />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={handleCloseModal}
          className="px-4 py-2 text-gray-200 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {editingMember ? 'Atualizar' : 'Criar'}
        </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

