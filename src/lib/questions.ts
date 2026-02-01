import type { Question } from '../types/game';

export const physicsQuestions: Question[] = [
  // Easy - Wave Basics
  {
    id: 1,
    question: "What is the relationship between wave speed (v), frequency (f), and wavelength (λ)?",
    options: ["v = f + λ", "v = f × λ", "v = f ÷ λ", "v = λ ÷ f"],
    correctAnswer: 1,
    explanation: "The wave equation states that wave speed equals frequency multiplied by wavelength: v = fλ",
    difficulty: "easy",
    topic: "Wave Basics"
  },
  {
    id: 2,
    question: "If frequency increases while wavelength stays constant, what happens to wave speed?",
    options: ["Decreases", "Stays the same", "Increases", "Becomes zero"],
    correctAnswer: 2,
    explanation: "From v = fλ, if f increases and λ is constant, v must increase proportionally.",
    difficulty: "easy",
    topic: "Wave Basics"
  },
  {
    id: 3,
    question: "What unit is used to measure frequency?",
    options: ["Meters (m)", "Seconds (s)", "Hertz (Hz)", "Meters per second (m/s)"],
    correctAnswer: 2,
    explanation: "Frequency is measured in Hertz (Hz), which represents cycles per second.",
    difficulty: "easy",
    topic: "Wave Basics"
  },
  {
    id: 4,
    question: "What is the wavelength of a wave?",
    options: ["The height of the wave", "The distance between two consecutive crests", "The time for one complete cycle", "The speed of the wave"],
    correctAnswer: 1,
    explanation: "Wavelength is the distance between two consecutive corresponding points on a wave, such as crest to crest.",
    difficulty: "easy",
    topic: "Wave Basics"
  },
  {
    id: 5,
    question: "Which type of wave can travel through a vacuum?",
    options: ["Sound waves", "Water waves", "Electromagnetic waves", "Seismic S-waves"],
    correctAnswer: 2,
    explanation: "Electromagnetic waves (including light) can travel through a vacuum as they don't require a medium.",
    difficulty: "easy",
    topic: "Wave Basics"
  },
  {
    id: 6,
    question: "What is the period of a wave?",
    options: ["The maximum displacement", "The time for one complete cycle", "The distance traveled in one second", "The number of cycles per second"],
    correctAnswer: 1,
    explanation: "Period is the time taken for one complete cycle of the wave to pass a point.",
    difficulty: "easy",
    topic: "Wave Basics"
  },
  {
    id: 7,
    question: "How are frequency (f) and period (T) related?",
    options: ["f = T", "f = 1/T", "f = T²", "f = √T"],
    correctAnswer: 1,
    explanation: "Frequency and period are reciprocals: f = 1/T and T = 1/f",
    difficulty: "easy",
    topic: "Wave Basics"
  },
  {
    id: 8,
    question: "What is the amplitude of a wave?",
    options: ["The maximum displacement from equilibrium", "The distance between crests", "The time for one cycle", "The speed of propagation"],
    correctAnswer: 0,
    explanation: "Amplitude is the maximum displacement or distance from the equilibrium position.",
    difficulty: "easy",
    topic: "Wave Basics"
  },
  
  // Medium - Wave Properties
  {
    id: 9,
    question: "A wave has frequency 50 Hz and wavelength 2 m. What is its speed?",
    options: ["25 m/s", "100 m/s", "52 m/s", "0.04 m/s"],
    correctAnswer: 1,
    explanation: "Using v = fλ: v = 50 Hz × 2 m = 100 m/s",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 10,
    question: "What happens to the wavelength when a wave enters a denser medium?",
    options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
    correctAnswer: 1,
    explanation: "In a denser medium, wave speed decreases, so wavelength decreases while frequency remains constant.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 11,
    question: "Two waves meet and temporarily cancel each other out. This is called:",
    options: ["Constructive interference", "Destructive interference", "Diffraction", "Refraction"],
    correctAnswer: 1,
    explanation: "Destructive interference occurs when waves combine to produce a smaller amplitude or cancel out.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 12,
    question: "What phenomenon causes waves to bend around obstacles?",
    options: ["Reflection", "Refraction", "Diffraction", "Interference"],
    correctAnswer: 2,
    explanation: "Diffraction is the bending of waves around obstacles or through openings.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 13,
    question: "The Doppler effect causes what change in observed frequency?",
    options: ["Always increases", "Always decreases", "Increases when source approaches", "No change"],
    correctAnswer: 2,
    explanation: "The Doppler effect increases observed frequency when the source approaches and decreases when it recedes.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 14,
    question: "Sound travels faster in which medium?",
    options: ["Air", "Water", "Vacuum", "Sound travels at same speed in all"],
    correctAnswer: 1,
    explanation: "Sound travels faster in denser media. Water is denser than air, so sound travels faster in water.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 15,
    question: "What is the speed of light in vacuum (approximately)?",
    options: ["3 × 10⁶ m/s", "3 × 10⁸ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"],
    correctAnswer: 1,
    explanation: "The speed of light in vacuum is approximately 3 × 10⁸ m/s (300,000 km/s).",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 16,
    question: "A standing wave is formed by:",
    options: ["Two waves traveling in same direction", "Two waves traveling in opposite directions", "A single wave reflecting", "Wave absorption"],
    correctAnswer: 1,
    explanation: "Standing waves are formed by the superposition of two waves of the same frequency traveling in opposite directions.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  
  // Hard - Intensity and Energy
  {
    id: 17,
    question: "Wave intensity is proportional to:",
    options: ["Amplitude", "Amplitude squared", "Frequency", "Wavelength"],
    correctAnswer: 1,
    explanation: "Intensity I ∝ A² (amplitude squared). Doubling amplitude quadruples intensity.",
    difficulty: "hard",
    topic: "Intensity"
  },
  {
    id: 18,
    question: "If wave amplitude doubles, by what factor does intensity increase?",
    options: ["2", "4", "8", "√2"],
    correctAnswer: 1,
    explanation: "Since I ∝ A², doubling amplitude (2×) increases intensity by 2² = 4 times.",
    difficulty: "hard",
    topic: "Intensity"
  },
  {
    id: 19,
    question: "The intensity of a spherical wave decreases with distance as:",
    options: ["1/r", "1/r²", "1/r³", "Remains constant"],
    correctAnswer: 1,
    explanation: "For spherical waves, intensity follows the inverse square law: I ∝ 1/r²",
    difficulty: "hard",
    topic: "Intensity"
  },
  {
    id: 20,
    question: "Wave power is measured in:",
    options: ["Joules (J)", "Watts (W)", "Newtons (N)", "Pascals (Pa)"],
    correctAnswer: 1,
    explanation: "Power is the rate of energy transfer, measured in Watts (Joules per second).",
    difficulty: "hard",
    topic: "Intensity"
  },
  {
    id: 21,
    question: "If two identical waves interfere constructively, the resulting intensity is:",
    options: ["Same as one wave", "Twice one wave", "Four times one wave", "Zero"],
    correctAnswer: 2,
    explanation: "Constructive interference doubles amplitude, and since I ∝ A², intensity becomes 4 times.",
    difficulty: "hard",
    topic: "Intensity"
  },
  {
    id: 22,
    question: "The decibel scale is:",
    options: ["Linear", "Logarithmic", "Exponential", "Quadratic"],
    correctAnswer: 1,
    explanation: "The decibel scale is logarithmic, measuring the ratio of intensities on a log scale.",
    difficulty: "hard",
    topic: "Intensity"
  },
  {
    id: 23,
    question: "A 10 dB increase in sound level corresponds to what intensity change?",
    options: ["2× intensity", "5× intensity", "10× intensity", "100× intensity"],
    correctAnswer: 2,
    explanation: "Each 10 dB increase represents a 10-fold increase in intensity.",
    difficulty: "hard",
    topic: "Intensity"
  },
  {
    id: 24,
    question: "Wave energy is transported by:",
    options: ["Mass movement", "Oscillations of medium particles", "Static fields", "Heat transfer"],
    correctAnswer: 1,
    explanation: "Waves transfer energy through the oscillation of particles in the medium, not by moving mass.",
    difficulty: "hard",
    topic: "Intensity"
  },
  
  // Hard - Polarization
  {
    id: 25,
    question: "Which waves can be polarized?",
    options: ["Sound waves", "All waves", "Transverse waves only", "Longitudinal waves only"],
    correctAnswer: 2,
    explanation: "Only transverse waves can be polarized since their oscillations are perpendicular to propagation.",
    difficulty: "hard",
    topic: "Polarization"
  },
  {
    id: 26,
    question: "Malus's Law states that transmitted intensity through a polarizer is:",
    options: ["I₀cos(θ)", "I₀cos²(θ)", "I₀sin(θ)", "I₀sin²(θ)"],
    correctAnswer: 1,
    explanation: "Malus's Law: I = I₀cos²(θ) where θ is the angle between polarization directions.",
    difficulty: "hard",
    topic: "Polarization"
  },
  {
    id: 27,
    question: "Unpolarized light passes through a polarizer. The transmitted intensity is:",
    options: ["Unchanged", "Half the original", "Zero", "Doubled"],
    correctAnswer: 1,
    explanation: "A polarizer transmits only one polarization component, so intensity is reduced by half.",
    difficulty: "hard",
    topic: "Polarization"
  },
  {
    id: 28,
    question: "Two polarizers are at 90° to each other. What intensity is transmitted?",
    options: ["Full intensity", "Half intensity", "Zero", "Quarter intensity"],
    correctAnswer: 2,
    explanation: "At 90°, cos²(90°) = 0, so no light is transmitted through crossed polarizers.",
    difficulty: "hard",
    topic: "Polarization"
  },
  {
    id: 29,
    question: "Light is polarized at 60° to a polarizer's axis. What fraction is transmitted?",
    options: ["0.25", "0.5", "0.75", "0.25 (cos²60° = 0.25)"],
    correctAnswer: 0,
    explanation: "Using Malus's Law: cos²(60°) = (0.5)² = 0.25, so 25% is transmitted.",
    difficulty: "hard",
    topic: "Polarization"
  },
  {
    id: 30,
    question: "Brewster's angle is the angle where:",
    options: ["All light is reflected", "Reflected light is completely polarized", "No light is transmitted", "Maximum absorption occurs"],
    correctAnswer: 1,
    explanation: "At Brewster's angle, reflected light is completely polarized perpendicular to the plane of incidence.",
    difficulty: "hard",
    topic: "Polarization"
  },
  {
    id: 31,
    question: "Circular polarization occurs when:",
    options: ["Two perpendicular waves are in phase", "Two perpendicular waves have 90° phase difference", "Light passes through one polarizer", "Light is reflected"],
    correctAnswer: 1,
    explanation: "Circular polarization results from two perpendicular waves with equal amplitude and 90° phase difference.",
    difficulty: "hard",
    topic: "Polarization"
  },
  {
    id: 32,
    question: "Polaroid sunglasses work by:",
    options: ["Absorbing all light", "Blocking horizontally polarized glare", "Increasing brightness", "Changing light color"],
    correctAnswer: 1,
    explanation: "Polaroid sunglasses block horizontally polarized light (glare from reflective surfaces) while transmitting vertical polarization.",
    difficulty: "hard",
    topic: "Polarization"
  },
  
  // Additional Medium Questions
  {
    id: 33,
    question: "What is the frequency range of audible sound for humans?",
    options: ["1 Hz - 100 Hz", "20 Hz - 20,000 Hz", "100 Hz - 10,000 Hz", "1000 Hz - 50,000 Hz"],
    correctAnswer: 1,
    explanation: "The human hearing range is typically 20 Hz to 20,000 Hz (20 kHz).",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 34,
    question: "What determines the pitch of a sound?",
    options: ["Amplitude", "Frequency", "Wavelength", "Speed"],
    correctAnswer: 1,
    explanation: "Pitch is determined by frequency - higher frequency means higher pitch.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 35,
    question: "What determines the loudness of a sound?",
    options: ["Frequency", "Wavelength", "Amplitude", "Speed"],
    correctAnswer: 2,
    explanation: "Loudness is related to the amplitude (or intensity) of the sound wave.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 36,
    question: "Echo is caused by:",
    options: ["Refraction", "Reflection", "Diffraction", "Absorption"],
    correctAnswer: 1,
    explanation: "Echo is the reflection of sound waves off a surface back to the listener.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 37,
    question: "A wave with frequency 440 Hz travels at 330 m/s. What is its wavelength?",
    options: ["0.75 m", "1.33 m", "0.5 m", "2 m"],
    correctAnswer: 0,
    explanation: "Using λ = v/f: λ = 330/440 = 0.75 m",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 38,
    question: "Which color of visible light has the highest frequency?",
    options: ["Red", "Green", "Blue", "Violet"],
    correctAnswer: 3,
    explanation: "Violet light has the highest frequency (and shortest wavelength) in the visible spectrum.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 39,
    question: "What is the wavelength of red light (approximately)?",
    options: ["400 nm", "500 nm", "600 nm", "700 nm"],
    correctAnswer: 3,
    explanation: "Red light has the longest wavelength in the visible spectrum, approximately 700 nm.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 40,
    question: "Resonance occurs when:",
    options: ["Frequency matches natural frequency", "Amplitude is maximum", "Wavelength is minimum", "Speed is zero"],
    correctAnswer: 0,
    explanation: "Resonance occurs when the driving frequency matches the system's natural frequency, causing large amplitude oscillations.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  
  // Additional Hard Questions
  {
    id: 41,
    question: "If sound intensity increases by 20 dB, by what factor does the intensity increase?",
    options: ["2×", "10×", "100×", "1000×"],
    correctAnswer: 2,
    explanation: "Each 10 dB increase is a 10× intensity increase, so 20 dB = 10 × 10 = 100×",
    difficulty: "hard",
    topic: "Intensity"
  },
  {
    id: 42,
    question: "The threshold of hearing is defined as:",
    options: ["0 dB", "10 dB", "20 dB", "1 dB"],
    correctAnswer: 0,
    explanation: "0 dB is defined as the threshold of hearing - the quietest sound humans can detect.",
    difficulty: "hard",
    topic: "Intensity"
  },
  {
    id: 43,
    question: "Three polarizers at 0°, 45°, and 90° are placed in sequence. What is the transmitted intensity?",
    options: ["Zero", "I₀/8", "I₀/4", "I₀/2"],
    correctAnswer: 1,
    explanation: "First: I₀/2, Second: (I₀/2)cos²(45°) = I₀/4, Third: (I₀/4)cos²(45°) = I₀/8",
    difficulty: "hard",
    topic: "Polarization"
  },
  {
    id: 44,
    question: "Birefringent materials:",
    options: ["Have one refractive index", "Have two different refractive indices", "Absorb all light", "Reflect all light"],
    correctAnswer: 1,
    explanation: "Birefringent materials have different refractive indices for different polarization directions, causing double refraction.",
    difficulty: "hard",
    topic: "Polarization"
  },
  {
    id: 45,
    question: "In a standing wave, nodes are points where:",
    options: ["Amplitude is maximum", "Amplitude is zero", "Velocity is maximum", "Energy is maximum"],
    correctAnswer: 1,
    explanation: "Nodes are points of zero amplitude in a standing wave, where destructive interference occurs.",
    difficulty: "hard",
    topic: "Wave Properties"
  },
  {
    id: 46,
    question: "The fundamental frequency of a string depends on:",
    options: ["Length only", "Length, tension, and mass per unit length", "Amplitude only", "Frequency only"],
    correctAnswer: 1,
    explanation: "f = (1/2L)√(T/μ), where L is length, T is tension, and μ is mass per unit length.",
    difficulty: "hard",
    topic: "Wave Properties"
  },
  {
    id: 47,
    question: "Beats are produced by:",
    options: ["Two waves of same frequency", "Two waves of slightly different frequencies", "A single wave", "Stationary waves"],
    correctAnswer: 1,
    explanation: "Beats occur when two waves with slightly different frequencies interfere, creating periodic amplitude variations.",
    difficulty: "hard",
    topic: "Wave Properties"
  },
  {
    id: 48,
    question: "The beat frequency equals:",
    options: ["Sum of the two frequencies", "Difference of the two frequencies", "Average of the two frequencies", "Product of the two frequencies"],
    correctAnswer: 1,
    explanation: "Beat frequency = |f₁ - f₂|, the absolute difference between the two frequencies.",
    difficulty: "hard",
    topic: "Wave Properties"
  },
  {
    id: 49,
    question: "A wave pulse on a string reflects from a fixed end:",
    options: ["Without phase change", "With 180° phase change", "With 90° phase change", "With no reflection"],
    correctAnswer: 1,
    explanation: "Reflection from a fixed end inverts the pulse, equivalent to a 180° phase change.",
    difficulty: "hard",
    topic: "Wave Properties"
  },
  {
    id: 50,
    question: "The speed of a wave on a string increases with:",
    options: ["Decreasing tension", "Increasing tension", "Increasing mass per unit length", "Decreasing length"],
    correctAnswer: 1,
    explanation: "v = √(T/μ), so wave speed increases with tension and decreases with mass per unit length.",
    difficulty: "hard",
    topic: "Wave Properties"
  },
  {
    id: 51,
    question: "What happens to light speed when entering water from air?",
    options: ["Increases", "Decreases", "Stays same", "Becomes zero"],
    correctAnswer: 1,
    explanation: "Light slows down in water because water has a higher refractive index than air.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 52,
    question: "The refractive index of a medium is:",
    options: ["Speed of light in medium / speed in vacuum", "Speed in vacuum / speed in medium", "Wavelength in medium / wavelength in vacuum", "Frequency in medium / frequency in vacuum"],
    correctAnswer: 1,
    explanation: "n = c/v, where c is speed in vacuum and v is speed in the medium.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 53,
    question: "Total internal reflection occurs when:",
    options: ["Light goes from rarer to denser medium", "Light goes from denser to rarer medium at large angles", "Light hits at 0°", "Light is absorbed"],
    correctAnswer: 1,
    explanation: "Total internal reflection occurs when light travels from a denser to rarer medium at angles greater than the critical angle.",
    difficulty: "hard",
    topic: "Wave Properties"
  },
  {
    id: 54,
    question: "Huygens' principle states that:",
    options: ["Light is a particle", "Every point on a wavefront is a source of secondary wavelets", "Light speed is constant", "Waves need a medium"],
    correctAnswer: 1,
    explanation: "Huygens' principle states that each point on a wavefront acts as a source of secondary spherical wavelets.",
    difficulty: "hard",
    topic: "Wave Properties"
  },
  {
    id: 55,
    question: "Young's double-slit experiment demonstrates:",
    options: ["Particle nature of light", "Wave nature of light", "Photoelectric effect", "Compton effect"],
    correctAnswer: 1,
    explanation: "The interference pattern in Young's experiment demonstrates the wave nature of light.",
    difficulty: "medium",
    topic: "Wave Properties"
  },
  {
    id: 56,
    question: "The fringe spacing in double-slit interference is:",
    options: ["Directly proportional to wavelength", "Inversely proportional to wavelength", "Independent of wavelength", "Proportional to wavelength squared"],
    correctAnswer: 0,
    explanation: "Fringe spacing Δy = λD/d, so it's directly proportional to wavelength.",
    difficulty: "hard",
    topic: "Wave Properties"
  },
  {
    id: 57,
    question: "Coherent sources have:",
    options: ["Same frequency only", "Same frequency and constant phase difference", "Same amplitude only", "Different frequencies"],
    correctAnswer: 1,
    explanation: "Coherent sources maintain a constant phase relationship, requiring the same frequency.",
    difficulty: "hard",
    topic: "Wave Properties"
  },
  {
    id: 58,
    question: "In a transverse wave, particles oscillate:",
    options: ["Parallel to wave direction", "Perpendicular to wave direction", "In circular motion", "Not at all"],
    correctAnswer: 1,
    explanation: "In transverse waves, particle oscillations are perpendicular to the direction of wave propagation.",
    difficulty: "easy",
    topic: "Wave Basics"
  },
  {
    id: 59,
    question: "In a longitudinal wave, particles oscillate:",
    options: ["Parallel to wave direction", "Perpendicular to wave direction", "In circular motion", "Not at all"],
    correctAnswer: 0,
    explanation: "In longitudinal waves, particle oscillations are parallel to the direction of wave propagation.",
    difficulty: "easy",
    topic: "Wave Basics"
  },
  {
    id: 60,
    question: "Sound waves are:",
    options: ["Transverse", "Longitudinal", "Electromagnetic", "Stationary"],
    correctAnswer: 1,
    explanation: "Sound waves are longitudinal mechanical waves requiring a medium to propagate.",
    difficulty: "easy",
    topic: "Wave Basics"
  }
];
