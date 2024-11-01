import XLSX from "xlsx";

export const transformExcelToJson = (file: Buffer) => {
  const workbook = XLSX.read(file, { type: "buffer" });

  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    throw new Error("Sheet name not found");
  }

  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error("Sheet not found");
  }

  const json = XLSX.utils.sheet_to_json(sheet);
  return json;
};
