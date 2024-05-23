"use client";

import { useState } from "react";

export default function Settings() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nationalityCode, setNationalityCode] = useState("");
  const [landline, setLandline] = useState("");
  const [numberCard, setNumberCard] = useState("");
  const [shabaCard, setShabaCard] = useState("");
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");
  return (
    <div className="bg-background flex-1 w-2/3">
      <h3 className="text-4xl font-Lalezar m-4">جزئیات حساب</h3>
      <hr />
      <form className="p-8 grid grid-cols-3 gap-x-4 gap-y-8">
        <label
          htmlFor="نام *"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
            نام <span className="text-error">*</span>
          </p>
          <input
            id="نام *"
            type="text"
            className="bg-transparent border-none outline-none"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label
          htmlFor="شماره همراه"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">شماره همراه</p>
          <input
            id="شماره همراه"
            type="text"
            className="bg-transparent border-none outline-none"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </label>
        <label
          htmlFor="کد ملی"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">کد ملی</p>
          <input
            id="کد ملی"
            type="text"
            className="bg-transparent border-none outline-none"
            onChange={(e) => setNationalityCode(e.target.value)}
            value={nationalityCode}
          />
        </label>
        <label
          htmlFor="شماره ثابت"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">شماره ثابت</p>
          <input
            id="شماره ثابت"
            type="text"
            className="bg-transparent border-none outline-none"
            onChange={(e) => setLandline(e.target.value)}
            value={landline}
          />
        </label>
        <label
          htmlFor="شماره کارت بانکی (جهت عودت وجه)"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
            شماره کارت بانکی (جهت عودت وجه)
          </p>
          <input
            id="شماره کارت بانکی (جهت عودت وجه)"
            type="text"
            className="bg-transparent border-none outline-none"
            onChange={(e) => setNumberCard(e.target.value)}
            value={numberCard}
          />
        </label>
        <label
          htmlFor="شماره شبا (جهت عودت وجه)"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
            شماره شبا (جهت عودت وجه)
          </p>
          <input
            id="شماره شبا (جهت عودت وجه)"
            type="text"
            className="bg-transparent border-none outline-none"
            onChange={(e) => setShabaCard(e.target.value)}
            value={shabaCard}
          />
        </label>
        <label
          htmlFor="نام شرکت یا فروشگاه"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">نام شرکت یا فروشگاه</p>
          <input
            id="نام شرکت یا فروشگاه"
            type="text"
            className="bg-transparent border-none outline-none"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          />
        </label>
        <label
          htmlFor="شغل شما"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">شغل شما</p>
          <input
            id="شغل شما"
            type="text"
            className="bg-transparent border-none outline-none"
            onChange={(e) => setJob(e.target.value)}
            value={job}
          />
        </label>

        <button type="button" className="btn btn-accent rounded-full">
          ثبت اطلاعات
        </button>
      </form>
    </div>
  );
}
