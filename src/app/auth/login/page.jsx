"use client";

import "@portal/lib/styles/global.scss"
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@portal/lib/components/global/button";
import Container from "@portal/lib/components/global/container";
import TopBar from "@portal/lib/components/global/bars/top";
import Loader from "@portal/lib/components/global/loader";

export default function Login() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fields, setFields] = useState({
    email: {
      label: "Email",
      value: "",
      error: null,
    },
    password: {
      label: "Password",
      value: "",
      error: null,
    },
  });

  const getFieldValue = (key) => fields[key].value;

  const updateFieldValue = (key, value) => {
    setFields((fields) => ({
      ...fields,
      [key]: {
        ...fields[key],
        value,
      },
    }));
  };

  const updateFieldError = (key, error) => {
    setFields((fields) => ({
      ...fields,
      [key]: {
        ...fields[key],
        error,
      },
    }));
  };

  const validateFields = () => {
    let isValid = true;

    // Clear previous errors
    Object.keys(fields).forEach((key) => updateFieldError(key, null));

    // Validate email
    const emailValue = getFieldValue("email");
    if (!emailValue) {
      updateFieldError("email", "Email is required.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      updateFieldError("email", "Invalid email format.");
      isValid = false;
    }

    // Validate password
    const passwordValue = getFieldValue("password");
    if (!passwordValue) {
      updateFieldError("password", "Password is required.");
      isValid = false;
    } else if (passwordValue.length < 6) {
      updateFieldError("password", "Password must be at least 6 characters.");
      isValid = false;
    }

    return isValid;
  };

  const submit = async () => {
    if (!validateFields()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Sign in with credentials provider
      const result = await signIn("credentials", {
        redirect: false,
        email: getFieldValue("email"),
        password: getFieldValue("password"),
      });

      if (result.ok) {
        router.push("/portal/content");
      } else if (result.error) {
        updateFieldError("email", result.error); // Display error on email field, can adjust as needed
      }
    } catch (error) {
      console.error("Login failed", error);
      updateFieldError("email", "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <Container type="top" bar={<TopBar theme={true} title={process.env.NEXT_PUBLIC_APP_NAME + " | Login"} />}>
     {isSubmitting && <Loader text={"Logging in"} subtext={"Please wait..."}/>}
     {!isSubmitting && <Container type="center">
        <div className="w-[300px]">
          <h2 className="text-3xl pb-4 uppercase">Login</h2>
          {Object.keys(fields).map((key, index) => (
            <div key={index} className="w-full mb-4">
              <p className="text-left text-xl">{fields[key].label}</p>
              <input
                type={key === "email" ? "email" : "password"}
                value={getFieldValue(key)}
                onChange={(e) => updateFieldValue(key, e.target.value)}
              />
              {fields[key].error && (
                <p className="text-left text-red-600">{fields[key].error}</p>
              )}
            </div>
          ))}
          <Button onClick={submit} text={"SUBMIT"} />
        </div>
      </Container>}
    </Container>
  );
}
