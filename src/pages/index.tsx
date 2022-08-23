import React from "react";
import type { NextPage } from "next";

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
    <div
      className={
        "w-screen h-screen bg-zinc-900 text-white items-center justify-center flex"
      }
    >
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
  );
};

export default Home;
