import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <form className="space-y-4">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div className="text-center text-sm">
                <CardAction>
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-500 hover:underline">
                    Register here
                  </Link>
                </CardAction>
              </div>
            </CardFooter>
          </form>

        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
