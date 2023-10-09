import { useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { useUpdateAvatar } from "../features/autentication/useUpdateAvatar";
import { useQueryClient } from "@tanstack/react-query";

const StyledFileDrop = styled.div`
  position: relative;
  border-radius: 8px;
  height: 100px;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ErrorFile = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid var(--color-error);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Default = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid var(--color-main);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Accept = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid var(--color-purple);
  background-color: var(--color-black-200);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ModalEditAvatar({ onCloseModal }) {
  const queryCilent = useQueryClient();
  const user = queryCilent.getQueryData(["user"]);

  const { updateAvatar } = useUpdateAvatar();
  const onDrop = useCallback(
    (acceptedFiles) => {
      let avatar = acceptedFiles.at(0);
      updateAvatar({ avatar, user });
      onCloseModal();
    },
    [onCloseModal, user, updateAvatar]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: { "image/*": [] } });

  return (
    <StyledFileDrop {...getRootProps()}>
      <input {...getInputProps()} />
      {!isDragActive && (
        <Default>
          Drag and drop some files here, or click to select files
        </Default>
      )}
      {isDragReject && <ErrorFile>Use image</ErrorFile>}
      {isDragAccept && <Accept>Drop file...</Accept>}
    </StyledFileDrop>
  );
}

export default ModalEditAvatar;
