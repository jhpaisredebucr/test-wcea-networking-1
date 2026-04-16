'use client'

import { userInfo } from "node:os";
import { useEffect, useState } from "react";

export default function Deposits() {

  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [proof, setProof] = useState(null);
  const [preview, setPreview] = useState(null);
  const [userData, setUserData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);


  const fetchJson = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  };

  // -----------------------
  // FETCH USER
  // -----------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        setInitialLoading(true);
        //GET USER DATA
        const userRes = await fetchJson("/api/users");

        if (!userRes.success) {
          throw new Error("Failed to load user");
        }

        setUserData(userRes);

      } catch (err) {
        console.error(err);
        setError("Failed to load user");
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, []);

  if (initialLoading) {
    return (
      <div className="w-full flex">
        <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            <div className="text-xl text-gray-700">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !success) {
    return (
      <div className="w-full flex">
        <div className="w-full ml-56 px-20 py-7 bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="text-red-500 text-xl max-w-md text-center flex flex-col items-center gap-4">
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }


  // -----------------------
  // FILE CHANGE
  // -----------------------
  function handleFileChange(e) {

    const file = e.target.files[0];

    if (!file) return;

    setProof(file);
    setPreview(URL.createObjectURL(file));

  }


  // -----------------------
  // PAYMENT INSTRUCTIONS
  // -----------------------
  function PaymentInstructions() {

    if (!method) return null;

    if (method === "gcash") {

      return (
        <div className="bg-gray-50 p-3 rounded mt-3 text-sm">
          Send payment to:<br />
          <strong>GCash: 09123456789</strong><br />
          Name: Juan Dela Cruz
        </div>
      );

    }

    if (method === "maya") {

      return (
        <div className="bg-gray-50 p-3 rounded mt-3 text-sm">
          Send payment to:<br />
          <strong>Maya: 09123456789</strong><br />
          Name: Juan Dela Cruz
        </div>
      );

    }

    if (method === "bank") {

      return (
        <div className="bg-gray-50 p-3 rounded mt-3 text-sm">
          Bank Transfer:<br />
          <strong>BDO</strong><br />
          Account Name: Juan Dela Cruz<br />
          Account Number: 1234567890
        </div>
      );

    }

  }


  // -----------------------
  // SUBMIT DEPOSIT
  // -----------------------
  async function SubmitDeposit() {
    console.log(userData);

    setError(null);

    if (!userData?.userInfo?.id) {
      setError("User not loaded.");
      return;
    }

    if (!method) {
      setError("Select payment method.");
      return;
    }

    if (!amount) {
      setError("Enter amount.");
      return;
    }

    if (!proof) {
      setError("Upload proof of payment.");
      return;
    }

    try {

      setLoading(true);


      // -----------------------
      // CLOUDINARY UPLOAD
      // -----------------------
      const uploadData = new FormData();

      uploadData.append("file", proof);

      const cloudinaryRes = await fetch(
        "/api/cloudinary/upload",
        {
          method: "POST",
          body: uploadData
        }
      );

      const cloudinaryData = await cloudinaryRes.json();

      if (!cloudinaryData.url) {

        setError("Upload failed.");

        return;

      }


      // -----------------------
      // SAVE TRANSACTION
      // -----------------------
      const res = await fetch(
        "/api/portal/member/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({

            user_id: userData.userInfo.id,
            type: "deposit",
            amount: amount,
            proof: cloudinaryData.url,
            payment_method: method

          })
        }
      );


      const data = await res.json();

      if (!res.ok) {

        setError(data.message || "Transaction failed.");

        return;

      }


      setSuccess(true);

      setMethod("");
      setAmount("");
      setProof(null);
      setPreview(null);


    } catch (err) {

      setError("Network error.");

    } finally {

      setLoading(false);

    }

  }


  // -----------------------
  // UI
  // -----------------------
  return (

    <div className="flex justify-center mt-10 py-7">

      <div className="bg-white shadow-lg rounded-xl p-6 w-105">

        <h2 className="text-xl font-bold text-center">
          Deposit Funds
        </h2>


        {/* METHOD */}
        <div className="mt-5">

          <p className="text-sm">Payment Method</p>

          <select
            value={method}
            onChange={(e)=>setMethod(e.target.value)}
            className="w-full border p-2 mt-1 rounded-lg"
          >
            <option value="">Select method</option>
            <option value="gcash">GCash</option>
            <option value="maya">PayMaya</option>
            <option value="bank">Bank Transfer</option>
          </select>

        </div>


        {PaymentInstructions()}


        {/* AMOUNT */}
        <div className="mt-5">

          <p className="text-sm">Deposit Amount</p>

          <input
            type="number"
            value={amount}
            placeholder="Enter amount"
            onChange={(e)=>setAmount(e.target.value)}
            className="w-full border p-2 mt-1 rounded-lg"
          />

        </div>


        {/* FILE */}
        <div className="mt-5">

          <p className="text-sm">Upload Proof</p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1"
          />

        </div>


        {/* PREVIEW */}
        {preview && (

          <div className="mt-4">

            <p className="text-sm mb-2">Preview</p>

            <img
              src={preview}
              className="rounded border"
            />

          </div>

        )}


        {/* ERROR */}
        {error && (

          <p className="mt-4 text-red-500 text-sm bg-red-50 p-2 rounded">
            {error}
          </p>

        )}


        {/* SUCCESS */}
        {success && (

          <p className="mt-4 text-green-600 text-sm bg-green-50 p-2 rounded">
            Deposit submitted successfully.
          </p>

        )}


        {/* BUTTON */}
        {!success && (

          <button
            onClick={SubmitDeposit}
            disabled={loading}
            className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Deposit"}
          </button>

        )}

      </div>

    </div>

  );

}