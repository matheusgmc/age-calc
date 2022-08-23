import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
const Home: NextPage = () => {
  const [age, setAge] = React.useState<null | number>(null);

  const handleCalcAge = async (value: string) => {
    try {
      const response = await fetch("/api/age", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: value.split("-").reverse().join("/") }),
      });
      const result = await response.json();
      setAge(result.age);
    } catch (error) {
      return;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-zinc-900 text-white p-5">
      <div className={"w-full h-full items-center justify-center flex"}>
        <div className={"bg-zinc-800 p-10 rounded-md"}>
          <label className="block">
            <span className="block">Escolha uma data</span>
            <input
              className={"bg-zinc-900 p-2 text-md rounded-md"}
              type={"date"}
              onChange={(event) => handleCalcAge(event.target.value)}
            />
          </label>
          <div
            className={
              "w-full h-full flex flex-col justify-center items-center mt-2"
            }
          >
            {age != null && (
              <>
                <h2 className="text-xl font-bold">Resultado</h2>
                <h2 className="text-2xl">
                  {age >= 0 ? age : "Ainda não nasceu"}
                </h2>
              </>
            )}
          </div>
        </div>
      </div>
      <a
        className="absolute right-5 bottom-5 flex justify-end items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer"
        href={"https://github.com/matheusgmc/age-calc"}
      >
        <Image
          src={"/github-icon.svg"}
          width={60}
          height={60}
          color={"#ffff"}
          alt="icone do github"
        />
        Repositório
      </a>
    </div>
  );
};

export default Home;
