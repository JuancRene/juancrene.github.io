import React, { useState, useEffect, useCallback } from 'react';
import { Competitor, GiColor, MatchState } from './types';
import { SetupScreen } from './components/SetupScreen';
import { ScoreControl } from './components/ScoreControl';
import { Button } from './components/Button';
import { Play, Pause, RotateCcw, Settings, ChevronLeft } from 'lucide-react';

const INITIAL_COMPETITOR_STATE: Omit<Competitor, 'giColor' | 'id' | 'name'> = {
  points: 0,
  advantages: 0,
  warnings: 0,
};

function App() {
  // --- State ---
  const [matchState, setMatchState] = useState<MatchState>(MatchState.SETUP);
  const [durationMinutes, setDurationMinutes] = useState<number>(5);
  const [timeLeft, setTimeLeft] = useState<number>(5 * 60);
  
  const [competitorA, setCompetitorA] = useState<Competitor>({
    id: 'A',
    name: 'Competidor A',
    giColor: GiColor.WHITE,
    ...INITIAL_COMPETITOR_STATE,
  });

  const [competitorB, setCompetitorB] = useState<Competitor>({
    id: 'B',
    name: 'Competidor B',
    giColor: GiColor.BLUE,
    ...INITIAL_COMPETITOR_STATE,
  });

  // --- Timer Logic ---
  useEffect(() => {
    let interval: number | undefined;

    if (matchState === MatchState.ACTIVE && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setMatchState(MatchState.FINISHED);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && matchState === MatchState.ACTIVE) {
       setMatchState(MatchState.FINISHED);
    }

    return () => clearInterval(interval);
  }, [matchState, timeLeft]);

  // --- Handlers ---

  const startMatch = () => {
    setTimeLeft(durationMinutes * 60);
    setMatchState(MatchState.PAUSED); // Ready to start
  };

  const toggleTimer = () => {
    if (matchState === MatchState.PAUSED || matchState === MatchState.SETUP) {
      setMatchState(MatchState.ACTIVE);
    } else if (matchState === MatchState.ACTIVE) {
      setMatchState(MatchState.PAUSED);
    }
  };

  const resetTimer = () => {
    setMatchState(MatchState.PAUSED);
    setTimeLeft(durationMinutes * 60);
  };

  const fullReset = () => {
    setMatchState(MatchState.SETUP);
    setCompetitorA(prev => ({ ...prev, ...INITIAL_COMPETITOR_STATE }));
    setCompetitorB(prev => ({ ...prev, ...INITIAL_COMPETITOR_STATE }));
  };

  const updateCompetitor = (
    id: string,
    field: keyof Competitor,
    value: number
  ) => {
    const updater = id === 'A' ? setCompetitorA : setCompetitorB;
    updater((prev) => ({ ...prev, [field]: value }));
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // --- Render ---

  if (matchState === MatchState.SETUP) {
    return (
      <SetupScreen
        duration={durationMinutes}
        setDuration={setDurationMinutes}
        competitorA={competitorA}
        setCompetitorA={setCompetitorA}
        competitorB={competitorB}
        setCompetitorB={setCompetitorB}
        onStart={startMatch}
      />
    );
  }

  const isFinished = matchState === MatchState.FINISHED;
  const isRunning = matchState === MatchState.ACTIVE;

  return (
    <div className="flex flex-col h-screen bg-slate-900 overflow-hidden">
      
      {/* Top Bar / Timer */}
      <div className="flex-none bg-slate-950 p-2 md:p-4 shadow-2xl z-50 relative border-b border-slate-800">
        <div className="max-w-full mx-auto flex items-center justify-between relative px-4">
            
            {/* Left Controls (Exit) */}
            <div className="flex items-center w-1/4 sm:w-1/3 z-50">
              <button 
                type="button"
                onClick={fullReset} 
                className="group flex items-center gap-2 px-3 py-2 -ml-2 rounded-lg hover:bg-slate-800 transition-all cursor-pointer"
              >
                  <ChevronLeft size={32} className="text-slate-400 group-hover:text-white transition-colors" /> 
                  <span className="font-bold text-xl text-slate-300 group-hover:text-white hidden sm:inline">Salir</span>
              </button>
            </div>
            
            {/* Center Clock - MASSIVE SIZE */}
            <div className="flex-1 flex justify-center z-40">
               <div className={`
                  font-mono text-[4.5rem] md:text-[7rem] lg:text-[9rem] font-black tracking-tighter tabular-nums transition-colors duration-300 drop-shadow-2xl leading-none
                  ${isFinished ? 'text-red-500 animate-pulse' : 'text-white'}
                  ${timeLeft < 60 && !isFinished && isRunning ? 'text-yellow-400' : ''}
              `}>
                  {formatTime(timeLeft)}
              </div>
            </div>

            {/* Right Status */}
            <div className="w-1/4 sm:w-1/3 flex justify-end items-center z-40">
               {isFinished && <span className="text-sm md:text-xl font-black bg-red-600 text-white px-4 py-2 rounded animate-bounce shadow-lg shadow-red-900/50">FINAL</span>}
            </div>
        </div>
      </div>

      {/* Main Content: Competitors */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative z-10">
        {/* Divider for Desktop */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-black hidden md:block z-20 shadow-[0_0_10px_rgba(0,0,0,0.8)]"></div>

        <div className="flex-1 relative border-b-4 md:border-b-0 md:border-r-0 border-black">
            <ScoreControl 
                competitor={competitorA} 
                onUpdate={(f, v) => updateCompetitor('A', f, v)} 
            />
        </div>
        
        <div className="flex-1 relative">
            <ScoreControl 
                competitor={competitorB} 
                onUpdate={(f, v) => updateCompetitor('B', f, v)}
                isMirror 
            />
        </div>
      </div>

      {/* Bottom Controls - Compact Version */}
      <div className="flex-none bg-slate-950 p-2 border-t border-slate-800 z-50 relative shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-xl mx-auto flex items-center justify-center gap-4">
            
            <Button 
                variant="secondary" 
                size="lg" 
                onClick={resetTimer}
                title="Reiniciar Tiempo"
                className="shadow-lg"
            >
                <RotateCcw className="w-5 h-5" />
            </Button>

            <Button 
                variant={isRunning ? 'secondary' : 'primary'}
                size="lg" 
                onClick={toggleTimer}
                className={`flex-1 max-w-xs py-3 text-lg font-bold uppercase tracking-widest ${isRunning ? 'ring-2 ring-red-500/50' : 'ring-2 ring-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.4)]'}`}
            >
                {isRunning ? (
                    <span className="flex items-center justify-center gap-2">
                        <Pause className="fill-current w-6 h-6" /> PAUSA
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        <Play className="fill-current w-6 h-6" /> {timeLeft < (durationMinutes * 60) ? 'REANUDAR' : 'INICIAR'}
                    </span>
                )}
            </Button>

             <Button 
                variant="ghost" 
                size="lg" 
                onClick={fullReset}
                title="Configuración"
                className="hover:bg-slate-800"
            >
                <Settings className="w-6 h-6" />
            </Button>

        </div>
      </div>
    </div>
  );
}

export default App;