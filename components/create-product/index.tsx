"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/* const createProduct = z.object({
  name: z.string().nonempty({ message: "Nome é obrigatório" }),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
});

type createProductType = z.infer<typeof createProduct>; */

const createFile = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9_.-]+\.lua$/, { message: "Formato inválido." }),
  side: z.enum(["client", "server"]),
});

type createFileType = z.infer<typeof createFile>;

export function CreateProduct() {
  const [select, setSelect] = useState("");
  const [files, setFiles] = useState<createFileType[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<createFileType>({
    resolver: zodResolver(createFile),
  });

  function onSubmitFile(newFile: createFileType) {
    /* return setError("name", { message: "Esse arquivo já existe." }); */
    setFiles((files) => [...files, newFile]);
    reset();
  }

  function handleDeleteFile(remFile: createFileType) {
    const removeFile = files.filter((file) => file !== remFile);
    setFiles(removeFile);
  }

  return (
    <>
      <div className="w-full flex justify-between gap-5">
        <div className="flex flex-col mt-[30px] flex-1 gap-[10px] max-w-[537px]">
          <label>Nome do produto</label>
          <input
            placeholder="nome-do-script"
            className="flex-1 p-[15px] rounded-[5px] bg-[#1F1F1F] border-none placeholder:font-[#FFFFFF66] focus:outline outline-[#5F71CB]"
          />
        </div>
        <div className="flex flex-col mt-[30px] flex-1 gap-[10px] max-w-[537px]">
          <label>Versão do produto</label>
          <input
            placeholder="1.0.0"
            className="flex-1  p-[15px] rounded-[5px] bg-[#1F1F1F] border-none placeholder:font-[#FFFFFF66] focus:outline outline-[#5F71CB]"
          />
        </div>
      </div>

      <section className="flex justify-between gap-5 mb-5">
        <form
          onSubmit={handleSubmit(onSubmitFile)}
          className="flex flex-col gap-[26px] flex-1 max-w-[537px]"
        >
          <h2 className="mt-[50px] text-[25px] font-bold">Criando arquivos</h2>
          <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col flex-1 gap-[10px]">
              <label>Lado do arquivo</label>
              <select
                value={select}
                onChange={(e) => setSelect(e.target.value)}
                className="appearance-none bg-[#1F1F1F] p-[15px] rounded-[5px] border-none focus:outline outline-[#5F71CB]"
              >
                <option className="py-[18px]">Escolha o lado arquivo</option>
                <option value="backend">Back-end</option>
                <option value="frontend">Front-end</option>
              </select>
            </div>
            {select === "backend" && (
              <>
                <label className="mt-[30px]">Nome do arquivo</label>
                <input
                  {...register("name", { required: true })}
                  placeholder="nome-do-arquivo.lua"
                  className="p-[15px] rounded-[5px] bg-[#1F1F1F] border-none placeholder:font-[#FFFFFF66] focus:outline outline-[#5F71CB]"
                />
                <span className="text-red-400">{errors.name?.message}</span>

                <div className="flex flex-col gap-[10px] mt-[30px]">
                  <label>Lado de Operação</label>
                  <select
                    {...register("side", { required: true })}
                    className="appearance-none flex-1 bg-[#1F1F1F] p-[15px] rounded-[5px] border-none focus:outline outline-[#5F71CB]"
                  >
                    <option className="py-[18px]">
                      Escolha o lado arquivo
                    </option>
                    <option value="server">Servidor</option>
                    <option value="client">Cliente</option>
                  </select>
                  <span className="text-red-400">
                    {errors.side?.message && "Selecione uma opção."}
                  </span>
                </div>
              </>
            )}
          </div>
          <button className="bg-[#5F71CB] px-[30px] py-3 rounded-md transition-colors hover:bg-[#485598]">
            Criar arquivo
          </button>
        </form>
        <div className="flex-1 max-w-[537px]">
          {files.length > 0 && (
            <div className="flex flex-col gap-[30px]">
              <h2 className="mt-[50px] text-[25px] font-bold">
                Todos arquivos
              </h2>

              <section className="grid grid-cols-2 gap-6">
                {files.map((file, key) => (
                  <div
                    key={key}
                    className="rounded-[10px] border border-[#5F71CB] p-5 flex flex-col bg-[#2E3035]"
                  >
                    <div className="flex items-center gap-[15px]">
                      <span className="icon-[logos--lua] text-[30px]" />
                      <ul>
                        <h2 className="font-normal text-[16px] leading-none">
                          {file.name} -{" "}
                          {file.side === "server" ? "Servidor" : "Cliente"}
                        </h2>
                        <span className="text-[#75808A] font-normal text-[12px] leading-none">
                          Edite o código do arquivo
                        </span>
                      </ul>
                    </div>
                    <div className="flex gap-1">
                      <button className="w-full mt-[15px] bg-[#5F71CB] py-3 rounded-md transition-colors hover:bg-[#485598]">
                        Editar código
                      </button>
                      <button
                        onClick={() => handleDeleteFile(file)}
                        className="flex items-center justify-center mt-[15px] bg-red-400 px-[30px] py-3 rounded-md transition-colors hover:bg-red-500"
                      >
                        <span className="icon-[ph--trash-fill] text-lg" />
                      </button>
                    </div>
                  </div>
                ))}
              </section>

              <button className="flex-1 bg-[#5F71CB] px-[30px] py-3 rounded-md transition-colors hover:bg-[#485598]">
                Finalizar produto
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
