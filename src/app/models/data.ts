export interface Data {
  id:number
  englishWord: string;
  englishTranscription: string;
  ukrainianTranscription: string;
  ukrainianTranslation: string;
  englishSentence: string;
  ukrainianTranslationOfSentence: string;
  synonyms?: string[];
  level?:number
}
