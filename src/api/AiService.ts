import { useMutation } from "@tanstack/react-query";
import type { UseMutationOptions } from "@tanstack/react-query";

const sendAudioCommand = async (audioBlob: Blob): Promise<Blob> => {
  console.log("🚀 Sending audio blob to backend:", audioBlob.size, "bytes");
  const formData = new FormData();
  formData.append("audio", audioBlob, "voice.webm");

  const response = await fetch(
    "https://ai-asistant-siri.onrender.com/ai/chat",
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Failed to communicate with AI server");
  }

  return await response.blob();
};

export const useAiChatMutation = (
  options?: UseMutationOptions<Blob, Error, Blob>,
) => {
  return useMutation({
    mutationFn: sendAudioCommand,
    ...options,
  });
};
