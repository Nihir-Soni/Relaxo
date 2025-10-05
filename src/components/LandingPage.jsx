import { useEffect, useState } from 'react';
import bgimg from '.././assets/bg.jpg';
import { useNavigate } from "react-router-dom"


export function LandingPage() {
  const [raindrops, setRaindrops] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    // Generate random raindrops
    const drops = [];
    for (let i = 0; i < 100; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 0.5 + Math.random() * 0.5,
        animationDelay: Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.4
      });
    }
    setRaindrops(drops);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${bgimg})`,
          filter: 'brightness(0.7)'
        }}
      ></div>

      {/* Rain effect */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {raindrops.map((drop) => (
          <div
            key={drop.id}
            className="absolute w-px bg-gradient-to-b from-white to-transparent"
            style={{
              left: `${drop.left}%`,
              height: '80px',
              opacity: drop.opacity,
              animation: `fall ${drop.animationDuration}s linear ${drop.animationDelay}s infinite`
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fall {
          0% {
            top: -100px;
          }
          100% {
            top: 100%;
          }
        }
        
        @keyframes slideInFromLeft {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideInFromRight {
          0% {
            transform: translateX(100%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
        {/* Hero text */}
        <div 
          className="flex flex-col items-center text-center"
          style={{
            animation: 'slideInFromLeft 1s ease-out forwards'
          }}
        >
          <h1 className="text-gray-300 font-bold text-5xl font-serif mb-4">
            Welcome, to Relaxo
          </h1>
          <h2 className="text-gray-300 font-serif text-lg">
            A place where the sounds of nature are in your hands....
          </h2>
        </div>

        {/* Glass "How it works" card */}
        <div 
          className="mt-10 bg-white/30 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-6 max-w-3xl text-white"
          style={{
            animation: 'slideInFromRight 1s ease-out forwards'
          }}
        >
          <h2 className="font-bold text-xl text-gray-100 mb-2">How it works?</h2>
          <p className="text-lg leading-relaxed">
            With Relaxo's Listen feature, you can create your perfect soundscape in just a few taps. Simply choose from a variety of soothing nature sounds — like rain, ocean waves, forest ambience, or chirping birds — and layer them together to your liking. Each sound has an individual volume control, so you can mix them perfectly for your mood, whether you want a gentle background hum or a fully immersive experience. Once your mix is ready, press play to relax, focus, or fall asleep, all while enjoying a personalized, serene environment right on your device.
          </p>
        </div>

        {/* Start Listening button */}
        <div className="mt-6">
          <button className="bg-white/30 border border-white rounded-lg shadow-lg px-6 py-3 text-gray-200 cursor-pointer transition-all duration-150 hover:bg-white/40 hover:scale-105" onClick={()=> navigate("/ListenPage")}>
            Start Listening
          </button>
        </div>
      </div>
    </div>
  );
}