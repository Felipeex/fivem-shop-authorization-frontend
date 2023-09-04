export default function Page() {
  return (
    <>
      <h1 className="text-4xl font-bold">Criando seu produto</h1>
      <div className="w-full flex justify-between gap-[5vw]">
        <div className="flex flex-col mt-[30px] flex-1 gap-[10px]">
          <label>Nome do produto</label>
          <input
            placeholder="nome-do-script"
            className="flex-1 p-[15px] rounded-[5px] bg-[#1F1F1F] border-none placeholder:font-[#FFFFFF66] focus:outline outline-[#5F71CB]"
          />
        </div>
        <div className="flex flex-col mt-[30px] flex-1 gap-[10px]">
          <label>Nome do produto</label>
          <input
            placeholder="nome-do-script"
            className="flex-1  p-[15px] rounded-[5px] bg-[#1F1F1F] border-none placeholder:font-[#FFFFFF66] focus:outline outline-[#5F71CB]"
          />
        </div>
      </div>
    </>
  );
}
