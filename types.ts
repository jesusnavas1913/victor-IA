export enum CostType {
  FREE = 'Free',
  PAID = 'Paid',
  HYBRID = 'Freemium',
}

export enum Category {
  LLM = 'Language & Reasoning',
  IMAGE_VIDEO = 'Visual Generation',
  CODING = 'Coding & Dev',
  AUDIO = 'Audio & Speech',
  ANALYSIS = 'Analysis & Science',
  BUSINESS = 'Business & Security',
  CONSUMER = 'Consumer & Home',
}

export interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  category: Category;
  cost: CostType;
  icon: string; // Emoji char
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
