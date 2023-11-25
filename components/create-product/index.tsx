"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { AuthApi, FileProps } from "@/app/services/auth-api";
import { Product, onEditProps } from "../product";

const createProduct = z.object({
  name: z
    .string()
    .nonempty({ message: "Nome é obrigatório." })
    .regex(/^[a-zA-Z0-9_\- ]+$/, {
      message: "Formato inválido.",
    }),
  version: z.string(),
});

export type createProductType = z.infer<typeof createProduct>;

const createFile = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9_.-]+\.lua$/, { message: "Formato inválido." }),
  side: z.enum(["client", "server"]),
});

export type createFileType = z.infer<typeof createFile>;

interface CreateProductProps {
  cookie: string;
}

export function CreateProduct(props: CreateProductProps) {
  const editorRef = useRef<any>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState<onEditProps>();
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
    setError: setErrorProduct,
    formState: { errors: errorsProduct },
  } = useForm<createProductType>({
    resolver: zodResolver(createProduct),
    defaultValues: {
      version: "1.0.0",
    },
  });

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  async function onSubmitProduct(product: createProductType) {
    setLoading(true);
    try {
      await AuthApi(props.cookie).post("/product", {
        ...product,
        files: files,
      });
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      if (err.response.data.error === "product name exist")
        return setErrorProduct("name", {
          message: "Esse nome já existe, utilize outro.",
        });
    } finally {
      setLoading(false);
    }
  }

  function onSubmitFile(newFile: createFileType) {
    const isExist = files.filter(
      (file) => file.name === newFile.name && file.side === newFile.side
    );
    if (isExist.length)
      return setErrorFile("name", { message: "Esse arquivo já existe." });
    setFiles((files) => [
      ...files,
      {
        ...newFile,
        code: `-- Escreva aqui seu código do arquivo - ${newFile.name} | ${
          newFile.side === "server" ? "Servidor" : "Cliente"
        }`,
      },
    ]);
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
    <Product
      enterEditFile={enterEditFile}
      errorsFile={errorsFile}
      errorsProduct={errorsProduct}
      files={files}
      handleCloseEditFile={handleCloseEditFile}
      handleDeleteFile={handleDeleteFile}
      handleEditorDidMount={handleEditorDidMount}
      handleSubmitFile={handleSubmitFile}
      handleSubmitProduct={handleSubmitProduct}
      loading={loading}
      onEdit={onEdit}
      onSubmitFile={onSubmitFile}
      onSubmitProduct={onSubmitProduct}
      registerFile={registerFile}
      registerProduct={registerProduct}
      select={select}
      setSelect={setSelect}
    />
  );
}
