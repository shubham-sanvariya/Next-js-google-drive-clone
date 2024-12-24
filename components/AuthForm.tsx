"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "sign-up"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className={"form-title"}>
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          {type === "sign-up" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className={"shad-form-item"}>
                  <FormLabel>Full Name</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      className={"shad-input"}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className={"shad-form-message"} />
                </FormItem>
              )}
            />
          )}
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className={"shad-form-item"}>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className={"shad-input"}
                    {...field}
                  />
                </FormControl>

                <FormMessage className={"shad-form-message"} />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className={"form-submit-button"}
            disabled={isLoading}
          >
            {type === "sign-in" ? "Sign In" : "Sign Up"}

            {isLoading && (
              <Image
                src={"/assets/icons/loader.svg"}
                alt={"loader"}
                width={24}
                height={24}
                className={"ml-2 animate-spin"}
              />
            )}
          </Button>
          {errorMessage && <p className={"error-message"}>*{errorMessage}</p>}

          <div className={"body-2 flex justify-center"}>
            <p className={"text-light-100"}>
              {type === "sign-in"
                ? "Already have an account?"
                : "Don't hava an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {" "}
              {type === "sign-in" ? "Sign In" : "Sign Up"}
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
};
export default AuthForm;
