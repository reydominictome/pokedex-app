'use client';

import supabase from "@/config/supabaseConfig";
import { useUserStore } from "@/providers/user-provider";
import { useRouter } from "next/navigation";

export const useAuthActions = () => {
  const router = useRouter();
  const updateUser = useUserStore((store) => store.updateUser);

  const signUp = async (email: string, password: string) => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Thanks for signing up! Please check your email for verification.");
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      const { user } = data || {};

      updateUser(user);

      console.log(user);

      router.push("/dex");
    }
  };

  const forgotPassword = async (email: string) => {
    if (!email) {
      alert("Email is required");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?redirect_to=/dex/reset-password`,
    });

    if (error) {
      alert("Could not reset password");
    } else {
      alert("Check your email for a reset link.");
    }
  };

  const resetPassword = async (password: string, confirmPassword: string) => {
    if (!password || !confirmPassword) {
      alert("Password and confirm password are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert("Password update failed");
    } else {
      alert("Password updated");
      router.push("/dex/reset-password");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    updateUser(null);
    
    router.push("/sign-in");
  };

  return {
    signUp,
    signIn,
    forgotPassword,
    resetPassword,
    signOut,
  };
};
