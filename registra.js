 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
 import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
 import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

 // Your web app's Firebase configuration
 const firebaseConfig = {
     apiKey: "AIzaSyA6rpb2HccLVlqD0cG055UomtTePFVUoLk",
authDomain: "gitotppro.firebaseapp.com",
projectId: "gitotppro",
storageBucket: "gitotppro.appspot.com",
messagingSenderId: "333150931966",
appId: "1:333150931966:web:d4467ab4a1367fb6408eaf"
 };


 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
 const storage = getStorage(app);

 // Function to save data to Firestore with email as document ID
 async function saveRegistrationData(formData) {
     try {
         // Use email as the document ID
         const docRef = doc(db, "registrations", formData.email);
         await setDoc(docRef, formData);
         alert("Registration successful with email: " + formData.email);
     } catch (error) {
         console.error("Error adding document: ", error);
     }
 }

 // Function to upload file to Firebase Storage
 async function uploadFile(file, storagePath) {
     if (file.size > 204800) { // 200KB limit
         alert("File size must be under 200KB.");
         throw new Error("File size exceeds 200KB limit.");
     }

     const fileRef = ref(storage, storagePath);
     try {
         await uploadBytes(fileRef, file);
         console.log("File uploaded successfully to", storagePath);
     } catch (error) {
         console.error("Error uploading file: ", error);
         throw error;
     }
 }

 // Function to validate file size
 function validateFileSize(fileInput) {
     const file = fileInput.files[0];
     if (file && file.size > 204800) { // 200KB limit
         alert("File size must be under 200KB.");
         fileInput.value = ''; // Clear the file input
     }
 }

 // Event listener for form submission
 document.addEventListener('DOMContentLoaded', function () {
     const registrationForm = document.querySelector('.registration-form');
     const tenthMarksheetInput = document.getElementById('tenth-marksheet');
     const twelfthMarksheetInput = document.getElementById('twelfth-marksheet');

     // Add event listeners for file inputs
     tenthMarksheetInput.addEventListener('change', function() {
         validateFileSize(tenthMarksheetInput);
     });

     twelfthMarksheetInput.addEventListener('change', function() {
         validateFileSize(twelfthMarksheetInput);
     });

     registrationForm.addEventListener('submit', async function(event) {
         event.preventDefault();

         // Get form data
         const formData = {
             firstName: document.getElementById('first-name').value,
             middleName: document.getElementById('middle-name').value,
             lastName: document.getElementById('last-name').value,
             dob: document.getElementById('dob').value,
             age: document.getElementById('age').value,
             gender: document.getElementById('gender').value,
             email: document.getElementById('email').value,
             phone: document.getElementById('country-code').value + document.getElementById('phone').value,
             whatsapp: document.getElementById('whatsapp').value,
             address: document.getElementById('address').value,
             permanentAddress: document.getElementById('permanent-address').value,
             aadhar: document.getElementById('aadhar').value,
             pan: document.getElementById('pan').value,
             bloodGroup: document.getElementById('blood-group').value,
             motherTongue: document.getElementById('mother-tongue').value,
             citizenship: document.getElementById('citizenship').value,
             community: document.getElementById('community').value,
             religion: document.getElementById('religion').value,
             tenthMedium: document.getElementById('tenth-medium').value,
             tenthBoard: document.getElementById('tenth-board').value,
             tenthTotalMarks: document.getElementById('tenth-total-marks').value,
             tenthMathsMarks: document.getElementById('tenth-maths-marks').value,
             tenthScienceMarks: document.getElementById('tenth-science-marks').value,
             tenthPercentage: document.getElementById('tenth-percentage').value,
             twelfthMedium: document.getElementById('twelfth-medium').value,
             twelfthBoard: document.getElementById('twelfth-board').value,
             twelfthTotalMarks: document.getElementById('twelfth-total-marks').value,
             twelfthMathsMarks: document.getElementById('twelfth-maths-marks').value,
             twelfthScienceMarks: document.getElementById('twelfth-science-marks').value,
             twelfthPercentage: document.getElementById('twelfth-percentage').value,
             hostelDayScholar: document.getElementById('hostel-day-scholar').value,
             busBoardingPoint: document.getElementById('bus-boarding-point').value,
             roomType: document.getElementById('room-type').value,
             roomAc: document.getElementById('room-ac').value,
             managementCounselling: document.getElementById('management-counselling').value,
             counsellingNumber: document.getElementById('counselling-number').value,
             allottedProgram: document.getElementById('allotted-program').value,
             interestedCourse: document.getElementById('interested-course').value,
             fatherFirstName: document.getElementById('father-first-name').value,
             fatherMiddleName: document.getElementById('father-middle-name').value,
             fatherLastName: document.getElementById('father-last-name').value,
             fatherOccupation: document.getElementById('father-occupation').value,
             fatherCompanyAddress: document.getElementById('father-company-address').value,
             fatherAnnualIncome: document.getElementById('father-annual-income').value,
             fatherEmail: document.getElementById('father-email').value,
             fatherPhone: document.getElementById('father-phone').value,
             fatherWhatsapp: document.getElementById('father-whatsapp').value,
             fatherAadhar: document.getElementById('father-aadhar').value,
             fatherPan: document.getElementById('father-pan').value,
             fatherVoterId: document.getElementById('father-voter-id').value,
             fatherRationCard: document.getElementById('father-ration-card').value,
             motherFirstName: document.getElementById('mother-first-name').value,
             motherMiddleName: document.getElementById('mother-middle-name').value,
             motherLastName: document.getElementById('mother-last-name').value,
             motherOccupation: document.getElementById('mother-occupation').value,
             motherCompanyAddress: document.getElementById('mother-company-address').value,
             motherAnnualIncome: document.getElementById('mother-annual-income').value,
             motherEmail: document.getElementById('mother-email').value,
             motherPhone: document.getElementById('mother-phone').value,
             motherWhatsapp: document.getElementById('mother-whatsapp').value,
             motherAadhar: document.getElementById('mother-aadhar').value,
             motherPan: document.getElementById('mother-pan').value,
             motherVoterId: document.getElementById('mother-voter-id').value,
             motherRationCard: document.getElementById('mother-ration-card').value
         };

         // Get files
         const tenthMarksheet = document.getElementById('tenth-marksheet').files[0];
         const twelfthMarksheet = document.getElementById('twelfth-marksheet').files[0];

         // Upload files to Firebase Storage with the first name in the file path
         try {
             await uploadFile(tenthMarksheet, `marksheets/10th/${formData.firstName}_10th_marksheet.pdf`);
             await uploadFile(twelfthMarksheet, `marksheets/12th/${formData.firstName}_12th_marksheet.pdf`);

             // Save data to Firestore
             await saveRegistrationData(formData);

             // Reset the form
             registrationForm.reset();
         } catch (error) {
             console.error("Error during form submission: ", error);
         }
     });
 });
 document.getElementById('hostel-day-scholar').addEventListener('change', function() {
    var selectedValue = this.value;
    document.getElementById('day-scholar-info').style.display = selectedValue === 'day-scholar' ? 'block' : 'none';
    document.getElementById('hosteller-info').style.display = selectedValue === 'hosteller' ? 'block' : 'none';
});