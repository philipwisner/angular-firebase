import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: AngularFirestore) { }
  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false)
  })

  getCoffeeOrders() {
    return this.firestore.collection("coffeeOrders").snapshotChanges();
  }

  createCoffeeOrder(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection("coffeeOrders")
        .add(data)
        .then(res => {
          console.log('res is', res);
        }, err => reject(err));
    });
  }

  updateCoffeeOrder(data) {
    return this.firestore
      .collection("coffeeOrders")
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  deleteCoffeeOrder(data) {
    return this.firestore
      .collection("coffeeOrders")
      .doc(data.payload.doc.id)
      .delete();
  }
}
