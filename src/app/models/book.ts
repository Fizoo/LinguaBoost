export interface Book{
  id:number
  book_title:string
  author:string
  level:string
  genre:string
  audioAllBookUrl?:string
  chapters:Chapters[]
  poster?:string
}
export  interface Chapters{
  chapter_number:string
  chapter_title:string
  id:number
  audioUrl?:string
  sentences:Sentence[]
}
export interface Sentence{
  sentence:string
  translation:string

}


