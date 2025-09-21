import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Download, Sparkles, Image as ImageIcon, Wand2, Palette, Zap, Star } from 'lucide-react';
import { useImageGeneration } from '@/hooks/useImageGeneration';
import { toast } from 'sonner';

const ImageGenAI = () => {
  const [prompt, setPrompt] = useState('');
  const { isGenerating, generatedImage, generateImage, resetImage } = useImageGeneration();


  const examplePrompts = [
    "Luxury sports car parked in a modern glass building lobby, dramatic lighting, commercial automotive advertisement",
    "Professional business team celebrating success in a sleek boardroom, cinematic corporate photography",
    "Premium skincare product floating in ethereal lighting with water droplets, beauty advertisement style",
    "High-end restaurant interior with elegant plating, food photography for luxury dining magazine",
    "Fashion model in designer clothing against urban cityscape backdrop, editorial fashion photography",
    "Technology product showcase with holographic elements, futuristic commercial advertising style"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt to generate an image');
      return;
    }

    try {
      await generateImage({ 
        prompt
      });
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      const res = await fetch(generatedImage, { mode: 'cors' });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `image-gen-ai-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Image downloaded successfully!');
    } catch (e) {
      toast.error('Download failed. Please try again.');
    }
  };

  const handleNewImage = () => {
    resetImage();
    setPrompt('');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Header */}
      <header className="bg-gradient-hero text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-foreground/10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-3 bg-primary-foreground/10 rounded-full backdrop-blur-sm">
                <Wand2 className="w-8 h-8" />
              </div>
            <h1 className="text-5xl md:text-7xl font-bold">
              Cinematic AI Image Studio
            </h1>
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm animate-glow">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              Create advertisement-quality cinematic visuals with professional graphic designer expertise
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Star className="w-4 h-4 mr-2" />
                Free & No API Key
              </Badge>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Cinematic Quality (Flux AI)
                </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Input Section */}
          <div className="space-y-8 animate-slide-up">
            <Card className="card-elegant p-8 bg-card/80 backdrop-blur-sm">
              <CardContent className="space-y-6 p-0">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5 text-primary" />
                    <label className="text-xl font-semibold text-foreground">
                      Describe Your Vision
                    </label>
                  </div>
                    <Textarea
                      placeholder="Describe your cinematic vision... Think advertisement quality: lighting, composition, mood, style. Be specific for best results."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-36 text-base border-2 focus:border-primary/50 transition-all duration-300 resize-none"
                      disabled={isGenerating}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Tip: Describe like directing a photoshoot - lighting, angles, mood, and style
                    </p>

                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="btn-hero w-full h-14 text-lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      Creating Your Professional Image...
                    </>
                  ) : (
                      <>
                        <ImageIcon className="w-6 h-6 mr-3" />
                        Generate Cinematic Image
                      </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Example Prompts */}
            <Card className="card-elegant p-6 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-0">
                <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Cinematic Advertisement Examples
                </h3>
                <div className="grid gap-3">
                  {examplePrompts.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setPrompt(example)}
                      className="text-left w-full p-4 rounded-lg bg-muted/50 hover:bg-muted hover:shadow-md transition-all duration-300 text-sm border border-transparent hover:border-primary/20"
                      disabled={isGenerating}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-foreground">{example}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Output Section */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="card-elegant p-8 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-0">
                {isGenerating ? (
                  <div className="aspect-square bg-gradient-subtle rounded-xl flex items-center justify-center border-2 border-dashed border-primary/30">
                    <div className="text-center">
                      <div className="animate-glow mb-6">
                        <div className="relative">
                          <Sparkles className="w-20 h-20 mx-auto text-primary" />
                          <div className="absolute inset-0 animate-spin">
                            <Loader2 className="w-20 h-20 mx-auto text-primary/50" />
                          </div>
                        </div>
                      </div>
                      <p className="text-xl font-semibold text-foreground mb-2">
                        AI is creating your masterpiece...
                      </p>
                      <p className="text-muted-foreground mb-6">
                        This may take a few moments for the best quality
                      </p>
                      <div className="w-48 h-3 bg-muted rounded-full mx-auto overflow-hidden">
                        <div className="h-full bg-gradient-primary rounded-full animate-pulse" style={{ width: '70%' }} />
                      </div>
                    </div>
                  </div>
                ) : generatedImage ? (
                  <div className="space-y-6">
                    <div className="aspect-square rounded-xl overflow-hidden bg-muted/20 shadow-card">
                      <img
                        src={generatedImage}
                        alt={`Generated image for: ${prompt || 'your prompt'}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={handleDownload}
                        className="btn-professional flex-1 h-12"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download HD Image
                      </Button>
                      <Button
                        onClick={handleNewImage}
                        variant="outline"
                        className="px-8 h-12 border-2 hover:border-primary/50"
                      >
                        Create New
                      </Button>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        🎉 Professional image generated successfully! Ready for commercial use.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square bg-gradient-subtle rounded-xl flex items-center justify-center border-2 border-dashed border-muted">
                    <div className="text-center max-w-xs">
                      <ImageIcon className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        Your Masterpiece Awaits
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Enter a detailed prompt and click generate to create stunning professional visuals
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 animate-fade-in">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose Cinematic AI Studio?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional advertising photography quality powered by cutting-edge AI
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: "Advertisement Quality",
                description: "Cinematic lighting and composition like professional graphic designers create.",
              },
              {
                icon: ImageIcon,
                title: "Completely Free",
                description: "No sign‑up, no API key needed. Generate instantly in your browser.",
              },
              {
                icon: Zap,
                title: "Studio-Grade Results",
                description: "Professional advertising photography quality with Flux AI technology.",
              }
            ].map((feature, index) => (
              <Card key={index} className="card-elegant p-8 text-center hover:shadow-elegant transition-all duration-300 bg-card/60 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center animate-fade-in bg-gradient-hero rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Professional Images?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using AI to create stunning visuals
          </p>
          <Button 
            onClick={() => document.querySelector('textarea')?.focus()}
            className="btn-hero"
          >
            <Wand2 className="w-5 h-5 mr-2" />
            Start Creating Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageGenAI;