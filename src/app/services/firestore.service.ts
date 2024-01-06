import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference
} from "@angular/fire/compat/firestore";
import {first, from, map, Observable, switchMap, take, tap} from "rxjs";
import {Theme, TopicPhrases, Words} from "../models/data";
import {User} from "../admin/model/auth";
import {UserUidService} from "./user-uid.service";
//import * as firebase from 'firebase/compat';
//import firebase from "firebase/compat";
import firebase from 'firebase/compat/app';
import {Progress} from "../models/progress";
import {Book} from "../models/book";
import {HomePages} from "../../assets/data/mainLayout/main";

interface HomePag{
  data:HomePages[]
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  userUid: string = 'VSRYBAsobegeRYhaQUlJRQJkVtT2'

  private progressCollection: AngularFirestoreCollection<Progress>;
  private themeCollection: AngularFirestoreCollection<Theme>;
  private wordCollection: AngularFirestoreCollection<Theme>;
  private dataCollection: AngularFirestoreCollection<Theme>;
  private phraseCollection: AngularFirestoreCollection<TopicPhrases>;
  private sentenceCollection:AngularFirestoreCollection<TopicPhrases>;
  private userCollection: AngularFirestoreCollection<User>;
  private bookCollection:AngularFirestoreCollection<Book>;
  private imgCollection:AngularFirestoreCollection<HomePag>;


  constructor(private firestore: AngularFirestore,
              private userId$: UserUidService
  ) {
    // this.authService.user$.subscribe(id=>this.userUid=id)
    this.progressCollection = this.firestore.collection<Progress>('progress');
    this.userCollection = this.firestore.collection<User>('users');
    this.dataCollection = this.firestore.collection<Theme>('data');
    this.themeCollection = this.firestore.collection<Theme>('words');
    this.wordCollection = this.firestore.collection<Theme>('userWords');
    this.phraseCollection=this.firestore.collection<TopicPhrases>('phrases')
    this.sentenceCollection=this.firestore.collection<TopicPhrases>('sentences')
    this.bookCollection=this.firestore.collection<Book>('books')
    this.imgCollection=this.firestore.collection<HomePag>('img')


    //отримання id  поточного user on firebase(auth)
    this.userId$.getUserUid().pipe(first()).subscribe(id => this.userUid = id)
  }
///////////////////////----------IMG-------////////////////////
  addImg(value:HomePag):Observable<void>{
    return from(
      this.imgCollection.doc('imgMainPage').set(value)
    )
  }
  getImg():Observable<any[]>{
    return from(this.imgCollection.valueChanges()).pipe(
      take(1),
      map(el=>el.map(a=>a.data)),
      tap(el=>console.log(el))
    )
  }
  getImg2():Observable<HomePages[]>{
    return this.imgCollection.get().pipe(
      map((querySnapshot) => {
        const data: HomePages[] = [];
        querySnapshot.forEach((doc) => {
          const item = doc.data() as any;
          console.log(item)
          // item.id = doc.id
          data.push(item.data);
          console.log(data)
        })
        return data;
      })
    )
  }

  //////////////////------------------PROGRESS---------------------//////////////////////////////////////////////////////
// Додавання документу в колекцію "progress" з конкретним id
  addNewProgress(progress: Progress): Observable<void> {
    return from(this.progressCollection.doc(progress.id).set(progress))
  }

  // Отримання конкретного  документу за id з колекцію "progress"
  getProgressById(): Observable<Progress | null> {
    const progressDocRef = this.progressCollection.doc(this.userUid);

    return progressDocRef.get().pipe(
      map(doc => {
        if (doc.exists) {
          return doc.data() as Progress;
        } else {
          console.log(`Document with ID '${this.userUid}' does not exist`);
          return null;
        }
      })
    )
  }

  getProgressByIdAsync(): Observable<any > {
    return from(this.progressCollection.doc(this.userUid).valueChanges())
  }


  // Додавання документу в колекцію "progress" з random id
  addProgressItem(item: any): Observable<DocumentReference<Progress>> {
    return from(this.progressCollection.add(item))
  }

  // Оновлення документу в колекції "progress"
  updateProgressItem(data: Partial<Progress>): Observable<void> {
    return from(this.progressCollection.doc(this.userUid).update(data))
  }

  setProgress(data: Partial<Progress>): Observable<void> {
    const progress: Progress = {...data} as Progress;
    return from(this.progressCollection.doc(this.userUid).set(progress, {merge: true}))
  }

  // Видалення документу з колекції "progress"
  deleteProgressItem(): Observable<void> {
    return from(this.progressCollection.doc(this.userUid).delete())
  }

  // Отримання всіх документів з колекції "progress"
  getAllProgressItems(): Observable<Progress[]> {
    return  this.progressCollection.snapshotChanges().pipe(
      map(actions => actions.map((a: DocumentChangeAction<Progress>) => {
        const data = a.payload.doc.data() as Progress;
        const documentId = a.payload.doc.id;
        return {documentId, ...data};
      }))
    );
  }

  //////////////////------------------USER---------------------//////////////////////////////////////////////////////////
// Додавання документу в колекцію "user"
  addNewUser(user: User): Observable<void> {
    return from(this.userCollection.doc(user.uid).set(user))
  }

  // Отримання конкретного  документу поточного юзера за id з колекцію "user"
  getUserById(): Observable<any> {
    const userDocRef = this.userCollection.doc(this.userUid)

    return userDocRef.snapshotChanges().pipe(
      map((doc: any) => {
        if (doc.exists) {
          return doc.data as User
        } else {
          console.log(`Document with ID '${this.userUid}' does not exist`);
          return null;
        }
      })
    )
  }

  getCurrentUser(){
    return from(this.userCollection.doc(this.userUid).valueChanges())
  }

  // Видалення документу поточного юзера з колекції "user"
  deleteUser(): Observable<void> {
    return from(this.userCollection.doc(this.userUid).delete())
  }

  //--------------------------------------------Words-----------------------------------------------//
  addWords(data:Theme):Observable<void>{
    const docName=`${data.name}:${data.id}`
    return from(this.wordCollection
      .doc('users')
      .collection(this.userUid)
      .doc(data.id)
      .set(data))
  }
/*  getAsyncWord():Observable<DocumentData[]>{
    return this.userId$.getUserUid().pipe(
      switchMap(userUid=>this.wordCollection
        .doc('users')
        .collection(userUid).valueChanges())
    )
  }*/

  getAllWord():Observable<Theme[]>{
    return  this.wordCollection
      .doc('users')
      .collection(this.userUid)
      .get().pipe(
      map((querySnapshot)=>{
        const data:Theme[]=[]
        querySnapshot.forEach((doc)=>{
          const item=doc.data() as Theme
          data.push(item)
        })
        //console.log(data)
        return data
      }),

       // tap(el=>console.log(el))
    )
  }

  updateWordsById(data:Partial<Theme>):Observable<void>{
    const idDoc=data.id
    return from(this.wordCollection
      .doc('users')
      .collection(this.userUid)
      .doc(idDoc)
      .update(data)
    )
  }

  updateWordsByIdTheme(data:Partial<Theme>):Observable<void>{
    const idDoc=data.id
    return from(this.wordCollection
      .doc('users')
      .collection(this.userUid)
      .doc(idDoc)
      .update(data)
    )
  }

//--------------------------DATA-----------------------------------------------------------------------------------
  // Додавання документу в колекцію "data"

  getData():Observable<Theme[]>{
    return from(this.dataCollection.valueChanges()).pipe(take(1))
  }

  addData(data:Theme):Observable<void>{
    const docName=`${data.name}:${data.id}`
    return from(this.dataCollection.doc<Theme>(docName).set(data))
  }

  getAllWords(): Observable<Theme[]> {
    return this.dataCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Theme;
          const id = action.payload.doc.id;
          return {  ...data };
        });
      }),
      tap(el=>console.log(el))
    );
  }

  getAllUserData(): Observable<Theme[]> {
    // Отримуємо всі документи в колекції words
    return from(this.dataCollection.valueChanges())
  }

  /////---------------------------------------Phrase-----------------------------------------------------

  public addPhrase(phrase:TopicPhrases):any{
    return from(this.phraseCollection.add(phrase))
  }

  public addPhraseWithId(phrase:TopicPhrases):Observable<void>{
    const nameDoc=`${phrase.name.toUpperCase()}:${phrase.id}`
    return from(this.phraseCollection.doc(nameDoc).set(phrase) )
  }

  public getAllPhraseAsync(){
    return from(this.phraseCollection.valueChanges())
  }

 public getAllPhrase():Observable<TopicPhrases[]>{
    return this.phraseCollection.get().pipe(
      map((querySnapshot) => {
        const data: TopicPhrases[] = [];
        querySnapshot.forEach((doc) => {
          const item = doc.data() as TopicPhrases;
         // item.id = doc.id
          data.push(item);
        })
        return data;
      })
    )
  }

  public deletePhraseById(phrase:TopicPhrases):Observable<void>{
    const nameDoc=`${phrase.name.toUpperCase()}:${phrase.id}`
    return from(this.phraseCollection.doc(nameDoc).delete() )
  }

  /////---------------------------------------------Sentence------------------------------------------------

  public addSentenceWithId(sentence:TopicPhrases):Observable<void>{
    const nameDoc=`${sentence.name.toUpperCase()}:${sentence.id}`
      return from(this.sentenceCollection.doc(nameDoc).set(sentence) )
  }


  public getAllSentence():Observable<TopicPhrases[]>{
    return this.sentenceCollection.get().pipe(
      map((querySnapshot) => {
        const data: TopicPhrases[] = [];
        querySnapshot.forEach((doc) => {
          const item = doc.data() as TopicPhrases;
          // item.id = doc.id
          data.push(item);
        })
        return data;
      })
    )
  }

  public deleteSentenceById(sentence:TopicPhrases):Observable<void>{
    const nameDoc=`${sentence.name.toUpperCase()}:${sentence.id}`
    return from(this.sentenceCollection.doc(nameDoc).delete() )
  }
  ////------------------------------BOOK--------------------------------

  public addBookById(book:Book):Observable<void>{
    const path=`${book.book_title}:${book.id}`
    return from(this.bookCollection.doc(path).set(book))
  }

  public getAllBooks():Observable<Book[]>{
    return from(this.bookCollection.valueChanges().pipe(
      take(1)
    ))
  }



  ////--------------theme---------------------------------------------------------------------
  public addTheme(theme: Theme): Observable<void> {
    const idName = `${theme.name}:${theme.id}`;

    return from(this.themeCollection.doc(idName).collection('d').doc().set(theme))
  }
  public addThemeAddCol(theme: Theme): Observable<void> {
    const idName = `${theme.name}:${theme.id}`;
    return this.getCurrentUser().pipe(
      switchMap((user)=>from(this.themeCollection.doc(idName).collection(user?.email || 'newUser').doc(this.userUid) .set(theme)))
    )
  }

  public updateTheme(theme: Partial<Theme>): Observable<void> {
    const docRef: DocumentReference = this.firestore.firestore.collection('theme').doc('General:1');
    return from(docRef.update({
      data: firebase.firestore.FieldValue.arrayUnion(theme)
    }));
  }

  public updateWord1( wordId: number, updatedWord: Partial<Words>): Observable<void> {
    return from(this.themeCollection.doc('General:1').update({
      [`data.${wordId}.level`]: updatedWord
    }));
  }


}


