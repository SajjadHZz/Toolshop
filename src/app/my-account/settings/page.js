"use client";

import { DetailsUserFillIcon } from "@/components/modules/Svgs/Svgs";
import { useEffect, useState } from "react";

export default function Settings() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [numberPhone, setNumberPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [nationalityCode, setNationalityCode] = useState("");
  const [landline, setLandline] = useState("");
  const [numberCard, setNumberCard] = useState("");
  const [shabaCard, setShabaCard] = useState("");
  const [company, setCompany] = useState("");
  const [job, setJob] = useState("");

  const [stateList, setStateList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  useEffect(() => {
    fetchStates();
    fetchUserInfos();
  }, []);
  useEffect(() => {
    fetchCities();
  }, [state]);

  async function fetchUserInfos() {
    const res = await fetch("/api/user-infos");
    if (res.status === 200) {
      const data = await res.json();
      setFirstname(data?.firstname);
      setLastname(data?.lastname);
      setNumberPhone(data?.numberPhone);
      setState(data?.state);
      setCity(data?.city);
      setPostalCode(data?.postalCode);
      setAddress(data?.address);
      setNationalityCode(data?.nationalityCode);
      setLandline(data?.landline);
      setNumberCard(data?.numberCard);
      setShabaCard(data?.shabaCard);
      setCompany(data?.company);
      setJob(data?.job);
    }
  }
  async function fetchStates() {
    const res = await fetch("https://iran-locations-api.ir/api/v1/fa/states");
    if (res.status === 200) {
      setStateList(await res.json());
    }
  }
  async function fetchCities() {
    const res = await fetch(`https://iran-locations-api.ir/api/v1/fa/cities?state=${state}`);
    if (res.status === 200) {
      setCitiesList(await res.json());
    }
  }

  async function setUserDatas() {
    const reqBody = {
      firstname,
      lastname,
      state,
      city,
      address,
      postalCode,
      numberPhone,
      landline,
      nationalityCode,
      numberCard,
      shabaCard,
      job,
      company,
      postalCode,
    };
    const res = await fetch("/api/user-infos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    if (res.status === 200) {
      alert("اطلاعات شما با موفقیت ویرایش شد");
    }
  }

  return (
    <div className="bg-background flex-1 w-fit lg:w-2/3 rounded-3xl">
      <h3 className="text-4xl font-Lalezar m-4 flex gap-4 items-center">
        <DetailsUserFillIcon size="30" color="primary" />
        جزئیات حساب
      </h3>
      <hr />
      <form className="px-4 py-8 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-8">
        <label
          htmlFor="نام"
          className="inline-block col-span-1 border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
            نام <span className="text-error">*</span>
          </p>
          <input
            id="نام"
            placeholder="نام ..."
            type="text"
            className="bg-transparent border-none outline-none"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
        </label>
        <label
          htmlFor="نام خانوادگی"
          className="col-span-1 inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
            نام خانوادگی <span className="text-error">*</span>
          </p>
          <input
            id="نام خانوادگی"
            type="text"
            placeholder="نام خانوادگی ..."
            className="bg-transparent border-none outline-none"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
        </label>
        <label
          htmlFor="شماره همراه"
          className="col-span-1 inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
            شماره همراه <span className="text-error">*</span>
          </p>
          <input
            id="شماره همراه"
            type="text"
            placeholder="شماره همراه ..."
            className="bg-transparent border-none outline-none"
            onChange={(e) => setNumberPhone(e.target.value)}
            value={numberPhone}
          />
        </label>
        <label
          htmlFor="استان"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
            استان <span className="text-error">*</span>
          </p>
          <input
            id="استان"
            list="state"
            placeholder="استان ..."
            type="text"
            className="bg-transparent border-none outline-none w-full"
            onChange={(e) => setState(e.target.value)}
            value={state}
          />
          <datalist onChange={() => console.log("object")} id="state" className="w-full appearance-none">
            {stateList.map((item) => (
              <option key={item.id} value={item.name} />
            ))}
          </datalist>
        </label>
        <label
          htmlFor="شهر"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
            شهر <span className="text-error">*</span>
          </p>
          <input
            id="شهر"
            list="city"
            placeholder="شهر ..."
            type="text"
            className="bg-transparent border-none outline-none w-full"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
          <datalist id="city" className="w-full appearance-none">
            {citiesList.map((item, index) => (
              <optgroup key={index}>
                {item?.cities?.map((city) => (
                  <option key={city.id} value={city.name} />
                ))}
              </optgroup>
            ))}
          </datalist>
        </label>
        <label
          htmlFor="کدپستی"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
            کدپستی <span className="text-error">*</span>
          </p>
          <input
            id="کدپستی"
            type="text"
            placeholder="کدپستی ..."
            className="bg-transparent border-none outline-none w-full"
            onChange={(e) => setPostalCode(e.target.value)}
            value={postalCode}
          />
        </label>
        <label
          htmlFor="آدرس"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3 lg:col-span-3"
        >
          <p className="text-sm absolute -top-3 right-4 bg-background px-2 rounded">
            آدرس <span className="text-error">*</span>
          </p>
          <input
            id="آدرس"
            type="text"
            placeholder="آدرس ..."
            className="bg-transparent border-none outline-none w-full"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
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
            placeholder="کد ملی ..."
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
            placeholder="شماره ثابت ..."
            className="bg-transparent border-none outline-none"
            onChange={(e) => setLandline(e.target.value)}
            value={landline}
          />
        </label>
        <label
          htmlFor="شماره کارت بانکی (جهت عودت وجه)"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-xs absolute -top-3 right-4 bg-background px-2 rounded">
            شماره کارت بانکی (جهت عودت وجه)
          </p>
          <input
            id="شماره کارت بانکی (جهت عودت وجه)"
            type="text"
            placeholder="شماره کارت بانکی ..."
            className="bg-transparent border-none outline-none"
            onChange={(e) => setNumberCard(e.target.value)}
            value={numberCard}
          />
        </label>
        <label
          htmlFor="شماره شبا (جهت عودت وجه)"
          className="inline-block border border-solid border-text/20 rounded-xl relative px-4 py-3"
        >
          <p className="text-xs absolute -top-3 right-4 bg-background px-2 rounded">
            شماره شبا (جهت عودت وجه)
          </p>
          <input
            id="شماره شبا (جهت عودت وجه)"
            type="text"
            placeholder="شماره شبا ..."
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
            placeholder="نام شرکت یا فروشگاه ..."
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
            placeholder="شغل شما ..."
            className="bg-transparent border-none outline-none"
            onChange={(e) => setJob(e.target.value)}
            value={job}
          />
        </label>

        <button onClick={setUserDatas} type="button" className="btn btn-accent rounded-full">
          ثبت اطلاعات
        </button>
      </form>
    </div>
  );
}
