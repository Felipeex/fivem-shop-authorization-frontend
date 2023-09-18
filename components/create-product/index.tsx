"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Editor from "@monaco-editor/react";
import { FileProps } from "@/app/services/auth-api";

const createProduct = z.object({
  name: z
    .string()
    .nonempty({ message: "Nome é obrigatório." })
    .regex(/^[a-zA-Z0-9_\- ]+$/, {
      message: "Formato inválido.",
    }),
  version: z.string(),
});

type createProductType = z.infer<typeof createProduct>;

const createFile = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9_.-]+\.lua$/, { message: "Formato inválido." }),
  side: z.enum(["client", "server"]),
});

type createFileType = z.infer<typeof createFile>;

export function CreateProduct() {
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const [onEdit, setOnEdit] = useState<{
    file?: FileProps;
    state: boolean;
  }>();
  const [select, setSelect] = useState("");
  const [files, setFiles] = useState<FileProps[]>([]);
  const {
    register: registerFile,
    handleSubmit: handleSubmitFile,
    reset: resetFile,
    setError: setErrorFile,
    formState: { errors: errorsFile },
  } = useForm<createFileType>({
    resolver: zodResolver(createFile),
  });

  const {
    register: registerProduct,
    handleSubmit: handleSubmitProduct,
    formState: { errors: errorsProduct },
  } = useForm<createProductType>({
    resolver: zodResolver(createProduct),
    defaultValues: {
      version: "1.0.0",
    },
  });

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  function onSubmitProduct(product: createProductType) {
    router.push("/dashboard");
  }

  function onSubmitFile(newFile: createFileType) {
    const isExist = files.filter(
      (file) => file.name === newFile.name && file.side === newFile.side
    );
    if (isExist.length)
      return setErrorFile("name", { message: "Esse arquivo já existe." });
    setFiles((files) => [...files, newFile]);
    resetFile();
  }

  function handleDeleteFile(remFile: createFileType) {
    const removeFile = files.filter((file) => file !== remFile);
    setFiles(removeFile);
  }

  function enterEditFile(file: createFileType) {
    setOnEdit({ file, state: true });
    window.scrollTo(0, 0);
  }

  function handleCloseEditFile() {
    const filteredFiles = files.filter(
      (file) =>
        `${file.name}-${file.side}` !==
        `${onEdit?.file?.name}-${onEdit?.file?.side}`
    );
    const code = editorRef?.current?.getValue();
    setFiles([{ ...onEdit?.file!, code }, ...filteredFiles]);
    setOnEdit({ state: false });
  }

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
            defaultValue={
              onEdit.file?.code
                ? onEdit.file?.code
                : `-- Escreva aqui seu código do arquivo - ${
                    onEdit.file?.name
                  } | ${
                    onEdit.file?.side === "server" ? "Servidor" : "Cliente"
                  }`
            }
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
                className="flex-1 bg-[#5F71CB] px-[30px] py-3 rounded-md transition-colors hover:bg-[#485598]"
              >
                Finalizar produto
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
