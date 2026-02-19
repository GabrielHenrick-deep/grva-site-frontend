import { div, nav } from 'framer-motion/m';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= 0 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/projects', label: 'Projetos' },
    { path: '/members', label: 'Equipe' },
    { path: '/contact', label: 'Contato' },
    { path: '/blog', label: 'Publicações' },
  ];

  return (
    <header
      className={`bg-black fixed w-full sm:text-2xl top-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
          <div className="flex md:hidden justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/storage/logo/LogoGRVA_secundaria_fundo_escuro.svg`}
                className="h-10 w-10 md:h-20 md:w-20 mx-auto"
                alt="Logo"
              />
            </Link>

          {/* Botão menu hambúrguer */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          </div>

        

        <div className="hidden md:flex justify-between items-center h-16">
          {/* Left Links */}
          <div className="flex space-x-8">
            <Link
              to="/projects"
              className={`${
                isActive('/projects')
                  ? 'text-white '
                  : 'text-white hover:text-gray-300'
              } px-1 py-2 text-base font-medium`}
            >
              Projetos
            </Link>
            <Link
              to="/members"
              className={`${
                isActive('/members')
                  ? 'text-white  '
                  : 'text-white hover:text-gray-300'
              } px-1 py-2 text-base font-medium`}
            >
              Equipe
            </Link>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/storage/logo/LogoGRVA_secundaria_fundo_escuro.svg`}
                className="h-10 w-10 md:h-20 md:w-20 mx-auto"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Right Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/contact"
              className={`${
                isActive('/contact')
                  ? 'text-white  '
                  : 'text-white hover:text-gray-300'
              } px-1 py-2 text-base font-medium`}
            >
              Contato
            </Link>
            <Link
              to="/blog"
              className={`${
                isActive('/blog')
                  ? 'text-white  '
                  : 'text-white hover:text-gray-300'
              } px-1 py-2 text-base font-medium`}
            >
              Publicações
            </Link>
            
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black px-4 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block ${
                isActive(link.path)
                  ? 'text-white'
                  : 'text-white hover:text-gray-300'
              } py-2 text-base font-medium`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}