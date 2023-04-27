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
  level?:number
  idTheme:number
}

export interface Progress {
  id:string
  name:string
  timeOfDay:TimeDay[]
  countDays:number
  tasksCompleted:number
}

export interface TimeDay{
  date:string
  counter:number
}
export interface AllTime{
  firstDay:number
  lastDay:number
}

