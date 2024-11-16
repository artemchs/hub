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

// In useUpload.tsx
export function useMultipleUpload() {
  const apiUtils = api.useUtils();
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const uploadMultiple = async ({
    dir,
    files,
  }: {
    dir: GenerateOneUploadUrlInput["dir"];
    files: File[];
  }) => {
    setIsPending(true);
    setErrors({});

    try {
      const { urls, keys } = await apiUtils.media.generateManyUploadUrls.fetch({
        dir,
        count: files.length,
      });

      const results = await Promise.all(
        files.map(async (file, index) => {
          try {
            const url = urls[index];
            if (!url) {
              setErrors((prev) => ({
                ...prev,
                [file.name]: "Upload URL is undefined",
              }));
              return null;
            }

            const response = await fetch(url, {
              method: "PUT",
              body: file,
              headers: {
                "Content-Type": file.type,
                "Content-Length": file.size.toString(),
              },
            });

            if (!response.ok) {
              setErrors((prev) => ({
                ...prev,
                [file.name]: response.statusText,
              }));
              return null;
            }

            return { key: keys[index], fileName: file.name };
          } catch (error) {
            setErrors((prev) => ({
              ...prev,
              [file.name]:
                error instanceof Error ? error.message : "Upload failed",
            }));
            return null;
          }
        })
      );

      return results.filter(
        (result): result is { key: string; fileName: string } => result !== null
      );
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general:
          error instanceof Error
            ? error.message
            : "Failed to generate upload URLs",
      }));
      return [];
    } finally {
      setIsPending(false);
    }
  };

  return {
    uploadMultipleFiles: uploadMultiple,
    isUploadMultipleFilesPending: isPending,
    uploadMultipleFilesErrors: errors,
  };
}
