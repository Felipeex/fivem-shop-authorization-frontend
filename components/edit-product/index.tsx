"use client";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AuthApi,
  FileProps,
  ProductPropsWithFile,
} from "@/app/services/auth-api";
import Editor from "@monaco-editor/react";
import { useRouter } from "next/navigation";
import { Product } from "../product";

const updateProduct = z.object({
  name: z
    .string()
    .nonempty({ message: "Nome é obrigatório." })
    .regex(/^[a-zA-Z0-9_\- ]+$/, {
      message: "Formato inválido.",
    }),
  version: z.string(),
});

type updateProductType = z.infer<typeof updateProduct>;

const updateFile = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9_.-]+\.lua$/, { message: "Formato inválido." }),
  side: z.enum(["client", "server"]),
});

type updateFileType = z.infer<typeof updateFile>;

interface updateProductProps {
  cookie: string;
  params: { id: string };
}

export function UpdateProduct(props: updateProductProps) {
  const editorRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      const getProduct = await AuthApi(props.cookie)<{
        products: ProductPropsWithFile[];
      }>(`/product/${props.params.id}`);
      const product = getProduct.data.products[0];
      resetProduct({ ...product });
      setFiles(product?.files);
    };
    getProduct();
  }, [props.params.id]);

  const [loading, setLoading] = useState(false);
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
  } = useForm<updateFileType>({
    resolver: zodResolver(updateFile),
  });

  const {
    register: registerProduct,
    handleSubmit: handleSubmitProduct,
    formState: { errors: errorsProduct },
    setError: setErrorProduct,
    reset: resetProduct,
  } = useForm<updateProductType>({
    resolver: zodResolver(updateProduct),
  });

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  async function onSubmitProduct(product: updateProductType) {
    setLoading(true);
    try {
      await AuthApi(props.cookie).put(`/product/${props.params.id}`, {
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

  function onSubmitFile(newFile: updateFileType) {
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

  function handleDeleteFile(remFile: updateFileType) {
    const removeFile = files.filter((file) => file !== remFile);
    setFiles(removeFile);
  }

  function enterEditFile(file: updateFileType) {
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
