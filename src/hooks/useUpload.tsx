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

export function useMultipleUploadWithKeys() {
  const apiUtils = api.useUtils();
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState<
    Record<string, "pending" | "success" | "error">
  >({});

  const uploadMultiple = async ({
    dir,
    files,
  }: {
    dir: GenerateOneUploadUrlInput["dir"];
    files: File[];
  }) => {
    setIsPending(true);
    setStatus({});

    try {
      const data = await apiUtils.media.generateManyUploadUrlsWithKeys.fetch({
        dir,
        keys: files.map((file) => file.name),
      });

      const results = await Promise.all(
        data.map(async ({ originalKey, url, key }) => {
          try {
            setStatus((prev) => ({
              ...prev,
              [originalKey]: "pending",
            }));

            const file = files.find((file) => file.name === originalKey);
            if (!file) {
              setStatus((prev) => ({
                ...prev,
                [originalKey]: "error",
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
              setStatus((prev) => ({
                ...prev,
                [originalKey]: "error",
              }));
              return null;
            }

            setStatus((prev) => ({
              ...prev,
              [originalKey]: "success",
            }));

            return { key, fileName: originalKey };
          } catch (error) {
            console.error(error);
            return null;
          }
        })
      );

      return results.filter(
        (result): result is { key: string; fileName: string } => result !== null
      );
    } catch (error) {

      return [];
    } finally {
      setIsPending(false);
    }
  };

  return {
    uploadMultipleFilesWithKeys: uploadMultiple,
    uploadMultipleFilesWithKeysPending: isPending,
    uploadMultipleFilesWithKeysStatus: status,
  };
}
