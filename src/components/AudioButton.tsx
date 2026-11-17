import { useEffect, useState } from "react";

export default function AudioButton({ text }: { text: string }) {
  const [playing, setPlaying] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    };
  }, []);

  function play() {
    if (!("speechSynthesis" in window)) {
      setMessage("Browser ini belum mendukung Text-to-Speech.");
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.78;
    utterance.pitch = 1;

    const voices = synth.getVoices();
    const arabicVoice =
      voices.find((voice) => voice.lang.toLowerCase() === "ar-sa") ||
      voices.find((voice) => voice.lang.toLowerCase().startsWith("ar"));

    if (arabicVoice) {
      utterance.voice = arabicVoice;
      setMessage("");
    } else {
      setMessage("Suara Arab khusus belum terdeteksi. Hasil suara bergantung pada perangkat.");
    }

    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => {
      setPlaying(false);
      setMessage("Pelafalan tidak dapat diputar. Periksa dukungan suara Arab pada pengaturan perangkat.");
    };

    setPlaying(true);
    synth.speak(utterance);
  }

  function stop() {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setPlaying(false);
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        className="audio-btn"
        onClick={playing ? stop : play}
        aria-label={playing ? "Hentikan pelafalan" : "Dengarkan pelafalan"}
      >
        {playing ? "■" : "▶"}
      </button>
      <span className="text-xs font-bold text-[#164e42]">
        {playing ? "Sedang berbicara" : "Dengarkan"}
      </span>
      {message && (
        <span className="max-w-[240px] text-center text-[10px] text-amber-700">
          {message}
        </span>
      )}
    </div>
  );
}
