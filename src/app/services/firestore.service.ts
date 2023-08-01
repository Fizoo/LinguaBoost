import {Injectable} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference
} from "@angular/fire/compat/firestore";
import {first, from, map, Observable, tap} from "rxjs";
import {Theme, TopicPhrases, Words} from "../models/data";
import {User} from "../admin/model/auth";
import {UserUidService} from "./user-uid.service";
//import * as firebase from 'firebase/compat';
//import firebase from "firebase/compat";
import firebase from 'firebase/compat/app';
import {Progress} from "../models/progress";


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  userUid: string = '1'
  private progressCollection: AngularFirestoreCollection<Progress>;
  readonly progress: Observable<Progress[]>;

  private themeCollection: AngularFirestoreCollection<Theme>;
  private phraseCollection: AngularFirestoreCollection<TopicPhrases>;
  private sentenceCollection:AngularFirestoreCollection<TopicPhrases>;
  private userCollection: AngularFirestoreCollection<User>;
  private wordsCollection: AngularFirestoreCollection<Words>;
  private dataCollection: AngularFirestoreCollection<Theme[]>;


  constructor(private firestore: AngularFirestore,
              private userId$: UserUidService
  ) {
    // this.authService.user$.subscribe(id=>this.userUid=id)
    this.progressCollection = this.firestore.collection<Progress>('progress');
    this.userCollection = this.firestore.collection<User>('users');
    this.dataCollection = this.firestore.collection<Theme[]>('data');
    this.themeCollection = this.firestore.collection<Theme>('theme');
    this.phraseCollection=this.firestore.collection<TopicPhrases>('phrases')
    this.sentenceCollection=this.firestore.collection<TopicPhrases>('sentences')

    this.progress = this.progressCollection.snapshotChanges().pipe(
      map(actions => actions.map((a: DocumentChangeAction<Progress>) => {
        const data = a.payload.doc.data() as Progress;
        const documentId = a.payload.doc.id;
        return {documentId, ...data};
      }))
    );
    //отримання id  поточного user on firebase(auth)
    this.userId$.getUserUid().pipe(first()).subscribe(id => this.userUid = id)
  }

  //////////////////------------------PROGRESS---------------------//////////////////////////////////////////////////////
// Додавання документу в колекцію "progress" з конкретним id
  addNewProgress(progress: Progress): Observable<void> {
    return from(this.progressCollection.doc(progress.id).set(progress))
  }

  // Отримання конкретного  документу за id з колекцію "progress"
  getProgressById(): Observable<Progress | null> {
    const progressDocRef = this.progressCollection.doc(this.userUid);
    console.log(progressDocRef)
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

  getProgressByIdAsync(): Observable<Progress | undefined> {
    return this.progressCollection.doc(this.userUid).valueChanges()
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
    return this.progress
    /*return this.progressCollection.snapshotChanges().pipe(
      tap(el=>console.log(el,this.userUid)),
      map((items) => {
        return items.map((item:any) => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return { id, ...data };
        });
      })
    );*/
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

  // Видалення документу поточного юзера з колекції "user"
  deleteUser(): Observable<void> {
    return from(this.userCollection.doc(this.userUid).delete())
  }

//--------------------------DATA-----------------------------------------------------------------------------------
  // Додавання документу в колекцію "data"
  addDataItem(item: any): Promise<DocumentReference<any>> {
    return this.dataCollection.add(item);
  }

  // Оновлення документу в колекції "data"
  updateDataItem(itemId: string, item: any): Observable<void> {
    return from(this.dataCollection.doc(itemId).update(item))
  }

  updateDataInArray(itemId: string, item: Theme[]): Observable<void> {

    return from(this.dataCollection.doc(itemId).update(item))
  }

  // Видалення документу з колекції "data"
  deleteDataItem(itemId: string): Promise<void> {
    return this.dataCollection.doc(itemId).delete();
  }

  // Отримання всіх документів з колекції "data"
  getAllDataItems(): Observable<any[]> {
    return this.dataCollection.snapshotChanges().pipe(
      map((items) => {
        return items.map((item) => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return {id, ...data};
        });
      })
    );
  }


  // отримати всі дані з Firestore
  public getAllData(): Observable<Progress[]> {
    return this.progressCollection.valueChanges();
  }

  // отримати конкретні дані з Firestore який автоматично оновлюється при зміні даних в документі.
  public getDataById(): Observable<any> {
    return this.progressCollection.doc<Progress>(this.userUid).valueChanges();
  }

  ////--------------theme---------------------------------------------------------------------
  public addTheme(theme: Theme): Observable<void> {
    const idName = `${theme.name}:${theme.id}`;
    return from(this.themeCollection.doc(idName).set(theme))
  }
  public addThemeAddCol(theme: Theme): Observable<void> {
    const idName = `${theme.name}:${theme.id}`;
    return from(this.themeCollection.doc('General:1').collection('user1').doc('user1Id') .set(theme))
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

}


