import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, DocumentReference} from "@angular/fire/compat/firestore";
import {Progress} from "../models/data";
import {from, map, Observable, switchMap} from "rxjs";

interface Data {
  name:string
  id:string
  data:Progress[]
}

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private dataCollection: AngularFirestoreCollection<Data>;

  constructor( private afs:AngularFirestore) {
    this.dataCollection = this.afs.collection<Data>('data');
  }
//-------------------ADD-------------------------------
  // Додавання документу зі згенерованим Firestore ID
  public addData(data: Data): Observable<DocumentReference> {
    return from(this.dataCollection.add(data))
  }
  //Додавання документу зі згенерованим Firestore ID
  addDataItem(data: Data,id:string): Observable<void> {
    return from(this.dataCollection.doc(id).set(data))
  }
  public addDataAndGetDocument(data: any): Observable<any> {
    return from(this.dataCollection.add(data)).pipe(
      switchMap(ref => ref.get()),
      map(doc => ({ id: doc.id, ...doc.data() }))
    );
  }
//-------------------------GET-----------------------
  // отримати всі дані з Firestore
  public getAllData(): Observable<Data[]> {
    return this.dataCollection.valueChanges();
  }
  public getAllData1(id:string): Observable<Data[]> {
    return this.dataCollection.valueChanges({ idField:id});
  }

  // отримати конкретні дані з Firestore який автоматично оновлюється при зміні даних в документі.
  public getDataById(id: string): Observable<Data |undefined> {
    return this.dataCollection.doc<Data>(id).valueChanges();
  }
  // Отримання конкретного  документу за id з колекцію "progress"
  getProgressById(uid:string): Observable<Data | null> {
    const progressDocRef = this.dataCollection.doc(uid)

    return progressDocRef.get().pipe(
      map(doc => {
        if (doc.exists) {
          return doc.data() as Data;
        } else {
          console.log(`Document with ID '${uid}' does not exist`);
          return null;
        }
      })
    )
  }
//-------------------------------UPDATE------------
  // оновити дані в Firestore
  public updateData(id: string, data: Partial<Data>): Observable<void> {
    return from(this.dataCollection.doc(id).update(data))
  }
  public setData(id: string, data: Data): Observable<void> {
    return from(this.dataCollection.doc(id).set(data, { merge: true }));
  }

//-------------------------DELETE-------------------
  // видалити дані з Firestore
  public deleteData(id: string): Observable<void> {
    return from(this.dataCollection.doc(id).delete())
  }

  public deleteDataByField(fieldName: string, value: any): Observable<unknown> {
    return from(this.dataCollection.ref.where(fieldName, "==", value).get())
      .pipe(
        switchMap(querySnapshot => {
          const batch = this.afs.firestore.batch();
          querySnapshot.forEach(doc => {
            batch.delete(doc.ref);
          });
          return from(batch.commit());
        })
      );
  }

}
