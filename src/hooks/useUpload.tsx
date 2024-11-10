import { useState } from "react";
import { api } from "~/trpc/react";
import { type GenerateOneUploadUrlInput } from "~/utils/validation/media/generateOneUploadUrl";

export function useSingleUpload() {
  const apiUtils = api.useUtils();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async ({
    dir,
    file,
  }: {
    dir: GenerateOneUploadUrlInput["dir"];
    file: File;
  }) => {
    setIsPending(true);

    const { key, url } = await apiUtils.media.generateOneUploadUrl.fetch({
      dir,
    });

    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
        "Content-Length": file.size.toString(),
      },
    });

    if (!response.ok) {
      setError(response.statusText);
    }

    setIsPending(false);

    return { key };
  };

  return {
    uploadSingleFile: upload,
    isUploadSingleFilePending: isPending,
    uploadSingleFileError: error,
  };
}
