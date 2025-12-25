
export interface DIYFix {
  problem: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  toolsNeeded: string[];
  steps: string[];
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  category: string;
  marketPrice: number;
  currency: string;
  licenseRequired: string;
  description: string;
  diyFixes: DIYFix[];
  imageUrl?: string;
}

export interface SearchState {
  query: string;
  loading: boolean;
  error: string | null;
}
