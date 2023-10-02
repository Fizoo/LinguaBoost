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
  type?:string
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
  tempLevel?:number
}

export interface TopicPhrases{
  id:number
  name:string
  data:Phrase[]
  type?:string

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

export interface CollectTopic {
  id:string
  name:string
  data:CollectTopicItem[]
  type:string
}

export interface CollectTopicItem {
  id:number
  text:string
  translateToUA:string
  idTopic:number
  type:string
}

