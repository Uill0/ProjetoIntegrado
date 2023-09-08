import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projeto-integrado';
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor() {

    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
}
}
