"use client"
import { useState } from "react";
import SignUpInfo from "./sign_up_info";
import SignUpBackgroundInfo from "./sign_up_background_info";
import SignUpPayment from "./sign_up_payment";

export default function SignUpForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    // Step 1
    username: "",
    email: "",
    contactNumber: "",
    referralCode: "",
    password: "",
    confirmPassword: "",
    // Step 2
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    city: "",
    barangay: "",
    streetAddress: "",
    postalCode: "",
    // Step 3
    planId: null,
    // Step 4
    paymentMethod: "",
    paymentConfirmed: false,
    // Step 5
    approved: false
  });

  return (
    <>
      {step === 1 && (
        <SignUpInfo
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(prev => prev + 1)}
          prevStep={() => setStep(prev => prev - 1)}
        />
      )}
      {step === 2 && (
        <SignUpBackgroundInfo
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(prev => prev + 1)}
          prevStep={() => setStep(prev => prev - 1)}
        />
      )}
      {step === 3 && (
        <SignUpPayment
          formData={formData}
          setFormData={setFormData}
          nextStep={() => setStep(prev => prev + 1)}
          prevStep={() => setStep(prev => prev - 1)}
        />
      )}
    </>
  );
}