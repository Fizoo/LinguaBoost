import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IData} from "./data-reducer";
import {CollectTopic, Theme, Words} from "../../models/data";
import {ProgressSelectors} from "../progress/selectors";

const { getMedianWordsLearnedByDay } = ProgressSelectors;

export namespace DataSelectorsWords {
  export const getDataState = createFeatureSelector<IData>('data');

  export const getWordsData = createSelector(
    getDataState,
    (state) => state.data)

  export const getThemeById = (id: string) => createSelector(
    getWordsData,
    (state) => {
      return state.filter(el => el.id === id)[0] || []
    }
  )

  export const getAllThemes = createSelector(
    getWordsData,
    state => {
      return state
    }
  )

  export const getAllDataForDashboard = (id: string, type: string) => createSelector(
    getDataState,
    (state) => {
      let newArr: CollectTopic[] = []
      const {data, phrases} = state
      if (type === 'word') {
        newArr = data.map(el => ({
          ...el,
          type: 'word',
          data: el.data.map(a => ({
            id: a.id,
            text: a.englishWord,
            translateToUA: a.ukrainianTranslation,
            idTopic: a.idTheme,
            type: 'word'
          }))
        }))
      }
      if (type === 'phrase') {
        newArr = phrases.map(el => ({
          ...el,
          id: el.id.toString(),
          type: 'phrase',
          data: el.data.map(a => ({
            id: a.id,
            text: a.phrase,
            translateToUA: a.translateToUA,
            idTopic: a.idPhrase,
            type: 'phrase'
          }))
        }))
      }
      return newArr
    }
  )

  export const getListForDashboard = (id: string, type: string) => createSelector(
    getAllDataForDashboard(id, type),
    (state) => {
      //console.log(state)
      return state.filter(el => el.id === id)[0]
    }
  )

  export const getRandomListWith20ById = (id: string) => createSelector(
    getThemeById(id),
    (state: Theme) => {
      const selectedList: Words[] = []
      const {data: list} = state

      const highRankList = list.filter(({level}) => level === 2)
      const midRankList = list.filter(({level}) => level === 1)
      const lowRankList = list.filter(({level}) => level === 0)

      while (selectedList.length < 20 || selectedList.length === list.length) {
        let obj: Words | undefined
        let random = Math.random()

        if (highRankList.length > 0 && random < 0.10) {
          obj = highRankList.splice(Math.floor(Math.random() * highRankList.length), 1)[0]
        } else if (midRankList.length > 0 && random < 0.30) {
          obj = midRankList.splice(Math.floor(Math.random() * midRankList.length), 1)[0]
        } else if (lowRankList.length > 0 && random >= 0.3) {
          obj = lowRankList.splice(Math.floor(Math.random() * lowRankList.length), 1)[0]
        }

        if (obj) {
          selectedList.push(obj)
        }
      }
      return selectedList
    }
  )

  export const getProgressTheme = (id: string) => createSelector(
    getThemeById(id),
    (state) => {
      const arrLength = state.data.length
      const maxScore = arrLength * 2
      const curProgress = state.data.reduce((count, item) => count + item.level, 0)

      return (curProgress / maxScore) * 100
    }
  )

  export const combineAllWords = createSelector(
    getWordsData,
    state => {
      const uniqueWords: { [key: string]: Words } = {};

      state.forEach((theme: Theme) => {
        theme.data.forEach((word: Words) => {
          const existingWord = uniqueWords[word.englishWord];

          if (!existingWord || word.level > existingWord.level) {
            uniqueWords[word.englishWord] = word;
          }
        });
      });

      const filterState = Object.values(uniqueWords).sort((a, b) =>
        a.englishWord.localeCompare(b.englishWord)
      );

      return {
        id: -1,
        name: 'All',
        type: 'word',
        data: filterState
      };
    }
  );

  export const getWord=(word:string)=>createSelector(
    combineAllWords,
    state=>{
      return state.data.find(el=>el.englishWord.toLowerCase()===word.toLowerCase().trim()) || ''
    }
  )

  export const combineAllWords2 = createSelector(
    getWordsData,
    state => {
      const newState = state.reduce((acc: Words[], curr: Theme) => [...acc, ...curr.data], [])
        //.sort((a, b) => a.englishWord.localeCompare(b.englishWord))
      const uniqueWords: { [key: string]: boolean } = {}

      const filterState: Words[] = newState.filter((word) => {
        if (!uniqueWords[word.englishWord] && word.englishWord && word.englishWord.split(' ').length===1) {
          uniqueWords[word.englishWord] = true
          return true
        }
        return false
      }).map((word, i) => ({
        ...word,
        id: i
      })).sort((a, b) => a.englishWord.localeCompare(b.englishWord))

      return {
        id:-1,
        name:'All',
        type:'word',
        data:filterState
      }
    }
  )

  export const getLengthAllWords=createSelector(
    combineAllWords,
    data=>data.data.length
  )

  export const  selectWords=createSelector(
    combineAllWords,
    state=>state.data
  )
  export const getCountOfWordsByLevel=createSelector(
    selectWords,
    (_:any,level:any)=>level,
    (words,level)=>words.filter(word =>word.level===level).length

  )

  export const getCountHighOfWords=createSelector(
    combineAllWords,
    data=>data.data.filter(el=>el.level===2).length
  )
  export const getCountMiddleOfWords=createSelector(
    combineAllWords,
    data=>data.data.filter(el=>el.level===1).length
  )
  export const getCountLowOfWords=createSelector(
    combineAllWords,
    data=>data.data.filter(el=>el.level===0).length
  )
  export const getPercentage=createSelector(
    getCountHighOfWords,
    getCountMiddleOfWords,
    getCountLowOfWords,
    getLengthAllWords,
    (highLevelCount,mediumLevelCount,lowLevelCount,totalWordCount)=>{
      const totalLearnedWords=(highLevelCount*100)+(mediumLevelCount*50)
      if(totalLearnedWords===0 || totalWordCount===0){
        return  0
      }
      return (totalLearnedWords / (totalWordCount * 100)) * 100
    }
  )

  export const getTimeToLearnRemainingWord=createSelector(
    getLengthAllWords,
    getPercentage,
    getMedianWordsLearnedByDay,
    (wordsLen,percentage,countWords)=>{
      const learnedWords=Math.ceil ((wordsLen*percentage)/100)
      const countDays=Math.ceil((wordsLen-learnedWords)/(countWords))

      const day=new Date()
      day.setDate(countDays)
      //const x=day.toISOString()
      //console.log(x)
      return day
    }
  )

  export  const getObjectDiagram=createSelector(
    getCountHighOfWords,
    getCountMiddleOfWords,
    getCountLowOfWords,
    (h1,h2,h3)=>[
      {
      level: 'Top',
      count: h1,
    }, {
      level: 'Middle',
      count: h2,
    }, {
      level: 'Low',
      count: h3,
    }
    ]
  )



  export const isLoadingData=createSelector(
    getDataState,
    state=>state.isLoading
  )
  export const isErrorLoadData=createSelector(
    getDataState,
    state=>state.error
  )




}

