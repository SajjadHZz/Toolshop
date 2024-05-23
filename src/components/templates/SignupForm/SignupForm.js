"use client";
import { signupUserToServer } from "@/redux/User";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SignupForm() {
  const basket = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerHandler(e) {
    e.preventDefault();
    dispatch(signupUserToServer({ url: "http://localhost:3000/api/auth/signup", email, password, basket }));
  }
  return (
    <form onSubmit={registerHandler} className="px-2 pt-4">
      <label htmlFor="signin-email" className="font-medium text-sm">
        ایمیل / شماره موبایل :
      </label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="text"
        id="signin-email"
        dir="ltr"
        placeholder="example@gmail.com : مثال"
        className="my-4 block w-full rounded-full px-4 py-3 bg-secondary border border-black/20 border-solid focus:outline-primary focus:bg-background placeholder:text-right"
      />

      <label htmlFor="signin-password" className="font-medium text-sm">
        رمز عبور :
      </label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        id="signin-password"
        dir="ltr"
        placeholder="رمز عبور"
        className="mt-4 mb-1 block w-full rounded-full px-4 py-3 bg-secondary border border-black/20 border-solid focus:outline-primary focus:bg-background placeholder:text-right"
      />

      <div className="select-none">
        <input
          id="signin-remember-me"
          type="checkbox"
          defaultChecked
          className="align-middle checkbox mx-2 my-4 w-4 h-4 rounded-md"
          onChange={(e) => setChecked(e.target.checked)}
          value={checked}
        />
        <label htmlFor="signin-remember-me" className="cursor-pointer align-middle text-xs">
          مرا به خاطر بسپار
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-block border-none bg-accent rounded-full hover:bg-accent-active"
      >
        عضویت
      </button>
    </form>
  );
}

export default SignupForm;
