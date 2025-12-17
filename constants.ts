import { Tool, Category, CostType } from './types';

export const AI_TOOLS: Tool[] = [
  // LLMs
  { id: '1', name: 'GPT-4 (OpenAI)', url: 'https://openai.com/chatgpt', description: 'Leading LLM known for coherence, creativity, and reasoning.', category: Category.LLM, cost: CostType.HYBRID, icon: '🧠' },
  { id: '2', name: 'Gemini (Google)', url: 'https://gemini.google.com/', description: 'Multimodal family (text, code, image, audio) with deep ecosystem integration.', category: Category.LLM, cost: CostType.HYBRID, icon: '💎' },
  { id: '3', name: 'Claude 3 (Anthropic)', url: 'https://www.anthropic.com/product/claude', description: 'Focused on safety, performance, and massive context windows.', category: Category.LLM, cost: CostType.HYBRID, icon: '📜' },
  { id: '4', name: 'Perplexity AI', url: 'https://www.perplexity.ai/', description: ' conversational answer engine with real-time source citation.', category: Category.LLM, cost: CostType.HYBRID, icon: '🔎' },
  { id: '5', name: 'Llama 3 (Meta)', url: 'https://llama.meta.com/', description: 'Open-source state-of-the-art models for local deployment.', category: Category.LLM, cost: CostType.FREE, icon: '🦙' },
  { id: '6', name: 'Mistral AI', url: 'https://mistral.ai/', description: 'Efficient open-weight models from Europe.', category: Category.LLM, cost: CostType.HYBRID, icon: '🌬️' },

  // Visual
  { id: '7', name: 'Midjourney', url: 'https://www.midjourney.com/', description: 'Artistic, high-fidelity image generation via Discord.', category: Category.IMAGE_VIDEO, cost: CostType.PAID, icon: '🌌' },
  { id: '8', name: 'DALL-E 3', url: 'https://openai.com/dall-e', description: 'Easy to use image generation integrated into ChatGPT.', category: Category.IMAGE_VIDEO, cost: CostType.PAID, icon: '👁️' },
  { id: '9', name: 'Runway Gen-2', url: 'https://runwayml.com/gen-2', description: 'Text-to-video and video-to-video generation platform.', category: Category.IMAGE_VIDEO, cost: CostType.HYBRID, icon: '🎬' },
  { id: '10', name: 'Stable Diffusion', url: 'https://stability.ai/', description: 'Open-source image generation offering maximum control.', category: Category.IMAGE_VIDEO, cost: CostType.FREE, icon: '🧪' },
  { id: '11', name: 'Adobe Firefly', url: 'https://www.adobe.com/sensei/firefly.html', description: 'Commercial-safe generation integrated into Adobe Cloud.', category: Category.IMAGE_VIDEO, cost: CostType.HYBRID, icon: '🔥' },
  { id: '12', name: 'Pika Labs', url: 'https://pika.art/', description: 'Video generation known for animation speed and cinematic style.', category: Category.IMAGE_VIDEO, cost: CostType.HYBRID, icon: '⚡' },
  { id: '13', name: 'SORA (OpenAI)', url: 'https://openai.com/sora', description: 'Advanced video generation with physics simulation (Preview).', category: Category.IMAGE_VIDEO, cost: CostType.PAID, icon: '🌠' },
  { id: '14', name: 'Polycam', url: 'https://poly.cam/', description: '3D capture and photogrammetry using AI.', category: Category.IMAGE_VIDEO, cost: CostType.HYBRID, icon: '🔺' },

  // Coding
  { id: '15', name: 'GitHub Copilot', url: 'https://github.com/features/copilot', description: 'AI pair programmer integrated into your IDE.', category: Category.CODING, cost: CostType.PAID, icon: '🐙' },
  { id: '16', name: 'Amazon CodeWhisperer', url: 'https://aws.amazon.com/codewhisperer/', description: 'Coding companion optimized for AWS services.', category: Category.CODING, cost: CostType.HYBRID, icon: '☁️' },
  { id: '17', name: 'Tabnine', url: 'https://www.tabnine.com/', description: 'Context-aware code completion with privacy focus.', category: Category.CODING, cost: CostType.HYBRID, icon: '➕' },

  // Audio
  { id: '18', name: 'Whisper (OpenAI)', url: 'https://openai.com/research/whisper', description: 'Robust speech recognition and transcription.', category: Category.AUDIO, cost: CostType.FREE, icon: '👂' },
  { id: '19', name: 'ElevenLabs', url: 'https://elevenlabs.io/', description: 'High-quality voice cloning and text-to-speech.', category: Category.AUDIO, cost: CostType.HYBRID, icon: '🗣️' },
  { id: '20', name: 'Suno AI', url: 'https://www.suno.ai/', description: 'Generates full songs with lyrics and vocals.', category: Category.AUDIO, cost: CostType.HYBRID, icon: '🎤' },

  // Analysis & Science
  { id: '21', name: 'AlphaFold', url: 'https://deepmind.google/technologies/alphafold/', description: 'Predicts 3D structures of proteins.', category: Category.ANALYSIS, cost: CostType.FREE, icon: '🧬' },
  { id: '22', name: 'H2O.ai', url: 'https://h2o.ai/', description: 'Automated machine learning platform (AutoML).', category: Category.ANALYSIS, cost: CostType.HYBRID, icon: '💧' },
  { id: '23', name: 'Databricks', url: 'https://www.databricks.com/', description: 'Unified data and AI analytics platform.', category: Category.ANALYSIS, cost: CostType.PAID, icon: '🐻' },

  // Business
  { id: '24', name: 'Grammarly', url: 'https://www.grammarly.com/', description: 'Writing assistant for grammar and tone.', category: Category.BUSINESS, cost: CostType.HYBRID, icon: '✍️' },
  { id: '25', name: 'UiPath', url: 'https://www.uipath.com/', description: 'Robotic Process Automation (RPA) with AI.', category: Category.BUSINESS, cost: CostType.PAID, icon: '🤖' },
  { id: '26', name: 'Darktrace', url: 'https://www.darktrace.com/', description: 'Self-learning cybersecurity AI.', category: Category.BUSINESS, cost: CostType.PAID, icon: '⚫' },

  // Consumer
  { id: '27', name: 'Alexa / Google Home', url: 'https://store.google.com', description: 'Voice-activated smart home assistants.', category: Category.CONSUMER, cost: CostType.FREE, icon: '🏠' },
];

export const AMBIENT_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112762.mp3";
