import { useCallback, useState } from "react";
import { FileDrop } from "react-file-drop";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
// const StyledDropArea = styled.div`
//   border: 2px solid var(--color-main);
//   padding: 20px;
//   border-radius: 8px;
//   height: 100px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const StyledInput = styled.input`
  margin: 30px 0;
`;

const StyledFileDrop = styled.div`
  position: relative;
  /* padding: 20px; */
  border-radius: 8px;
  height: 100px;
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* width: ; */

  /* .file-drop-target {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .file-drop-target.file-drop-dragging-over-target {
    outline: 2px solid var(--color-purple);
    outline: -2px;
    border-radius: 8px;
    background-color: var(--color-black-200);
  } */
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
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    onCloseModal()
  }, [onCloseModal]);
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
