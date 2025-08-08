// src/services/productService.js
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const productsCol = collection(db, 'products');

export async function createProduct(data) {
  const ref = await addDoc(productsCol, {
    ...data,
    createdAt: Date.now()
  });
  return ref.id;
}

export async function getAllProducts() {
  const snapshot = await getDocs(productsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateProduct(id, data) {
  const ref = doc(db, 'products', id);
  await updateDoc(ref, data);
}

export async function deleteProduct(id) {
  const ref = doc(db, 'products', id);
  await deleteDoc(ref);
}

// ✅ NEW: Deduct quantity after checkout
export async function deductStock(productId, quantityToDeduct) {
  const productRef = doc(db, 'products', productId);
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    const currentQuantity = productSnap.data().quantity || 0;
    const newQuantity = Math.max(currentQuantity - quantityToDeduct, 0);

    await updateDoc(productRef, {
      quantity: newQuantity,
    });
  } else {
    throw new Error('Product not found');
  }
}
