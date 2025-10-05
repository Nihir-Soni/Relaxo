import { useState, useRef, useEffect } from 'react'
import { FaRegPlayCircle, FaRegPauseCircle } from "react-icons/fa";
import { Volume2, VolumeX } from 'lucide-react';
import mozart from '.././assets/MOZART.mp3';
import violinAudio from '.././assets/violinAudio.mp3';
import violin from '.././assets/violin.jpg';
import flute from '.././assets/krishna.jpg'
import fluteAudio from '.././assets/flute.mp3'
import zen from '.././assets/buddha.jpg'
import zenAudio from '.././assets/zen-garden.mp3'
import yoga from '.././assets/yoga.jpg'
import yogaAudio from '.././assets/Satya-Yuga.mp3'
import sleep from '.././assets/calm.jpg'
import sleepAudio from '.././assets/sleep-music.mp3'
import dark from '.././assets/skull.jpg'
import darkAudio from '.././assets/Funeral March.mp3'
import gentleRain from '.././assets/gentleRain.jpg'
import gentleRainAudio from '.././assets/gentleRainAudio.mp3'
import heavyRain from '.././assets/heavyRain.jpg'
import heavyRainAudio from '.././assets/heavyRainAudio.mp3'
import thunder from '.././assets/thunder.jpg'
import thunderAudio from '.././assets/thunderAudio.mp3'
import wind from '.././assets/wind.jpg'
import windAudio from '.././assets/windAudio.mp3'
import ocean from '.././assets/ocean.jpg'
import oceanAudio from '.././assets/oceanAudio.mp3'
import camp from '.././assets/camp.jpg';
import campAudio from '.././assets/campAudio.mp3';
import birds from '.././assets/birds.jpg';
import birdsAudio from '.././assets/birdsAudio.mp3';
import typing from '.././assets/typing.jpg';
import typingAudio from '.././assets/typingAudio.mp3';
import cuttingPaperAudio from '.././assets/cuttingPaperAudio.mp3';
import cuttingPaper from '.././assets/cuttingPaper.jpg';
import cuttingVegetables from '.././assets/cuttingVegetables.jpg'
import cuttingVegetablesAudio from '.././assets/cuttingVegetablesAudio.mp3'
import dice from '.././assets/dice.jpg'
import diceAudio from '.././assets/diceAudio.mp3'
import pencil from '.././assets/pencil.jpg';
import pencilAudio from '.././assets/pencilAudio.mp3';
import match from '.././assets/match.jpg'
import matchAudio from '.././assets/matchAudio.mp3'
import book from '.././assets/book.jpg'
import bookAudio from '.././assets/bookAudio.mp3'

// Reusable SoundCard component to reduce code duplication
const SoundCard = ({ sound, onTogglePlay, onVolumeChange, onToggleMute }) => (
    <div 
        className={`relative min-w-[180px] w-[180px] h-[240px] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 group ${
            sound.isPlaying ? 'ring-4 ring-white/40 scale-105' : 'hover:scale-102'
        }`}
    >
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${sound.image})` }}
        >
            <div className={`absolute inset-0 bg-gradient-to-b ${sound.color} backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0`}></div>
        </div>

        <div className="relative h-full flex flex-col justify-between p-4">
            <div className="text-white">
                <h3 className="text-lg font-bold drop-shadow-lg">{sound.name}</h3>
            </div>

            <div className="flex justify-center">
                <div 
                    className="text-white text-5xl cursor-pointer hover:scale-110 transition-transform drop-shadow-2xl"
                    onClick={() => onTogglePlay(sound.id)}
                >
                    {sound.isPlaying ? <FaRegPauseCircle /> : <FaRegPlayCircle />}
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => onToggleMute(sound.id)}
                        className="text-white hover:scale-110 transition-transform"
                    >
                        {sound.isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01"
                        value={sound.volume}
                        onChange={(e) => onVolumeChange(sound.id, parseFloat(e.target.value))}
                        className="flex-1 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer"
                        style={{
                            background: `linear-gradient(to right, white 0%, white ${sound.volume * 100}%, rgba(255,255,255,0.3) ${sound.volume * 100}%, rgba(255,255,255,0.3) 100%)`
                        }}
                    />
                </div>
                <div className="text-xs text-gray-200 drop-shadow truncate">{sound.artist}</div>
            </div>
        </div>
    </div>
)

export function ListenPage() {
    const baseSoundsData = [
        { id: 1, name: 'Piano', artist: 'W.A MOZART', image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&q=80', audio: mozart, color: 'from-purple-500/20 to-pink-500/20' },
        { id: 2, name: 'Violin', artist: 'Melancholic Violin', image: violin, audio: violinAudio, color: 'from-blue-500/20 to-cyan-500/20' },
        { id: 3, name: 'Flute', artist: 'Soothing Tune', image: flute, audio: fluteAudio, color: 'from-teal-500/20 to-blue-500/20' },
        { id: 4, name: 'Zen', artist: 'Zen Garden', image: zen, audio: zenAudio, color: 'from-green-500/20 to-emerald-500/20' },
        { id: 5, name: 'Yoga', artist: 'Cozy Vibes', image: yoga, audio: yogaAudio, color: 'from-orange-500/20 to-red-500/20' },
        { id: 6, name: 'Sleep music', artist: 'GLokta', image: sleep, audio: sleepAudio, color: 'from-gray-500/20 to-slate-500/20' },
        { id: 7, name: 'Dark Academia', artist: 'Ninefingers', image: dark, audio: darkAudio, color: 'from-blue-500/20 to-cyan-500/20' }
    ]

    const natureSoundsData = [
        { id: 8, name: 'Gentle Rainfall', artist: 'Nature', image: gentleRain, audio: gentleRainAudio, color: 'from-blue-500/20 to-cyan-500/20' },
        { id: 9, name: 'Heavy Rain', artist: 'Nature', image: heavyRain, audio: heavyRainAudio, color: 'from-gray-200/1 to-gray-20/1' },
        { id: 10, name: 'Thunder', artist: 'Nature', image: thunder, audio: thunderAudio, color: 'from-purple-500/20 to-pink-500/20' },
        { id: 11, name: 'Wind', artist: 'Nature', image: wind, audio: windAudio, color: 'from-blue-400/20 to-gray-400/20' },
        { id: 12, name: 'Ocean Waves', artist: 'Nature', image: ocean, audio: oceanAudio, color: 'from-blue-500/20 to-teal-500/20' },
        { id: 13, name: 'Campfire', artist: 'Nature', image: camp, audio: campAudio, color: 'from-orange-500/20 to-yellow-500/20' },
        { id: 14, name: 'Birds', artist: 'Nature', image: birds, audio: birdsAudio, color: 'from-yellow-300/20 to-green-300/20' }
    ]

    const asmrSoundsData = [
        { id: 15, name: 'Typing', artist: 'JKing', image: typing, audio: typingAudio, color: 'from-gray-400/20 to-blue-400/20' },
        { id: 16, name: 'Cutting Paper', artist: 'freeSound', image: cuttingPaper, audio: cuttingPaperAudio, color: 'from-pink-400/20 to-purple-400/20' },
        { id: 17, name: 'Cutting Vegetables', artist: 'freeSound', image: cuttingVegetables, audio: cuttingVegetablesAudio, color: 'from-green-400/20 to-yellow-400/20' },
        { id: 18, name: 'Dice Rolling', artist: 'freeSound', image: dice, audio: diceAudio, color: 'from-gray-500/20 to-blue-500/20' },
        { id: 19, name: 'Match Strike', artist: 'freeSound', image: match, audio: matchAudio, color: 'from-yellow-400/20 to-orange-400/20' },
        { id: 20, name: 'Book Page Turning', artist: 'freeSound', image: book, audio: bookAudio, color: 'from-yellow-300/20 to-brown-400/20' },
        { id: 21, name: 'Pencil on Paper', artist: 'freeSound', image: pencil, audio: pencilAudio, color: 'from-gray-300/20 to-yellow-300/20' }
    ]
    //concatenating in to one master array..
    const allSoundsData = [...baseSoundsData, ...natureSoundsData, ...asmrSoundsData]

    const [sounds, setSounds] = useState(
        allSoundsData.map(sound => ({
            ...sound,//copy all existing properties
            isPlaying: false,
            volume: 0.5,
            isMuted: false
        }))
    )

    const audioRefs = useRef({}) //prevent re rendering

    // Initialize audio elements ONCE with proper cleanup
    //audio tag
    useEffect(() => {
        allSoundsData.forEach(sound => {
            if (!audioRefs.current[sound.id]) {
                const audio = new Audio(sound.audio)
                audio.loop = true
                audio.volume = 0.5
                audio.preload = 'auto'
                audioRefs.current[sound.id] = audio
            }
        })

        // Cleanup function to release audio resources
        return () => {
            Object.values(audioRefs.current).forEach(audio => {
                if (audio) {
                    audio.pause()
                    audio.src = ''
                }
            })
            audioRefs.current = {}
        }
    }, [])

    const togglePlay = (id) => {
        const audio = audioRefs.current[id]
        if (!audio) {
            console.error('Audio element not found for id:', id)
            return
        }

        if (audio.paused) {
            const playPromise = audio.play()
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setSounds(prevSounds =>
                            prevSounds.map(sound =>
                                sound.id === id ? { ...sound, isPlaying: true } : sound
                            )
                        )
                    })
                    .catch(error => {
                        console.error('Playback failed:', error)
                    })
            }
        } else {
            audio.pause()
            setSounds(prevSounds =>
                prevSounds.map(sound =>
                    sound.id === id ? { ...sound, isPlaying: false } : sound
                )
            )
        }
    }

    const handleVolumeChange = (id, newVolume) => {
        setSounds(prevSounds =>
            prevSounds.map(sound => {
                if (sound.id === id) {
                    const audio = audioRefs.current[id]
                    audio.volume = newVolume
                    return { ...sound, volume: newVolume }
                }
                return sound
            })
        )
    }

    const toggleMute = (id) => {
        setSounds(prevSounds =>
            prevSounds.map(sound => {
                if (sound.id === id) {
                    const audio = audioRefs.current[id]
                    audio.muted = !sound.isMuted
                    return { ...sound, isMuted: !sound.isMuted }
                }
                return sound
            })
        )
    }

    const resetAll = () => {
        sounds.forEach(sound => {
            const audio = audioRefs.current[sound.id]
            audio.pause()
            audio.currentTime = 0
        })
        setSounds(prevSounds =>
            prevSounds.map(sound => ({ ...sound, isPlaying: false }))
        )
    }

    const activeSounds = sounds.filter(s => s.isPlaying).length

    return (
        <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black min-h-screen w-full">
            {/* Header - FIXED position */}
            <div className="sticky top-0  z-10 w-full flex justify-between items-center px-8 py-4 bg-gray-900/95 backdrop-blur">
                <h1 className="text-3xl font-bold text-white ">Start Mixing 🎧</h1>
                <div className="flex items-center gap-4">
                    <div className="text-white text-sm bg-white/10 px-4 py-2 rounded-full">
                        {activeSounds} sound{activeSounds !== 1 ? 's' : ''} playing
                    </div>
                    {activeSounds > 0 && (
                        <button 
                            onClick={resetAll}
                            className="bg-orange-500/80 hover:bg-orange-500 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                                <path d="M21 3v5h-5"/>
                                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                                <path d="M8 16H3v5"/>
                            </svg>
                            Reset All
                        </button>
                    )}
                </div>
            </div>

            {/* Base Sound Section - RELATIVE positioning */}
            <div className="w-full border-t border-b border-gray-500 px-4 py-6 bg-white/5">
                <h3 className="text-xl text-white mb-4">Base Sounds</h3>
                <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                    {sounds.filter(s => baseSoundsData.some(bs => bs.id === s.id)).map(sound => (
                        <SoundCard 
                            key={sound.id}
                            sound={sound}
                            onTogglePlay={togglePlay}
                            onVolumeChange={handleVolumeChange}
                            onToggleMute={toggleMute}
                        />
                    ))}
                </div>
            </div>

            {/* Nature Section */}
            <div className="w-full border-b border-gray-500 px-4 py-6 bg-white/5">
                <h3 className="text-xl text-white mb-4">Nature</h3>
                <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                    {sounds.filter(s => natureSoundsData.some(ns => ns.id === s.id)).map(sound => (
                        <SoundCard 
                            key={sound.id}
                            sound={sound}
                            onTogglePlay={togglePlay}
                            onVolumeChange={handleVolumeChange}
                            onToggleMute={toggleMute}
                        />
                    ))}
                </div>
            </div>

            {/* ASMR Section */}
            <div className="w-full border-b border-gray-500 px-4 py-6 bg-white/5">
                <h3 className="text-xl text-white mb-4">ASMR</h3>
                <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                    {sounds.filter(s => asmrSoundsData.some(as => as.id === s.id)).map(sound => (
                        <SoundCard 
                            key={sound.id}
                            sound={sound}
                            onTogglePlay={togglePlay}
                            onVolumeChange={handleVolumeChange}
                            onToggleMute={toggleMute}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}