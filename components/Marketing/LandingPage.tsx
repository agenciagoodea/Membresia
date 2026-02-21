
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Layers, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  Heart,
  Star,
  ChevronRight,
  ChevronDown,
  Monitor,
  LayoutDashboard,
  Smartphone,
  Sparkles,
  ShieldAlert,
  Target,
  Send,
  UserCheck,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureCard = ({ icon, title, description, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="p-8 bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] border border-white/5 hover:border-white/20 hover:bg-zinc-800 transition-all duration-500 group"
  >
    <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/5">
      {icon}
    </div>
    <h3 className="text-xl font-black text-white mb-4 tracking-tight uppercase">{title}</h3>
    <p className="text-zinc-500 leading-relaxed text-sm font-medium">{description}</p>
  </motion.div>
);

const LandingPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Basic',
      price: 'R$ 97',
      description: 'Ideal para igrejas que estão começando na visão celular.',
      features: ['Até 50 Membros', 'Até 5 Células', 'Escada do Sucesso Básica', 'Suporte via Ticket'],
      cta: 'Começar Agora',
      popular: false
    },
    {
      name: 'Pro',
      price: 'R$ 247',
      description: 'O equilíbrio perfeito para igrejas em franco crescimento.',
      features: ['Até 500 Membros', 'Células Ilimitadas', 'IA Insights Pastoral', 'Módulo Financeiro Completo', 'Suporte Prioritário'],
      cta: 'Escolher Pro',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Consultar',
      description: 'Para grandes denominações que precisam de controle total.',
      features: ['Membros Ilimitados', 'Múltiplos Campi', 'White Label (Sua Marca)', 'API de Integração', 'Gerente de Conta'],
      cta: 'Falar com Consultor',
      popular: false
    }
  ];

  const faqs = [
    { q: "O sistema serve para igrejas que não usam o modelo G12 ou MDA?", a: "Sim! Embora focado em Visão Celular, o EcclesiaSaaS é totalmente configurável para qualquer modelo de grupos pequenos e discipulado." },
    { q: "Os dados dos meus membros estão seguros?", a: "Totalmente. Utilizamos criptografia de nível bancário e estamos 100% em conformidade com a LGPD (Lei Geral de Proteção de Dados)." },
    { q: "Posso cancelar a qualquer momento?", a: "Sim, não trabalhamos com contratos de fidelidade. Você pode cancelar ou alterar seu plano quando desejar." }
  ];

  return (
    <div className="bg-zinc-950 text-zinc-400 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-zinc-950/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-500/20">E</div>
            <div>
              <h1 className="font-black text-white text-xl leading-tight tracking-tighter">Ecclesia</h1>
              <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Black Edition</span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-10">
            <a href="#features" className="text-xs font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">Recursos</a>
            <a href="#ladder" className="text-xs font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">A Escada</a>
            <a href="#pricing" className="text-xs font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">Preços</a>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/app" className="hidden sm:block text-xs font-black text-zinc-500 hover:text-white uppercase tracking-widest transition-colors">Login</Link>
            <Link to="/app" className="px-8 py-4 bg-white text-zinc-950 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-2xl shadow-white/5 active:scale-95">Testar Grátis</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-52 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-blue-600/10 rounded-full blur-[160px] -z-10"></div>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-blue-600/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-12 border border-blue-500/20"
          >
            <Sparkles size={14} className="animate-pulse" /> Neural Insights Engine Online
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-12 tracking-tighter uppercase"
          >
            Transforme sua <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Visão Celular</span> <br/>
            em Expansão Real.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-500 max-w-3xl mx-auto mb-16 font-medium leading-relaxed italic"
          >
            A plataforma SaaS definitiva para gestão eclesiástica. <br className="hidden md:block"/>
            Tome decisões baseadas em dados e foque no pastoreio, <br className="hidden md:block"/>
            nós cuidamos da inteligência operacional.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/app" className="w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/40 hover:bg-blue-500 hover:scale-105 transition-all flex items-center justify-center gap-4">
              Começar Agora <ArrowRight size={20} />
            </Link>
            <Link to="/app" className="w-full sm:w-auto px-12 py-6 bg-zinc-900 text-white border border-white/5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all flex items-center justify-center gap-4">
              <Play size={18} className="fill-white" /> Ver Demonstração
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-32 relative group"
          >
            <div className="absolute -inset-10 bg-blue-600/20 rounded-[4rem] blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
            <div className="relative rounded-[3rem] border border-white/10 bg-zinc-900 p-4 shadow-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" 
                className="rounded-[2.5rem] w-full object-cover h-[400px] md:h-[700px] opacity-80 grayscale group-hover:grayscale-0 transition-all duration-1000" 
                alt="Dashboard Preview" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 px-8 py-4 bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Sistema Operacional em Tempo Real</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32 border-y border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-20">Líderes que confiam na nossa infraestrutura</p>
          <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32 opacity-20 hover:opacity-100 transition-opacity duration-1000">
             <div className="flex items-center gap-4 font-black text-2xl text-white tracking-tighter"><Globe size={32} className="text-blue-500" /> VIDA NOVA</div>
             <div className="flex items-center gap-4 font-black text-2xl text-white tracking-tighter"><Heart size={32} className="text-rose-500" /> ÁGAPE</div>
             <div className="flex items-center gap-4 font-black text-2xl text-white tracking-tighter"><Users size={32} className="text-indigo-500" /> COMUNHÃO</div>
             <div className="flex items-center gap-4 font-black text-2xl text-white tracking-tighter"><Star size={32} className="text-amber-500" /> EL SHADDAI</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">Arquitetura Completa.</h2>
            <p className="text-zinc-500 font-medium text-lg max-w-2xl mx-auto italic">Módulos integrados para uma gestão 360º de alta performance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              delay={0.1}
              icon={<Layers size={32} />} 
              title="Gestão de Células" 
              description="Controle total sobre líderes, anfitriões e relatórios semanais com geolocalização e indicadores de saúde ministerial."
            />
            <FeatureCard 
              delay={0.2}
              icon={<TrendingUp size={32} />} 
              title="Escada do Sucesso" 
              description="Acompanhe visualmente a jornada de cada membro: Ganhar, Consolidar, Discipular e Enviar de forma automatizada."
            />
            <FeatureCard 
              delay={0.3}
              icon={<Sparkles size={32} />} 
              title="IA Insights" 
              description="Nossa inteligência artificial analisa os dados da sua igreja e sugere estratégias para acelerar o crescimento do Reino."
            />
            <FeatureCard 
              delay={0.4}
              icon={<MessageSquare size={32} />} 
              title="Clamor ao Vivo" 
              description="Módulo exclusivo para pedidos de oração em tempo real com moderação e exibição instantânea no telão do culto."
            />
            <FeatureCard 
              delay={0.5}
              icon={<ShieldCheck size={32} />} 
              title="Controle Financeiro" 
              description="Gestão de dízimos e ofertas com relatórios transparentes e integração com gateways de pagamento de última geração."
            />
            <FeatureCard 
              delay={0.6}
              icon={<Smartphone size={32} />} 
              title="Mobile First" 
              description="Interface otimizada para líderes lançarem relatórios diretamente do celular, sem burocracia e com máxima agilidade."
            />
          </div>
        </div>
      </section>

      {/* The Success Ladder Section */}
      <section id="ladder" className="py-40 bg-zinc-900/30 overflow-hidden relative border-y border-white/5">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[180px]"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-blue-600/10 text-blue-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 border border-blue-500/20">
              O Método de Multiplicação
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter uppercase leading-[0.9]">Domine a Escada do Sucesso.</h2>
            <div className="space-y-10">
              {[
                { s: 'GANHAR', d: 'Capture contatos de visitantes automaticamente via QR Code no culto.', icon: <Target className="text-blue-500" /> },
                { s: 'CONSOLIDAR', d: 'Lembretes automáticos para consolidadores não deixarem ninguém esfriar.', icon: <UserCheck className="text-emerald-500" /> },
                { s: 'DISCIPULAR', d: 'Grade curricular completa e acompanhamento de frequência nas aulas.', icon: <Zap className="text-amber-500" /> },
                { s: 'ENVIAR', d: 'Identifique novos líderes prontos para multiplicar suas células.', icon: <Send className="text-rose-500" /> }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center font-black text-xl shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-white text-xl mb-2 tracking-tight uppercase">{item.s}</h4>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed">{item.d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="bg-zinc-950/80 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
             >
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
                <div className="flex items-center justify-between mb-12 relative z-10">
                   <div>
                     <h3 className="font-black text-white text-2xl tracking-tighter uppercase">Monitor Neural</h3>
                     <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">Análise de Crescimento</p>
                   </div>
                   <div className="bg-emerald-500/10 text-emerald-500 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border border-emerald-500/20">+24% GROWTH</div>
                </div>
                <div className="space-y-10 relative z-10">
                   {[
                     { label: 'Discípulos Ativos', val: 85, color: 'bg-blue-600' },
                     { label: 'Células em Multiplicação', val: 62, color: 'bg-indigo-600' },
                     { label: 'Líderes Formados', val: 40, color: 'bg-emerald-600' },
                   ].map(stat => (
                     <div key={stat.label}>
                       <div className="flex justify-between text-[10px] font-black mb-3 text-zinc-500 uppercase tracking-widest">
                         <span>{stat.label}</span>
                         <span className="text-white">{stat.val}%</span>
                       </div>
                       <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/5">
                         <motion.div 
                           initial={{ width: 0 }}
                           whileInView={{ width: `${stat.val}%` }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className={`${stat.color} h-full rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)]`}
                         ></motion.div>
                       </div>
                     </div>
                   ))}
                </div>
                <div className="mt-16 p-6 bg-blue-600/10 border border-blue-500/20 rounded-3xl flex items-center gap-6 relative z-10">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-500/20">
                    <Sparkles size={24} />
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed font-bold italic">
                    "IA detectou: A Célula Renovo tem 3 membros prontos para o estágio DISCIPULAR. <br/>
                    <span className="text-blue-400">Recomendado: Iniciar treinamento módulo II.</span>"
                  </p>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">Investimento no Reino.</h2>
            <p className="text-zinc-500 font-medium text-lg italic max-w-2xl mx-auto">Planos escaláveis que acompanham o crescimento da sua igreja.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div 
                key={plan.name} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-12 rounded-[3rem] border ${plan.popular ? 'border-blue-600 bg-zinc-900 shadow-2xl shadow-blue-500/10' : 'border-white/5 bg-zinc-900/50'} flex flex-col group hover:border-white/20 transition-all duration-500`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">MAIS ESCOLHIDO</div>
                )}
                <h3 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">{plan.name}</h3>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-10 min-h-[40px]">{plan.description}</p>
                <div className="mb-12">
                  <span className="text-5xl font-black text-white tracking-tighter">{plan.price}</span>
                  {plan.price !== 'Consultar' && <span className="text-zinc-600 font-black text-xs uppercase tracking-widest ml-2">/mês</span>}
                </div>
                <ul className="space-y-6 mb-16 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-4 text-sm font-bold text-zinc-400">
                      <CheckCircle2 size={20} className="text-blue-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/app" className={`w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] text-center transition-all ${
                  plan.popular ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-2xl shadow-blue-500/20' : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-40 bg-zinc-950/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-20 text-center tracking-tighter uppercase">Dúvidas Frequentes.</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-zinc-900/50 rounded-[2rem] border border-white/5 overflow-hidden transition-all hover:border-white/10">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 text-left flex items-center justify-between group"
                >
                  <span className="font-black text-white uppercase text-sm tracking-widest group-hover:text-blue-500 transition-colors">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-transform duration-500 ${activeFaq === i ? 'rotate-180 bg-blue-600 text-white' : 'text-zinc-500'}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-zinc-500 text-sm leading-relaxed font-medium italic">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-40 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
           <div className="absolute -right-20 -bottom-20 opacity-10 rotate-12">
             <Sparkles size={400} />
           </div>
           <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter uppercase leading-[0.9]">Pronto para <br/>acelerar a visão?</h2>
              <p className="text-blue-100 text-xl mb-16 max-w-2xl mx-auto font-bold italic leading-relaxed">Junte-se a centenas de igrejas que simplificaram sua gestão e focaram no discipulado real.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link to="/app" className="w-full sm:w-auto px-16 py-8 bg-zinc-950 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl">
                  Criar Conta Grátis
                </Link>
                <div className="flex items-center gap-4 text-white/80 text-xs font-black uppercase tracking-widest">
                  <ShieldCheck size={24} className="text-emerald-400" /> Cartão não obrigatório
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-white/5 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl">E</div>
                <h1 className="font-black text-white text-lg tracking-tighter uppercase">Ecclesia</h1>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed font-medium italic">
                A tecnologia servindo ao Reino. Gestão eclesiástica inteligente para igrejas que não param de crescer.
              </p>
            </div>
            <div>
              <h4 className="font-black text-white mb-10 uppercase text-[10px] tracking-[0.3em]">Produto</h4>
              <ul className="space-y-6 text-xs font-black text-zinc-500 uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
                <li><a href="#" className="hover:text-white transition-colors">IA Pastoral</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white mb-10 uppercase text-[10px] tracking-[0.3em]">Suporte</h4>
              <ul className="space-y-6 text-xs font-black text-zinc-500 uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentação</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-white mb-10 uppercase text-[10px] tracking-[0.3em]">Legal</h4>
              <ul className="space-y-6 text-xs font-black text-zinc-500 uppercase tracking-widest">
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-16 border-t border-white/5">
            <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.4em]">© 2024 Ecclesia Black Edition. Powered by Neural Engine.</p>
            <div className="flex items-center gap-10 mt-10 md:mt-0 opacity-20 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
               <div className="font-black text-[10px] text-white tracking-[0.2em]">GOOGLE CLOUD</div>
               <div className="font-black text-[10px] text-white tracking-[0.2em]">STRIPE</div>
               <div className="font-black text-[10px] text-white tracking-[0.2em]">VERCEL</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
