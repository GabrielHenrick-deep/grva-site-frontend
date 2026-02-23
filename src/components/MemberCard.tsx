import React from 'react';
// Importamos o Link para fazer o card ser clicável e levar para outra página
import { Link } from 'react-router-dom'; 
import type { Member } from '../types/members';

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    // O Link envolve todo o card. Assumindo que sua rota de detalhes seja /membros/1
    <Link 
      to={`/member/${member.id}`} 
      className="block bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer"
    >
      {/* Container da Foto */}
      <div className="h-48 w-full bg-gray-700">
        <img 
          // Usa a URL da foto que salvamos no banco de dados. 
          // Coloquei um fallback (||) caso o membro não tenha foto.
          src={member.foto || 'https://via.placeholder.com/300x300?text=Sem+Foto'} 
          alt={`Foto de ${member.name}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Informações do Membro */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-sm text-blue-400 mb-4">{member.category}</p>

        {/* Exibindo o Projeto (caso o membro tenha) */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
          </h4>
          <p className="text-sm text-gray-300 truncate">
            {member.project?.title || null}
          </p>
        </div>
      </div>
    </Link>
  );
}