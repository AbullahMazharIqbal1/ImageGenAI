import { useState } from 'react';
import { toast } from 'sonner';

interface GenerateImageParams {
  prompt: string;
  width?: number; // Not used by API directly, kept for future providers
  height?: number; // Not used by API directly, kept for future providers
  model?: 'gemini-2.5-flash-image-preview';
  apiKey?: string; // Optional override, otherwise read from localStorage
}

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateImage = async ({ prompt, width = 1024, height = 1024 }: GenerateImageParams) => {
    setIsGenerating(true);

    try {
      // Enhance prompt for cinematic advertisement quality
      const enhancedPrompt = `Professional advertising photography, cinematic lighting, commercial grade quality. ${prompt}. Shot with professional camera equipment, studio lighting setup, ultra high resolution 8K, award-winning composition, magazine advertisement quality, dramatic shadows and highlights, color graded, photorealistic, masterpiece quality, trending on behance and dribbble.`;

      // Free, no‑key image generation via Pollinations (Flux model)
      const seed = Date.now();
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        enhancedPrompt
      )}?width=${width}&height=${height}&model=flux&n=1&safe=true&seed=${seed}`;

      // Set direct URL (fast display). Download will fetch as blob separately.
      setGeneratedImage(url);
      toast.success('Image generated successfully!');
      return url;
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image. Please try again.');
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };


  const resetImage = () => setGeneratedImage(null);

  return { isGenerating, generatedImage, generateImage, resetImage };
};