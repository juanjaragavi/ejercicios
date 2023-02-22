import { useState } from "react";
import "./App.css";
import { PatternFormat } from "react-number-format";
import { useForm } from "react-hook-form";
import { number } from "yup";
import { validadorEdad } from "./components/Validators";
import { NhostClient, NhostProvider } from "@nhost/react";

const nhost = new NhostClient({
  subdomain: process.env.REACT_APP_NHOST_SUBDOMAIN,
  region: process.env.REACT_APP_NHOST_REGION,
});

function App() {
  const user = {
    name: "Juan", // <--- STRING
    lastname: "Jaramillo",
    phone: 3218856199,
    email: "juanamillo@gmail.com",
    id: 80814189, // PROPIEDADES
    age: 39, // <--- NÚMERO
    address: {
      street: "131A # 53 B 91",
      street2: "Int 4 Apto 503 La Sultana C",
      neighborhood: "Prado Veraniego",
      city: "Bogota",
      state: "Cundinamarca",
    },
    bankingInformation: {
      bank: "BBVA",
      accountId: 940045606,
      balance: 1000,
      cardNumber: 4558210678213669,
    },
    activities: ["learning", "programming", "golf", "marketing", "advertising"],
    loved: ["cats", "mum", "friends", "geopolitics"],
    colombian: true, // <--- BOOLEANO
    catholic: false, // PAR CLAVE Y VALOR
    showFullName() {
      return `${this.name} ${this.lastname}`;
    },
    showFullAddress() {
      return `${this.address.street} ${this.address.street2} ${this.address.neighborhood} ${this.address.city}, ${this.address.state}`;
    },
  };

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const seleccionaPlan = watch("plan");

  let lastKnownScrollPosition = 0;
  let ticking = false;

  function doSomething(scrollPos) {
    document.getElementById("p2").style.opacity = "0";
  }

  document.addEventListener("scroll", (event) => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        doSomething(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  });

  return (
    <NhostProvider nhost={nhost}>
      <BrowserRouter>
        {
          <div className="App">
            <h1
              id="p2"
              className="font-sans text-5xl font-bold text-yellow-700 hover:scale-110 transition-all duration-300 ease-linear"
            >
              ¡Hola! Soy
            </h1>
            <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition-color ease-linear duration-500">
              {user.name} {user.lastname}
            </h1>
            <h3>
              C.C:{" "}
              <PatternFormat
                value={user.id}
                displayType={"text"}
                valueIsNumericString
                format="##'###.###"
              />
            </h3>
            <div className="p-5 m-5 bg-zinc-900 rounded-lg h-auto min-h-min">
              <h1 className="text-2xl font-Montserrat font-light">
                Formulario
              </h1>
              <section className="m-5 p-3 bg-zinc-800 rounded-lg h-auto min-h-min">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="p-3 text-left">
                    <label className="p-3">Nombres</label>
                    <input
                      {...register("nombres", {
                        required: true,
                      })}
                      className="peer py-0.5 px-1 rounded-lg float-right border border-slate-300 hover:border-yellow-500 hover:text-yellow-500 hover:scale-105 focus:text-yellow-500 focus:border-yellow-500 focus:scale-105 transition-all duration-300 ease-linear"
                      type="text"
                      name="nombres"
                      id="nombres"
                    />
                    <div className="mt-0 h-0 invisible peer-focus:mt-5 peer-focus:h-16 peer-focus:visible peer-checked/si:invisible peer-checked/no:invisible transition-all duration-500 delay-1000 ease-linear w-100">
                      <p className="text-[0.8em] text-center">
                        ¡Hola,{" "}
                        <span className="text-yellow-500 font-bold">
                          {watch("nombres")}
                        </span>
                        ! Es un placer tenerte aquí.
                        <br />
                        ¿Deseas suscribirte a nuestro <i>Newsletter</i>?
                      </p>
                      <section>
                        <input
                          {...register("si")}
                          id="si"
                          class="ml-[40%] peer/si mr-1"
                          type="radio"
                          name="status"
                        />
                        <label
                          for="si"
                          class="text-[0.8em] peer-checked/si:text-green-500"
                        >
                          SI
                        </label>
                        <input
                          {...register("no")}
                          id="no"
                          class="ml-1 peer/no mr-1"
                          type="radio"
                          name="status"
                        />
                        <label
                          for="no"
                          class="text-[0.8em] peer-checked/no:text-red-500"
                        >
                          NO
                        </label>

                        <div class="text-green-500 text-center text-[0.7em] hidden peer-checked/si:block">
                          ¡Muchas gracias por suscribirte!
                        </div>
                        <div class="text-red-500 text-center text-[0.7em] hidden peer-checked/no:block">
                          Lástima. Esperamos tu suscrpición.
                        </div>
                      </section>
                    </div>
                    {errors.nombres?.type === "required" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        Este campo es requerido.
                      </p>
                    )}
                  </div>
                  <div className="p-3 text-left">
                    <label className="p-3">Apellidos</label>
                    <input
                      {...register("apellidos", {
                        required: true,
                      })}
                      className="py-0.5 px-1 rounded-lg float-right border border-slate-300 hover:border-yellow-500 hover:text-yellow-500 hover:scale-105 focus:text-yellow-500 focus:border-yellow-500 focus:scale-105 transition-all duration-300 ease-linear"
                      type="text"
                      name="apellidos"
                      id="apellidos"
                    />
                    {errors.apellidos?.type === "required" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        Este campo es requerido.
                      </p>
                    )}
                  </div>
                  <div className="p-3 text-left">
                    <label className="p-3">Cédula</label>
                    <input
                      {...register("cedula", {
                        required: true,
                        type: number,
                      })}
                      className="py-0.5 px-1 rounded-lg float-right border border-slate-300 hover:border-yellow-500 hover:text-yellow-500 hover:scale-105 focus:text-yellow-500 focus:border-yellow-500 focus:scale-105 transition-all duration-300 ease-linear"
                      type="number"
                      name="cedula"
                      id="cedula"
                    />
                    {errors.cedula?.type === "required" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        Este campo es requerido.
                      </p>
                    )}
                  </div>
                  <div className="p-3 text-left">
                    <label className="p-3">Edad</label>
                    <input
                      {...register("edad", {
                        maxLength: 3,
                        minLength: 2,
                        required: true,
                        type: number,
                        validate: validadorEdad,
                      })}
                      className="w-16 py-0.5 px-1 rounded-lg float-right border border-slate-300 hover:border-yellow-500 hover:text-yellow-500 hover:scale-105 focus:text-yellow-500 focus:border-yellow-500 focus:scale-105 transition-all duration-300 ease-linear"
                      type="number"
                      name="edad"
                      id="edad"
                    />
                    {errors.edad?.type === "required" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        Este campo es requerido.
                      </p>
                    )}
                    {errors.edad?.type === "minLength" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        El número mínimo de caracteres permitido es 2.
                      </p>
                    )}
                    {errors.edad?.type === "maxLength" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        El número máximo de caracteres permitido es 3.
                      </p>
                    )}
                    {errors.edad?.type === "validate" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        La edad debe estar entre 18 y 65 años.
                      </p>
                    )}
                  </div>
                  <div className="p-3 text-left">
                    <label className="p-3">Email</label>
                    <input
                      {...register("email", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                      })}
                      className="py-0.5 px-1 rounded-lg float-right border border-slate-300 hover:border-yellow-500 hover:text-yellow-500 hover:scale-105 focus:text-yellow-500 focus:border-yellow-500 focus:scale-105 transition-all duration-300 ease-linear"
                      type="email"
                      name="email"
                      id="email"
                    />
                    {errors.email?.type === "required" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        Este campo es requerido.
                      </p>
                    )}
                    {errors.email?.type === "pattern" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        Ingresa un correo electrónico válido.
                      </p>
                    )}
                  </div>
                  <div className="p-3 text-left">
                    <label className="p-3">Teléfono</label>
                    <input
                      {...register("telefono", {
                        maxLength: 10,
                        minLength: 10,
                        required: true,
                        type: number,
                      })}
                      className="py-0.5 px-1 rounded-lg float-right border border-slate-300 hover:border-yellow-500 hover:text-yellow-500 hover:scale-105 focus:text-yellow-500 focus:border-yellow-500 focus:scale-105 transition-all duration-300 ease-linear"
                      type="number"
                      name="telefono"
                      id="telefono"
                    />
                    {errors.telefono?.type === "required" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        Este campo es requerido.
                      </p>
                    )}
                    {errors.telefono?.type === "minLength" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        El número mínimo de caracteres permitido es 10.
                      </p>
                    )}
                    {errors.telefono?.type === "maxLength" && (
                      <p className="text-red-500 -mb-2 p-0 m-5 mr-0 text-[0.6em] text-right">
                        El número máximo de caracteres permitido es 10.
                      </p>
                    )}
                  </div>
                  <div className="p-3 text-left">
                    <label className="p-3">País</label>
                    <select
                      {...register("pais", {
                        required: false,
                      })}
                      className="appearance-none min-w-[58%] py-0.5 px-1 rounded-lg float-right border border-slate-300 hover:border-yellow-500 hover:text-yellow-500 hover:scale-105 focus:text-yellow-500 focus:border-yellow-500 focus:scale-105 transition-all duration-300 ease-linear"
                      name="pais"
                      id="pais"
                    >
                      <option value="0">Selecciona...</option>
                      <option value="espana">España</option>
                      <option value="mexico">México</option>
                      <option value="colombia">Colombia</option>
                    </select>
                  </div>
                  <div className="p-3 text-left">
                    <label className="p-3">¿Deseas un Plan?</label>
                    <input {...register("plan")} type="checkbox" id="plan" />
                  </div>
                  {seleccionaPlan && (
                    <div className="p-3 text-left">
                      <label className="p-3">Selecciona un Plan</label>
                      <select
                        {...register("seleccionaPlan")}
                        className="appearance-none min-w-[20%] py-0.5 px-1 rounded-lg float-right border border-slate-300 hover:border-yellow-500 hover:text-yellow-500 hover:scale-105 focus:text-yellow-500 focus:border-yellow-500 focus:scale-105 transition-all duration-300 ease-linear"
                        name="seleccionaPlan"
                        id="seleccionaPlan"
                      >
                        <option value="0">Selecciona...</option>
                        <option value="basico">Plan Básico</option>
                        <option value="profesional">Plan Professional</option>
                        <option value="premium">Plan Premium</option>
                      </select>
                    </div>
                  )}
                  <div className="flex space-x-8">
                    <input
                      className="ml-5 my-3 font-sans font-bold border rounded-lg cursor-pointer px-7 py-1 border-slate-300 hover:px-8 hover:scale-110 hover:border-yellow-500 hover:text-yellow-500 transition-all duration-300 ease-linear"
                      type="submit"
                      value="Enviar"
                    />
                    <input
                      className="my-3 font-sans font-bold border rounded-lg cursor-pointer px-7 py-1 border-slate-300 hover:border-red-500 hover:text-red-500 transition-all duration-300 ease-linear"
                      type="reset"
                      value="Restablecer"
                    />
                  </div>
                </form>
              </section>
            </div>
            <div className="card">
              <h2>{user.email}</h2>
              <p>
                {user.address.street} {user.address.street2}
              </p>
              <p>
                <PatternFormat
                  format="+57 (###) ### ####"
                  displayType={"text"}
                  value={user.phone}
                  allowEmptyFormatting
                  mask="_"
                />
              </p>
            </div>
          </div>
        }
      </BrowserRouter>
    </NhostProvider>
  );
}

export default App;
