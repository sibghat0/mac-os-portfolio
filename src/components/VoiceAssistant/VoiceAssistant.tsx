import { useState, useEffect, useRef } from "react";
import { useAiChatMutation } from "@/api/AiService";
import { useDocker } from "@/composable/useDocker";
import { apps } from "@/utils/constant";

type AssistantStatus =
  | "sleeping"
  | "idle"
  | "listening"
  | "processing"
  | "speaking"
  | "executing";

export default function VoiceAssistant() {
  const [status, setStatus] = useState<AssistantStatus>("sleeping");

  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const isProcessingRef = useRef<boolean>(false);

  const { appOpen, setAppOpen, setActiveApp } = useDocker();

  const chatMutation = useAiChatMutation({
    onSuccess: (audioBlobResponse) => {
      if (audioPlayerRef.current) {
        const audioUrl = URL.createObjectURL(audioBlobResponse);
        audioPlayerRef.current.src = audioUrl;
        audioPlayerRef.current.play();
        setStatus("speaking");
      }
    },
    onError: (error) => {
      console.error("AI Request Failed:", error);
      resetAssistant();
    },
  });

  const handleLocalCommand = (transcript: string): boolean => {
    const text = transcript.toLowerCase();

    if (text.startsWith("open ")) {
      const targetAppKey = text.replace("open ", "").trim();
      const appId = apps.find((app) => app.uniqueId === targetAppKey)?.uniqueId;

      if (appId) {
        if (!appOpen.includes(appId)) {
          setAppOpen([...appOpen, appId]);
        }
        setActiveApp(appId);
        setStatus("executing");

        setTimeout(() => {
          resetAssistant();
        }, 1500);

        return true;
      }
    }

    return false;
  };

  const startRecordingCommand = async () => {
    setStatus("listening");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => audioChunks.push(e.data);

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        setStatus("processing");
        chatMutation.mutate(audioBlob);
      };

      mediaRecorder.start();

      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
      }, 6000);
    } catch (error) {
      console.error("Microphone access denied:", error);
      resetAssistant();
    }
  };

  const initAssistant = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
      const transcript = event.results[event.results.length - 1][0].transcript
        .trim()
        .toLowerCase();
      console.log("🗣️ Heard:", transcript);

      if (transcript.includes("hey pixie") && !isProcessingRef.current) {
        isProcessingRef.current = true;
        recognition.stop();
        startRecordingCommand();
      } else if (!isProcessingRef.current) {
        const isHandledLocally = handleLocalCommand(transcript);
        if (isHandledLocally) {
          isProcessingRef.current = true;
          recognition.stop();
        }
      }
    };

    recognition.onend = () => {
      if (!isProcessingRef.current && recognitionRef.current) {
        recognitionRef.current.start();
      }
    };

    setStatus("idle");
    recognition.start();
  };

  const resetAssistant = () => {
    isProcessingRef.current = false;
    setStatus("idle");
    recognitionRef.current?.start();
  };

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);
  return (
    <div className=" absolute top-0 right-0 z-40 transform flex flex-col items-center justify-center p-6 gap-6">
      <div
        onClick={status === "sleeping" ? initAssistant : undefined}
        className={`w-20 h-20 rounded-full animate-pulse flex items-center justify-center transition-all duration-500 cursor-pointer ${
          status === "sleeping"
            ? "bg-gray-600 hover:bg-gray-500"
            : status === "idle"
              ? "bg-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
              : status === "listening"
                ? "bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 animate-pulse shadow-[0_0_50px_rgba(236,72,153,0.6)]"
                : status === "processing"
                  ? "bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 animate-bounce"
                  : status === "executing"
                    ? "bg-green-500 shadow-[0_0_50px_rgba(34,197,94,0.8)]"
                    : "bg-gradient-to-tr from-blue-400 to-cyan-400 shadow-[0_0_60px_rgba(56,189,248,0.8)]"
        }`}
      >
        <span className="text-white font-medium text-[10px]">
          {status === "sleeping" && "Click to Start"}
          {status === "idle" && "Say 'Hey Pixie'"}
          {status === "listening" && "Listening..."}
          {status === "processing" && "Thinking..."}
          {status === "executing" && "Opening App..."}
          {status === "speaking" && "Speaking"}
        </span>
      </div>

      <audio ref={audioPlayerRef} onEnded={resetAssistant} className="hidden" />
    </div>
  );
}
