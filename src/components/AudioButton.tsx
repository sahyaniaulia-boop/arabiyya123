import { useEffect, useRef, useState } from "react";

function findArabicVoice(voices: SpeechSynthesisVoice[]) {
  return (
    voices.find((voice) => voice.lang.toLowerCase() === "ar-sa") ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith("ar-")) ||
    voices.find((voice) => voice.lang.toLowerCase() === "ar")
  );
}

function waitForArabicVoice(
  synth: SpeechSynthesis,
  timeoutMs = 1800
): Promise<SpeechSynthesisVoice | undefined> {
  const currentVoice = findArabicVoice(synth.getVoices());
  if (currentVoice) return Promise.resolve(currentVoice);

  return new Promise((resolve) => {
    let finished = false;

    const cleanup = () => {
      window.clearTimeout(timer);
      synth.removeEventListener("voiceschanged", checkVoices);
    };

    const finish = (voice?: SpeechSynthesisVoice) => {
      if (finished) return;
      finished = true;
      cleanup();
      resolve(voice);
    };

    const checkVoices = () => {
      const voice = findArabicVoice(synth.getVoices());
      if (voice) finish(voice);
    };

    const timer = window.setTimeout(() => {
      finish(findArabicVoice(synth.getVoices()));
    }, timeoutMs);

    synth.addEventListener("voiceschanged", checkVoices);
    // Check again after registering the listener to avoid a timing race.
    checkVoices();
  });
}

export default function AudioButton({ text }: { text: string }) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const requestId = useRef(0);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    // Calling getVoices() helps some browsers begin loading their voice list.
    synth.getVoices();

    const refreshVoices = () => synth.getVoices();
    synth.addEventListener("voiceschanged", refreshVoices);

    return () => {
      requestId.current += 1;
      synth.removeEventListener("voiceschanged", refreshVoices);
      synth.cancel();
    };
  }, []);

  async function play() {
    if (!("speechSynthesis" in window)) {
      setMessage("Browser ini belum mendukung Text-to-Speech.");
      return;
    }

    const synth = window.speechSynthesis;
    const currentRequest = ++requestId.current;

    synth.cancel();
    setPlaying(false);
    setLoading(true);
    setMessage("");

    const arabicVoice = await waitForArabicVoice(synth);

    // Ignore this request if the user pressed stop while voices were loading.
    if (currentRequest !== requestId.current) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    utterance.rate = 0.78;
    utterance.pitch = 1;

    if (arabicVoice) {
      utterance.voice = arabicVoice;
      setMessage("");
    } else {
      // Keep the Arabic language hint even if the browser does not expose
      // an Arabic voice in getVoices(). The operating system may still resolve it.
      setMessage(
        "Voice Arab belum tersedia dalam daftar browser. Pelafalan dicoba dengan pengaturan bahasa Arab perangkat."
      );
    }

    utterance.onstart = () => {
      setLoading(false);
      setPlaying(true);
    };

    utterance.onend = () => {
      setLoading(false);
      setPlaying(false);
    };

    utterance.onerror = () => {
      setLoading(false);
      setPlaying(false);
      setMessage(
        "Pelafalan tidak dapat diputar. Pastikan perangkat memiliki dukungan suara bahasa Arab."
      );
    };

    setLoading(false);
    setPlaying(true);
    synth.speak(utterance);
  }

  function stop() {
    requestId.current += 1;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setLoading(false);
    setPlaying(false);
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        className="audio-btn"
        onClick={playing || loading ? stop : play}
        aria-label={
          playing || loading ? "Hentikan pelafalan" : "Dengarkan pelafalan"
        }
        title={playing || loading ? "Hentikan" : "Dengarkan"}
      >
        {loading ? "…" : playing ? "■" : "▶"}
      </button>

      <span className="text-xs font-bold text-[#164e42]">
        {loading ? "Memuat suara…" : playing ? "Sedang berbicara" : "Dengarkan"}
      </span>

      {message && (
        <span className="max-w-[240px] text-center text-[10px] text-amber-700">
          {message}
        </span>
      )}
    </div>
  );
}
