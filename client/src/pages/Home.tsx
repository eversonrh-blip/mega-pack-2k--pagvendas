import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Crown,
  Download,
  Film,
  Flame,
  Gift,
  Layers3,
  LockKeyhole,
  MessageCircle,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  Wand2,
  Zap,
} from "lucide-react";

const heroImage = "/manus-storage/mega-pack-hero-mockup_87659195.png";

const carouselVideos = [
  { video: "/manus-storage/VideoGTA-1_7b5fc5a2.mp4", poster: "/manus-storage/gta-1_8931f4f6.jpg", label: "Vídeo 1" },
  { video: "/manus-storage/vIDEOgta2_6feae88a.mp4", poster: "/manus-storage/gta-2_0afe1f8d.jpg", label: "Vídeo 2" },
  { video: "/manus-storage/VideoGTA3_a0b58021.mp4", poster: "/manus-storage/gta-3_670ba238.jpg", label: "Vídeo 3" },
  { video: "/manus-storage/vIDEOgta4_ffab0b98.mp4", poster: "/manus-storage/gta-4_f7c3b4a7.jpg", label: "Vídeo 4" },
  { video: "/manus-storage/Videogta5_57653bfc.mp4", poster: "/manus-storage/gta-5_6f1cf13c.jpg", label: "Vídeo 5" },
];

function VideoCarousel() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const touchStart = useRef<number | null>(null);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (index !== active && video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [active]);

  const goTo = (index: number) => { setPlaying(false); setActive((index + carouselVideos.length) % carouselVideos.length); };
  const playActive = () => { const video = videoRefs.current[active]; if (video) { void video.play(); setPlaying(true); } };
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => { touchStart.current = event.touches[0]?.clientX ?? null; };
  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 45) goTo(active + (distance < 0 ? 1 : -1));
    touchStart.current = null;
  };

  return (
    <div className="video-carousel-wrap" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <div className="video-carousel" aria-label="Carrossel de vídeos do Mega Pack 2K">
        {carouselVideos.map((item, index) => {
          const offset = (index - active + carouselVideos.length) % carouselVideos.length;
          const isActive = index === active;
          return (
            <article key={item.video} className={`video-slide ${isActive ? "is-active" : ""} ${offset === 1 ? "is-next" : offset === carouselVideos.length - 1 ? "is-prev" : "is-hidden"}`}>
              <video ref={(element) => { videoRefs.current[index] = element; }} className="video-slide-media" controls={isActive} playsInline preload="metadata" poster={item.poster} aria-label={item.label} onPlay={() => isActive && setPlaying(true)} onPause={() => isActive && setPlaying(false)} onEnded={() => isActive && setPlaying(false)}>
                <source src={item.video} type="video/mp4" />
                Seu navegador não suporta vídeo HTML5.
              </video>
              {isActive && !playing && <button className="video-play-button" onClick={playActive} aria-label={`Reproduzir ${item.label}`}><Play className="ml-1 h-7 w-7 fill-current" /></button>}
              {!isActive && <button className="video-slide-hit" onClick={() => setActive(index)} aria-label={`Abrir ${item.label}`} />}
              {isActive && <span className="video-slide-label">{item.label}</span>}
            </article>
          );
        })}
        <button className="carousel-arrow carousel-arrow-left" onClick={() => goTo(active - 1)} aria-label="Vídeo anterior"><ArrowRight className="h-5 w-5 rotate-180" /></button>
        <button className="carousel-arrow carousel-arrow-right" onClick={() => goTo(active + 1)} aria-label="Próximo vídeo"><ArrowRight className="h-5 w-5" /></button>
      </div>
      <div className="carousel-dots" role="tablist" aria-label="Selecionar vídeo">
        {carouselVideos.map((item, index) => <button key={item.label} className={`carousel-dot ${active === index ? "is-active" : ""}`} onClick={() => setActive(index)} aria-label={`Ir para ${item.label}`} aria-selected={active === index} role="tab" />)}
      </div>
      <p className="carousel-caption">Conteúdos prontos para você criar mais, em menos tempo.</p>
      <button onClick={scrollToOffer} className="button-lime carousel-cta">QUERO TER ACESSO A TUDO <ArrowRight className="h-4 w-4" /></button>
    </div>
  );
}

const bonuses = [
  {
    number: "01",
    icon: Wand2,
    title: "Ferramenta do Criador",
    description: "Um atalho prático para planejar ideias, roteiros e prompts de IA sem começar do zero.",
    tag: "BÔNUS EXCLUSIVO",
  },
  {
    number: "02",
    icon: Film,
    title: "10 mil cortes virais",
    description: "Clipes e referências organizados para você editar, publicar e testar novos formatos.",
    tag: "PRONTO PARA POSTAR",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Pack Super Canva",
    description: "Mais de 1.000 artes editáveis para capas, posts, stories e thumbnails do seu canal.",
    tag: "1.000+ ARTES",
  },
  {
    number: "04",
    icon: BookOpen,
    title: "Biblioteca 5 mil+ cursos",
    description: "Aulas e trilhas para evoluir em TikTok Ads, Meta Ads, CapCut e muito mais.",
    tag: "ACESSO À BIBLIOTECA",
  },
];

const faqs = [
  {
    question: "O que é o Mega Pack 2K?",
    answer:
      "É um pacote digital para criadores que reúne 2.000 vídeos e uma coleção de recursos para acelerar a produção de conteúdo: cortes, templates, prompts e materiais de estudo.",
  },
  {
    question: "Como recebo o acesso?",
    answer:
      "Após a confirmação do pagamento, o acesso é liberado digitalmente conforme as instruções do checkout. Você poderá baixar e organizar os materiais no seu computador ou celular.",
  },
  {
    question: "Preciso saber editar para usar?",
    answer:
      "Não. O material foi pensado para quem está começando e para quem já cria. Você pode usar os cortes e templates como base e adaptar ao seu estilo usando CapCut, Canva ou outra ferramenta.",
  },
  {
    question: "Posso usar os materiais para monetizar?",
    answer:
      "Os materiais ajudam a acelerar sua produção, mas monetização depende de estratégia, consistência, regras de cada plataforma e do seu próprio trabalho. Sempre respeite direitos autorais e políticas de uso ao publicar.",
  },
];

function scrollToOffer() {
  document.getElementById("oferta")?.scrollIntoView({ behavior: "smooth" });
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <main className="overflow-hidden bg-[#08090c] text-white selection:bg-[#c6ff00] selection:text-[#08090c]">
      <div className="offer-ribbon marquee-ribbon" role="region" aria-label="Recursos do Mega Pack 2K">
        <div className="marquee-viewport">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-sequence" key={copy} aria-hidden={copy === 1}>
                <span>SEM MARCA D&apos;ÁGUA</span><i>•</i>
                <span>NARRAÇÃO PRONTA</span><i>•</i>
                <span>EDIÇÃO FEITA</span><i>•</i>
                <span>CORTES VIRAIS</span><i>•</i>
                <span>TRAILERS</span><i>•</i>
                <span>VAZAMENTOS</span><i>•</i>
                <span>100% PRONTO</span><i>•</i>
                <span>+2000 VÍDEOS PRONTOS</span><i>•</i>
              </div>
            ))}
          </div>
        </div>
      </div>

      <nav className="absolute left-0 right-0 top-9 z-20 border-b border-white/10 bg-[#08090c]/65 backdrop-blur-md">
        <div className="container flex h-20 items-center justify-between">
          <a href="#topo" className="group flex items-center gap-3" aria-label="Mega Pack 2K início">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c6ff00] text-[#08090c] shadow-[0_0_22px_rgba(198,255,0,0.22)] transition-transform duration-200 group-hover:rotate-3">
              <Zap className="h-5 w-5 fill-current" />
            </span>
            <span className="font-display text-xl font-black uppercase tracking-tight">Mega Pack <span className="text-[#c6ff00]">2K</span></span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold text-white/65 md:flex">
            <a href="#conteudo" className="transition-colors hover:text-[#c6ff00]">O que vem</a>
            <a href="#bonus" className="transition-colors hover:text-[#c6ff00]">Bônus</a>
            <a href="#duvidas" className="transition-colors hover:text-[#c6ff00]">Dúvidas</a>
          </div>
          <button onClick={scrollToOffer} className="button-lime hidden rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-[0.12em] sm:block">
            Quero acesso
          </button>
        </div>
      </nav>

      <section id="topo" className="hero-grid relative isolate min-h-[760px] pt-32 lg:min-h-[820px]">
        <div className="hero-glow absolute -left-48 top-40 -z-10 h-[500px] w-[500px] rounded-full bg-[#6f2cff]/22 blur-[120px]" />
        <div className="hero-glow absolute right-0 top-72 -z-10 h-[420px] w-[420px] rounded-full bg-[#c6ff00]/12 blur-[120px]" />
        <div className="container relative z-10 flex min-h-[650px] items-center pb-20 pt-10 lg:pb-24 lg:pt-0">
          <div className="max-w-2xl lg:-mt-2">
            <h1 className="font-display text-5xl font-black uppercase leading-[0.92] tracking-[-0.055em] text-white sm:text-7xl lg:text-[88px]">
              Seu próximo vídeo viral <span className="text-[#c6ff00]">começa aqui.</span>
            </h1>
            <img className="mobile-headline-art" src="/manus-storage/Designsemnome(1)_e7664eef.png" alt="Mega Pack 2K com bônus e vídeos virais" />
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              2.000 vídeos do universo GTA 6 + uma caixa de ferramentas completa para transformar ideias em conteúdo com mais velocidade, consistência e personalidade.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button onClick={scrollToOffer} className="button-lime group flex items-center justify-center gap-3 rounded-2xl px-7 py-4 text-sm font-black uppercase tracking-[0.12em]">
                Quero o Mega Pack 2K <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <a href="#conteudo" className="group flex items-center justify-center gap-2 px-4 py-4 text-sm font-bold text-white/70 transition-colors hover:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-[#c6ff00] group-hover:text-[#c6ff00]"><Play className="ml-0.5 h-3 w-3 fill-current" /></span>
                Ver o que está incluso
              </a>
            </div>
          </div>
        </div>
        <div className="hero-art absolute inset-0 -z-10 bg-cover bg-center lg:left-[28%]" style={{ backgroundImage: `linear-gradient(90deg, #08090c 0%, rgba(8,9,12,.94) 26%, rgba(8,9,12,.25) 65%, rgba(8,9,12,.45) 100%), linear-gradient(0deg, #08090c 0%, transparent 22%), url(${heroImage})` }} />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#08090c] to-transparent" />
      </section>

      <section className="relative border-y border-white/8 bg-[#0e1015] py-5">
        <div className="container grid gap-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white/40 sm:grid-cols-3 sm:text-left lg:grid-cols-6">
          <span className="flex items-center justify-center gap-2 sm:justify-start"><Check className="h-3.5 w-3.5 text-[#c6ff00]" /> 2.000 vídeos</span>
          <span className="flex items-center justify-center gap-2 sm:justify-start"><Check className="h-3.5 w-3.5 text-[#c6ff00]" /> 10 mil cortes</span>
          <span className="flex items-center justify-center gap-2 sm:justify-start"><Check className="h-3.5 w-3.5 text-[#c6ff00]" /> 1.000+ artes</span>
          <span className="flex items-center justify-center gap-2 sm:justify-start"><Check className="h-3.5 w-3.5 text-[#c6ff00]" /> 5 mil+ cursos</span>
          <span className="flex items-center justify-center gap-2 sm:justify-start"><Check className="h-3.5 w-3.5 text-[#c6ff00]" /> Prompts de IA</span>
          <span className="flex items-center justify-center gap-2 sm:justify-start"><Check className="h-3.5 w-3.5 text-[#c6ff00]" /> Acesso digital</span>
        </div>
      </section>

      <section id="conteudo" className="container py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="section-kicker">01 / O conteúdo</p>
            <h2 className="font-display mt-5 text-4xl font-black uppercase leading-[0.96] tracking-[-0.04em] sm:text-6xl">Tudo o que você precisa para <span className="text-[#c6ff00]">criar mais.</span></h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">Menos tempo procurando referência. Mais tempo publicando, testando e construindo um canal com a sua cara.</p>
          </div>
          <VideoCarousel />
        </div>
      </section>

      <section id="bonus" className="relative bg-[#101319] py-24 sm:py-32">
        <div className="bonus-grid absolute inset-0 opacity-30" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center"><p className="section-kicker">02 / Bônus liberados</p><h2 className="font-display mt-5 text-4xl font-black uppercase leading-[0.96] tracking-[-0.04em] sm:text-6xl">Não é só um pack.<br /><span className="text-[#c6ff00]">É seu atalho.</span></h2><p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55">Além dos vídeos, você recebe ferramentas para transformar inspiração em rotina de conteúdo.</p></div>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {bonuses.map((bonus) => {
              const Icon = bonus.icon;
              return <article key={bonus.number} className="bonus-card group"><div className="flex items-start justify-between"><span className="card-icon"><Icon className="h-5 w-5" /></span><span className="font-display text-4xl font-black text-white/10 transition-colors group-hover:text-[#c6ff00]/20">{bonus.number}</span></div><span className="mt-8 inline-block text-[10px] font-black tracking-[0.18em] text-[#c6ff00]">{bonus.tag}</span><h3 className="font-display mt-3 text-2xl font-black uppercase tracking-tight">{bonus.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/50">{bonus.description}</p><div className="mt-7 flex items-center gap-2 text-xs font-bold text-white/35 transition-colors group-hover:text-white/70"><BadgeCheck className="h-4 w-4 text-[#c6ff00]" /> Incluso na sua compra</div></article>;
            })}
          </div>
        </div>
      </section>

      <section className="container py-24 sm:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div><p className="section-kicker">03 / De criador para criador</p><h2 className="font-display mt-5 text-4xl font-black uppercase leading-[0.96] tracking-[-0.04em] sm:text-6xl">Pare de salvar ideias.<br /><span className="text-[#c6ff00]">Comece a publicar.</span></h2><p className="mt-6 max-w-xl text-base leading-relaxed text-white/55">O Mega Pack 2K foi pensado para você abrir, escolher um caminho e colocar a mão na massa. Sem depender da inspiração perfeita ou de horas procurando material.</p><div className="mt-9 grid max-w-xl gap-4 sm:grid-cols-3"><div><div className="font-display text-4xl font-black text-[#c6ff00]">2K</div><div className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/40">vídeos para explorar</div></div><div><div className="font-display text-4xl font-black text-[#c6ff00]">10K</div><div className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/40">cortes e referências</div></div><div><div className="font-display text-4xl font-black text-[#c6ff00]">∞</div><div className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/40">possibilidades de edição</div></div></div></div>
          <div className="relative rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#181c23] to-[#0e1015] p-7 shadow-2xl sm:p-9"><div className="absolute right-7 top-7 h-20 w-20 rounded-full bg-[#c6ff00]/10 blur-2xl" /><div className="relative"><div className="flex items-center justify-between border-b border-white/10 pb-5"><span className="font-display text-lg font-black uppercase">Seu painel de criação</span><span className="status-dot"><span /> online</span></div><div className="mt-7 space-y-4"><div className="fake-row"><span className="row-icon purple"><Film /></span><span><b>Vídeos GTA 6</b><small>2.000 arquivos disponíveis</small></span><ArrowRight className="ml-auto h-4 w-4 text-white/25" /></div><div className="fake-row"><span className="row-icon lime"><Wand2 /></span><span><b>Ferramenta do Criador</b><small>Prompts e ideias prontas</small></span><ArrowRight className="ml-auto h-4 w-4 text-white/25" /></div><div className="fake-row"><span className="row-icon blue"><BookOpen /></span><span><b>Biblioteca de cursos</b><small>Aprenda no seu ritmo</small></span><ArrowRight className="ml-auto h-4 w-4 text-white/25" /></div></div><div className="mt-7 rounded-2xl bg-[#c6ff00] p-4 text-[#08090c]"><div className="flex items-center gap-3"><Sparkles className="h-5 w-5" /><span className="text-sm font-black uppercase tracking-wide">Seu próximo post começa agora</span></div></div></div></div>
        </div>
      </section>

      <section id="oferta" className="relative bg-[#c6ff00] py-24 text-[#08090c] sm:py-32">
        <div className="offer-noise absolute inset-0 opacity-50" />
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center"><p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#08090c]/55">04 / Acesso imediato</p><h2 className="font-display mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-7xl">Seu kit completo<br />por menos de um lanche.</h2><p className="mx-auto mt-6 max-w-xl text-base font-medium leading-relaxed text-[#08090c]/65">Entre agora para o Mega Pack 2K e receba o conteúdo principal + todos os bônus em uma única oferta.</p></div>
          <div className="mx-auto mt-12 max-w-5xl rounded-[2rem] bg-[#08090c] p-5 text-white shadow-[0_25px_80px_rgba(8,9,12,.28)] sm:p-8"><div className="grid gap-8 lg:grid-cols-[1fr_0.82fr] lg:gap-12"><div><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c6ff00] text-[#08090c]"><Crown className="h-5 w-5" /></span><div><div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#c6ff00]">Oferta especial</div><div className="font-display text-xl font-black uppercase">Mega Pack 2K</div></div></div><div className="mt-8 grid gap-3 sm:grid-cols-2">{["2.000 vídeos do universo GTA 6", "Ferramenta do Criador + prompts IA", "10 mil cortes prontos para editar", "Pack Super Canva com 1.000+ artes", "Biblioteca com 5 mil+ cursos", "Acesso digital após confirmação"].map((item) => <div key={item} className="flex items-start gap-3 text-sm text-white/75"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c6ff00]" /> {item}</div>)}</div><div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 text-xs text-white/40"><LockKeyhole className="h-4 w-4 text-[#c6ff00]" /> Pagamento processado com segurança</div></div><div className="flex flex-col justify-center rounded-2xl border border-[#c6ff00]/20 bg-[#101319] p-6 text-center sm:p-8"><div className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">De <span className="line-through">R$ 97,00</span> por apenas</div><div className="mt-2 font-display text-7xl font-black tracking-[-0.07em] text-[#c6ff00]">R$ 29<sup className="text-3xl">,90</sup></div><div className="mt-1 text-xs text-white/45">pagamento único • acesso digital</div><button onClick={() => setShowCheckout(true)} className="button-lime mt-7 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-black uppercase tracking-[0.12em]">Quero acessar agora <ArrowRight className="h-4 w-4" /></button><p className="mt-4 text-[11px] leading-relaxed text-white/35">Oferta de lançamento por tempo limitado. Garanta seu acesso enquanto estiver disponível.</p></div></div></div>
        </div>
      </section>

      <section id="duvidas" className="container py-24 sm:py-32"><div className="mx-auto max-w-3xl"><div className="text-center"><p className="section-kicker">05 / Perguntas frequentes</p><h2 className="font-display mt-5 text-4xl font-black uppercase leading-[0.96] tracking-[-0.04em] sm:text-6xl">Ficou com alguma <span className="text-[#c6ff00]">dúvida?</span></h2></div><div className="mt-12 space-y-3">{faqs.map((faq, index) => <div key={faq.question} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left text-sm font-bold text-white sm:px-7"><span>{faq.question}</span><ChevronDown className={`h-5 w-5 shrink-0 text-[#c6ff00] transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`} /></button>{openFaq === index && <div className="px-5 pb-6 text-sm leading-relaxed text-white/55 sm:px-7">{faq.answer}</div>}</div>)}</div><div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-[#101319] p-6 text-center sm:flex-row sm:text-left"><div><div className="flex items-center justify-center gap-2 text-sm font-bold sm:justify-start"><MessageCircle className="h-4 w-4 text-[#c6ff00]" /> Ainda precisa de ajuda?</div><p className="mt-1 text-sm text-white/45">Fale com o suporte responsável pela sua compra.</p></div><a href="#oferta" className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-[#c6ff00] transition-colors hover:text-white">Ver oferta <ArrowRight className="h-4 w-4" /></a></div></div></section>

      <footer className="border-t border-white/8 py-8"><div className="container flex flex-col items-center justify-between gap-4 text-center text-xs text-white/35 sm:flex-row sm:text-left"><div className="flex items-center gap-2 font-display text-sm font-black uppercase text-white/70"><span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#c6ff00] text-[#08090c]"><Zap className="h-3.5 w-3.5 fill-current" /></span> Mega Pack 2K</div><p>Conteúdo digital para criadores. Resultados variam conforme estratégia e consistência.</p><p>© 2026 Mega Pack 2K</p></div></footer>

      {showCheckout && <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#08090c]/85 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#151920] p-7 text-center shadow-2xl"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c6ff00] text-[#08090c]"><LockKeyhole className="h-6 w-6" /></div><h3 id="checkout-title" className="font-display mt-5 text-2xl font-black uppercase">Checkout do Mega Pack 2K</h3><p className="mt-3 text-sm leading-relaxed text-white/55">A página está pronta para receber seu link de pagamento. Substitua este botão pelo checkout da sua plataforma (Kiwify, Hotmart, Eduzz ou outra).</p><div className="mt-6 rounded-2xl border border-[#c6ff00]/20 bg-[#c6ff00]/8 p-4 text-left text-xs leading-relaxed text-white/65"><span className="font-bold text-[#c6ff00]">Próximo passo:</span> conecte o botão “Quero acessar agora” ao seu link de checkout para começar a vender.</div><button onClick={() => setShowCheckout(false)} className="mt-6 w-full rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-[#c6ff00] hover:text-[#c6ff00]">Fechar</button></div></div>}
    </main>
  );
}
