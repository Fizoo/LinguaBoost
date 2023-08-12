/*


export function fun(value:any){
  this.store.select(DataSelectorsPhrases.getAllDataOfPhrases).pipe(
    map(el=>el.map(o=>o.data)),
    map(el => [...el.reduce((acc, curr) => acc.concat(curr), [])]),
    map(el=>this.list.map(a=>{

      for (let i = 0; i < el.length; i++) {
        if(this.containsFullWord(el[i].phrase,a.englishWord) && a.englishSentence===''){
          console.log('word=',a.englishWord,'phrase=',el[i].phrase)
          this.count+=1
          return {...a,
            englishSentence:el[i].phrase,
            ukrainianTranslationOfSentence:el[i].translateToUA
          }
        }
        else
          this.nocount+=1
      }
      // console.log(count)
      return a
    }))

  ).subscribe(el=> {
    console.log(el)
  })
}

function f() {

} containsFullWord(phrase:string, word:string) {
  // Збираємо регулярний вираз, який відповідає за пошук повного слова
  const regex = new RegExp(`\\b${word}\\b`);
  // Використовуємо test() для перевірки, чи збігається регулярний вираз з фразою
  return regex.test(phrase);
}
let x=[{}]

console.log(fun(x))

*/
