import React, { useState, useEffect, useRef } from 'react';

import './BirthdaySurprise.css';

import FallingHearts from './FallingHearts'; // Componente de pétalos naranjas



// 🎵 RUTAS DE LOS AUDIOS

import soSooPrettyAudio from '../audio/LANY-So-Soo-Pretty-_Official-Audio_.mp3';

import promisePianoAudio from '../audio/Ben Howard - Promise (Relaxing Piano Cover).mp3';



// --- SUB-COMPONENTE: EL RAMO REFINADO (SIN CAMBIOS) ---

const TulipanesColor = ({ onLeerCarta }) => (

  <svg

    viewBox="0 0 600 650"

    className="bouquet-color-svg"

    style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto' }}

  >

    <defs>

      <filter id="softDrop" x="-20%" y="-20%" width="140%" height="140%">

        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.1)"/>

      </filter>



      <style>

        {`

          .svg-text-title { font-family: 'Georgia', serif; font-size: 38px; fill: #A56A5B; letter-spacing: 2px; }

          .svg-btn-text { font-family: 'Georgia', serif; font-size: 16px; fill: #A56A5B; cursor: pointer; }

          .btn-svg-group { cursor: pointer; transition: opacity 0.3s; }

          .btn-svg-group:hover { opacity: 0.6; }

          @keyframes fadeInSVG { from { opacity: 0; } to { opacity: 1; } }

          .animate-fade { animation: fadeInSVG 2s ease-in forwards; }

        `}

      </style>

    </defs>



    <g className="animate-fade">

      {/* 1. ESQUINA IZQUIERDA: SOBRE Y TEXTO */}

      <g className="btn-svg-group" transform="translate(40, 40)" onClick={onLeerCarta}>

        <rect x="-10" y="-10" width="120" height="40" fill="transparent" />

        <path d="M0,0 L30,0 L30,20 L0,20 Z" fill="none" stroke="#A56A5B" strokeWidth="2" strokeLinejoin="round" />

        <path d="M0,0 L15,12 L30,0" fill="none" stroke="#A56A5B" strokeWidth="2" strokeLinejoin="round" />

        <text x="40" y="15" className="svg-btn-text">Leer Carta</text>

      </g>



      {/* TÍTULO */}

      <text x="320" y="80" textAnchor="middle" className="svg-text-title">Feliz Cumpleaños</text>



      {/* --- ESTRUCTURA DEL RAMO --- */}

      <g filter="url(#softDrop)">

        <g stroke="#7A9468" strokeWidth="6" fill="none" strokeLinecap="round">

          <path d="M300,530 Q280,400 240,250" />

          <path d="M300,530 Q300,400 300,210" />

          <path d="M300,530 Q320,400 360,250" />

          <path d="M300,530 Q260,400 200,320" />

          <path d="M300,530 Q340,400 400,320" />

          <path d="M300,530 Q250,450 180,380" strokeWidth="3" opacity="0.6" />

          <path d="M300,530 Q350,450 420,380" strokeWidth="3" opacity="0.6" />

          <path d="M300,530 Q310,420 330,320" strokeWidth="4" opacity="0.8" />

        </g>

        <g fill="#9CB08A" stroke="#7A9468" strokeWidth="1">

          <path d="M300,480 C260,440 160,380 170,280 C190,320 280,430 300,480 Z" />

          <path d="M300,480 C340,440 440,380 430,280 C410,320 320,430 300,480 Z" />

          <path d="M295,460 C240,380 200,320 215,250 C235,290 270,390 295,460 Z" />

          <path d="M305,460 C360,380 400,320 385,250 C365,290 330,390 305,460 Z" />

          <path d="M300,500 C280,470 260,450 240,430 C260,450 290,480 300,500 Z" opacity="0.7" />

          <path d="M300,500 C320,470 340,450 360,430 C340,450 310,480 300,500 Z" opacity="0.7" />

        </g>

        <g className="extra-flowers">

          <g fill="#E6E6FA" stroke="#B19CD9" strokeWidth="0.5">

            <circle cx="180" cy="380" r="5" /><circle cx="175" cy="370" r="4" /><circle cx="185" cy="360" r="4" />

            <circle cx="420" cy="380" r="5" /><circle cx="425" cy="370" r="4" /><circle cx="415" cy="360" r="4" />

          </g>

          <g fill="#FFF9C4" opacity="0.9">

            <circle cx="260" cy="200" r="3" /><circle cx="270" cy="190" r="2" />

            <circle cx="340" cy="200" r="3" /><circle cx="330" cy="190" r="2" />

            <circle cx="300" cy="350" r="3" /><circle cx="310" cy="345" r="3" />

            <circle cx="220" cy="280" r="3" /><circle cx="380" cy="280" r="3" />

            <circle cx="280" cy="250" r="2.5" />

            <circle cx="320" cy="280" r="2.5" />

          </g>

        </g>

        <g fill="#D27A6B" stroke="#A56A5B" strokeWidth="1">

          <path d="M300,490 C270,470 230,480 300,510 C370,480 330,470 300,490 Z" />

          <path d="M300,500 Q280,550 260,570 M300,500 Q320,550 340,570" fill="none" strokeWidth="3" />

        </g>

        <g stroke="rgba(255,255,255,0.3)" strokeWidth="1">

          <path d="M300,210 C270,160 280,120 300,130 C290,160 290,200 300,210 Z" fill="#FFA07A" />

          <path d="M300,210 C330,160 320,120 300,130 C310,160 310,200 300,210 Z" fill="#FFA07A" />

          <path d="M300,210 C280,150 290,140 300,130 C310,140 320,150 300,210 Z" fill="#FFDAB9" />

          <path d="M240,250 C200,210 210,170 230,180 C225,210 230,240 240,250 Z" fill="#F08080" />

          <path d="M240,250 C260,200 250,160 230,180 C245,210 245,240 240,250 Z" fill="#F08080" />

          <path d="M240,250 C215,205 225,185 230,180 C240,195 245,215 240,250 Z" fill="#FFE4E1" />

          <path d="M360,250 C340,200 350,160 370,180 C355,210 355,240 360,250 Z" fill="#FFA07A" />

          <path d="M360,250 C400,210 390,170 370,180 C375,210 370,240 360,250 Z" fill="#FFA07A" />

          <path d="M360,250 C385,205 375,185 370,180 C360,195 355,215 360,250 Z" fill="#FFDAB9" />

          <path d="M200,320 C150,290 160,250 180,260 C180,290 190,310 200,320 Z" fill="#F4D03F" />

          <path d="M200,320 C210,270 200,240 180,260 C195,285 200,310 200,320 Z" fill="#F4D03F" />

          <path d="M200,320 C165,285 175,265 180,260 C190,275 200,295 200,320 Z" fill="#FFF9C4" />

          <path d="M400,320 C390,270 400,240 420,260 C405,285 400,310 400,320 Z" fill="#F08080" />

          <path d="M400,320 C450,290 440,250 420,260 C420,290 410,310 400,320 Z" fill="#F08080" />

          <path d="M400,320 C435,285 425,265 420,260 C410,275 400,295 400,320 Z" fill="#FFE4E1" />

          <g transform="translate(-15, 10)">

            <path d="M330,320 C310,280 320,250 340,260 C325,290 325,310 330,320 Z" fill="#FFB38A" />

            <path d="M330,320 C360,280 350,250 340,260 C345,290 340,310 330,320 Z" fill="#FFB38A" />

            <path d="M330,320 C345,285 335,265 340,260 C330,275 325,295 330,320 Z" fill="#FFE0CC" />

          </g>

        </g>

      </g>



      <text x="300" y="620" textAnchor="middle" style={{fontFamily:'serif', fontStyle:'italic', fill:'#A56A5B', fontSize:'18px'}}>

        Un ramo eterno, para mi mundo entero.

      </text>

    </g>

  </svg>

);



const BirthdaySurprise = ({ onFinish }) => {

  const [fase, setFase] = useState('mensaje');

  const [mostrarBoton, setMostrarBoton] = useState(false);

  const [sobreAbierto, setSobreAbierto] = useState(false);
  const [indiceParrafo, setIndiceParrafo] = useState(0); // <-- Nuevo: Manejo de párrafos

  const canvasRef = useRef(null);

  const audioRef = useRef(null);

  // 1. CONFIGURA AQUÍ TU CARTA POR PÁRRAFOS
  const parrafosCarta = [
    "Hoy estás cumpliendo años y eso hace diferente este día del resto. El que hoy te podamos celebrar un día más de vida es todo gracias a ti, a tu fuerza, por no rendirte a pesar de todos los obstáculos que te ha puesto la vida. Hoy reflejas todo eso; el hecho de que todos los días decidas continuar, eso ya es mucho, porque no es fácil tener esa mentalidad y, claro, hay días que son más complicados de sobrellevar, pero de alguna u otra manera siempre van a pasar esos días; ese sentimiento es temporal, al igual que todo. No siempre vas a estar bien, al igual que no siempre vas a estar mal; la vida consiste en eso, es como una montaña rusa para mí.",
    "El hecho de saber que las cosas pasan y que al final todo siempre se resolverá ayuda mucho a mantener la calma y la tranquilidad, porque, como te dije, la vida es muy corta como para estar preocupándose y estresándose por las cosas; simplemente hay que fingir demencia con las otras personas y no dejar que eso afecte a uno. Hay que enfocarse en uno mismo y, por decirlo de una manera, que los demás no importen, porque las personas son pasajeras y lo que siempre te va a durar vas a ser tú misma; bueno, esa es mi manera de pensar las cosas.",
    "Ya en poco tiempo vas a finalizar una etapa en tu vida, al igual que vas a comenzar otra. Yo de todo corazón te deseo lo mejor, de verdad; sé que va a ser difícil, pero creo y confío en ti y sé que lo vas a lograr, al igual que vas a lograr todo lo que te propongas. Por más complicado que sea, sé que todo va a salir bien, y si no lo hace, sé que vas a encontrar una manera de que eso pase.",
    "Quiero que sepas que en mí siempre tendrás un espacio abierto para lo que necesites, que yo estoy más que dispuesta a apoyarte en todo, hasta en lo que tú puedas dudar, que siempre voy a estar orgullosa de ti y que puedes confiar en mí. Con eso te digo que si necesitas un soporte, siempre me tendrás a mí; no lo olvides, sí?",
    "También quiero que sepas que, aunque no llevemos tanto tiempo conociéndonos, ese tiempo me ha servido para ver un poco la persona que eres. Todo eso que me has permitido ver solo demuestra un poco que eres como una niña pequeña con un corazón de oro muy puro, que eres una obra de arte, que no se puede encontrar a alguien que sea como tú porque eres una en un millón y eso es lo más honesto que uno puede llegar a ver, según yo.",
    "En tan poco tiempo también pude desarrollar sentimientos por ti, ese tipo de sentimientos que no puedes controlar y que siguen creciendo al paso del tiempo, que te dan motivación al igual que adrenalina, que te dan ganas de dar todo por el todo sin importar lo que pase, de esos sentimientos que los adultos llamarían como un \"romance adolescente\" por las emociones tan puras que se llegan a sentir. De verdad me alegro de que esto lo esté sintiendo contigo y no con nadie más.",
    "Contigo todo se siente mejor, un poco más cálido, más tranquilo, más seguro. Por eso, sé que la decisión que tomé al decidir dejarme sentir va a ser algo de lo que no me voy a arrepentir, porque aunque haya muchas posibilidades para nuestro futuro, uno no se puede arrepentir de lo que una vez te hizo feliz, y ya solo con eso sé que no lo voy a hacer.",
    "Siento que este año y también parte del pasado han sido los más importantes porque siento que empecé a vivir sin preocuparme tanto, al igual que a sentirme más libre al quitarme el estilo de \"caparazón\" que tenía. En parte te agradezco eso porque siento que fuiste ese \"pequeño empujón\" que me faltaba, porque al yo despertar sentimientos por ti, eso me hizo querer hacer cosas que antes no podía imaginar que podía hacer; eso me hizo querer salir de mi zona de confort para poder formar otra contigo y eso me hizo darme la oportunidad de intentar.",
    "Entre las cosas nuevas que quise intentar está esta página; me acuerdo del momento donde pensé esta idea y lo veía muy lejano porque no me sentía capaz de hacerlo, aparte de que la idea estaba, digamos, para nada realista o, bueno, así lo veía yo. Hasta que un día se lo comenté a Angel y me hizo darme cuenta de que la idea no era tan exótica como yo lo pensaba, entonces decidí arriesgarme e intentarlo. Recuerdo que probé mi verdadera paciencia, que estuve a nada de dejar el proyecto cuando se borró todo, pero en esos momentos lo único que podía pensar era en ti, en tu reacción, y eso me daba la motivación suficiente para poder continuar.",
    "Me acuerdo también del 14 que mandó un estilo de error y yo casi que me mataba ahí mismo, pero no tenía tiempo para eso. Ya después usted llegó y yo estaba que me daba algo por los nervios. Después Dariellys me dijo que lo tenía que hacer en ese momento, apenas llegaste, y te aseguro que mi humilde discurso desapareció de mi mente. Ya después me dije: \"Es ahora o nunca\", y bueno, fui con Dios. Creo que de todo lo que tenía preparado solo dije como la mitad y ya lo demás improvisé, y yo que me había dicho que los nervios se me iban a pasar a medida que iba hablando, pero no, todo lo contrario, cada vez que hablaba me ponía más nerviosa, pero bueno, esos fueron efectos secundarios.",
    "Ese día ya yo tenía esperanza, pero era muy lejana, hasta que dijiste lo que dijiste y acercaste esa esperanza; eso de verdad me hizo muy pero muy feliz, mi yo interior estaba saltando, sin mentirte.",
    "Ese día me faltó decirte algo que, aunque traté, no pude: Samantha, me gustas mucho, más de lo que te puedas imaginar y más de lo que yo puedo controlar; eso me llegó a asustar en su momento, hasta que me dije: \"Que sea lo que Dios quiera\". Yo de verdad quiero intentar algo contigo más adelante y que todo se haga a su debido tiempo.",
    "Quiero que sepas que lo que siento por ti va más allá del colegio; el hecho de que te gradúes no significa que voy a dejar de querer estar contigo, porque no quiero y me niego a hacerlo. Si lo hago, sería hacerme daño y no tanto es eso, sino que también te haría daño a ti, y eso no soy capaz de hacerlo.",
    "Yo soy del estilo de personas que les gusta cuidar a las otras (por eso siempre ando detrás de las personas cuando caminamos, por ejemplo) y te aseguro que nunca te haría daño porque, como te dije, no soy capaz; eso no está en mis códigos como persona.",
    "Para finalizar, solo me queda agradecerte, por permitirme conocerte primero que todo, por apoyarme, por cada vez que me dices \"usted puede\" porque de verdad eso sí ayuda mucho, por preocuparte por mí, por aguantar mi humilde obsesión con League of Legends, por escuchar las canciones de la página, por escucharme y en general por todo, hasta lo más mínimo.",
    "Bueno, creo que ya he dicho bastante para ser yo una persona de pocas palabras; solo me queda decirte que te quiero mucho, que tienes un espacio en mi corazón y que todavía me quedan unos años en su vida, entonces no se va a librar de mí tan fácil.",
    "P. D: Se me había olvidado lo complicado que era escribir una carta; creo que quemé algunas neuronas de tanto pensar. Lo bueno es que valió la pena, o bueno, eso creo y espero."
  ]

  const irSiguienteParrafo = (e) => {
    e.stopPropagation();
    if (indiceParrafo < parrafosCarta.length - 1) {
      setIndiceParrafo(prev => prev + 1);
    }
  };


  // --- LÓGICA DE MATRIX ---

  useEffect(() => {

    if (fase !== 'matrix') return;

    const canvas = canvasRef.current;

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;



    const characters = "010101";

    const fontSize = 14;

    const columns = canvas.width / fontSize;

    const drops = Array(Math.floor(columns)).fill(1);



    const draw = () => {

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';

      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#FFFFFF';

      ctx.font = fontSize + 'px monospace';



      for (let i = 0; i < drops.length; i++) {

        const text = characters.charAt(Math.floor(Math.random() * characters.length));

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;

        drops[i]++;

      }

    };



    const timer = setTimeout(() => setMostrarBoton(true), 6000);

    const interval = setInterval(draw, 35);

    return () => { clearInterval(interval); clearTimeout(timer); };

  }, [fase]);



  // --- CAMBIO DE CANCIÓN AL LEER LA CARTA ---

  useEffect(() => {

    if (fase === 'carta' && audioRef.current) {

      audioRef.current.pause();

      audioRef.current.src = promisePianoAudio; // Cambia a Ben Howard

      audioRef.current.load();

      audioRef.current.volume = 0.3; // 30% como se pidió

      audioRef.current.play().catch(e => console.log("Error de audio:", e));

    }

  }, [fase]);



  const iniciarAudioYMatrix = () => {

    setFase('matrix');

    if (audioRef.current) {

      audioRef.current.volume = 0.4;

      audioRef.current.play().catch(e => console.log(e));

    }

  };



  return (

    <div className={`birthday-container ${['revelacion', 'sobre', 'carta'].includes(fase) ? 'acuarela-sunset' : ''}`}>

      <audio ref={audioRef} src={soSooPrettyAudio} loop />



      {fase === 'mensaje' && (

        <div className="mensaje-entrada">

          <p className="texto-poetico">Hoy no es un día como los otros...</p>

          <p className="texto-poetico delay-1">vamos a salir un poco de la rutina.</p>

          <button className="btn-comenzar" onClick={iniciarAudioYMatrix}>Entrar</button>

        </div>

      )}



      {fase === 'matrix' && (

        <>

          <canvas ref={canvasRef} className="matrix-canvas" />

          <div className="ui-overlay">

            <svg

              className={`tulip-bouquet-silhouette ${mostrarBoton ? 'visible' : ''}`}

              viewBox="0 0 600 650"

            >

              <g stroke="white" fill="none" strokeWidth="2" strokeLinecap="round">

                <g className="base-structure">

                  <path d="M300,530 Q280,400 240,250 M300,530 Q300,400 300,210 M300,530 Q320,400 360,250 M300,530 Q260,400 200,320 M300,530 Q340,400 400,320" />

                  <path d="M300,530 Q250,450 180,380 M300,530 Q350,450 420,380" opacity="0.4" />

                </g>

                <g className="leaves-structure">

                  <path d="M300,480 C230,440 150,380 160,280 C190,320 260,430 300,480 Z" />

                  <path d="M300,480 C370,440 450,380 440,280 C410,320 340,430 300,480 Z" />

                  <path d="M290,460 C210,380 180,320 200,250 C230,290 260,390 300,460 Z" />

                  <path d="M310,460 C390,380 420,320 400,250 C370,290 340,390 300,460 Z" />

                  <path d="M300,490 C270,470 230,480 300,510 C370,480 330,470 300,490 Z" />

                  <path d="M300,500 Q280,550 260,570 M300,500 Q320,550 340,570" />

                </g>

                <g className="flowers-cluster">

                  <path d="M300,210 C270,160 280,120 300,130 C290,160 290,200 300,210 Z M300,210 C330,160 320,120 300,130 C310,160 310,200 300,210 Z M300,210 C280,150 290,140 300,130 C310,140 320,150 300,210 Z" />

                  <path d="M240,250 C200,210 210,170 230,180 C225,210 230,240 240,250 Z M240,250 C260,200 250,160 230,180 C245,210 245,240 240,250 Z M240,250 C215,205 225,185 230,180 C240,195 245,215 240,250 Z" />

                  <path d="M360,250 C340,200 350,160 370,180 C355,210 355,240 360,250 Z M360,250 C400,210 390,170 370,180 C375,210 370,240 360,250 Z M360,250 C385,205 375,185 370,180 C360,195 355,215 360,250 Z" />

                  <path d="M200,320 C150,290 160,250 180,260 C180,290 190,310 200,320 Z M200,320 C210,270 200,240 180,260 C195,285 200,310 200,320 Z M200,320 C165,285 175,265 180,260 C190,275 200,295 200,320 Z" />

                  <path d="M400,320 C390,270 400,240 420,260 C405,285 400,310 400,320 Z M400,320 C450,290 440,250 420,260 C420,290 410,310 400,320 Z M400,320 C435,285 425,265 420,260 C410,275 400,295 400,320 Z" />

                  <circle cx="260" cy="200" r="2" /><circle cx="340" cy="200" r="2" /><circle cx="300" cy="350" r="2" />

                  <circle cx="180" cy="380" r="3" /><circle cx="420" cy="380" r="3" />

                </g>

              </g>

            </svg>

           

            {mostrarBoton && (

              <button className="btn-revelar glitch-efect" onClick={() => setFase('revelacion')}>

                REVELAR CODIGO

              </button>

            )}

          </div>

        </>

      )}



      {fase === 'revelacion' && (

        <div className="bouquet-color-container fade-in-acuarela">

          <TulipanesColor onLeerCarta={() => setFase('sobre')} />

        </div>

      )}



      {/* NUEVA FASE 4: SOBRE Y SELLO DE LACRE */}

      {fase === 'sobre' && (

        <div className="v-centrar fade-in">

          <div className={`envelope-wrapper ${sobreAbierto ? 'open' : ''}`}>

             <div className="envelope">

                <div className="envelope-flap"></div>

                <div className="envelope-body"></div>

                <div className="envelope-paper"></div>

                {!sobreAbierto && (

                  <div className="wax-seal" onClick={() => setSobreAbierto(true)}>

                    <span className="heart-icon">♥</span>

                  </div>

                )}

             </div>

          </div>

          {sobreAbierto ? (

             <button className="btn-leer-final fade-in" onClick={() => setFase('carta')}>

                Abrir Pergamino

             </button>

          ) : (

            <div className="hint-container fade-in">

              <p className="swipe-hint">Toca el sello para abrir</p>

              <span className="arrow-up-anim">↑</span>

            </div>

          )}

        </div>

      )}



   {/* FASE FINAL: CARTA DE PERGAMINO */}
      {fase === 'carta' && (
        <div className="carta-container fade-in">
          <FallingHearts isBirthday={true} /> 
          <div className="papel-pergamino" onClick={(e) => e.stopPropagation()}>
            <div className="contenido-pergamino">
              
              <p key={indiceParrafo} className="parrafo-animado">
                {parrafosCarta[indiceParrafo]}
              </p>

              {indiceParrafo < parrafosCarta.length - 1 ? (
                <div className="flecha-lectura" onClick={irSiguienteParrafo}>
                  <span>Seguir leyendo</span>
                  <span className="arrow-right">→</span>
                </div>
              ) : (
               <button 
  onPointerDown={(e) => { e.stopPropagation(); onFinish(); }} 
  className="btn-continuar-app"
>
  Desbloquear canción del día
</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthdaySurprise;