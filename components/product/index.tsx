import { FileProps } from "@/app/services/auth-api";
import { Editor } from "@monaco-editor/react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { createFileType, createProductType } from "../create-product";

export interface onEditProps {
  file?: FileProps;
  state: boolean;
}

interface ProductProps {
  onEdit: onEditProps | undefined;
  handleCloseEditFile: () => void;
  handleEditorDidMount: (newState: any) => void;
  registerProduct: UseFormRegister<{
    name: string;
    version: string;
  }>;
  errorsProduct: FieldErrors<{
    name: string;
    version: string;
  }>;
  handleSubmitProduct: UseFormHandleSubmit<
    {
      name: string;
      version: string;
    },
    undefined
  >;
  handleSubmitFile: UseFormHandleSubmit<
    {
      name: string;
      side: "client" | "server";
    },
    undefined
  >;
  registerFile: UseFormRegister<{
    name: string;
    side: "client" | "server";
  }>;
  errorsFile: FieldErrors<{
    name: string;
    side: "client" | "server";
  }>;
  onSubmitProduct: (product: createProductType) => void;
  select: string;
  setSelect: (newState: string) => void;
  onSubmitFile: (newFile: createFileType) => void;
  files: FileProps[];
  loading: boolean;
  enterEditFile: (file: createFileType) => void;
  handleDeleteFile: (remFile: createFileType) => void;
}

export function Product({
  onEdit,
  handleCloseEditFile,
  handleEditorDidMount,
  registerProduct,
  errorsProduct,
  select,
  setSelect,
  registerFile,
  errorsFile,
  handleSubmitFile,
  onSubmitFile,
  files,
  loading,
  enterEditFile,
  handleDeleteFile,
  handleSubmitProduct,
  onSubmitProduct,
}: ProductProps) {
  return (
    <>
      {onEdit?.state && (
        <section className="w-screen h-screen flex flex-col absolute top-0 left-0 z-50">
          <button
            onClick={handleCloseEditFile}
            className="bg-[#5F71CB] px-[30px] py-3 transition-colors hover:bg-[#485598]"
          >
            Voltar para criação
          </button>
          <Editor
            width="100vw"
            height="100vh"
            defaultLanguage="lua"
            defaultValue={onEdit.file?.code}
            theme="vs-dark"
            onMount={handleEditorDidMount}
          />
        </section>
      )}
      <div className="w-full flex justify-between gap-5">
        <div className="flex flex-col mt-[30px] flex-1 gap-[10px] max-w-[537px]">
          <label>Nome do produto</label>
          <input
            {...registerProduct("name")}
            placeholder="nome-do-script"
            className="flex-1 p-[15px] rounded-[5px] bg-[#1F1F1F] border-none placeholder:font-[#FFFFFF66] focus:outline outline-[#5F71CB]"
          />
          <span className="text-red-400">{errorsProduct.name?.message}</span>
        </div>
        <div className="flex flex-col mt-[30px] flex-1 gap-[10px] max-w-[537px]">
          <label>Versão do produto</label>
          <input
            {...registerProduct("version")}
            placeholder="1.0.0"
            className="flex-1  p-[15px] rounded-[5px] bg-[#1F1F1F] border-none placeholder:font-[#FFFFFF66] focus:outline outline-[#5F71CB]"
          />
          <span className="text-red-400">{errorsProduct.version?.message}</span>
        </div>
      </div>
      <section className="flex justify-between gap-5 mb-5">
        <form className="flex flex-col gap-[26px] flex-1 max-w-[537px]">
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
                  {...registerFile("name", {
                    required: true,
                  })}
                  placeholder="nome-do-arquivo.lua"
                  className="p-[15px] rounded-[5px] bg-[#1F1F1F] border-none placeholder:font-[#FFFFFF66] focus:outline outline-[#5F71CB]"
                />
                <span className="text-red-400">
                  {errorsFile.name?.message === "Required"
                    ? "Escolha um nome."
                    : errorsFile.name?.message}
                </span>

                <div className="flex flex-col gap-[10px] mt-[30px]">
                  <label>Lado de Operação</label>
                  <select
                    {...registerFile("side", { required: true })}
                    className="appearance-none flex-1 bg-[#1F1F1F] p-[15px] rounded-[5px] border-none focus:outline outline-[#5F71CB]"
                  >
                    <option className="py-[18px]">
                      Escolha o lado arquivo
                    </option>
                    <option value="server">Servidor</option>
                    <option value="client">Cliente</option>
                  </select>
                  <span className="text-red-400">
                    {errorsFile.side?.message && "Selecione uma opção."}
                  </span>
                </div>
              </>
            )}
          </div>
          <button
            onClick={handleSubmitFile(onSubmitFile)}
            className="bg-[#5F71CB] px-[30px] py-3 rounded-md transition-colors hover:bg-[#485598]"
          >
            Criar arquivo
          </button>
        </form>
        <div className="flex-1 max-w-[537px]">
          {files.length > 0 && (
            <div className="flex flex-col gap-[30px]">
              <h2 className="mt-[50px] text-[25px] font-bold">
                Todos arquivos
              </h2>

              <section className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
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
                      <button
                        onClick={() => enterEditFile(file)}
                        className="w-full mt-[15px] bg-[#5F71CB] py-3 rounded-md transition-colors hover:bg-[#485598]"
                      >
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

              <button
                onClick={handleSubmitProduct(onSubmitProduct)}
                className="flex-1 itens-center justify-center bg-[#5F71CB] px-[30px] py-3 rounded-md transition-colors hover:bg-[#485598]"
              >
                {loading ? (
                  <span className="icon-[eos-icons--loading]" />
                ) : (
                  "Finalizar produto"
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
