rules_version = '2';
service cloud.firestore {
 match /databases/{database}/documents {
 match /{document=**} {
 allow read: if true
 allow write: if request.auth != null;
 }
 }
}
