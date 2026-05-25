import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, PlusCircle, Search, BookOpen } from 'lucide-react'
import { FAQ_CATEGORIES } from '../data/faqData'

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(p => !p)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-800 pr-4">{item.question}</span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 bg-blue-50/30 border-t border-gray-100">
          <div className="text-sm text-gray-700 whitespace-pre-wrap mt-3 leading-relaxed">{item.answer}</div>
          <Link
            to="/novo"
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:underline mt-3 font-medium"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Ainda precisa de ajuda? Abrir chamado
          </Link>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  const filtered = FAQ_CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      !search || item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => (!activeCategory || cat.id === activeCategory) && cat.items.length > 0)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Hero */}
      <div className="card p-6 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-90" />
        <h2 className="text-xl font-bold mb-1">Base de Conhecimento</h2>
        <p className="text-blue-100 text-sm mb-4">Encontre respostas para os problemas mais comuns</p>
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por palavras-chave..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Category filter */}
      {!search && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !activeCategory ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
            }`}
          >
            Todos
          </button>
          {FAQ_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id === activeCategory ? null : cat.id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                activeCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
              }`}
            >
              <span>{cat.icon}</span>
              {cat.title}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="card p-8 text-center text-gray-400">
          <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p className="mb-3">Nenhum resultado encontrado</p>
          <Link to="/novo" className="btn-primary inline-flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4" />
            Abrir chamado de suporte
          </Link>
        </div>
      ) : (
        filtered.map(cat => (
          <div key={cat.id} className="card overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
              <span className="text-xl">{cat.icon}</span>
              <h3 className="font-semibold text-gray-800">{cat.title}</h3>
            </div>
            <div className="p-4 space-y-2">
              {cat.items.map((item, i) => <FAQItem key={i} item={item} />)}
            </div>
          </div>
        ))
      )}

      {/* CTA */}
      <div className="card p-5 text-center bg-gradient-to-r from-gray-50 to-blue-50 border-blue-100">
        <p className="text-gray-700 font-medium mb-1">Não encontrou o que precisava?</p>
        <p className="text-sm text-gray-500 mb-3">Abra um chamado e o T.I. te ajudará em breve</p>
        <Link to="/novo" className="btn-primary inline-flex items-center gap-1.5">
          <PlusCircle className="w-4 h-4" />
          Abrir Chamado
        </Link>
      </div>
    </div>
  )
}
