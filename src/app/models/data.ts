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

export interface Main{
  data:Theme[]
}

export interface Theme {
  id:string
  name:string
  data:Words[]
}

export interface Words{
  id:number
  englishWord: string
  englishTranscription: string
  ukrainianTranslation: string
  englishSentence: string;
  ukrainianTranslationOfSentence: string;
  synonyms: string[];
  level:number
  idTheme:number
  isFavorite?:boolean
}

export interface TopicPhrases{
  id:number
  topic:string
  data:Phrase[]

}

export interface Phrase {
  id:number
  phrase:string
  translateToUA:string
  isFavorite?:boolean
  sentenceWithPhrase?:string
  translateSentenceToUA?:string
  idPhrase: number,

}

